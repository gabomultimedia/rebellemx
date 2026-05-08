import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Stripe no configurado" }, { status: 503 });
  }
  try {
    const { amount, currency = "mxn", orderId } = (await req.json()) as {
      amount?: number;
      currency?: string;
      orderId?: string;
    };
    if (!amount || amount < 1) {
      return NextResponse.json({ error: "Monto inválido" }, { status: 400 });
    }
    const stripe = new Stripe(secret);
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: orderId ? { orderId } : {},
      automatic_payment_methods: { enabled: true },
    });
    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch {
    return NextResponse.json({ error: "No se pudo crear el intent" }, { status: 500 });
  }
}
