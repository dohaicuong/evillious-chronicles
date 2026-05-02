import { Switch as BaseSwitch } from "@base-ui/react/switch";
import type { ComponentProps } from "react";
import { cn } from "@src/lib/cn";

type SwitchProps = ComponentProps<typeof BaseSwitch.Root>;

const root = [
  "relative inline-flex h-[22px] w-[40px] shrink-0 items-center rounded-full",
  "border border-border bg-surface",
  "transition-colors duration-150",
  "cursor-pointer",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
  "data-[checked]:border-accent data-[checked]:bg-accent",
  "disabled:opacity-50 disabled:cursor-not-allowed",
  "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
].join(" ");

const thumb = [
  "block h-[16px] w-[16px] rounded-full bg-bg shadow-sm",
  "transition-transform duration-150 ease-out",
  "translate-x-[3px] data-[checked]:translate-x-[21px]",
].join(" ");

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root className={cn(root, className)} {...props}>
      <BaseSwitch.Thumb className={thumb} />
    </BaseSwitch.Root>
  );
}
