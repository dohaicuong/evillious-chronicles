import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { CaretLeftIcon } from "@phosphor-icons/react";
import { series } from "../../../../../data/library";
import { getVolume } from "../../../../../data/volumes";
import { ChapterList } from "../../../../../components/library/chapter-list";
import { Badge } from "../../../../../components/primitives/badge";
import { Progress } from "../../../../../components/primitives/progress";
import { VolumeHero } from "../../../../../components/volume/volume-hero";
import { TitlePageSection } from "../../../../../components/volume/title-page-section";
import { PoetrySection } from "../../../../../components/volume/poetry-section";
import { GallerySection } from "../../../../../components/volume/gallery-section";
import { Ornament } from "../../../../../components/thematic/ornament";
import { IconButton } from "../../../../../components/primitives/icon-button";
import { Menu } from "../../../../../components/primitives/menu";
import { DotsThreeVerticalIcon } from "@phosphor-icons/react";
import {
  markVolumeComplete,
  resetVolumeProgress,
  useVolumeProgress,
} from "../../../../../lib/progress";
import type { Chapter } from "../../../../../data/library";

export const Route = createFileRoute("/_app/library/$seriesId/$volumeId/")({
  component: VolumePage,
  loader: async ({ params }) => {
    const s = series.find((x) => x.id === params.seriesId);
    const slim = s?.volumes.find((x) => x.id === params.volumeId);
    if (!s || !slim) throw notFound();
    const full = await getVolume(params.volumeId);
    return { series: s, slim, full };
  },
});

function VolumePage() {
  const { series: s, slim, full } = Route.useLoaderData();

  const { totalPages, percent: overall } = useVolumeProgress(slim.chapters);

  return (
    <div data-sin={slim.sin ?? undefined} className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
      <Link
        to="/library/$seriesId"
        params={{ seriesId: s.id }}
        className="inline-flex items-center gap-1 text-style-eyebrow text-fg-muted hover:text-fg transition-colors mb-8"
      >
        <CaretLeftIcon size={14} />
        {s.title}
      </Link>

      {full ? (
        <VolumeHero volume={full} />
      ) : (
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-style-eyebrow text-fg-muted">Volume {slim.number}</span>
            {slim.sin ? (
              <Badge variant="soft" size="sm" className="capitalize">
                {slim.sin}
              </Badge>
            ) : null}
          </div>
          <h1 className="text-style-display text-fg">{slim.title}</h1>
        </header>
      )}

      <div className="mt-12 flex flex-col gap-12">
        <section className="flex flex-col gap-4">
          <h2 className="text-style-eyebrow text-fg-muted">Chapters</h2>
          <div className="flex flex-col gap-3 max-w-md">
            <div className="flex items-center justify-between text-style-caption text-fg-muted">
              <span>
                {slim.chapters.length} chapter{slim.chapters.length !== 1 ? "s" : ""} · {totalPages}{" "}
                pages
              </span>
              <div className="flex items-center gap-1">
                <span>{overall}%</span>
                <VolumeProgressMenu chapters={slim.chapters} percent={overall} />
              </div>
            </div>
            <Progress value={overall} aria-label={`${slim.title} reading progress`} />
          </div>
          <ChapterList seriesId={s.id} volumeId={slim.id} chapters={slim.chapters} />
        </section>

        {full?.openingPoetry ? (
          <>
            <Ornament />
            <PoetrySection poetry={full.openingPoetry} />
          </>
        ) : null}

        {full?.openingGallery && full.openingGallery.length > 0 ? (
          <>
            <Ornament />
            <GallerySection gallery={full.openingGallery} label="Opening Gallery" />
          </>
        ) : null}

        {full ? (
          <>
            <Ornament />
            <TitlePageSection volume={full} />
          </>
        ) : null}
      </div>
    </div>
  );
}

function VolumeProgressMenu({ chapters, percent }: { chapters: Chapter[]; percent: number }) {
  return (
    <Menu>
      <Menu.Trigger
        render={
          <IconButton size="sm" variant="ghost" aria-label="Volume progress actions">
            <DotsThreeVerticalIcon weight="bold" />
          </IconButton>
        }
      />
      <Menu.Portal>
        <Menu.Positioner align="end">
          <Menu.Popup>
            <Menu.Item
              disabled={percent === 100}
              onClick={() => void markVolumeComplete(chapters)}
            >
              Mark all complete
            </Menu.Item>
            <Menu.Item
              disabled={percent === 0}
              onClick={() => void resetVolumeProgress(chapters.map((c) => c.id))}
            >
              Reset all progress
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu>
  );
}
