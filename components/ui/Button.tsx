import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
};

export function Button({ className, variant = "primary", type = "button", ...props }: Props) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center px-8 py-4 text-[12px] font-label uppercase tracking-[0.15em] transition-colors duration-300 disabled:opacity-50 rounded-sm",
        variant === "primary" &&
          "bg-on-surface text-surface hover:bg-primary hover:text-white",
        variant === "outline" &&
          "border border-primary text-primary hover:bg-primary hover:text-white backdrop-blur-sm",
        variant === "ghost" && "text-on-surface hover:text-primary",
        className,
      )}
      {...props}
    />
  );
}
