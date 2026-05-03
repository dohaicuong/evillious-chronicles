import { Volume } from "./_shared";

/*
 * The Daughter of Evil — Volume 2: Wiegenlied of Green (悪ノ娘 — 緑のヴィーゲンリート)
 *
 * POV markers in the prose: ☯ Elluka, ✿ Michaela, ♥ Clarith.
 *
 * Heavy metadata (cover, gallery, title page, opening poetry, illustrations,
 * description, translation) lives in `public/wiegenlied-of-green/manifest.json`.
 */

export const wiegenliedOfGreen = Volume({
  id: "wiegenlied-of-green",
  slug: "wiegenlied-of-green",
  number: 2,

  title: "Wiegenlied of Green",
  originalTitle: "緑のヴィーゲンリート",
  romanizedTitle: "Midori no Wīgenrīto",

  sin: "pride",
  series: "the-daughter-of-evil",

  chapter: [
    {
      id: "wg-prologue",
      number: 0,
      title: "Prologue",
      pages: "./wiegenlied-of-green/chapters/00-prologue",
      songIds: ["daughter-of-white"],
    },
    {
      id: "wg-ch1",
      number: 1,
      title: "Chapter 1 · Dream of a Mage",
      pages: "./wiegenlied-of-green/chapters/01-ch1-dream-of-mage",
    },
    {
      id: "wg-ch2-s1",
      number: 2,
      title: "Chapter 2 · The So-called Humans",
      pages: "./wiegenlied-of-green/chapters/02-ch2-s1-so-called-humans",
    },
    {
      id: "wg-ch2-s2",
      number: 3,
      title: "Chapter 2 · Wooden Girl and White-Haired Girl",
      pages: "./wiegenlied-of-green/chapters/03-ch2-s2-wooden-girl",
    },
    {
      id: "wg-ch3-s1",
      number: 4,
      title: "Chapter 3 · Waltz of the Diva",
      pages: "./wiegenlied-of-green/chapters/04-ch3-s1-waltz-of-diva",
    },
    {
      id: "wg-ch3-s2",
      number: 5,
      title: "Chapter 3 · The Lady Who Staggered",
      pages: "./wiegenlied-of-green/chapters/05-ch3-s2-lady-who-staggered",
    },
    {
      id: "wg-ch4-s1",
      number: 6,
      title: "Chapter 4 · Lost Destination",
      pages: "./wiegenlied-of-green/chapters/06-ch4-s1-lost-destination",
    },
    {
      id: "wg-ch4-s2",
      number: 7,
      title: "Chapter 4 · Seaside's Small Bottle",
      pages: "./wiegenlied-of-green/chapters/07-ch4-s2-seasides-small-bottle",
    },
  ],
});
