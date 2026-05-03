import { Volume } from "./_shared";

/*
 * The Deadly Sins of Evil — Volume 2: Evil Food Eater Conchita
 * (悪ノ大罪 — 悪食娘コンチータ).
 *
 * Translation source: theevilfoodeaterconchita.tumblr.com (chapter directory
 * at /post/729399445695889408/directory). Chapter prose lives under
 * `public/conchita/...` — cover only; no opening artwork or chapter
 * illustrations were available with the fan release. Chapter titles follow
 * the volume's framing device: each chapter is a course in a meal served at
 * the "Graveyard" restaurant, so the on-disk title pairs the course name
 * with the dish (e.g. "Hors d'Œuvre — Tasan Pig Liver Pâté ...").
 *
 * Heavy metadata (cover, title page, description, translation) lives in
 * `public/conchita/manifest.json`.
 */

export const conchita = Volume({
  id: "conchita",
  slug: "conchita",
  number: 2,

  title: "Evil Food Eater Conchita",
  originalTitle: "悪食娘コンチータ",
  romanizedTitle: "Akujiki Musume Conchita",

  sin: "gluttony",
  series: "deadly-sins-of-evil",

  chapter: [
    {
      id: "con-prologue",
      number: 0,
      title: "Prologue · Aperitif — Blood Grave",
      pages: "./conchita/chapters/00-prologue",
    },
    {
      id: "con-ch1",
      number: 1,
      title: "Chapter 1 · Hors d'Œuvre — Tasan Pig Liver Pâté with Assorted Vegetables",
      pages: "./conchita/chapters/01-ch1",
    },
    {
      id: "con-ch2",
      number: 2,
      title: "Chapter 2 · Soup — Cupid Horn Neck Soup",
      pages: "./conchita/chapters/02-ch2",
    },
    {
      id: "con-ch3",
      number: 3,
      title: "Chapter 3 · Poisson — Smothered Ziz Tiama",
      pages: "./conchita/chapters/03-ch3",
    },
    {
      id: "con-ch4",
      number: 4,
      title: "Chapter 4 · Sorbet — Plateau Sherbet",
      pages: "./conchita/chapters/04-ch4",
    },
    {
      id: "con-ch5",
      number: 5,
      title: "Chapter 5 · Viande — XXXX Steak",
      pages: "./conchita/chapters/05-ch5",
    },
    {
      id: "con-ch6",
      number: 6,
      title: "Chapter 6 · Dessert — Combo Platter of Varied Desserts",
      pages: "./conchita/chapters/06-ch6",
    },
    {
      id: "con-digestif",
      number: 7,
      title: "Digestif",
      pages: "./conchita/chapters/07-digestif",
    },
    {
      id: "con-bonus",
      number: 8,
      title: "Bonus · Gloom of Held",
      pages: "./conchita/chapters/08-bonus",
    },
  ],
  afterword: {
    id: "con-afterword",
    number: 99,
    title: "Afterword",
    pages: "./conchita/chapters/09-afterword",
  },
});
