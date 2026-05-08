import Link from "next/link";

export const metadata = { title: "Pago" };

export default function CheckoutPagoPage() {
  return (
    <div className="px-6 py-12 md:px-12">
      <h1 className="font-headline text-3xl">Pago con Stripe</h1>
      <p className="mt-4 max-w-xl text-on-surface-variant">
        Configura <code className="text-xs">STRIPE_SECRET_KEY</code> y <code className="text-xs">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> en{" "}
        <code className="text-xs">.env</code>. El intent de pago se creará vía <code className="text-xs">/api/stripe/create-intent</code> enlazado al
        pedido.
      </p>
      <Link href="/checkout" className="mt-8 inline-block text-sm text-primary underline">
        ← Volver a envío
      </Link>
    </div>
  );
}
