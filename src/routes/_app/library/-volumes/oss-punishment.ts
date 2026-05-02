import { Volume } from "./_shared";

/*
 * Original Sin Story: Punishment — Volume 2 of the Original Sin arc
 * (原罪物語 -処罰-).
 *
 * Translation source: oss-punishment.tumblr.com (pricechecktranslations);
 * chapter directory at /directory, credits at /about. Chapter prose lives
 * under `public/original-sin-punishment/...` — cover only; the fan release
 * ships without artwork or chapter illustrations. The prose uses scene
 * breaks (a lone "." line) rather than glyph POV markers.
 */

export const ossPunishment = Volume({
  id: "oss-punishment",
  slug: "oss-punishment",
  number: 2,

  title: "Original Sin Story: Punishment",
  originalTitle: "原罪物語 -処罰-",
  romanizedTitle: "Genzai Monogatari - Shokubatsu",

  sin: "origin",
  series: "original-sin",

  cover: {
    src: "/original-sin-punishment/cover.jpg",
    alt: "Original Sin Story: Punishment — cover",
  },

  titlePage: {
    title: "Original Sin Story",
    subtitle: "Punishment",
    credits: [
      { role: "Original Work", name: "Akuno_P (mothy)" },
      { role: "Illustration", name: "壱加 (Ichika)" },
      { role: "Publisher", name: "the heavenly yard" },
    ],
    publisher: "the heavenly yard",
  },

  description:
    "The second volume of the Original Sin Story — the punishment phase that follows Eve's crime in Held's forest. The 'Ma' survival arc threads through the lives of Ly, Milky, Elluka, and Irina as the gods' fragmented vessels seek their bearers; the Whereabouts of the Miracle, a Song Heard Somewhere, and a tale of abandonment beneath a moonlit night carry the cycle forward, until the Chrono Story closes the genesis arc and opens the door to the Deadly Sins.",

  publishedYear: 2022,
  translation: {
    language: "en",
    source: "fan",
    translator: "pricechecktranslations",
    url: "https://oss-punishment.tumblr.com/directory",
  },

  chapterIllustration: {},
  chapter: [
    {
      id: "ossp-prologue",
      number: 0,
      title: "Prologue · Music Box of Recollection",
      pages: "./original-sin-punishment/chapters/00-prologue",
    },
    {
      id: "ossp-ch1",
      number: 1,
      title: "Chapter 1 · “Ma” Survival: Intro",
      pages: "./original-sin-punishment/chapters/01-ch1",
    },
    {
      id: "ossp-ch2",
      number: 2,
      title: "Chapter 2 · “Ma” Survival: Ly",
      pages: "./original-sin-punishment/chapters/02-ch2",
    },
    {
      id: "ossp-ch3",
      number: 3,
      title: "Chapter 3 · “Ma” Survival: Milky",
      pages: "./original-sin-punishment/chapters/03-ch3",
    },
    {
      id: "ossp-ch4",
      number: 4,
      title: "Chapter 4 · “Ma” Survival: Elluka",
      pages: "./original-sin-punishment/chapters/04-ch4",
    },
    {
      id: "ossp-ch5",
      number: 5,
      title: "Chapter 5 · “Ma” Survival: Irina",
      pages: "./original-sin-punishment/chapters/05-ch5",
    },
    {
      id: "ossp-ch6",
      number: 6,
      title: "Chapter 6 · Whereabouts of the Miracle",
      pages: "./original-sin-punishment/chapters/06-ch6",
    },
    {
      id: "ossp-ch7",
      number: 7,
      title: "Chapter 7 · The Song I Heard Somewhere",
      pages: "./original-sin-punishment/chapters/07-ch7",
    },
    {
      id: "ossp-ch8",
      number: 8,
      title: "Chapter 8 · A Tale of Abandonment on a Moonlit Night",
      pages: "./original-sin-punishment/chapters/08-ch8",
    },
    {
      id: "ossp-ch9",
      number: 9,
      title: "Chapter 9 · Chrono Story",
      pages: "./original-sin-punishment/chapters/09-ch9",
    },
    {
      id: "ossp-epilogue",
      number: 10,
      title: "Epilogue · The Beginning of the Deadly Sins",
      pages: "./original-sin-punishment/chapters/10-epilogue",
    },
  ],
  afterword: {
    id: "ossp-afterword",
    number: 99,
    title: "Afterword",
    pages: "./original-sin-punishment/chapters/11-afterword",
  },
});
