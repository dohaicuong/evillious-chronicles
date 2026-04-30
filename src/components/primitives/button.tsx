import { Button as BaseButton } from "@base-ui/react/button";
import type { ComponentProps } from "react";
import { cn } from "@src/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = ComponentProps<typeof BaseButton> & {
  variant?: Variant;
  size?: Size;
};

const base = [
  "inline-flex items-center justify-center gap-2",
  "font-display tracking-[0.15em]",
  "transition-colors duration-150",
  "cursor-pointer select-none",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/30 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
  "disabled:opacity-50 disabled:cursor-not-allowed",
  "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
].join(" ");

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-fg hover:bg-accent-hover active:bg-accent-active",
  secondary: "border border-accent text-accent hover:bg-accent-soft active:bg-accent-soft",
  outline: "border border-accent text-accent-strong hover:bg-accent-soft active:bg-accent-soft",
  ghost: "text-fg hover:bg-surface active:bg-surface",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-4 text-sm rounded-sm",
  md: "h-10 px-7 text-base rounded-sm",
  lg: "h-12 px-10 text-lg rounded-sm",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  render,
  nativeButton,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      render={render}
      nativeButton={nativeButton ?? !render}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
