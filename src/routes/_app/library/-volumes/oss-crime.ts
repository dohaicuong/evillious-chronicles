import { Volume } from "./_shared";

/*
 * Original Sin Story: Crime — Volume 1 of the Original Sin arc
 * (原罪物語 -犯罪-).
 *
 * Translation source: oss-crime.tumblr.com (pricechecktranslations); chapter
 * directory at /directory, credits at /about. Chapter prose lives under
 * `public/original-sin-crime/...` — cover only; the fan release ships
 * without artwork or chapter illustrations. The prose uses scene breaks
 * (a lone "." line) rather than glyph POV markers.
 */

export const ossCrime = Volume({
  id: "oss-crime",
  slug: "oss-crime",
  number: 1,

  title: "Original Sin Story: Crime",
  originalTitle: "原罪物語 -犯罪-",
  romanizedTitle: "Genzai Monogatari - Hanzai",

  sin: "origin",
  series: "original-sin",

  cover: {
    src: "/original-sin-crime/cover.jpg",
    alt: "Original Sin Story: Crime — cover",
  },

  titlePage: {
    title: "Original Sin Story",
    subtitle: "Crime",
    credits: [
      { role: "Original Work", name: "Akuno_P (mothy)" },
      { role: "Illustration", name: "壱加 (Ichika)" },
      { role: "Publisher", name: "the heavenly yard" },
    ],
    publisher: "the heavenly yard",
  },

  description:
    "The first volume of the Original Sin Story — the genesis of every cycle that follows. Maria Moonlit, the prophet-queen renamed Alice Merry-Go-Round, conveys the gods' demand for vessels and sets Project 'Ma' in motion. Eve, Adam, and Seth are pulled into the experiment; Salmhofer the Witch flees with a forbidden secret; and in Held's forest a moonlit bear acts on a grief that will fracture into seven sins. Told from both Eve's and Adam's perspectives in its closing chapters.",

  publishedYear: 2019,
  translation: {
    language: "en",
    source: "fan",
    translator: "pricechecktranslations",
    url: "https://oss-crime.tumblr.com/directory",
  },

  chapterIllustration: {},
  chapter: [
    {
      id: "ossc-prologue",
      number: 0,
      title: "Prologue",
      pages: "./original-sin-crime/chapters/00-prologue",
    },
    {
      id: "ossc-ch1",
      number: 1,
      title: "Chapter 1 · Queen of the Glass",
      pages: "./original-sin-crime/chapters/01-ch1",
    },
    {
      id: "ossc-ch2",
      number: 2,
      title: "Chapter 2 · Project “Ma” –Eve–",
      pages: "./original-sin-crime/chapters/02-ch2",
    },
    {
      id: "ossc-ch3",
      number: 3,
      title: "Chapter 3 · Project “Ma” –Adam–",
      pages: "./original-sin-crime/chapters/03-ch3",
    },
    {
      id: "ossc-ch4",
      number: 4,
      title: "Chapter 4 · Project “Ma” –Seth–",
      pages: "./original-sin-crime/chapters/04-ch4",
    },
    {
      id: "ossc-ch5",
      number: 5,
      title: "Chapter 5 · Escape of the Witch Salmhofer",
      pages: "./original-sin-crime/chapters/05-ch5",
    },
    {
      id: "ossc-ch6",
      number: 6,
      title: "Chapter 6 · moonlit bear <E>",
      pages: "./original-sin-crime/chapters/06-ch6",
    },
    {
      id: "ossc-ch7",
      number: 7,
      title: "Chapter 7 · moonlit bear <A>",
      pages: "./original-sin-crime/chapters/07-ch7",
    },
    {
      id: "ossc-epilogue",
      number: 8,
      title: "Epilogue",
      pages: "./original-sin-crime/chapters/08-epilogue",
    },
  ],
  afterword: {
    id: "ossc-afterword",
    number: 99,
    title: "Afterword",
    pages: "./original-sin-crime/chapters/09-afterword",
  },
});
