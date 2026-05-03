import type { ReactNode } from "react";
import { XIcon } from "@phosphor-icons/react";
import { Drawer } from "@src/components/primitives/drawer";
import { Button } from "@src/components/primitives/button";
import { IconButton } from "@src/components/primitives/icon-button";
import { ScrollArea } from "@src/components/primitives/scroll-area";
import { Slider } from "@src/components/primitives/slider";
import { Switch } from "@src/components/primitives/switch";
import {
  FONT_FAMILY_OPTIONS,
  READER_BOUNDS,
  readerSettingsCssVars,
  useReaderSettings,
} from "@src/lib/reader-settings";
import { cn } from "@src/lib/cn";

const PREVIEW_TEXT = `The princess of Lucifenia, only fourteen years old, watched her kingdom turn to ruin while the servant who shared her face stood at her side.

"Now, kneel before me." Her voice was small, but Allen heard it as if it filled the throne room.`;

export function SettingsDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { settings, set, reset } = useReaderSettings();

  const cssVars = readerSettingsCssVars(settings);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Popup side="right" className="gap-0 p-0">
          <header className="flex items-center justify-between border-b border-border px-6 py-4">
            <Drawer.Title>Reader Settings</Drawer.Title>
            <IconButton
              variant="ghost"
              size="sm"
              aria-label="Close settings"
              onClick={() => onOpenChange(false)}
            >
              <XIcon weight="light" />
            </IconButton>
          </header>

          <ScrollArea className="flex-1">
            <div className="px-6 py-5 flex flex-col gap-6">
              <div style={cssVars} className="bg-surface border border-border rounded-sm p-4">
                <span className="block text-style-eyebrow text-fg-muted mb-2">Preview</span>
                <p className="text-style-reader-prose text-fg whitespace-pre-line">
                  {PREVIEW_TEXT}
                </p>
              </div>

              <SettingRow label="Font" value={settings.fontFamily === "serif" ? "Serif" : "Sans"}>
                <div
                  role="radiogroup"
                  aria-label="Reader font family"
                  className="flex items-stretch gap-1 rounded-sm border border-border p-1"
                >
                  {FONT_FAMILY_OPTIONS.map((opt) => {
                    const active = settings.fontFamily === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => set("fontFamily", opt.value)}
                        style={{ fontFamily: opt.cssVar }}
                        className={cn(
                          "flex-1 rounded-sm px-3 py-1.5 text-style-body transition-colors",
                          "focus:outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
                          active
                            ? "bg-accent-soft text-fg"
                            : "text-fg-muted hover:bg-accent-soft/50 hover:text-fg",
                        )}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </SettingRow>

              <SettingRow label="Font size" value={`${settings.fontSize}px`}>
                <Slider
                  aria-label="Font size"
                  value={settings.fontSize}
                  onValueChange={(v) => set("fontSize", v as number)}
                  min={READER_BOUNDS.fontSize.min}
                  max={READER_BOUNDS.fontSize.max}
                  step={READER_BOUNDS.fontSize.step}
                />
              </SettingRow>

              <SettingRow label="Line height" value={settings.lineHeight.toFixed(2)}>
                <Slider
                  aria-label="Line height"
                  value={settings.lineHeight}
                  onValueChange={(v) => set("lineHeight", v as number)}
                  min={READER_BOUNDS.lineHeight.min}
                  max={READER_BOUNDS.lineHeight.max}
                  step={READER_BOUNDS.lineHeight.step}
                />
              </SettingRow>

              <SettingRow label="Reader width" value={`${settings.readerWidth}rem`}>
                <Slider
                  aria-label="Reader width"
                  value={settings.readerWidth}
                  onValueChange={(v) => set("readerWidth", v as number)}
                  min={READER_BOUNDS.readerWidth.min}
                  max={READER_BOUNDS.readerWidth.max}
                  step={READER_BOUNDS.readerWidth.step}
                />
              </SettingRow>

              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-style-body text-fg">Justify text</span>
                  <span className="text-style-caption text-fg-muted">
                    Justified alignment with auto hyphenation.
                  </span>
                </div>
                <Switch
                  aria-label="Justify text"
                  checked={settings.justify}
                  onCheckedChange={(checked) => set("justify", checked)}
                />
              </div>

              <div className="border-t border-border pt-4 flex justify-end">
                <Button variant="outline" size="sm" onClick={reset}>
                  Reset to defaults
                </Button>
              </div>
            </div>
          </ScrollArea>
        </Drawer.Popup>
      </Drawer.Portal>
    </Drawer>
  );
}

function SettingRow({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <span className="text-style-body text-fg">{label}</span>
        <span className="text-style-caption text-fg-muted tabular-nums">{value}</span>
      </div>
      {children}
    </div>
  );
}
