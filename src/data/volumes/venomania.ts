import type { ImageAsset, Volume } from "@src/data/schema";

import { loadPagesGlob, makePagesBuilder } from "./_shared";

const illustrations: Record<string, ImageAsset> = {
  "illustration-1": {
    src: "/venomania/illustration-1.jpg",
    alt: "The Lunacy of Duke Venomania — illustration 1",
  },
  "illustration-2": {
    src: "/venomania/illustration-2.png",
    alt: "The Lunacy of Duke Venomania — illustration 2",
  },
};

/*
 * The Lunacy of Duke Venomania (悪ノ大罪 — 毒/ヴェノマニア公爵の狂気)
 *
 * Translation source: pokkoo-shuu.tumblr.com (prologue + chapter 1) and
 * lunacy-of-venomania.tumblr.com (chapters 2–4). Translation is incomplete:
 * the fan release stops at Chapter 4 Part 5 — Chapter 4 Part 6 (and any
 * subsequent epilogue / afterword) were never published in English by this
 * translator. Each chapter file contains a stub pointing at the source post;
 * drop the prose body into the corresponding markdown file under
 * src/data/volumes/venomania/chapters/ to wire content in.
 *
 * Assets pending — drop cover/illustrations into public/venomania/.
 */

const buildPages = makePagesBuilder(illustrations);

const prologuePages = loadPagesGlob(
  import.meta.glob("./venomania/chapters/00-prologue/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);
const ch1Pages = loadPagesGlob(
  import.meta.glob("./venomania/chapters/01-ch1/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);
const ch2Pages = loadPagesGlob(
  import.meta.glob("./venomania/chapters/02-ch2/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);
const ch3Pages = loadPagesGlob(
  import.meta.glob("./venomania/chapters/03-ch3/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);
const ch4Pages = loadPagesGlob(
  import.meta.glob("./venomania/chapters/04-ch4/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);

export const venomania: Volume = {
  id: "venomania",
  slug: "venomania",
  number: 1,

  title: "The Lunacy of Duke Venomania",
  originalTitle: "ヴェノマニア公爵の狂気",
  romanizedTitle: "Venomania-kō no Kyōki",

  sin: "lust",
  series: "deadly-sins-of-evil",

  cover: {
    src: "/venomania/cover.webp",
    alt: "The Lunacy of Duke Venomania — cover (asset pending)",
  },

  titlePage: {
    title: "The Deadly Sins of Evil",
    subtitle: "The Lunacy of Duke Venomania",
    credits: [{ role: "Original Work", name: "Akuno_P (mothy)" }],
  },

  openingGallery: [
    {
      illustration: {
        src: "/venomania/artwork-1.jpg",
        alt: "The Lunacy of Duke Venomania — opening artwork 1",
      },
    },
    {
      illustration: {
        src: "/venomania/artwork-2.jpg",
        alt: "The Lunacy of Duke Venomania — opening artwork 2",
      },
    },
    {
      illustration: {
        src: "/venomania/artwork-3.jpg",
        alt: "The Lunacy of Duke Venomania — opening artwork 3",
      },
    },
  ],

  chapters: [
    {
      id: "ven-prologue",
      number: 0,
      title: "Prologue",
      pages: buildPages(...prologuePages),
    },
    {
      id: "ven-ch1",
      number: 1,
      title: "Chapter 1 · Lukana Octo",
      pages: buildPages(...ch1Pages),
    },
    {
      id: "ven-ch2",
      number: 2,
      title: "Chapter 2 · Mikulia Greeonio",
      pages: buildPages(...ch2Pages),
    },
    {
      id: "ven-ch3",
      number: 3,
      title: "Chapter 3 · Gumina Glassred",
      pages: buildPages(...ch3Pages),
    },
    {
      id: "ven-ch4",
      number: 4,
      title: "Chapter 4 · Yufina Marlon",
      pages: buildPages(...ch4Pages),
    },
  ],

  description:
    "The first volume of the Deadly Sins of Evil — the lust-aligned tale of Sateriasis Venomania, the ostracized noble who pierces himself with a cursed katana and pulls the women of Asmodean into a charm-bound harem. Each chapter is named for one of the women caught in his orbit (Lukana, Mikulia, Gumina, Yufina) as the demon possessing him gathers its tribute.",

  translation: {
    language: "en",
    source: "fan",
    translator: "pokkoo-shuu.tumblr.com",
    url: "https://pokkoo-shuu.tumblr.com/thelunacyofdukevenomania",
  },
};
