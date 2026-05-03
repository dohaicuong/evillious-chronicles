import type { SlimChapter, SlimVolume } from "@app/library/-volumes/_shared";
import type { Sin } from "@src/lib/schema";
import { clotureOfYellow } from "@app/library/-volumes/cloture-of-yellow";
import { conchita } from "@app/library/-volumes/conchita";
import { enbizaka } from "@app/library/-volumes/enbizaka";
import { fifthPierrot } from "@app/library/-volumes/fifth-pierrot";
import { judgment } from "@app/library/-volumes/judgment";
import { heavenlyYard } from "@app/library/-volumes/heavenly-yard";
import { nemesis } from "@app/library/-volumes/nemesis";
import { praefacioOfBlue } from "@app/library/-volumes/praefacio-of-blue";
import { ossCrime } from "@app/library/-volumes/oss-crime";
import { ossPunishment } from "@app/library/-volumes/oss-punishment";
import { praeludiumOfRed } from "@app/library/-volumes/praeludium-of-red";
import { princessSleep } from "@app/library/-volumes/princess-sleep";
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
      conchita.slim,
      princessSleep.slim,
      fifthPierrot.slim,
      enbizaka.slim,
      judgment.slim,
      nemesis.slim,
      heavenlyYard.slim,
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
    volumes: [ossCrime.slim, ossPunishment.slim],
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
