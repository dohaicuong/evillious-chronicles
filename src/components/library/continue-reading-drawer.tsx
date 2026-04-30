import { useState, type ReactElement } from "react";
import { Link } from "@tanstack/react-router";
import { XIcon } from "@phosphor-icons/react";
import { Drawer } from "@src/components/primitives/drawer";
import { IconButton } from "@src/components/primitives/icon-button";
import { Progress } from "@src/components/primitives/progress";
import { ScrollArea } from "@src/components/primitives/scroll-area";
import { useInProgressVolumes, type VolumeInProgress } from "@src/lib/progress";

export function ContinueReadingDrawer({ trigger }: { trigger: ReactElement }) {
  const [open, setOpen] = useState(false);
  const volumes = useInProgressVolumes();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Drawer.Trigger render={trigger} />
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Popup side="right" className="gap-0 p-0">
          <header className="flex items-center justify-between border-b border-border px-6 py-4">
            <Drawer.Title>Continue Reading</Drawer.Title>
            <IconButton
              variant="ghost"
              size="sm"
              aria-label="Close continue reading"
              onClick={() => setOpen(false)}
            >
              <XIcon weight="light" />
            </IconButton>
          </header>

          {volumes.length === 0 ? (
            <p className="px-6 py-6 text-style-body text-fg-muted italic">
              Nothing in progress yet. Open a chapter and your reading will show up here.
            </p>
          ) : (
            <ScrollArea className="flex-1">
              <ul className="flex flex-col px-6 py-2">
                {volumes.map((v) => (
                  <VolumeRow
                    key={`${v.seriesId}:${v.volumeId}`}
                    volume={v}
                    onNavigate={() => setOpen(false)}
                  />
                ))}
              </ul>
            </ScrollArea>
          )}
        </Drawer.Popup>
      </Drawer.Portal>
    </Drawer>
  );
}

function VolumeRow({ volume, onNavigate }: { volume: VolumeInProgress; onNavigate: () => void }) {
  return (
    <li data-sin={volume.sin ?? undefined} className="border-b border-border last:border-b-0 py-2">
      <Link
        to="/library/$seriesId/$volumeId/$chapterId"
        params={{
          seriesId: volume.seriesId,
          volumeId: volume.volumeId,
          chapterId: volume.resumeChapterId,
        }}
        hash={volume.resumePageNumber != null ? `page-${volume.resumePageNumber}` : undefined}
        onClick={onNavigate}
        className="flex flex-col gap-2 rounded-sm hover:bg-accent-soft -mx-2 px-2 py-2 transition-colors"
      >
        <div className="flex items-baseline justify-between gap-3">
          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            <span className="text-style-eyebrow text-fg-muted line-clamp-1">
              {volume.seriesTitle}
            </span>
            <span className="text-style-body text-fg line-clamp-1">{volume.volumeTitle}</span>
          </div>
          <span className="text-style-caption text-fg-muted shrink-0 tabular-nums">
            {volume.percent}%
          </span>
        </div>
        <Progress value={volume.percent} aria-label={`${volume.volumeTitle} progress`} />
      </Link>
    </li>
  );
}
