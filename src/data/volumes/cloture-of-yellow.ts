import type { ImageAsset, Page, Volume } from "../schema";

import prologueText from "./cloture-of-yellow/chapters/00-prologue.md?raw";
import ch1s1Text from "./cloture-of-yellow/chapters/01-ch1-s1-fourteenth-birthday.md?raw";
import ch1s2Text from "./cloture-of-yellow/chapters/02-ch1-s2-lodging.md?raw";
import ch2s1Text from "./cloture-of-yellow/chapters/03-ch2-s1-yearning.md?raw";
import ch2s2Text from "./cloture-of-yellow/chapters/04-ch2-s2-gear.md?raw";
import ch3s1Text from "./cloture-of-yellow/chapters/05-ch3-s1-allies.md?raw";
import ch3s2Text from "./cloture-of-yellow/chapters/06-ch3-s2-wish-for-end.md?raw";
import ch4Text from "./cloture-of-yellow/chapters/07-ch4-true-evil.md?raw";

/*
 * The Daughter of Evil — Volume 1: Clôture of Yellow (悪ノ娘 — 黄のクロアチュール)
 *
 * Assets live under `public/cloture-of-yellow/...` (cover + 5 artworks + N illustrations).
 * Chapter prose is loaded from .md files alongside this fixture.
 * Inline illustrations: place `<!-- illustration: NAME -->` in the markdown
 * and add NAME to the `illustrations` map below; buildPages splits the prose
 * around the marker and inserts an illustration Page at that position.
 * Translation source: ltquick.nl
 */

const illustrations: Record<string, ImageAsset> = {
  "illustration-1": {
    src: "/cloture-of-yellow/illustration-1.jpg",
    alt: "Chapter 1 illustration — the missing princess",
  },
  "illustration-2": {
    src: "/cloture-of-yellow/illustration-2.jpg",
    alt: "Allen's vow — \"I will become evil for you\"",
  },
  "illustration-3": {
    src: "/cloture-of-yellow/illustration-3.jpg",
    alt: "The courtyard — two girls washing clothes by the pool",
  },
  "illustration-4": {
    src: "/cloture-of-yellow/illustration-4.jpg",
    alt: "Mariam stopping Elluka in the corridor",
  },
  "illustration-5": {
    src: "/cloture-of-yellow/illustration-5.jpg",
    alt: "Clarith and Germaine — the resistance proposal",
  },
  "illustration-6": {
    src: "/cloture-of-yellow/illustration-6.jpg",
    alt: "Allen and Gast — the locked gaze",
  },
  "illustration-7": {
    src: "/cloture-of-yellow/illustration-7.jpg",
    alt: "Riliane holding back tears",
  },
  "illustration-8": {
    src: "/cloture-of-yellow/illustration-8.jpg",
    alt: "Riliane sobbing",
  },
  "illustration-9": {
    src: "/cloture-of-yellow/illustration-9.jpg",
    alt: "The third bell — Allen's farewell",
  },
};

function buildPages(markdown: string): Page[] {
  const parts = markdown.split(/<!--\s*illustration:\s*([\w-]+)\s*-->/);
  const pages: Page[] = [];
  let pageNum = 1;
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      const text = parts[i].trim();
      if (text) pages.push({ number: pageNum++, layout: "prose", text });
    } else {
      const illustration = illustrations[parts[i]];
      if (illustration) pages.push({ number: pageNum++, layout: "illustration", illustration });
    }
  }
  return pages;
}

