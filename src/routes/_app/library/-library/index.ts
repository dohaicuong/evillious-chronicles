import type { SlimChapter, SlimVolume } from "@app/library/-volumes/_shared";
import type { Sin } from "@src/lib/schema";
import { clotureOfYellow } from "@app/library/-volumes/cloture-of-yellow";
import { praefacioOfBlue } from "@app/library/-volumes/praefacio-of-blue";
import { praeludiumOfRed } from "@app/library/-volumes/praeludium-of-red";
import { venomania } from "@app/library/-volumes/venomania";
import { wiegenliedOfGreen } from "@app/library/-volumes/wiegenlied-of-green";

export type { Sin };
export type Chapter = SlimChapter;
export type Volume = SlimVolume;

export type Series = {
  id: string;
  title: string;
  description: string;
  volumes: Volume[];
  // Songs from the global catalog (`@app/songs/-songs`) associated with this
  // series. Rendered as a list on the series detail page.
  songIds?: string[];
};

// Skeleton chapter list for volumes that haven't been wired in yet — page
// counts are deterministic placeholders, ids follow `<prefix>-<n>`. Once a
// volume gets a manifest in `-volumes/`, replace its entry below with the
// imported `slim` view.
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
      clotureOfYellow.slim,
      wiegenliedOfGreen.slim,
      praeludiumOfRed.slim,
      praefacioOfBlue.slim,
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
      venomania.slim,
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
