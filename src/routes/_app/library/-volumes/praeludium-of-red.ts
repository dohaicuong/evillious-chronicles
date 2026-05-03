import { Volume } from "./_shared";

/*
 * The Daughter of Evil — Volume 3: Praeludium of Red (悪ノ娘 — 赤のプレリュード)
 *
 * Skeleton wire-up. Prologue + Afterword are transcribed; chapter bodies are
 * stub markdown that link out to the translator's blog. Replace the stubs as
 * each section gets fetched and cleaned.
 *
 * Translation source: doe-praeludiumofred.tumblr.com
 *
 * Heavy metadata (cover, title page, opening poetry, description, translation)
 * lives in `public/praeludium-of-red/manifest.json`.
 */

export const praeludiumOfRed = Volume({
  id: "praeludium-of-red",
  slug: "praeludium-of-red",
  number: 3,

  title: "Praeludium of Red",
  originalTitle: "赤のプレリュード",
  romanizedTitle: "Aka no Pureryūdo",

  sin: "pride",
  series: "the-daughter-of-evil",

  chapter: [
    {
      id: "pr-prologue",
      number: 0,
      title: "Prologue",
      pages: "./praeludium-of-red/chapters/00-prologue",
    },
    {
      id: "pr-ch1-s1",
      number: 1,
      title: "Chapter 1 · The Star Fortress",
      pages: "./praeludium-of-red/chapters/01-ch1-s1-star-fortress",
    },
    {
      id: "pr-ch1-s2",
      number: 2,
      title: "Chapter 1 · Chance Meeting of a Sworn Friend",
      pages: "./praeludium-of-red/chapters/02-ch1-s2-chance-meeting",
    },
    {
      id: "pr-ch2-s1",
      number: 3,
      title: "Chapter 2 · Footprints of the Evil Food Eater",
      pages: "./praeludium-of-red/chapters/03-ch2-s1-evil-food-eater",
    },
    {
      id: "pr-ch2-s2",
      number: 4,
      title: "Chapter 2 · The Signal Fire of a Counterattack",
      pages: "./praeludium-of-red/chapters/04-ch2-s2-counterattack",
    },
    {
      id: "pr-ch3-s1",
      number: 5,
      title: "Chapter 3 · The King and the Girl",
      pages: "./praeludium-of-red/chapters/05-ch3-s1-king-and-girl",
    },
    {
      id: "pr-ch3-s2",
      number: 6,
      title: "Chapter 3 · Full Moon Visitor",
      pages: "./praeludium-of-red/chapters/06-ch3-s2-full-moon-visitor",
    },
    {
      id: "pr-ch4",
      number: 7,
      title: "Chapter 4 · Time and a Forest and a Song",
      pages: "./praeludium-of-red/chapters/07-ch4-time-forest-song",
    },
    {
      id: "pr-epilogue",
      number: 8,
      title: "Epilogue · To the Blue Country",
      pages: "./praeludium-of-red/chapters/08-epilogue-blue-country",
    },
  ],
  afterword: {
    id: "pr-afterword",
    number: 99,
    title: "Afterword",
    pages: "./praeludium-of-red/chapters/afterword",
  },
});
