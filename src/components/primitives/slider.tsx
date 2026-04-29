import { Slider as BaseSlider } from "@base-ui/react/slider";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

type SliderProps = ComponentProps<typeof BaseSlider.Root<number>>;

const root = "relative flex w-full touch-none select-none items-center h-6";

const control = "relative flex w-full items-center h-6";

const track = ["relative h-1.5 w-full overflow-hidden rounded-full", "bg-border"].join(" ");

const indicator = "absolute h-full rounded-full bg-accent";

const thumb = [
  "block h-4 w-4 rounded-full bg-bg",
  "border-2 border-accent",
  "transition-[transform,box-shadow] duration-150 ease-out",
  "cursor-grab",
  "hover:scale-110",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/30 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
  "data-[dragging]:cursor-grabbing data-[dragging]:scale-110",
  "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
].join(" ");

export function Slider({ className, "aria-label": ariaLabel, ...props }: SliderProps) {
  return (
    <BaseSlider.Root className={cn(root, className)} {...props}>
      <BaseSlider.Control className={control}>
        <BaseSlider.Track className={track}>
          <BaseSlider.Indicator className={indicator} />
        </BaseSlider.Track>
        <BaseSlider.Thumb
          className={thumb}
          getAriaLabel={ariaLabel ? () => ariaLabel : undefined}
        />
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
