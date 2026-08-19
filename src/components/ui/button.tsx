import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-200 ease-[var(--ease-out-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-paper hover:bg-ink-soft",
        inverse:
          "bg-paper text-ink hover:bg-paper-2",
        outline:
          "border border-ink/15 bg-transparent text-ink hover:border-ink/40",
        ghost: "bg-transparent text-ink hover:bg-ink/5",
        cream: "bg-paper text-ink hover:bg-paper-2",
      },
      size: {
        sm: "h-10 rounded-full px-4 text-sm",
        md: "h-11 rounded-full px-6 text-sm",
        lg: "h-12 rounded-full px-7 text-[15px]",
        xl: "h-14 rounded-full px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export { buttonVariants };
