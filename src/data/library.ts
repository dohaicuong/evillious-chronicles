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

// Eager glob over every chapter page file across every volume. Returns a map
// of project-relative paths → loader. We don't load the content here — just
// count the keys per chapter directory to derive `pageCount`.
const ALL_PAGE_FILES = import.meta.glob("./volumes/**/chapters/**/*.md");

function pageCountFor(volumeSlug: string, chapterDir: string): number {
  const prefix = `./volumes/${volumeSlug}/chapters/${chapterDir}/`;
  let n = 0;
  for (const k in ALL_PAGE_FILES) if (k.startsWith(prefix)) n++;
  return n;
}

// Compact chapter constructor for implemented volumes. `dir` is the
// per-chapter folder name under `src/data/volumes/<slug>/chapters/`; the
// page-count comes from counting `.md` files there.
function chap(volumeSlug: string, dir: string, id: string, number: number, title: string): Chapter {
  return { id, number, title, pageCount: pageCountFor(volumeSlug, dir) };
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
          chap("cloture-of-yellow", "00-prologue", "cy-prologue", 0, "Prologue"),
          chap(
            "cloture-of-yellow",
            "01-ch1-s1-fourteenth-birthday",
            "cy-ch1-s1",
            1,
            "Chapter 1 · The Fourteenth Birthday",
          ),
          chap(
            "cloture-of-yellow",
            "02-ch1-s2-lodging",
            "cy-ch1-s2",
            2,
            "Chapter 1 · Lodging in the Hearts of Evil",
          ),
          chap(
            "cloture-of-yellow",
            "03-ch2-s1-yearning",
            "cy-ch2-s1",
            3,
            "Chapter 2 · The Yearning of a Twin",
          ),
          chap(
            "cloture-of-yellow",
            "04-ch2-s2-gear",
            "cy-ch2-s2",
            4,
            "Chapter 2 · The Gear's Direction",
          ),
          chap(
            "cloture-of-yellow",
            "05-ch3-s1-allies",
            "cy-ch3-s1",
            5,
            "Chapter 3 · Assembly of Allies",
          ),
          chap(
            "cloture-of-yellow",
            "06-ch3-s2-wish-for-end",
            "cy-ch3-s2",
            6,
            "Chapter 3 · The Wish for an End",
          ),
          chap("cloture-of-yellow", "07-ch4-true-evil", "cy-ch4", 7, "Chapter 4 · True Evil?"),
        ],
      },
      {
        id: "wiegenlied-of-green",
        number: 2,
        title: "Wiegenlied of Green",
        sin: "pride",
        chapters: [
          chap("wiegenlied-of-green", "00-prologue", "wg-prologue", 0, "Prologue"),
          chap(
            "wiegenlied-of-green",
            "01-ch1-dream-of-mage",
            "wg-ch1",
            1,
            "Chapter 1 · Dream of a Mage",
          ),
          chap(
            "wiegenlied-of-green",
            "02-ch2-s1-so-called-humans",
            "wg-ch2-s1",
            2,
            "Chapter 2 · The So-called Humans",
          ),
          chap(
            "wiegenlied-of-green",
            "03-ch2-s2-wooden-girl",
            "wg-ch2-s2",
            3,
            "Chapter 2 · Wooden Girl and White-Haired Girl",
          ),
          chap(
            "wiegenlied-of-green",
            "04-ch3-s1-waltz-of-diva",
            "wg-ch3-s1",
            4,
            "Chapter 3 · Waltz of the Diva",
          ),
          chap(
            "wiegenlied-of-green",
            "05-ch3-s2-lady-who-staggered",
            "wg-ch3-s2",
            5,
            "Chapter 3 · The Lady Who Staggered",
          ),
          chap(
            "wiegenlied-of-green",
            "06-ch4-s1-lost-destination",
            "wg-ch4-s1",
            6,
            "Chapter 4 · Lost Destination",
          ),
          chap(
            "wiegenlied-of-green",
            "07-ch4-s2-seasides-small-bottle",
            "wg-ch4-s2",
            7,
            "Chapter 4 · Seaside's Small Bottle",
          ),
        ],
      },
      {
        id: "praeludium-of-red",
        number: 3,
        title: "Praeludium of Red",
        sin: "pride",
        chapters: [
          chap("praeludium-of-red", "00-prologue", "pr-prologue", 0, "Prologue"),
          chap(
            "praeludium-of-red",
            "01-ch1-s1-star-fortress",
            "pr-ch1-s1",
            1,
            "Chapter 1 · The Star Fortress",
          ),
          chap(
            "praeludium-of-red",
            "02-ch1-s2-chance-meeting",
            "pr-ch1-s2",
            2,
            "Chapter 1 · Chance Meeting of a Sworn Friend",
          ),
          chap(
            "praeludium-of-red",
            "03-ch2-s1-evil-food-eater",
            "pr-ch2-s1",
            3,
            "Chapter 2 · Footprints of the Evil Food Eater",
          ),
          chap(
            "praeludium-of-red",
            "04-ch2-s2-counterattack",
            "pr-ch2-s2",
            4,
            "Chapter 2 · The Signal Fire of a Counterattack",
          ),
          chap(
            "praeludium-of-red",
            "05-ch3-s1-king-and-girl",
            "pr-ch3-s1",
            5,
            "Chapter 3 · The King and the Girl",
          ),
          chap(
            "praeludium-of-red",
            "06-ch3-s2-full-moon-visitor",
            "pr-ch3-s2",
            6,
            "Chapter 3 · Full Moon Visitor",
          ),
          chap(
            "praeludium-of-red",
            "07-ch4-time-forest-song",
            "pr-ch4",
            7,
            "Chapter 4 · Time and a Forest and a Song",
          ),
          chap(
            "praeludium-of-red",
            "08-epilogue-blue-country",
            "pr-epilogue",
            8,
            "Epilogue · To the Blue Country",
          ),
        ],
      },
      {
        id: "praefacio-of-blue",
        number: 4,
        title: "Praefacio of Blue",
        sin: "pride",
        chapters: [
          chap("praefacio-of-blue", "00-prologue", "pb-prologue", 0, "Prologue"),
          chap(
            "praefacio-of-blue",
            "01-ch1-signs-of-enemy",
            "pb-ch1",
            1,
            "Chapter 1 · Signs of the Enemy at Sea",
          ),
          chap(
            "praefacio-of-blue",
            "02-ch2-s1-hometown-misgivings",
            "pb-ch2-s1",
            2,
            "Chapter 2 · Hometown of Misgivings",
          ),
          chap(
            "praefacio-of-blue",
            "03-ch2-s2-sorceress-and-forest",
            "pb-ch2-s2",
            3,
            "Chapter 2 · The Sorceress and the Forest",
          ),
          chap(
            "praefacio-of-blue",
            "04-ch3-s1-inside-story",
            "pb-ch3-s1",
            4,
            "Chapter 3 · The Inside Story on the Girl",
          ),
          chap(
            "praefacio-of-blue",
            "05-ch3-s2-heartbeat-rain",
            "pb-ch3-s2",
            5,
            "Chapter 3 · A Heartbeat in the Rain",
          ),
          chap(
            "praefacio-of-blue",
            "06-ch4-s1-monastery-seashore",
            "pb-ch4-s1",
            6,
            "Chapter 4 · The Monastery on the Seashore",
          ),
          chap(
            "praefacio-of-blue",
            "07-ch4-s2-with-that-person",
            "pb-ch4-s2",
            7,
            "Chapter 4 · With That Person",
          ),
          chap(
            "praefacio-of-blue",
            "08-epilogue-prelude",
            "pb-epilogue",
            8,
            "Epilogue · Prelude of Things to Come",
          ),
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
          chap("venomania", "00-prologue", "ven-prologue", 0, "Prologue"),
          chap("venomania", "01-ch1", "ven-ch1", 1, "Chapter 1 · Lukana Octo"),
          chap("venomania", "02-ch2", "ven-ch2", 2, "Chapter 2 · Mikulia Greeonio"),
          chap("venomania", "03-ch3", "ven-ch3", 3, "Chapter 3 · Gumina Glassred"),
          chap("venomania", "04-ch4", "ven-ch4", 4, "Chapter 4 · Yufina Marlon"),
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
