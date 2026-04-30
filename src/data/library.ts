export type Sin = "pride" | "lust" | "sloth" | "gluttony" | "greed" | "wrath" | "envy";

export type Chapter = {
  id: string;
  number: number;
  title: string;
  pageCount: number;
};

export type Volume = {
  id: string;
  number: number;
  title: string;
  sin: Sin | null;
  chapters: Chapter[];
};

export type Series = {
  id: string;
  title: string;
  description: string;
  volumes: Volume[];
  // Songs from the global catalog (`src/data/songs.ts`) associated with this
  // series. Rendered as a list on the series detail page.
  songIds?: string[];
};

function makeChapters(prefix: string, titles: string[]): Chapter[] {
  return titles.map((title, i) => ({
    id: `${prefix}-${i + 1}`,
    number: i + 1,
    title,
    pageCount: 16 + ((i * 7) % 14),
  }));
}

export const series: Series[] = [
  {
    id: "the-daughter-of-evil",
    title: "The Daughter of Evil",
    description:
      "A four-volume light-novel chronicle of Riliane Lucifen d'Autriche — the tyrant princess at the heart of the Story of Evil. Each volume retells the kingdom's fall from a different perspective, color-coded by the role its narrator plays in the cycle.",
    songIds: ["daughter-of-evil", "servant-of-evil", "regret-message"],
    volumes: [
      {
        id: "cloture-of-yellow",
        number: 1,
        title: "Clôture of Yellow",
        sin: "pride",
        chapters: [
          { id: "cy-prologue", number: 0, title: "Prologue", pageCount: 2 },
          {
            id: "cy-ch1-s1",
            number: 1,
            title: "Chapter 1 · The Fourteenth Birthday",
            pageCount: 38,
          },
          {
            id: "cy-ch1-s2",
            number: 2,
            title: "Chapter 1 · Lodging in the Hearts of Evil",
            pageCount: 42,
          },
          {
            id: "cy-ch2-s1",
            number: 3,
            title: "Chapter 2 · The Yearning of a Twin",
            pageCount: 48,
          },
          {
            id: "cy-ch2-s2",
            number: 4,
            title: "Chapter 2 · The Gear's Direction",
            pageCount: 34,
          },
          {
            id: "cy-ch3-s1",
            number: 5,
            title: "Chapter 3 · Assembly of Allies",
            pageCount: 38,
          },
          {
            id: "cy-ch3-s2",
            number: 6,
            title: "Chapter 3 · The Wish for an End",
            pageCount: 46,
          },
          {
            id: "cy-ch4",
            number: 7,
            title: "Chapter 4 · True Evil?",
            pageCount: 54,
          },
        ],
      },
      {
        id: "wiegenlied-of-green",
        number: 2,
        title: "Wiegenlied of Green",
        sin: "pride",
        chapters: makeChapters("wg", [
          "Forest of Bewilderment",
          "Michaela's Lullaby",
          "Held's Whisper",
          "The Green-Cloaked Visitor",
          "Sweet Songs of Elphegort",
          "A Body Made of Wood",
        ]),
      },
      {
        id: "praeludium-of-red",
        number: 3,
        title: "Praeludium of Red",
        sin: "pride",
        chapters: makeChapters("pr", [
          "Germaine's Vow",
          "The Red-Armoured Swordsman",
          "Beelzenia's Knight",
          "The Sea of Bandits",
          "A Sister Lost",
          "The Revolution Begins",
        ]),
      },
      {
        id: "praefacio-of-blue",
        number: 4,
        title: "Praefacio of Blue",
        sin: "pride",
        chapters: makeChapters("pb", [
          "Allen's Vow",
          "The Servant's Final Hour",
          "On the Day You Were Born",
          "The Twin's Pact",
          "Re_birthday",
          "Aftermath",
        ]),
      },
    ],
  },
  {
    id: "seven-deadly-sins",
    title: "The Seven Deadly Sins Series",
    description:
      "Seven novels chronicling the demons that haunt Evillious — one per sin, woven across a thousand years of the continent of Bolganio.",
    volumes: [
      {
        id: "venomania",
        number: 1,
        title: "The Lunacy of Duke Venomania",
        sin: "lust",
        chapters: makeChapters("ven", [
          "The Duke's Mansion",
          "The Mirror's Promise",
          "Seven Brides",
          "The Hunter's Knife",
          "Banica's Ruin",
          "The Final Hymn",
        ]),
      },
      {
        id: "conchita",
        number: 2,
        title: "Evil Food Eater Conchita",
        sin: "gluttony",
        chapters: makeChapters("con", [
          "The Banquet at Beelzenia",
          "The Glass of Conchita",
          "The Royal Chef",
          "Twenty-Six Courses",
          "Marrow and Bone",
          "What the Vessel Holds",
          "Conchita's Smile",
        ]),
      },
      {
        id: "judgment",
        number: 3,
        title: "Judgment of Corruption",
        sin: "greed",
        chapters: makeChapters("jc", [
          "Master of the Court",
          "The Black Box of Held",
          "Coin and Conscience",
          "The Daughter Gallerian Found",
          "Verdicts in Gold",
          "The Witch of Merrigod",
          "Levia's Bargain",
          "Hellish Yard",
        ]),
      },
      {
        id: "muzzle",
        number: 4,
        title: "The Muzzle of Nemesis",
        sin: "sloth",
        chapters: makeChapters("mn", [
          "Margarita's Garden",
          "The Sleeping Princess Gift",
          "A Country Without Pain",
          "The Doctor's Wife",
          "The Final Cup",
        ]),
      },
      {
        id: "enbizaka",
        number: 5,
        title: "The Tailor of Enbizaka",
        sin: "wrath",
        chapters: makeChapters("enb", [
          "The Shop on Enbizaka Street",
          "The Red Kimono",
          "The Green Obi",
          "The Yellow Hairpin",
          "The Blue Geta",
          "Kayo's Stitches",
        ]),
      },
      {
        id: "capriccio-farce",
        number: 6,
        title: "Capriccio Farce",
        sin: "envy",
        chapters: makeChapters("cf", [
          "Mikulia's Mirror",
          "The Theater Troupe",
          "A Sister's Envy",
          "The Twin's Curtain",
          "Nemesis Sudou",
        ]),
      },
    ],
  },
  {
    id: "clockwork-lullaby",
    title: "Clockwork Lullaby",
    description:
      "The pocket watch that ticks behind every story — the song that ties demons, masters, and souls into a thousand-year cycle of sin.",
    volumes: [
      {
        id: "lullaby-1",
        number: 1,
        title: "Clockwork Lullaby",
        sin: null,
        chapters: makeChapters("cl", [
          "The Master Winds the Watch",
          "Twin Hands of the Clock",
          "Echoes Across Bolganio",
          "The Final Tick",
        ]),
      },
    ],
  },
  {
    id: "original-sin",
    title: "Original Sin Story",
    description:
      "Before the seven sins, before the Master of the Court — the genesis arc of Levin's twins and the corruption that birthed an entire continent's evil.",
    volumes: [
      {
        id: "project-ma",
        number: 1,
        title: "Project 'Ma'",
        sin: null,
        chapters: makeChapters("pm", [
          "The Twin Goddesses",
          "Held's Forest",
          "The Black Box",
          "Eve and Adam",
          "The Deliverance Root",
          "First Cycle",
        ]),
      },
      {
        id: "praeludium-of-red",
        number: 2,
        title: "Praeludium of Red",
        sin: null,
        chapters: makeChapters("por", [
          "Before the Sound of Bells",
          "The Forest's Decree",
          "A Servant Unborn",
          "Held's Lament",
          "The Curtain Rises",
        ]),
      },
    ],
  },
];
