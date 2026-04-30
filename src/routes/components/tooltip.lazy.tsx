import { createLazyFileRoute } from "@tanstack/react-router";
import {
  BookmarkSimpleIcon,
  GearIcon,
  InfoIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
  XIcon,
} from "@phosphor-icons/react";
import { IconButton } from "@src/components/primitives/icon-button";
import { Tooltip } from "@src/components/primitives/tooltip";

export const Route = createLazyFileRoute("/components/tooltip")({
  component: TooltipPage,
});

function TooltipPage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Tooltip</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Hover hints for icon-only controls. Dark chrome floats above the parchment.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Icon hints</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Tooltip>
            <Tooltip.Trigger
              render={
                <IconButton variant="ghost" aria-label="Bookmark page">
                  <BookmarkSimpleIcon weight="light" />
                </IconButton>
              }
            />
            <Tooltip.Portal>
              <Tooltip.Positioner sideOffset={6}>
                <Tooltip.Popup>
                  Bookmark page
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip>

          <Tooltip>
            <Tooltip.Trigger
              render={
                <IconButton variant="ghost" aria-label="Search">
                  <MagnifyingGlassIcon weight="light" />
                </IconButton>
              }
            />
            <Tooltip.Portal>
              <Tooltip.Positioner sideOffset={6}>
                <Tooltip.Popup>
                  Search
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip>

          <Tooltip>
            <Tooltip.Trigger
              render={
                <IconButton variant="ghost" aria-label="Settings">
                  <GearIcon weight="light" />
                </IconButton>
              }
            />
            <Tooltip.Portal>
              <Tooltip.Positioner sideOffset={6}>
                <Tooltip.Popup>
                  Settings
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Placements</h2>
        <div className="flex flex-wrap items-center gap-12 px-12 py-12">
          <Tooltip>
            <Tooltip.Trigger
              render={
                <IconButton variant="secondary" aria-label="Tooltip on top">
                  <SunIcon weight="light" />
                </IconButton>
              }
            />
            <Tooltip.Portal>
              <Tooltip.Positioner side="top" sideOffset={6}>
                <Tooltip.Popup>
                  Top
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip>

          <Tooltip>
            <Tooltip.Trigger
              render={
                <IconButton variant="secondary" aria-label="Tooltip on right">
                  <MoonIcon weight="light" />
                </IconButton>
              }
            />
            <Tooltip.Portal>
              <Tooltip.Positioner side="right" sideOffset={6}>
                <Tooltip.Popup>
                  Right
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip>

          <Tooltip>
            <Tooltip.Trigger
              render={
                <IconButton variant="secondary" aria-label="Tooltip on bottom">
                  <XIcon weight="light" />
                </IconButton>
              }
            />
            <Tooltip.Portal>
              <Tooltip.Positioner side="bottom" sideOffset={6}>
                <Tooltip.Popup>
                  Bottom
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip>

          <Tooltip>
            <Tooltip.Trigger
              render={
                <IconButton variant="secondary" aria-label="Tooltip on left">
                  <InfoIcon weight="light" />
                </IconButton>
              }
            />
            <Tooltip.Portal>
              <Tooltip.Positioner side="left" sideOffset={6}>
                <Tooltip.Popup>
                  Left
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Long description</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Tooltip>
            <Tooltip.Trigger
              render={
                <IconButton variant="ghost" aria-label="What is the Master of the Court?">
                  <InfoIcon weight="light" />
                </IconButton>
              }
            />
            <Tooltip.Portal>
              <Tooltip.Positioner sideOffset={6}>
                <Tooltip.Popup>
                  The Master of the Court presides over the seven sins, weighing each soul against
                  the chronicle of their deeds.
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip>
        </div>
      </section>
    </div>
  );
}
