import { Volume } from "./_shared";

/*
 * The Deadly Sins of Evil — Volume 6: Judgment of Corruption
 * (悪ノ大罪 — 悪徳のジャッジメント).
 *
 * Translation source: judgmentofcorruption.tumblr.com (pricechecktranslations).
 * The translator's about page asks that the translation NOT be redistributed
 * (no reupload, no PDF dump, no audio readings) and notes it will be removed
 * if an official English release lands or the rightsholder asks. Keep the
 * page-level prose under `public/judgment/...` short-attributed and prefer
 * linking to the source for full-chapter reads.
 *
 * Heavy metadata (cover, title page, description, translation) lives in
 * `public/judgment/manifest.json`.
 */

export const judgment = Volume({
  id: "judgment",
  slug: "judgment",
  number: 6,

  title: "Judgment of Corruption",
  originalTitle: "悪徳のジャッジメント",
  romanizedTitle: "Akutoku no Jajjimento",

  sin: "greed",
  series: "deadly-sins-of-evil",

  chapter: [
    {
      id: "jc-prologue",
      number: 0,
      title: "Prologue",
      pages: "./judgment/chapters/00-prologue",
    },
    {
      id: "jc-ch1",
      number: 1,
      title: "Chapter 1 — The Boy Embraces His Ambition",
      pages: "./judgment/chapters/01-ch1",
    },
    {
      id: "jc-ch2",
      number: 2,
      title: "Chapter 2 — Encounter with the Screenwriter",
      pages: "./judgment/chapters/02-ch2",
    },
    {
      id: "jc-ch3",
      number: 3,
      title: "Chapter 3 — He Dies in the Snow Field",
      pages: "./judgment/chapters/03-ch3",
    },
    {
      id: "jc-ch4",
      number: 4,
      title: "Chapter 4 — Farewell My Friend",
      pages: "./judgment/chapters/04-ch4",
    },
    {
      id: "jc-ch5",
      number: 5,
      title: "Chapter 5 — The Relationship Chills",
      pages: "./judgment/chapters/05-ch5",
    },
    {
      id: "jc-ch6",
      number: 6,
      title: "Chapter 6 — The Sinking Story",
      pages: "./judgment/chapters/06-ch6",
    },
    {
      id: "jc-ch7",
      number: 7,
      title: "Chapter 7 — Your Daughter is There",
      pages: "./judgment/chapters/07-ch7",
    },
    {
      id: "jc-ch8",
      number: 8,
      title: "Chapter 8 — Sweet Seduction",
      pages: "./judgment/chapters/08-ch8",
    },
    {
      id: "jc-ch9",
      number: 9,
      title: "Chapter 9 — House of the Undead",
      pages: "./judgment/chapters/09-ch9",
    },
    {
      id: "jc-ch10",
      number: 10,
      title: "Chapter 10 — The Court Ends",
      pages: "./judgment/chapters/10-ch10",
    },
    {
      id: "jc-zero",
      number: 11,
      title: "Chapter 11 — ZERO",
      pages: "./judgment/chapters/11-zero",
    },
  ],
  afterword: {
    id: "jc-afterword",
    number: 99,
    title: "Afterword",
    pages: "./judgment/chapters/12-afterword",
  },
});
