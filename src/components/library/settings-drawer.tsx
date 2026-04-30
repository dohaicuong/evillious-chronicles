import { useState, type ReactElement, type ReactNode } from "react";
import { XIcon } from "@phosphor-icons/react";
import { Drawer } from "../primitives/drawer";
import { Button } from "../primitives/button";
import { IconButton } from "../primitives/icon-button";
import { Slider } from "../primitives/slider";
import {
  READER_BOUNDS,
  readerSettingsCssVars,
  useReaderSettings,
} from "../../lib/reader-settings";

const PREVIEW_TEXT = `The princess of Lucifenia, only fourteen years old, watched her kingdom turn to ruin while the servant who shared her face stood at her side.

"Now, kneel before me." Her voice was small, but Allen heard it as if it filled the throne room.`;

export function SettingsDrawer({ trigger }: { trigger: ReactElement }) {
  const [open, setOpen] = useState(false);
  const { settings, set, reset } = useReaderSettings();

  const cssVars = readerSettingsCssVars(settings);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Drawer.Trigger render={trigger} />
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Popup side="right" className="gap-0 p-0">
          <header className="flex items-center justify-between border-b border-border px-6 py-4">
            <Drawer.Title>Reader Settings</Drawer.Title>
            <IconButton
              variant="ghost"
              size="sm"
              aria-label="Close settings"
              onClick={() => setOpen(false)}
            >
              <XIcon weight="light" />
            </IconButton>
          </header>

          <div className="px-6 py-5 flex flex-col gap-6">
            <div style={cssVars} className="bg-surface border border-border rounded-sm p-4">
              <span className="block text-style-eyebrow text-fg-muted mb-2">Preview</span>
              <p className="text-style-reader-prose text-fg whitespace-pre-line">{PREVIEW_TEXT}</p>
            </div>

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

            <div className="border-t border-border pt-4 flex justify-end">
              <Button variant="outline" size="sm" onClick={reset}>
                Reset to defaults
              </Button>
            </div>
          </div>
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
