import { createLazyFileRoute } from "@tanstack/react-router";
import {
  BookOpenIcon,
  BookmarkSimpleIcon,
  CaretLeftIcon,
  CaretRightIcon,
  GearIcon,
  HeadphonesIcon,
  HighlighterIcon,
  HourglassIcon,
  HouseIcon,
  ListIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  NoteIcon,
  NotePencilIcon,
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
  SunIcon,
  XIcon,
} from "@phosphor-icons/react";

export const Route = createLazyFileRoute("/components/icon")({
  component: IconPage,
});

const uiIcons = [
  { Icon: HouseIcon, name: "House" },
  { Icon: BookOpenIcon, name: "BookOpen" },
  { Icon: MagnifyingGlassIcon, name: "MagnifyingGlass" },
  { Icon: BookmarkSimpleIcon, name: "BookmarkSimple" },
  { Icon: NoteIcon, name: "Note" },
  { Icon: NotePencilIcon, name: "NotePencil" },
  { Icon: HighlighterIcon, name: "Highlighter" },
  { Icon: GearIcon, name: "Gear" },
  { Icon: HourglassIcon, name: "Hourglass" },
  { Icon: SunIcon, name: "Sun" },
  { Icon: MoonIcon, name: "Moon" },
  { Icon: HeadphonesIcon, name: "Headphones" },
  { Icon: PlayIcon, name: "Play" },
  { Icon: PauseIcon, name: "Pause" },
  { Icon: SkipBackIcon, name: "SkipBack" },
  { Icon: SkipForwardIcon, name: "SkipForward" },
  { Icon: ListIcon, name: "List" },
  { Icon: XIcon, name: "X" },
  { Icon: CaretLeftIcon, name: "CaretLeft" },
  { Icon: CaretRightIcon, name: "CaretRight" },
];

const weights = ["thin", "light", "regular", "bold", "fill", "duotone"] as const;

const sizes = [
  { px: 16, label: "16" },
  { px: 20, label: "20 (default)" },
  { px: 24, label: "24" },
  { px: 32, label: "32" },
  { px: 48, label: "48" },
];

const sins = ["pride", "lust", "sloth", "gluttony", "greed", "wrath", "envy", "origin"] as const;

function IconPage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Icon</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Phosphor Icons. App default is <code>weight="light"</code> + <code>size=20</code>, set via{" "}
          <code>IconContext.Provider</code> in <code>__root.tsx</code>. Override per-icon as needed.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Common UI Icons</h2>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
          {uiIcons.map(({ Icon, name }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 border border-border rounded-sm py-4 text-fg"
            >
              <Icon />
              <code className="text-style-caption text-fg-muted">{name}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Weights</h2>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          {weights.map((weight) => (
            <div
              key={weight}
              className="flex flex-col items-center gap-2 border border-border rounded-sm py-4 text-fg"
            >
              <BookmarkSimpleIcon size={32} weight={weight} />
              <code className="text-style-caption text-fg-muted">{weight}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Sizes</h2>
        <div className="flex flex-wrap items-end gap-6 border border-border rounded-sm p-6 text-fg">
          {sizes.map(({ px, label }) => (
            <div key={px} className="flex flex-col items-center gap-2">
              <HourglassIcon size={px} />
              <code className="text-style-caption text-fg-muted">{label}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Sin Tinting (text-accent)</h2>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-7">
          {sins.map((sin) => (
            <div
              key={sin}
              data-sin={sin}
              className="flex flex-col items-center gap-2 border border-border rounded-sm py-4 text-accent"
            >
              <BookmarkSimpleIcon size={28} weight="fill" />
              <code className="text-style-caption text-fg-muted capitalize">{sin}</code>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
