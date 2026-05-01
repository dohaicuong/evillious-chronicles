import type { Page, Volume } from "@src/data/schema";

import prologueText from "./praeludium-of-red/chapters/00-prologue.md?raw";
import ch1s1Text from "./praeludium-of-red/chapters/01-ch1-s1-star-fortress.md?raw";
import ch1s2Text from "./praeludium-of-red/chapters/02-ch1-s2-chance-meeting.md?raw";
import ch2s1Text from "./praeludium-of-red/chapters/03-ch2-s1-evil-food-eater.md?raw";
import ch2s2Text from "./praeludium-of-red/chapters/04-ch2-s2-counterattack.md?raw";
import ch3s1Text from "./praeludium-of-red/chapters/05-ch3-s1-king-and-girl.md?raw";
import ch3s2Text from "./praeludium-of-red/chapters/06-ch3-s2-full-moon-visitor.md?raw";
import ch4Text from "./praeludium-of-red/chapters/07-ch4-time-forest-song.md?raw";
import epilogueText from "./praeludium-of-red/chapters/08-epilogue-blue-country.md?raw";
import afterwordText from "./praeludium-of-red/chapters/afterword.md?raw";

/*
 * The Daughter of Evil — Volume 3: Praeludium of Red (悪ノ娘 — 赤のプレリュード)
 *
 * Skeleton wire-up. Prologue + Afterword are transcribed; chapter bodies are
 * stub markdown that link out to the translator's blog. Replace the stubs as
 * each section gets fetched and cleaned.
 *
 * Translation source: doe-praeludiumofred.tumblr.com
 * Assets pending — drop cover/artwork/illustrations into public/praeludium-of-red/.
 */

function singlePage(text: string): Page[] {
  return [{ number: 1, layout: "prose", text }];
}

export const praeludiumOfRed: Volume = {
  id: "praeludium-of-red",
  slug: "praeludium-of-red",
  number: 3,

  title: "Praeludium of Red",
  originalTitle: "赤のプレリュード",
  romanizedTitle: "Aka no Pureryūdo",

  sin: "pride",
  series: "the-daughter-of-evil",

  cover: {
    src: "/praeludium-of-red/cover.jpg",
    alt: "Praeludium of Red — Germaine drawing her sword as Yukina shields herself behind her",
    width: 500,
    height: 730,
  },

  titlePage: {
    title: "The Daughter of Evil",
    subtitle: "Praeludium of Red",
    credits: [{ role: "Original Work", name: "Akuno_P (mothy)" }],
  },

  openingPoetry: {
    title: "Opening",
    attribution: "From the prologue of Praeludium of Red",
    stanzas: [
      {
        lines: ["Dwelling in each of the seven “Vessels of Deadly Sin” there was a unique demon."],
      },
      {
        lines: [
          "In the glass was the demon of “Gluttony”.",
          "In the mirrors was the demon of “Pride”.",
          "In the scissors was the demon of “Envy”.",
          "In the doll was the demon of “Sloth”.",
          "In the blade was the demon of “Lust”.",
          "In the spoon was the demon of “Greed”.",
        ],
      },
      {
        lines: [
          "And… I can’t for the life of me recall what the last one was,",
          "But in there dwelled the demon of “Wrath”.",
        ],
      },
    ],
  },

  chapters: [
    {
      id: "pr-prologue",
      number: 0,
      title: "Prologue",
      pages: singlePage(prologueText),
    },
    {
      id: "pr-ch1-s1",
      number: 1,
      title: "Chapter 1 · The Star Fortress",
      pages: singlePage(ch1s1Text),
    },
    {
      id: "pr-ch1-s2",
      number: 2,
      title: "Chapter 1 · Chance Meeting of a Sworn Friend",
      pages: singlePage(ch1s2Text),
    },
    {
      id: "pr-ch2-s1",
      number: 3,
      title: "Chapter 2 · Footprints of the Evil Food Eater",
      pages: singlePage(ch2s1Text),
    },
    {
      id: "pr-ch2-s2",
      number: 4,
      title: "Chapter 2 · The Signal Fire of a Counterattack",
      pages: singlePage(ch2s2Text),
    },
    {
      id: "pr-ch3-s1",
      number: 5,
      title: "Chapter 3 · The King and the Girl",
      pages: singlePage(ch3s1Text),
    },
    {
      id: "pr-ch3-s2",
      number: 6,
      title: "Chapter 3 · Full Moon Visitor",
      pages: singlePage(ch3s2Text),
    },
    {
      id: "pr-ch4",
      number: 7,
      title: "Chapter 4 · Time and a Forest and a Song",
      pages: singlePage(ch4Text),
    },
    {
      id: "pr-epilogue",
      number: 8,
      title: "Epilogue · To the Blue Country",
      pages: singlePage(epilogueText),
    },
  ],

  afterword: {
    id: "pr-afterword",
    number: 99,
    title: "Afterword",
    pages: singlePage(afterwordText),
  },

  description:
    "The third volume of The Daughter of Evil — set five years after the revolution, told from the perspectives of Yukina Freesis and King Kyle of Marlon. Despite the “red” subtitle, this is not Germaine's story; it is the prelude to a fourth volume yet to come. The stage moves between Held's monastery and the courts of those left behind.",

  translation: {
    language: "en",
    source: "fan",
    translator: "doe-praeludiumofred.tumblr.com",
    url: "https://doe-praeludiumofred.tumblr.com/directory",
  },
};
