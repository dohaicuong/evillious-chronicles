import { Volume } from "./_shared";

/*
 * The Deadly Sins of Evil — Volume 4: Fifth Pierrot (悪ノ大罪 — 五番目のピエロ).
 *
 * Translation source: thefifthclown.tumblr.com (pricechecktranslations).
 * The translator's about page asks for "small usages...is okay, but large
 * amounts of the translation is not allowed" — keep page-level prose under
 * `public/fifth-pierrot/...` short-attributed and link out to the source
 * for full-chapter reads rather than mirroring the full text.
 *
 * Heavy metadata (cover, title page, description, translation) lives in
 * `public/fifth-pierrot/manifest.json`.
 */

export const fifthPierrot = Volume({
  id: "fifth-pierrot",
  slug: "fifth-pierrot",
  number: 4,

  title: "Fifth Pierrot",
  originalTitle: "五番目のピエロ",
  romanizedTitle: "Gobanme no Piero",

  sin: "pride",
  series: "deadly-sins-of-evil",

  chapter: [
    {
      id: "fp-prologue",
      number: 0,
      title: "Prologue",
      pages: "./fifth-pierrot/chapters/00-prologue",
    },
    {
      id: "fp-p1-ch1",
      number: 1,
      title: "Part 1 · Chapter 1 — Mother Becomes President",
      pages: "./fifth-pierrot/chapters/01-p1-ch1",
    },
    {
      id: "fp-p1-ch2",
      number: 2,
      title: "Part 1 · Chapter 2 — The First Murder",
      pages: "./fifth-pierrot/chapters/02-p1-ch2",
    },
    {
      id: "fp-p1-ch3",
      number: 3,
      title: 'Part 1 · Chapter 3 — Look For "Seventh, Magician"',
      pages: "./fifth-pierrot/chapters/03-p1-ch3",
    },
    {
      id: "fp-p1-ch4",
      number: 4,
      title: 'Part 1 · Chapter 4 — The New "Père Noël"',
      pages: "./fifth-pierrot/chapters/04-p1-ch4",
    },
    {
      id: "fp-p1-ch5",
      number: 5,
      title: "Part 1 · Chapter 5 — We Have a Traitor",
      pages: "./fifth-pierrot/chapters/05-p1-ch5",
    },
    {
      id: "fp-p1-ch6",
      number: 6,
      title: "Part 1 · Chapter 6 — That's Why I Told You To Escape",
      pages: "./fifth-pierrot/chapters/06-p1-ch6",
    },
    {
      id: "fp-p2-ch1",
      number: 7,
      title: "Part 2 · Chapter 1 — To Merrigod Plateau, and Sixth, Venom",
      pages: "./fifth-pierrot/chapters/07-p2-ch1",
    },
    {
      id: "fp-p2-ch2",
      number: 8,
      title: "Part 2 · Chapter 2 — Reunion and Confrontation, and the Demon of Wrath",
      pages: "./fifth-pierrot/chapters/08-p2-ch2",
    },
    {
      id: "fp-p2-ch3",
      number: 9,
      title: "Part 2 · Chapter 3 — Gods and Demons, and Her Last Moments",
      pages: "./fifth-pierrot/chapters/09-p2-ch3",
    },
    {
      id: "fp-p2-ch4",
      number: 10,
      title: 'Part 2 · Chapter 4 — The Hellish Yard, and "Ma"',
      pages: "./fifth-pierrot/chapters/10-p2-ch4",
    },
    {
      id: "fp-epilogue",
      number: 11,
      title: "Epilogue",
      pages: "./fifth-pierrot/chapters/11-epilogue",
    },
    {
      id: "fp-extra",
      number: 12,
      title: "Extra Chapter",
      pages: "./fifth-pierrot/chapters/12-extra",
    },
    {
      id: "fp-bonus",
      number: 13,
      title: "Bonus Story",
      pages: "./fifth-pierrot/chapters/13-bonus",
    },
  ],
  afterword: {
    id: "fp-afterword",
    number: 99,
    title: "Afterword",
    pages: "./fifth-pierrot/chapters/14-afterword",
  },
});
