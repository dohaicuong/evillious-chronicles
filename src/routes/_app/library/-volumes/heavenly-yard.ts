import { Volume } from "./_shared";

/*
 * The Deadly Sins of Evil — Volume 8: Master of the Heavenly Yard
 * (悪ノ大罪 — マスター・オブ・ザ・ヘヴンリー・ヤード). The finale.
 *
 * Translation source: dsoe-masteroftheheavenlyyard.tumblr.com
 * (pricechecktranslations). Translator's about page prohibits redistribution
 * (no reupload, no PDF dump, no audio readings, no secondary translations)
 * and notes the work will be removed on official-release or rightsholder
 * request. Keep page-level prose under `public/heavenly-yard/...` short-
 * attributed; prefer linking to the source for full-chapter reads.
 *
 * Section ordering quirk: mothy frames the finale as an inversion. The
 * book *opens* with what is named "Epilogue" (mapped here to the framing
 * Prologue slot, index 0) and *closes* with what is named "Prologue"
 * (mapped here as Chapter 11). The 11 numbered chapters are the source's
 * sections 2–12 in reading order; the rendered titles preserve the source
 * names so the deliberate inversion stays visible.
 *
 * Heavy metadata (cover, title page, description, translation) lives in
 * `public/heavenly-yard/manifest.json`.
 */

export const heavenlyYard = Volume({
  id: "heavenly-yard",
  slug: "heavenly-yard",
  number: 8,

  title: "Master of the Heavenly Yard",
  originalTitle: "マスター・オブ・ザ・ヘヴンリー・ヤード",

  sin: "pride",
  series: "deadly-sins-of-evil",

  chapter: [
    {
      id: "hy-epilogue",
      number: 0,
      title: "Epilogue",
      pages: "./heavenly-yard/chapters/00-epilogue",
    },
    {
      id: "hy-ch1",
      number: 1,
      title: "Chapter 1 — Hunt for the Deadly Sins",
      pages: "./heavenly-yard/chapters/01-ch1",
    },
    {
      id: "hy-ch2",
      number: 2,
      title: "Chapter 2 — The Princess Sets Out",
      pages: "./heavenly-yard/chapters/02-ch2",
    },
    {
      id: "hy-ch3",
      number: 3,
      title: "Chapter 3 — The Heroes",
      pages: "./heavenly-yard/chapters/03-ch3",
    },
    {
      id: "hy-ch4",
      number: 4,
      title: "Chapter 4 — BLACKBOX",
      pages: "./heavenly-yard/chapters/04-ch4",
    },
    {
      id: "hy-ch5",
      number: 5,
      title: "Chapter 5 — Not Eve",
      pages: "./heavenly-yard/chapters/05-ch5",
    },
    {
      id: "hy-ch6",
      number: 6,
      title: "Chapter 6 — End of the Capriccio",
      pages: "./heavenly-yard/chapters/06-ch6",
    },
    {
      id: "hy-ch7",
      number: 7,
      title: "Chapter 7 — Reunion",
      pages: "./heavenly-yard/chapters/07-ch7",
    },
    {
      id: "hy-ch8",
      number: 8,
      title: "Chapter 8 — The Pure Evil",
      pages: "./heavenly-yard/chapters/08-ch8",
    },
    {
      id: "hy-ch9",
      number: 9,
      title: "Chapter 9 — The Boy's Choice",
      pages: "./heavenly-yard/chapters/09-ch9",
    },
    {
      id: "hy-ch10",
      number: 10,
      title: "Chapter 10 — Re_Birthday Truth",
      pages: "./heavenly-yard/chapters/10-ch10",
    },
    {
      id: "hy-ch11",
      number: 11,
      title: "Chapter 11 — Prologue",
      pages: "./heavenly-yard/chapters/11-ch11",
    },
  ],
  afterword: {
    id: "hy-afterword",
    number: 99,
    title: "Afterword",
    pages: "./heavenly-yard/chapters/12-afterword",
  },
});
