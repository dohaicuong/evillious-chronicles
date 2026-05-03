import { Volume } from "./_shared";

/*
 * The Daughter of Evil — Volume 1: Clôture of Yellow (悪ノ娘 — 黄のクロアチュール)
 *
 * Translation source: ltquick.nl
 *
 * Heavy metadata (cover, gallery, title page, opening poetry, illustrations,
 * description, translation) lives in `public/cloture-of-yellow/manifest.json`
 * and is fetched lazily when the volume detail page or reader mounts. The
 * slim shape below stays in the bundle so search and continue-reading
 * resolve synchronously.
 *
 * Inline illustrations: place `<!-- illustration: NAME -->` in the markdown
 * and add NAME to `chapterIllustration` in the public manifest; the page
 * builder splits the prose around the marker and inserts an illustration
 * page at that position.
 */

export const clotureOfYellow = Volume({
  id: "cloture-of-yellow",
  slug: "cloture-of-yellow",
  number: 1,

  title: "Clôture of Yellow",
  originalTitle: "黄のクロアチュール",
  romanizedTitle: "Ki no Kuroachūru",

  sin: "pride",
  series: "the-daughter-of-evil",

  chapter: [
    {
      id: "cy-prologue",
      number: 0,
      title: "Prologue",
      pages: "./cloture-of-yellow/chapters/00-prologue",
      songIds: ["daughter-of-evil"],
    },
    {
      id: "cy-ch1-s1",
      number: 1,
      title: "Chapter 1 · The Fourteenth Birthday",
      pages: "./cloture-of-yellow/chapters/01-ch1-s1-fourteenth-birthday",
    },
    {
      id: "cy-ch1-s2",
      number: 2,
      title: "Chapter 1 · Lodging in the Hearts of Evil",
      pages: "./cloture-of-yellow/chapters/02-ch1-s2-lodging",
    },
    {
      id: "cy-ch2-s1",
      number: 3,
      title: "Chapter 2 · The Yearning of a Twin",
      pages: "./cloture-of-yellow/chapters/03-ch2-s1-yearning",
    },
    {
      id: "cy-ch2-s2",
      number: 4,
      title: "Chapter 2 · The Gear's Direction",
      pages: "./cloture-of-yellow/chapters/04-ch2-s2-gear",
    },
    {
      id: "cy-ch3-s1",
      number: 5,
      title: "Chapter 3 · Assembly of Allies",
      pages: "./cloture-of-yellow/chapters/05-ch3-s1-allies",
    },
    {
      id: "cy-ch3-s2",
      number: 6,
      title: "Chapter 3 · The Wish for an End",
      pages: "./cloture-of-yellow/chapters/06-ch3-s2-wish-for-end",
    },
    {
      id: "cy-ch4",
      number: 7,
      title: "Chapter 4 · True Evil?",
      pages: "./cloture-of-yellow/chapters/07-ch4-true-evil",
    },
  ],
});