export const clotureOfYellow: Volume = {
  id: "cloture-of-yellow",
  slug: "cloture-of-yellow",
  number: 1,

  title: "Clôture of Yellow",
  originalTitle: "黄のクロアチュール",
  romanizedTitle: "Ki no Kuroachūru",

  sin: "pride",
  series: "the-daughter-of-evil",

  cover: {
    src: "/cloture-of-yellow/cover.jpg",
    alt: "Clôture of Yellow — twin protagonists framed by gears and a candlelit castle",
    credit: "Cover Illustration by 一色",
  },

  titlePage: {
    title: "The Daughter of Evil",
    subtitle: "Clôture of Yellow",
    credits: [
      { role: "Original Work", name: "Akuno_P (mothy)" },
      { role: "Illustration", name: "壱加 (Ichika), 忱, ゆのみ (Yunomi)" },
      { role: "Publisher", name: "雪名残" },
      { role: "Distributor", name: "雪名残" },
    ],
    publisher: "雪名残",
    distributor: "雪名残",
  },

  openingPoetry: {
    title: "Daughter of Evil",
    attribution: "Poetry: Akuno_P (mothy)",
    songId: "daughter-of-evil",
    stanzas: [
      {
        lines: [
          "A long, long time ago in a certain place",
          "Was a kingdom so evil no person dared to face",
          "And there as ruler was a girl so mean",
          "A little, tiny princess of only age 14!",
        ],
      },
      {
        lines: [
          "Luxurious furniture littered her abode",
          "With a loyal servant whose likeness surely showed",
          "Josephine is what her beloved horse was named",
          "All the riches of the world is what she had claimed",
        ],
      },
      {
        lines: [
          "If you were short on money that was no fearful thing",
          "Just squeeze it out from those whom you dangle on a string",
          "As for those who feel that they can bring me down,",
          "They'll just tidy up my gown!",
        ],
      },
      { lines: ['"Now, bow before me!"'] },
      {
        lines: [
          "Evil Flowers",
          "Steadily bloom",
          "With an array of colorful doom",
          "As for the weeds who feel they want to stay",
          "Ah, they'll just die and feed me the same anyway",
        ],
      },
      {
        lines: [
          "The princess held a love for a man",
          "Of blue from across the sea who wasn't very much her fan",
          "Instead he chose his neighbor's girl",
          "Of green whose eyes shone like a pearl!",
        ],
      },
      {
        lines: [
          "The princess knew this and was filled with rage",
          "She called up the minister and locked her in a cage",
          "And said in a quiet voice not to be heard",
        ],
      },
      { lines: ['"Make sure the country of green is boldly stirred"'] },
      {
        lines: [
          "Numerous houses were burnt to the ground",
          "So many voices would no longer make a sound",
          "All the people who had suffered so much pain",
          "Does not get pity from the one who'd slain",
        ],
      },
      { lines: ['"Oh, it\'s snack time!"'] },
      {
        lines: [
          "Evil flowers",
          "Steadily bloom",
          "With an array of bloodied doom",
          "Even though the flower is so very refined",
          "Ah, it thorns has caused its garden to decline",
        ],
      },
      {
        lines: [
          "To defeat this evil princess was no easy task",
          "But now the people would no longer wear their mask",
          "So like a bevy of birds they were led by",
          "A red swordsman into the nigh!",
        ],
      },
      {
        lines: [
          "All the anger that had piled over the years",
          "Now consumed them without any fears",
          "Since now the army was weak from the war before",
          "Their attacks weren't much of a chore",
        ],
      },
      {
        lines: [
          "Finally the countrymen surrounded the court",
          "Servants also ran away as time was short",
          "Lovely dainty princess would not pose a fight",
          "And was finally captured into the night!",
        ],
      },
      { lines: ['"This is very rude of you!"'] },
      {
        lines: [
          "Evil flowers",
          "Steadily bloom",
          "With an array of very fun doom",
          "How is that the paradise she made for herself",
          "Ah, put this broken doll back onto the shelf!",
        ],
      },
      {
        lines: [
          "A long, long time ago in a certain place",
          "Was a kingdom so evil no person dared to face",
          "And there as ruler was a girl so mean",
          "A little tiny princess of only age 14!",
        ],
      },
      {
        lines: [
          "She was to be punished at 3 o'clock",
          "The time when the church bell resounded a tock",
          "The person who was once royalty",
          "Was bored in jail with no loyalty",
        ],
      },
      {
        lines: [
          "Soon the time finally came",
          "To her, the church bells sounded rather lame",
          "Then without looking at the faces of the crowd",
          "Said with her eyes in a shroud,",
        ],
      },
      { lines: ['"Oh, it\'s snack time."'] },
      {
        lines: [
          "Evil flower",
          "Steadily blooms",
          "With an array of colorful doom",
          "Now people speak of her without second thought",
          '"Ah, the Daughter of Evil had received what she sought!"',
        ],
      },
    ],
  },

  openingGallery: [
    {
      illustration: {
        src: "/cloture-of-yellow/artwork-1.jpg",
        alt: "Clôture of Yellow — opening artwork 1",
      },
    },
    {
      illustration: {
        src: "/cloture-of-yellow/artwork-2.jpg",
        alt: "Clôture of Yellow — opening artwork 2",
      },
    },
    {
      illustration: {
        src: "/cloture-of-yellow/artwork-3.jpg",
        alt: "Clôture of Yellow — opening artwork 3",
      },
    },
    {
      illustration: {
        src: "/cloture-of-yellow/artwork-4.jpg",
        alt: "Clôture of Yellow — opening artwork 4",
      },
    },
    {
      illustration: {
        src: "/cloture-of-yellow/artwork-5.jpg",
        alt: "Clôture of Yellow — opening artwork 5",
      },
    },
  ],

  chapters: [
    {
      id: "cy-prologue",
      number: 0,
      title: "Prologue",
      pages: [{ number: 1, layout: "prose", text: prologueText, songCue: "daughter-of-evil" }],
      songIds: ["daughter-of-evil"],
    },
    {
      id: "cy-ch1-s1",
      number: 1,
      title: "Chapter 1 · The Fourteenth Birthday",
      pages: buildPages(ch1s1Text),
    },
    {
      id: "cy-ch1-s2",
      number: 2,
      title: "Chapter 1 · Lodging in the Hearts of Evil",
      pages: buildPages(ch1s2Text),
    },
    {
      id: "cy-ch2-s1",
      number: 3,
      title: "Chapter 2 · The Yearning of a Twin",
      pages: buildPages(ch2s1Text),
    },
    {
      id: "cy-ch2-s2",
      number: 4,
      title: "Chapter 2 · The Gear's Direction",
      pages: buildPages(ch2s2Text),
    },
    {
      id: "cy-ch3-s1",
      number: 5,
      title: "Chapter 3 · Assembly of Allies",
      pages: buildPages(ch3s1Text),
    },
    {
      id: "cy-ch3-s2",
      number: 6,
      title: "Chapter 3 · The Wish for an End",
      pages: buildPages(ch3s2Text),
    },
    {
      id: "cy-ch4",
      number: 7,
      title: "Chapter 4 · True Evil?",
      pages: buildPages(ch4Text),
    },
  ],

  description:
    "The first volume of The Daughter of Evil — told from Riliane's perspective. Fourteen years old and the absolute ruler of Lucifenia, the princess watches her kingdom turn to ruin while the servant who shares her face stands at her side.",

  translation: {
    language: "en",
    source: "fan",
    translator: "ltquick.nl",
    url: "https://www.ltquick.nl/pdf/ClotureofYellowBetterVersion.pdf",
  },
};
