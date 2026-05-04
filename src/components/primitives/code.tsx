import type { ComponentProps } from "react";
import { cn } from "@src/lib/cn";

type CodeProps = ComponentProps<"code"> & {
  // Render as a multi-line block (wrapped in <pre>) instead of inline.
  block?: boolean;
};

const inlineCls = [
  "font-mono text-[0.875em] leading-tight",
  "rounded-sm border border-border bg-surface",
  "px-1.5 py-0.5",
  "text-fg",
].join(" ");

const blockCls = [
  "font-mono text-sm leading-relaxed",
  "rounded-sm border border-border bg-surface",
  "p-4 overflow-x-auto",
  "text-fg",
].join(" ");

export function Code({ block, className, children, ...props }: CodeProps) {
  if (block) {
    return (
      <pre className={cn(blockCls, className)}>
        <code {...props}>{children}</code>
      </pre>
    );
  }
  return (
    <code className={cn(inlineCls, className)} {...props}>
      {children}
    </code>
  );
}
