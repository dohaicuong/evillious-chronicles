import { Volume } from "./_shared";

/*
 * The Deadly Sins of Evil — Volume 7: The Muzzle of Nemesis
 * (悪ノ大罪 — ネメシスの銃口).
 *
 * Translation source: themuzzleofnemesis.tumblr.com (pricechecktranslations).
 * Translator's about page prohibits redistribution (no reupload, no PDF
 * dump, no audio readings, no secondary translations) and notes the work
 * will be removed on official-release or rightsholder request. Keep page-
 * level prose under `public/nemesis/...` short-attributed and prefer
 * linking out to the source for full-chapter reads.
 *
 * Heavy metadata (cover, title page, description, translation) lives in
 * `public/nemesis/manifest.json`.
 */

export const nemesis = Volume({
  id: "nemesis",
  slug: "nemesis",
  number: 7,

  title: "The Muzzle of Nemesis",
  originalTitle: "ネメシスの銃口",
  romanizedTitle: "Nemeshisu no Jūkō",

  sin: "wrath",
  series: "deadly-sins-of-evil",

  chapter: [
    {
      id: "mn-prologue",
      number: 0,
      title: "Prologue — The Intruders",
      pages: "./nemesis/chapters/00-prologue",
    },
    {
      id: "mn-ch1",
      number: 1,
      title: "Chapter 1 — Memory of Settling the Score",
      pages: "./nemesis/chapters/01-ch1",
    },
    {
      id: "mn-ch2",
      number: 2,
      title: "Chapter 2 — Memory of the Forest",
      pages: "./nemesis/chapters/02-ch2",
    },
    {
      id: "mn-ch3",
      number: 3,
      title: "Chapter 3 — Memory of the Four Seasons",
      pages: "./nemesis/chapters/03-ch3",
    },
    {
      id: "mn-ch4",
      number: 4,
      title: "Chapter 4 — Memory of the Battlefield",
      pages: "./nemesis/chapters/04-ch4",
    },
    {
      id: "mn-ch5",
      number: 5,
      title: "Chapter 5 — Memory of Flames",
      pages: "./nemesis/chapters/05-ch5",
    },
    {
      id: "mn-ch6",
      number: 6,
      title: "Chapter 6 — Memory of Mother",
      pages: "./nemesis/chapters/06-ch6",
    },
    {
      id: "mn-ch7",
      number: 7,
      title: "Chapter 7 — Memory of the God",
      pages: "./nemesis/chapters/07-ch7",
    },
    {
      id: "mn-lost-memory",
      number: 8,
      title: "Lost Memory",
      pages: "./nemesis/chapters/08-lost-memory",
    },
    {
      id: "mn-docs",
      number: 9,
      title: "Documents of Evil",
      pages: "./nemesis/chapters/09-documents",
    },
  ],
  afterword: {
    id: "mn-afterword",
    number: 99,
    title: "Afterword",
    pages: "./nemesis/chapters/10-afterword",
  },
});
