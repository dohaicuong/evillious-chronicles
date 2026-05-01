import type { ImageAsset, Volume } from "@src/data/schema";

import { loadPagesGlob, makePagesBuilder } from "./_shared";

/*
 * The Daughter of Evil — Volume 4: Praefacio of Blue (悪ノ娘 — 青のプラエファチオ)
 *
 * Translation source: doe-praefacioofblue.tumblr.com
 * Assets pending — drop cover/artwork/illustrations into public/praefacio-of-blue/.
 * POV markers in the prose: ✥ Kyle (King of Marlon).
 */

const illustrations: Record<string, ImageAsset> = {};

const buildPages = makePagesBuilder(illustrations);

const prologuePages = loadPagesGlob(
  import.meta.glob("./praefacio-of-blue/chapters/00-prologue/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);

const ch1s1Pages = loadPagesGlob(
  import.meta.glob("./praefacio-of-blue/chapters/01-ch1-signs-of-enemy/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);
const ch2s1Pages = loadPagesGlob(
  import.meta.glob("./praefacio-of-blue/chapters/02-ch2-s1-hometown-misgivings/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);
const ch2s2Pages = loadPagesGlob(
  import.meta.glob("./praefacio-of-blue/chapters/03-ch2-s2-sorceress-and-forest/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);
const ch3s1Pages = loadPagesGlob(
  import.meta.glob("./praefacio-of-blue/chapters/04-ch3-s1-inside-story/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);
const ch3s2Pages = loadPagesGlob(
  import.meta.glob("./praefacio-of-blue/chapters/05-ch3-s2-heartbeat-rain/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);
const ch4s1Pages = loadPagesGlob(
  import.meta.glob("./praefacio-of-blue/chapters/06-ch4-s1-monastery-seashore/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);
const ch4s2Pages = loadPagesGlob(
  import.meta.glob("./praefacio-of-blue/chapters/07-ch4-s2-with-that-person/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);
const epiloguePages = loadPagesGlob(
  import.meta.glob("./praefacio-of-blue/chapters/08-epilogue-prelude/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);
const afterwordPages = loadPagesGlob(
  import.meta.glob("./praefacio-of-blue/chapters/afterword/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);

export const praefacioOfBlue: Volume = {
  id: "praefacio-of-blue",
  slug: "praefacio-of-blue",
  number: 4,

  title: "Praefacio of Blue",
  originalTitle: "青のプラエファチオ",
  romanizedTitle: "Ao no Puraefachio",

  sin: "pride",
  series: "the-daughter-of-evil",

  cover: {
    src: "/praefacio-of-blue/cover.jpg",
    alt: "Praefacio of Blue — Allen and Riliane reunited, blade between them",
    width: 500,
    height: 734,
  },

  titlePage: {
    title: "The Daughter of Evil",
    subtitle: "Praefacio of Blue",
    credits: [{ role: "Original Work", name: "Akuno_P (mothy)" }],
  },

  openingPoetry: {
    title: "Opening",
    attribution: "From the prologue of Praefacio of Blue",
    stanzas: [
      {
        lines: [
          "She committed sin.",
          "She indulged in the love she had with her husband.",
          "She was overconfident that her wishes would be granted.",
          "She shirked her responsibilities, and her children died.",
          "She was jealous of the happiness of her neighbors.",
        ],
      },
      {
        lines: [
          "Eventually her feelings changed to anger,",
          "And she tried to obtain that which she had lost.",
          "And then–because she was hungry, she gathered two fruits.",
        ],
      },
    ],
  },

  chapters: [
    {
      id: "pb-prologue",
      number: 0,
      title: "Prologue",
      pages: buildPages(...prologuePages),
    },
    {
      id: "pb-ch1",
      number: 1,
      title: "Chapter 1 · Signs of the Enemy at Sea",
      pages: buildPages(...ch1s1Pages),
    },
    {
      id: "pb-ch2-s1",
      number: 2,
      title: "Chapter 2 · Hometown of Misgivings",
      pages: buildPages(...ch2s1Pages),
    },
    {
      id: "pb-ch2-s2",
      number: 3,
      title: "Chapter 2 · The Sorceress and the Forest",
      pages: buildPages(...ch2s2Pages),
    },
    {
      id: "pb-ch3-s1",
      number: 4,
      title: "Chapter 3 · The Inside Story on the Girl",
      pages: buildPages(...ch3s1Pages),
    },
    {
      id: "pb-ch3-s2",
      number: 5,
      title: "Chapter 3 · A Heartbeat in the Rain",
      pages: buildPages(...ch3s2Pages),
    },
    {
      id: "pb-ch4-s1",
      number: 6,
      title: "Chapter 4 · The Monastery on the Seashore",
      pages: buildPages(...ch4s1Pages),
    },
    {
      id: "pb-ch4-s2",
      number: 7,
      title: "Chapter 4 · With That Person",
      pages: buildPages(...ch4s2Pages),
    },
    {
      id: "pb-epilogue",
      number: 8,
      title: "Epilogue · Prelude of Things to Come",
      pages: buildPages(...epiloguePages),
    },
  ],

  afterword: {
    id: "pb-afterword",
    number: 99,
    title: "Afterword",
    pages: buildPages(...afterwordPages),
  },

  description:
    "The fourth and final volume of The Daughter of Evil — set after the events of Praeludium of Red, told primarily from King Kyle of Marlon's perspective. The story finally reaches the Blue Country across the sea, closing the chronology that the earlier volumes spiralled inward toward.",

  translation: {
    language: "en",
    source: "fan",
    translator: "doe-praefacioofblue.tumblr.com",
    url: "https://doe-praefacioofblue.tumblr.com/directory",
  },
};
