import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { ComponentProps } from "react";
import { cn } from "@src/lib/cn";

const Root = BaseTabs.Root;

function List({ className, ...props }: ComponentProps<typeof BaseTabs.List>) {
  return (
    <BaseTabs.List
      className={cn("relative flex flex-row border-b border-border", className)}
      {...props}
    />
  );
}

function Tab({ className, ...props }: ComponentProps<typeof BaseTabs.Tab>) {
  return (
    <BaseTabs.Tab
      className={cn(
        "text-style-eyebrow",
        "px-4 py-3",
        "cursor-pointer select-none",
        "text-fg-muted hover:text-fg",
        "transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/30 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "data-[selected]:text-accent",
        "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}

function Indicator({ className, ...props }: ComponentProps<typeof BaseTabs.Indicator>) {
  return (
    <BaseTabs.Indicator
      className={cn(
        "absolute bottom-0 h-0.5 bg-accent",
        "transition-all duration-200",
        "left-(--active-tab-left) w-(--active-tab-width)",
        className,
      )}
      {...props}
    />
  );
}

function Panel({ className, ...props }: ComponentProps<typeof BaseTabs.Panel>) {
  return <BaseTabs.Panel className={cn("pt-6 focus-visible:outline-none", className)} {...props} />;
}

export const Tabs = Object.assign(Root, {
  List,
  Tab,
  Indicator,
  Panel,
});
