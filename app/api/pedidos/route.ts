import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createOrderSchema } from "@/lib/validations";
import { OrderStatus, PaymentStatus } from "@prisma/client";
import { sendOrderConfirmation } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createOrderSchema.parse(body);
    const session = await auth();

    const shippingRow = await prisma.siteConfig.findUnique({ where: { key: "shipping_cost" } });
    const shippingCost = Number(shippingRow?.value ?? 350);

    const lines = await Promise.all(
      parsed.items.map(async (item) => {
        const product = await prisma.product.findFirst({
          where: { id: item.productId, isActive: true },
          include: { images: { where: { isPrimary: true }, take: 1 } },
        });
        if (!product) throw new Error("PRODUCT_NOT_FOUND");
        const dbPrice = Number(product.price);
        if (Math.abs(dbPrice - item.unitPrice) > 0.01) {
          throw new Error("PRICE_MISMATCH");
        }
        const img = product.images[0] ?? (await prisma.productImage.findFirst({ where: { productId: product.id } }));
        return {
          productId: product.id,
          variantId: item.variantId ?? null,
          productName: product.name,
          variantName: null as string | null,
          imageUrl: img?.url ?? item.imageUrl ?? null,
          unitPrice: dbPrice,
          quantity: item.quantity,
          subtotal: dbPrice * item.quantity,
        };
      }),
    );

    const subtotal = lines.reduce((a, l) => a + l.subtotal, 0);
    const total = subtotal + shippingCost;

    const order = await prisma.order.create({
      data: {
        userId: session?.user?.id ?? null,
        customerName: parsed.customerName,
        customerEmail: parsed.customerEmail,
        customerPhone: parsed.customerPhone || null,
        shipStreet: parsed.shipStreet,
        shipNumber: parsed.shipNumber,
        shipInterior: parsed.shipInterior || null,
        shipColonia: parsed.shipColonia,
        shipCity: parsed.shipCity,
        shipState: parsed.shipState,
        shipZip: parsed.shipZip,
        status: OrderStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        subtotal,
        shippingCost,
        discount: 0,
        total,
        items: {
          create: lines.map((l) => ({
            productId: l.productId,
            variantId: l.variantId,
            productName: l.productName,
            variantName: l.variantName,
            imageUrl: l.imageUrl,
            unitPrice: l.unitPrice,
            quantity: l.quantity,
            subtotal: l.subtotal,
          })),
        },
        statusHistory: {
          create: { status: OrderStatus.PENDING, note: "Pedido creado desde checkout" },
        },
      },
    });

    void sendOrderConfirmation(order.customerEmail, order.orderNumber);

    return NextResponse.json({ orderId: order.id, orderNumber: order.orderNumber });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "";
    if (msg === "PRODUCT_NOT_FOUND") return NextResponse.json({ error: "Producto no disponible" }, { status: 400 });
    if (msg === "PRICE_MISMATCH") return NextResponse.json({ error: "Precio desactualizado, refresca el carrito" }, { status: 409 });
    return NextResponse.json({ error: "No se pudo crear el pedido" }, { status: 400 });
  }
}
