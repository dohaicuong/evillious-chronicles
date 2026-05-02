import { Volume } from "./_shared";

/*
 * The Deadly Sins of Evil — Volume 3: Gift from the Princess Who Brought Sleep
 * (悪ノ大罪 — 眠リ姫ノ贈リ物).
 *
 * Translation source: giftfromthesleepprincess.tumblr.com (chapter directory
 * at /directory). Chapter prose lives under `public/sleep-princess/...` —
 * cover only; no artwork or chapter illustrations were available with the
 * fan release. The prose uses scene breaks (a lone "." line) rather than
 * glyph POV markers, so no per-character glyph map is needed.
 */

export const princessSleep = Volume({
  id: "princess-sleep",
  slug: "princess-sleep",
  number: 3,

  title: "Gift from the Princess Who Brought Sleep",
  originalTitle: "眠リ姫ノ贈リ物",
  romanizedTitle: "Nemuri Hime no Okurimono",

  sin: "sloth",
  series: "deadly-sins-of-evil",

  cover: {
    src: "/sleep-princess/cover.png",
    alt: "Gift from the Princess Who Brought Sleep — cover",
  },

  titlePage: {
    title: "The Deadly Sins of Evil",
    subtitle: "Gift from the Princess Who Brought Sleep",
    credits: [{ role: "Original Work", name: "Akuno_P (mothy)" }],
  },

  description:
    "The third volume of the Deadly Sins of Evil — the sloth-aligned tale of Margarita Blankenheim, the Marchioness of Toragay who poisoned her loveless husband and then her hometown with the medicine she called Gift. Framed as a journalist's investigation centuries after the fact: Hanne Lorre of the Freezis Foundation rides to Merrigod Plateau chasing a forgotten Yukina Freezis fairytale, and follows the trail through Père Noël, the eternal sorceress, and the green-haired doll that wore Margarita's face.",

  translation: {
    language: "en",
    source: "fan",
    translator: "giftfromthesleepprincess.tumblr.com",
    url: "https://giftfromthesleepprincess.tumblr.com/directory",
  },

  chapterIllustration: {},
  chapter: [
    {
      id: "ps-prologue",
      number: 0,
      title: "Prologue",
      pages: "./sleep-princess/chapters/00-prologue",
    },
    {
      id: "ps-ch1",
      number: 1,
      title: "Chapter 1 · The Flower of the Plateau Bloomed in a Red Town",
      pages: "./sleep-princess/chapters/01-ch1",
    },
    {
      id: "ps-ch2",
      number: 2,
      title: "Chapter 2 · Is the Blue-Haired Marquis Santa Claus?",
      pages: "./sleep-princess/chapters/02-ch2",
    },
    {
      id: "ps-ch3",
      number: 3,
      title: "Chapter 3 · The Green Flower Seeds Fluttered to Toragay",
      pages: "./sleep-princess/chapters/03-ch3",
    },
    {
      id: "ps-ch4",
      number: 4,
      title: "Chapter 4 · The Widow, the Medicine, and the Poison",
      pages: "./sleep-princess/chapters/04-ch4",
    },
    {
      id: "ps-ch5",
      number: 5,
      title: "Chapter 5 · An Unusual Event Visits With Expressionless Justice",
      pages: "./sleep-princess/chapters/05-ch5",
    },
    {
      id: "ps-ch6",
      number: 6,
      title: "Chapter 6 · The Eternal Sorceress",
      pages: "./sleep-princess/chapters/06-ch6",
    },
    {
      id: "ps-ch7",
      number: 7,
      title: "Chapter 7 · Gift from the Princess Who Brought Sleep",
      pages: "./sleep-princess/chapters/07-ch7",
    },
    {
      id: "ps-epilogue",
      number: 8,
      title: "Epilogue",
      pages: "./sleep-princess/chapters/08-epilogue",
    },
    {
      id: "ps-bonus",
      number: 9,
      title: "Bonus Story",
      pages: "./sleep-princess/chapters/10-bonus",
    },
  ],
  afterword: {
    id: "ps-afterword",
    number: 99,
    title: "Afterword",
    pages: "./sleep-princess/chapters/09-afterword",
  },
});
