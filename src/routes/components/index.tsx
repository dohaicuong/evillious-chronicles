import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/components/")({
  component: ComponentsOverview,
});

const components = [
  {
    to: "/components/typography",
    name: "Typography",
    description: "10 type styles — display, headings, body, lead, quote, caption, eyebrow.",
  },
  {
    to: "/components/icon",
    name: "Icon",
    description:
      "Phosphor Icons in 6 weights. Light is the default, paired with the antique typography.",
  },
  {
    to: "/components/button",
    name: "Button",
    description: "Primary, secondary, outline, and ghost variants. Themes per sin.",
  },
  {
    to: "/components/icon-button",
    name: "Icon Button",
    description: "Icon-only square sibling of Button. Same variants, required aria-label.",
  },
  {
    to: "/components/badge",
    name: "Badge",
    description: "Small pill for sin tags, status, metadata. Solid, soft, outline variants.",
  },
  {
    to: "/components/card",
    name: "Card",
    description: "Surface container with header, body, footer. Flat or interactive.",
  },
  {
    to: "/components/input",
    name: "Input",
    description: "Text field with optional left/right icon. Sizes, invalid, disabled states.",
  },
  {
    to: "/components/dialog",
    name: "Dialog",
    description: "Centered modal for confirms and alerts. Backdrop, fade-and-scale entry.",
  },
  {
    to: "/components/drawer",
    name: "Drawer",
    description: "Side panel from left or right. For settings, bookmarks, notes.",
  },
  {
    to: "/components/menu",
    name: "Menu",
    description: "Dropdown menu with items, groups, separators. Keyboard navigable.",
  },
  {
    to: "/components/tabs",
    name: "Tabs",
    description: "Switch between panels. Animated indicator follows the active tab.",
  },
  {
    to: "/components/tooltip",
    name: "Tooltip",
    description: "Hover hint for icon-only controls. Court-dark popup on parchment.",
  },
  {
    to: "/components/toast",
    name: "Toast",
    description: "Transient notifications. Info, success, error variants with action.",
  },
  {
    to: "/components/slider",
    name: "Slider",
    description: "Single-thumb range input. For font size and audio scrubbing.",
  },
  {
    to: "/components/switch",
    name: "Switch",
    description: "Toggle for binary preferences. Track fills with sin accent when on.",
  },
  {
    to: "/components/progress",
    name: "Progress",
    description: "Linear progress bar. Determinate and indeterminate. Three sizes.",
  },
  {
    to: "/components/skeleton",
    name: "Skeleton",
    description: "Loading placeholder. Rect, text (multi-line), and circle variants.",
  },
  {
    to: "/components/scroll-area",
    name: "Scroll Area",
    description: "Themed scrollbars that auto-reveal on hover or while scrolling. Both axes.",
  },
] as const;

function ComponentsOverview() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Component Library</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Building blocks for the Evillious reader
        </p>
      </header>

      <section className="flex flex-col gap-2">
        <h2 className="text-style-eyebrow text-fg-muted mb-2">Catalog</h2>
        {components.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="group flex flex-col gap-1 border-t border-border py-5 hover:bg-accent-soft transition-colors -mx-3 px-3"
          >
            <span className="text-style-heading-3 text-fg group-hover:text-accent transition-colors">
              {c.name}
            </span>
            <span className="text-style-caption text-fg-muted">{c.description}</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
