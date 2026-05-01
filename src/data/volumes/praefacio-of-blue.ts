import type { ImageAsset, Page, Volume } from "@src/data/schema";

import prologueText from "./praefacio-of-blue/chapters/00-prologue.md?raw";
import ch1Text from "./praefacio-of-blue/chapters/01-ch1-signs-of-enemy.md?raw";
import ch2s1Text from "./praefacio-of-blue/chapters/02-ch2-s1-hometown-misgivings.md?raw";
import ch2s2Text from "./praefacio-of-blue/chapters/03-ch2-s2-sorceress-and-forest.md?raw";
import ch3s1Text from "./praefacio-of-blue/chapters/04-ch3-s1-inside-story.md?raw";
import ch3s2Text from "./praefacio-of-blue/chapters/05-ch3-s2-heartbeat-rain.md?raw";
import ch4s1Text from "./praefacio-of-blue/chapters/06-ch4-s1-monastery-seashore.md?raw";
import ch4s2Text from "./praefacio-of-blue/chapters/07-ch4-s2-with-that-person.md?raw";
import epilogueText from "./praefacio-of-blue/chapters/08-epilogue-prelude.md?raw";
import afterwordText from "./praefacio-of-blue/chapters/afterword.md?raw";

/*
 * The Daughter of Evil — Volume 4: Praefacio of Blue (悪ノ娘 — 青のプラエファチオ)
 *
 * Translation source: doe-praefacioofblue.tumblr.com
 * Assets pending — drop cover/artwork/illustrations into public/praefacio-of-blue/.
 * POV markers in the prose: ✥ Kyle (King of Marlon).
 */

const illustrations: Record<string, ImageAsset> = {};

function buildPages(markdown: string): Page[] {
  // Tokenize the markdown on either marker. The regex captures two groups:
  // group 1 = illustration name (only set for `<!-- illustration: NAME -->`);
  // group 2 is matched (but unused) for the page-break marker `<!-- page -->`.
  const splitRe = /<!--\s*illustration:\s*([\w-]+)\s*-->|<!--\s*(page)\s*-->/g;
  const pages: Page[] = [];
  let pageNum = 1;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const pushProse = (raw: string) => {
    const text = raw.trim();
    if (text) pages.push({ number: pageNum++, layout: "prose", text });
  };
  while ((match = splitRe.exec(markdown)) !== null) {
    pushProse(markdown.slice(lastIndex, match.index));
    if (match[1]) {
      const illustration = illustrations[match[1]];
      if (illustration) pages.push({ number: pageNum++, layout: "illustration", illustration });
    }
    // page-break marker is a pure separator — no payload to push.
    lastIndex = match.index + match[0].length;
  }
  pushProse(markdown.slice(lastIndex));
  return pages;
}

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
      pages: buildPages(prologueText),
    },
    {
      id: "pb-ch1",
      number: 1,
      title: "Chapter 1 · Signs of the Enemy at Sea",
      pages: buildPages(ch1Text),
    },
    {
      id: "pb-ch2-s1",
      number: 2,
      title: "Chapter 2 · Hometown of Misgivings",
      pages: buildPages(ch2s1Text),
    },
    {
      id: "pb-ch2-s2",
      number: 3,
      title: "Chapter 2 · The Sorceress and the Forest",
      pages: buildPages(ch2s2Text),
    },
    {
      id: "pb-ch3-s1",
      number: 4,
      title: "Chapter 3 · The Inside Story on the Girl",
      pages: buildPages(ch3s1Text),
    },
    {
      id: "pb-ch3-s2",
      number: 5,
      title: "Chapter 3 · A Heartbeat in the Rain",
      pages: buildPages(ch3s2Text),
    },
    {
      id: "pb-ch4-s1",
      number: 6,
      title: "Chapter 4 · The Monastery on the Seashore",
      pages: buildPages(ch4s1Text),
    },
    {
      id: "pb-ch4-s2",
      number: 7,
      title: "Chapter 4 · With That Person",
      pages: buildPages(ch4s2Text),
    },
    {
      id: "pb-epilogue",
      number: 8,
      title: "Epilogue · Prelude of Things to Come",
      pages: buildPages(epilogueText),
    },
  ],

  afterword: {
    id: "pb-afterword",
    number: 99,
    title: "Afterword",
    pages: buildPages(afterwordText),
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
