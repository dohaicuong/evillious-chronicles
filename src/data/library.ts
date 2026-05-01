export type Sin = "pride" | "lust" | "sloth" | "gluttony" | "greed" | "wrath" | "envy" | "origin"; // Eve Moonlit / Original Sin Story — precursor to the seven

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
    songIds: [
      "daughter-of-evil",
      "servant-of-evil",
      "regret-message",
      "daughter-of-white",
      "twiright-prank",
      "tree-maiden",
      "handbeat-clocktower",
      "blink",
      "heros-armor-crimson",
      "neomaria-inverted-gravestone",
      "swear-oath-bridge",
      "king-born-from-mud",
      "reach-for-the-stars",
    ],
    volumes: [
      {
        id: "cloture-of-yellow",
        number: 1,
        title: "Clôture of Yellow",
        sin: "pride",
        chapters: [
          { id: "cy-prologue", number: 0, title: "Prologue", pageCount: 1 },
          {
            id: "cy-ch1-s1",
            number: 1,
            title: "Chapter 1 · The Fourteenth Birthday",
            pageCount: 16,
          },
          {
            id: "cy-ch1-s2",
            number: 2,
            title: "Chapter 1 · Lodging in the Hearts of Evil",
            pageCount: 18,
          },
          {
            id: "cy-ch2-s1",
            number: 3,
            title: "Chapter 2 · The Yearning of a Twin",
            pageCount: 20,
          },
          {
            id: "cy-ch2-s2",
            number: 4,
            title: "Chapter 2 · The Gear's Direction",
            pageCount: 15,
          },
          {
            id: "cy-ch3-s1",
            number: 5,
            title: "Chapter 3 · Assembly of Allies",
            pageCount: 16,
          },
          {
            id: "cy-ch3-s2",
            number: 6,
            title: "Chapter 3 · The Wish for an End",
            pageCount: 22,
          },
          {
            id: "cy-ch4",
            number: 7,
            title: "Chapter 4 · True Evil?",
            pageCount: 25,
          },
        ],
      },
      {
        id: "wiegenlied-of-green",
        number: 2,
        title: "Wiegenlied of Green",
        sin: "pride",
        chapters: [
          { id: "wg-prologue", number: 0, title: "Prologue", pageCount: 1 },
          { id: "wg-ch1", number: 1, title: "Chapter 1 · Dream of a Mage", pageCount: 13 },
          {
            id: "wg-ch2-s1",
            number: 2,
            title: "Chapter 2 · The So-called Humans",
            pageCount: 22,
          },
          {
            id: "wg-ch2-s2",
            number: 3,
            title: "Chapter 2 · Wooden Girl and White-Haired Girl",
            pageCount: 22,
          },
          {
            id: "wg-ch3-s1",
            number: 4,
            title: "Chapter 3 · Waltz of the Diva",
            pageCount: 17,
          },
          {
            id: "wg-ch3-s2",
            number: 5,
            title: "Chapter 3 · The Lady Who Staggered",
            pageCount: 34,
          },
          {
            id: "wg-ch4-s1",
            number: 6,
            title: "Chapter 4 · Lost Destination",
            pageCount: 19,
          },
          {
            id: "wg-ch4-s2",
            number: 7,
            title: "Chapter 4 · Seaside's Small Bottle",
            pageCount: 19,
          },
        ],
      },
      {
        id: "praeludium-of-red",
        number: 3,
        title: "Praeludium of Red",
        sin: "pride",
        chapters: [
          { id: "pr-prologue", number: 0, title: "Prologue", pageCount: 4 },
          { id: "pr-ch1-s1", number: 1, title: "Chapter 1 · The Star Fortress", pageCount: 41 },
          {
            id: "pr-ch1-s2",
            number: 2,
            title: "Chapter 1 · Chance Meeting of a Sworn Friend",
            pageCount: 61,
          },
          {
            id: "pr-ch2-s1",
            number: 3,
            title: "Chapter 2 · Footprints of the Evil Food Eater",
            pageCount: 68,
          },
          {
            id: "pr-ch2-s2",
            number: 4,
            title: "Chapter 2 · The Signal Fire of a Counterattack",
            pageCount: 50,
          },
          {
            id: "pr-ch3-s1",
            number: 5,
            title: "Chapter 3 · The King and the Girl",
            pageCount: 52,
          },
          { id: "pr-ch3-s2", number: 6, title: "Chapter 3 · Full Moon Visitor", pageCount: 65 },
          {
            id: "pr-ch4",
            number: 7,
            title: "Chapter 4 · Time and a Forest and a Song",
            pageCount: 58,
          },
          {
            id: "pr-epilogue",
            number: 8,
            title: "Epilogue · To the Blue Country",
            pageCount: 28,
          },
        ],
      },
      {
        id: "praefacio-of-blue",
        number: 4,
        title: "Praefacio of Blue",
        sin: "pride",
        chapters: [
          { id: "pb-prologue", number: 0, title: "Prologue", pageCount: 3 },
          {
            id: "pb-ch1",
            number: 1,
            title: "Chapter 1 · Signs of the Enemy at Sea",
            pageCount: 78,
          },
          {
            id: "pb-ch2-s1",
            number: 2,
            title: "Chapter 2 · Hometown of Misgivings",
            pageCount: 67,
          },
          {
            id: "pb-ch2-s2",
            number: 3,
            title: "Chapter 2 · The Sorceress and the Forest",
            pageCount: 81,
          },
          {
            id: "pb-ch3-s1",
            number: 4,
            title: "Chapter 3 · The Inside Story on the Girl",
            pageCount: 61,
          },
          {
            id: "pb-ch3-s2",
            number: 5,
            title: "Chapter 3 · A Heartbeat in the Rain",
            pageCount: 115,
          },
          {
            id: "pb-ch4-s1",
            number: 6,
            title: "Chapter 4 · The Monastery on the Seashore",
            pageCount: 30,
          },
          {
            id: "pb-ch4-s2",
            number: 7,
            title: "Chapter 4 · With That Person",
            pageCount: 49,
          },
          {
            id: "pb-epilogue",
            number: 8,
            title: "Epilogue · Prelude of Things to Come",
            pageCount: 18,
          },
        ],
      },
    ],
  },
  {
    id: "deadly-sins-of-evil",
    title: "Deadly Sins of Evil",
    description:
      "Eight novels chronicling the demons that haunt Evillious — one per sin, with a finale that draws every cycle home. Spans a thousand years of the continent of Bolganio.",
    songIds: [
      "lunacy-of-duke-venomania",
      "evil-food-eater-conchita",
      "daughter-of-evil",
      "gift-from-princess-sleep",
      "tailor-of-enbizaka",
      "judgment-of-corruption",
      "muzzle-of-nemesis",
    ],
    volumes: [
      {
        id: "venomania",
        number: 1,
        title: "The Lunacy of Duke Venomania",
        sin: "lust",
        chapters: [
          { id: "ven-prologue", number: 0, title: "Prologue", pageCount: 1 },
          { id: "ven-ch1", number: 1, title: "Chapter 1 · Lukana Octo", pageCount: 8 },
          { id: "ven-ch2", number: 2, title: "Chapter 2 · Mikulia Greeonio", pageCount: 5 },
          { id: "ven-ch3", number: 3, title: "Chapter 3 · Gumina Glassred", pageCount: 9 },
          { id: "ven-ch4", number: 4, title: "Chapter 4 · Yufina Marlon", pageCount: 6 },
        ],
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
        id: "princess-sleep",
        number: 3,
        title: "Gift from the Princess Who Brought Sleep",
        sin: "sloth",
        chapters: makeChapters("ps", [
          "Margarita's Garden",
          "The Sleeping Princess Gift",
          "A Country Without Pain",
          "The Doctor's Wife",
          "The Final Cup",
        ]),
      },
      {
        id: "fifth-pierrot",
        number: 4,
        title: "Fifth Pierrot",
        sin: "pride",
        chapters: makeChapters("fp", [
          "The Travelling Troupe",
          "Behind the Mask",
          "A Pierrot's Confession",
          "The Stage at Lucifenia",
          "The Final Bow",
        ]),
      },
      {
        id: "enbizaka",
        number: 5,
        title: "The Tailor of Enbizaka",
        sin: "envy",
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
        id: "judgment",
        number: 6,
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
        number: 7,
        title: "The Muzzle of Nemesis",
        sin: "wrath",
        chapters: makeChapters("mn", [
          "Nemesis Sudou",
          "The Père Noël Contract",
          "The Sniper's Vow",
          "A Father's Reckoning",
          "The Final Shot",
        ]),
      },
      {
        id: "heavenly-yard",
        number: 8,
        title: "Master of the Heavenly Yard",
        sin: "pride",
        chapters: makeChapters("hy", [
          "The Master Returns",
          "All Seven Vessels",
          "Allen's Reckoning",
          "The Last Chapter",
        ]),
      },
    ],
  },
  {
    id: "original-sin",
    title: "Original Sin Story",
    description:
      "The genesis arc of Evillious — Eve Moonlit's crime in the forest, the splitting of the Original Sin into the seven vessels, and the corruption that birthed an entire continent's cycle.",
    songIds: [
      "queen-of-the-glass",
      "project-ma",
      "escape-of-salmhofer",
      "moonlit-bear",
      "barisols-child",
      "ma-survival",
      "whereabouts-of-miracle",
      "recollective-musicbox",
      "song-i-heard-somewhere",
      "tale-of-abandonment-moonlit",
      "chrono-story",
    ],
    volumes: [
      {
        id: "oss-crime",
        number: 1,
        title: "Original Sin Story: Crime",
        sin: "origin",
        chapters: makeChapters("ossc", [
          "Eve and Adam",
          "Held's Forest",
          "The Apple Falls",
          "The Twins' Pact",
          "A Sin Unspoken",
        ]),
      },
      {
        id: "oss-punishment",
        number: 2,
        title: "Original Sin Story: Punishment",
        sin: "origin",
        chapters: makeChapters("ossp", [
          "Levia's Reckoning",
          "Behemo's Fall",
          "The Forest Decrees",
          "The Curtain Rises",
          "The First Demon",
        ]),
      },
    ],
  },
  {
    id: "clockwork-lullaby",
    title: "Clockwork Lullaby Series",
    description:
      "A song cycle of twelve tracks that incorporate the Clockwork Lullaby motif into every entry — the thread that ties the cycles of Evillious together. mothy planned twelve songs (Clockwork Lullaby 1–9 plus three sequels) collected on the Zenmai Jikake no Komoriuta album.",
    songIds: [
      "wordplay",
      "clockwork-lullaby",
      "miniature-garden-girl",
      "re-birthday",
      "heartbeat-clocktower",
      "chrono-story",
      "capriccio-farce",
      "seven-crimes-and-punishments",
      "song-i-heard-somewhere",
      "swear-oath-bridge",
      "banica-concerto",
      "karma-of-evil",
      "song-third-period",
      "screws-gears-pride",
      "recollective-musicbox",
    ],
    volumes: [],
  },
  {
    id: "four-endings",
    title: "Four Endings Series",
    description:
      "Four songs depicting the Four Last Things — Judgment, Death, Hell, and Heaven. Master of the Court (Judgment), Master of the Graveyard (Death), Master of the Hellish Yard (Hell), and Master of the Heavenly Yard (Heaven), the latter serving as the grand finale to both the Four Endings and the Seven Deadly Sins of Evil arcs.",
    songIds: [
      "master-of-the-court",
      "master-of-the-graveyard",
      "master-of-hellish-yard",
      "master-of-heavenly-yard",
    ],
    volumes: [],
  },
];
