import { Volume } from "./_shared";

/*
 * The Deadly Sins of Evil — Volume 5: The Tailor of Enbizaka
 * (悪ノ大罪 — 円尾坂の仕立屋).
 *
 * Translation source: thetailorofenbizaka.tumblr.com (chapter directory at
 * /directory, credits at /about). Chapter prose lives under
 * `public/enbizaka/...` — cover only; the fan release ships without artwork
 * or chapter illustrations.
 *
 * Chapter 1 ("The Tale of the Scissors") is split across seven acts in the
 * source; each act sits in its own page directory and is wired in as its
 * own slim chapter so the chapter list and reader pagination match the
 * book's act-by-act layout.
 *
 * Heavy metadata (cover, title page, description, translation) lives in
 * `public/enbizaka/manifest.json`.
 */

export const enbizaka = Volume({
  id: "enbizaka",
  slug: "enbizaka",
  number: 5,

  title: "The Tailor of Enbizaka",
  originalTitle: "円尾坂の仕立屋",
  romanizedTitle: "Enbizaka no Shitateya",

  sin: "envy",
  series: "deadly-sins-of-evil",

  chapter: [
    {
      id: "enb-prologue",
      number: 0,
      title: "Prologue",
      pages: "./enbizaka/chapters/00-prologue",
    },
    {
      id: "enb-ch1-act1",
      number: 1,
      title: "Chapter 1 · Act 1 — The Great Fire",
      pages: "./enbizaka/chapters/01-ch1-act1",
    },
    {
      id: "enb-ch1-act2",
      number: 2,
      title: "Chapter 1 · Act 2 — Exchange",
      pages: "./enbizaka/chapters/02-ch1-act2",
    },
    {
      id: "enb-ch1-act3",
      number: 3,
      title: "Chapter 1 · Act 3 — Reunion",
      pages: "./enbizaka/chapters/03-ch1-act3",
    },
    {
      id: "enb-ch1-act4",
      number: 4,
      title: "Chapter 1 · Act 4 — Unrest",
      pages: "./enbizaka/chapters/04-ch1-act4",
    },
    {
      id: "enb-ch1-act5",
      number: 5,
      title: "Chapter 1 · Act 5 — Visit",
      pages: "./enbizaka/chapters/05-ch1-act5",
    },
    {
      id: "enb-ch1-act6",
      number: 6,
      title: "Chapter 1 · Act 6 — Past Life",
      pages: "./enbizaka/chapters/06-ch1-act6",
    },
    {
      id: "enb-ch1-act7",
      number: 7,
      title: "Chapter 1 · Act 7 — Fate",
      pages: "./enbizaka/chapters/07-ch1-act7",
    },
    {
      id: "enb-ch2",
      number: 8,
      title: "Chapter 2 · The Tale of the Monk",
      pages: "./enbizaka/chapters/08-ch2",
    },
    {
      id: "enb-ch3",
      number: 9,
      title: "Chapter 3 · The Tale of Kokutan",
      pages: "./enbizaka/chapters/09-ch3",
    },
    {
      id: "enb-ch4",
      number: 10,
      title: "Chapter 4 · The Tale of the Mermaid",
      pages: "./enbizaka/chapters/10-ch4",
    },
    {
      id: "enb-ch5",
      number: 11,
      title: "Chapter 5 · The Tale of Enbizaka",
      pages: "./enbizaka/chapters/11-ch5",
      songIds: ["tailor-of-enbizaka"],
    },
    {
      id: "enb-bonus",
      number: 12,
      title: "Bonus · The Tale of the Judge",
      pages: "./enbizaka/chapters/12-bonus",
    },
    {
      id: "enb-docs",
      number: 13,
      title: "End-of-Book Documents",
      pages: "./enbizaka/chapters/13-docs",
    },
  ],
  afterword: {
    id: "enb-afterword",
    number: 99,
    title: "Afterword",
    pages: "./enbizaka/chapters/14-afterword",
  },
});
