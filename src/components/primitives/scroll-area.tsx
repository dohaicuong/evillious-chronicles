import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import type { ComponentProps, ReactNode, Ref } from "react";
import { cn } from "../../lib/cn";

type ScrollAreaProps = ComponentProps<typeof BaseScrollArea.Root> & {
  children?: ReactNode;
  viewportClassName?: string;
  viewportRef?: Ref<HTMLDivElement>;
};

const scrollbarBase = [
  "flex touch-none select-none p-0.5",
  "transition-opacity duration-200 ease-out",
  "opacity-0",
  "data-[hovering]:opacity-100 data-[scrolling]:opacity-100",
  "data-[orientation=vertical]:w-2",
  "data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:flex-col",
].join(" ");

const thumbBase = "flex-1 rounded-full bg-border hover:bg-fg-muted transition-colors";

export function ScrollArea({
  className,
  children,
  viewportClassName,
  viewportRef,
  ...props
}: ScrollAreaProps) {
  return (
    <BaseScrollArea.Root className={cn("relative overflow-hidden", className)} {...props}>
      <BaseScrollArea.Viewport
        ref={viewportRef}
        className={cn("h-full w-full overscroll-contain outline-none", viewportClassName)}
      >
        <BaseScrollArea.Content>{children}</BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      <BaseScrollArea.Scrollbar orientation="vertical" className={scrollbarBase}>
        <BaseScrollArea.Thumb className={thumbBase} />
      </BaseScrollArea.Scrollbar>
      <BaseScrollArea.Scrollbar orientation="horizontal" className={scrollbarBase}>
        <BaseScrollArea.Thumb className={thumbBase} />
      </BaseScrollArea.Scrollbar>
      <BaseScrollArea.Corner className="bg-bg" />
    </BaseScrollArea.Root>
  );
}
