import type { Page, Volume } from "@src/data/schema";

import prologueText from "./venomania/chapters/00-prologue.md?raw";
import ch1s1Text from "./venomania/chapters/01-ch1-s1-lukana.md?raw";
import ch1s2Text from "./venomania/chapters/02-ch1-s2-lukana.md?raw";
import ch1s3Text from "./venomania/chapters/03-ch1-s3-lukana.md?raw";
import ch1s4Text from "./venomania/chapters/04-ch1-s4-lukana.md?raw";
import ch1s5Text from "./venomania/chapters/05-ch1-s5-lukana.md?raw";
import ch1s6Text from "./venomania/chapters/06-ch1-s6-lukana.md?raw";
import ch1s7Text from "./venomania/chapters/07-ch1-s7-lukana.md?raw";
import ch1s8Text from "./venomania/chapters/08-ch1-s8-lukana.md?raw";
import ch2s1Text from "./venomania/chapters/09-ch2-s1-mikulia.md?raw";
import ch2s2Text from "./venomania/chapters/10-ch2-s2-mikulia.md?raw";
import ch2s3Text from "./venomania/chapters/11-ch2-s3-mikulia.md?raw";
import ch2s4Text from "./venomania/chapters/12-ch2-s4-mikulia.md?raw";
import ch2s5Text from "./venomania/chapters/13-ch2-s5-mikulia.md?raw";
import ch3s1Text from "./venomania/chapters/14-ch3-s1-gumina.md?raw";
import ch3s2Text from "./venomania/chapters/15-ch3-s2-gumina.md?raw";
import ch3s3Text from "./venomania/chapters/16-ch3-s3-gumina.md?raw";
import ch3s4Text from "./venomania/chapters/17-ch3-s4-gumina.md?raw";
import ch3s5Text from "./venomania/chapters/18-ch3-s5-gumina.md?raw";
import ch3s6Text from "./venomania/chapters/19-ch3-s6-gumina.md?raw";
import ch3s7Text from "./venomania/chapters/20-ch3-s7-gumina.md?raw";
import ch3s8Text from "./venomania/chapters/21-ch3-s8-gumina.md?raw";
import ch3s9Text from "./venomania/chapters/22-ch3-s9-gumina.md?raw";
import ch4s1Text from "./venomania/chapters/23-ch4-s1-yufina.md?raw";
import ch4s2Text from "./venomania/chapters/24-ch4-s2-yufina.md?raw";
import ch4s3Text from "./venomania/chapters/25-ch4-s3-yufina.md?raw";
import ch4s4Text from "./venomania/chapters/26-ch4-s4-yufina.md?raw";
import ch4s5Text from "./venomania/chapters/27-ch4-s5-yufina.md?raw";
import ch4s6Text from "./venomania/chapters/28-ch4-s6-yufina.md?raw";

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

function pages(...texts: string[]): Page[] {
  return texts.map((text, i) => ({ number: i + 1, layout: "prose", text }));
}

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
      pages: pages(prologueText),
    },
    {
      id: "ven-ch1",
      number: 1,
      title: "Chapter 1 · Lukana Octo",
      pages: pages(
        ch1s1Text,
        ch1s2Text,
        ch1s3Text,
        ch1s4Text,
        ch1s5Text,
        ch1s6Text,
        ch1s7Text,
        ch1s8Text,
      ),
    },
    {
      id: "ven-ch2",
      number: 2,
      title: "Chapter 2 · Mikulia Greeonio",
      pages: pages(ch2s1Text, ch2s2Text, ch2s3Text, ch2s4Text, ch2s5Text),
    },
    {
      id: "ven-ch3",
      number: 3,
      title: "Chapter 3 · Gumina Glassred",
      pages: pages(
        ch3s1Text,
        ch3s2Text,
        ch3s3Text,
        ch3s4Text,
        ch3s5Text,
        ch3s6Text,
        ch3s7Text,
        ch3s8Text,
        ch3s9Text,
      ),
    },
    {
      id: "ven-ch4",
      number: 4,
      title: "Chapter 4 · Yufina Marlon",
      pages: pages(ch4s1Text, ch4s2Text, ch4s3Text, ch4s4Text, ch4s5Text, ch4s6Text),
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
