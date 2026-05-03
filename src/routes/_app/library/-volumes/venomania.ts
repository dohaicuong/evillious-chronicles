import { Volume } from "./_shared";

/*
 * The Lunacy of Duke Venomania (悪ノ大罪 — 毒/ヴェノマニア公爵の狂気)
 *
 * Translation source: pokkoo-shuu.tumblr.com (prologue + chapter 1) and
 * lunacy-of-venomania.tumblr.com (chapters 2–4). Translation is incomplete:
 * the fan release stops at Chapter 4 Part 5 — Chapter 4 Part 6 (and any
 * subsequent epilogue / afterword) were never published in English by this
 * translator.
 *
 * Heavy metadata (cover, gallery, title page, illustrations, description,
 * translation) lives in `public/venomania/manifest.json` and is fetched
 * lazily when the volume detail page or reader mounts. The slim shape below
 * stays in the bundle so search and continue-reading resolve synchronously.
 */

export const venomania = Volume({
  id: "venomania",
  slug: "venomania",
  number: 1,

  title: "The Lunacy of Duke Venomania",
  originalTitle: "ヴェノマニア公爵の狂気",
  romanizedTitle: "Venomania-kō no Kyōki",

  sin: "lust",
  series: "deadly-sins-of-evil",

  chapter: [
    {
      id: "ven-prologue",
      number: 0,
      title: "Prologue",
      pages: "./venomania/chapters/00-prologue",
    },
    {
      id: "ven-ch1",
      number: 1,
      title: "Chapter 1 · Lukana Octo",
      pages: "./venomania/chapters/01-ch1",
    },
    {
      id: "ven-ch2",
      number: 2,
      title: "Chapter 2 · Mikulia Greeonio",
      pages: "./venomania/chapters/02-ch2",
    },
    {
      id: "ven-ch3",
      number: 3,
      title: "Chapter 3 · Gumina Glassred",
      pages: "./venomania/chapters/03-ch3",
    },
    {
      id: "ven-ch4",
      number: 4,
      title: "Chapter 4 · Yufina Marlon",
      pages: "./venomania/chapters/04-ch4",
    },
  ],
});
