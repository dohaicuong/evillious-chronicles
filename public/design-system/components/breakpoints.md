# Breakpoints

Tailwind's default min-width breakpoints. Mobile-first — utilities apply at and above the named width. The reader is designed phone-first, so most layouts only need `sm:` or `md:` overrides.

## Reference

```tsx preview
() => {
  const breakpoints = [
    { name: "sm", min: "640px", note: "small phones in landscape, large phones in portrait" },
    { name: "md", min: "768px", note: "tablets in portrait, narrow laptops" },
    { name: "lg", min: "1024px", note: "tablets in landscape, standard laptops" },
    { name: "xl", min: "1280px", note: "wide laptops, smaller desktops" },
    { name: "2xl", min: "1536px", note: "large desktops" },
  ];
  return (
    <div className="flex flex-col w-full">
      {breakpoints.map((bp) => (
        <div
          key={bp.name}
          className="grid grid-cols-[4rem_6rem_1fr] items-baseline gap-4 border-t border-border py-3"
        >
          <code className="text-style-heading-3 text-fg">{bp.name}</code>
          <code className="text-style-body text-fg-muted tabular-nums">{`≥ ${bp.min}`}</code>
          <span className="text-style-caption text-fg-muted">{bp.note}</span>
        </div>
      ))}
    </div>
  );
};
```

## Usage

Prefix any utility with the breakpoint name to apply it from that width up — e.g. `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`. Stack from smallest to largest; later breakpoints override earlier ones.

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">…</div>
```

Avoid `max-*` reverse breakpoints unless a layout truly needs phone-only treatment — they fight the mobile-first cascade and tend to leave one viewport size with no rules at all when later edits change the source order.
