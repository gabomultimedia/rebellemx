import Link from "next/link";
import { RebelleLogo } from "@/components/store/RebelleLogo";

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <header className="flex h-16 items-center justify-between border-b border-outline-variant/30 px-6 md:px-12">
        <RebelleLogo href="/" wordmarkOnly />
        <Link href="/boutique" className="text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary">
          Seguir comprando
        </Link>
      </header>
      {children}
    </div>
  );
}
