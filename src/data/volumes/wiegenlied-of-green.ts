import type { ImageAsset, Volume } from "@src/data/schema";
import { loadPagesGlob, makePagesBuilder } from "./_shared";

/*
 * The Daughter of Evil — Volume 2: Wiegenlied of Green (悪ノ娘 — 緑のヴィーゲンリート)
 *
 * Assets live under `public/wiegenlied-of-green/...` (cover + 7 artworks + 9 illustrations).
 * Chapter prose is loaded from .md files alongside this fixture.
 * POV markers in the prose: ☯ Elluka, ✿ Michaela, ♥ Clarith.
 */

const illustrations: Record<string, ImageAsset> = {
  "illustration-1": {
    src: "/wiegenlied-of-green/illustration-1.jpg",
    alt: "Elluka in the Millennium Tree Forest with Michaela the robin on her shoulder",
  },
  "illustration-2": {
    src: "/wiegenlied-of-green/illustration-2.jpg",
    alt: "Michaela and Gumillia — the forest spirits in their new human bodies",
  },
  "illustration-3": {
    src: "/wiegenlied-of-green/illustration-3.jpg",
    alt: "Clarith in her village home — the white-haired Netsuma girl",
  },
  "illustration-4": {
    src: "/wiegenlied-of-green/illustration-4.jpg",
    alt: "Michaela singing the Music Box Lullaby on Yatski hill",
  },
  "illustration-5": {
    src: "/wiegenlied-of-green/illustration-5.jpg",
    alt: "Michaela and Clarith at the Freesis mansion",
  },
  "illustration-6": {
    src: "/wiegenlied-of-green/illustration-6.jpg",
    alt: "Leaving the Freesis mansion as Lucifenia closes in",
  },
  "illustration-7": {
    src: "/wiegenlied-of-green/illustration-7.jpg",
    alt: "Clarith at the Port Town monastery — refuge after the fall of Toragay",
  },
  "illustration-8": {
    src: "/wiegenlied-of-green/illustration-8.jpg",
    alt: "Clarith and the blonde stranger at the seaside monastery",
  },
  "illustration-9": {
    src: "/wiegenlied-of-green/illustration-9.jpg",
    alt: "The sapling planted on the unknown coast — Wooden Girl reborn",
  },
};

const buildPages = makePagesBuilder(illustrations);

const prologuePages = loadPagesGlob(
  import.meta.glob("./wiegenlied-of-green/chapters/00-prologue/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);
const ch1Pages = loadPagesGlob(
  import.meta.glob("./wiegenlied-of-green/chapters/01-ch1-dream-of-mage/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);
const ch2s1Pages = loadPagesGlob(
  import.meta.glob("./wiegenlied-of-green/chapters/02-ch2-s1-so-called-humans/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);
const ch2s2Pages = loadPagesGlob(
  import.meta.glob("./wiegenlied-of-green/chapters/03-ch2-s2-wooden-girl/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);
const ch3s1Pages = loadPagesGlob(
  import.meta.glob("./wiegenlied-of-green/chapters/04-ch3-s1-waltz-of-diva/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);
const ch3s2Pages = loadPagesGlob(
  import.meta.glob("./wiegenlied-of-green/chapters/05-ch3-s2-lady-who-staggered/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);
const ch4s1Pages = loadPagesGlob(
  import.meta.glob("./wiegenlied-of-green/chapters/06-ch4-s1-lost-destination/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);
const ch4s2Pages = loadPagesGlob(
  import.meta.glob("./wiegenlied-of-green/chapters/07-ch4-s2-seasides-small-bottle/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);

export const wiegenliedOfGreen: Volume = {
  id: "wiegenlied-of-green",
  slug: "wiegenlied-of-green",
  number: 2,

  title: "Wiegenlied of Green",
  originalTitle: "緑のヴィーゲンリート",
  romanizedTitle: "Midori no Wīgenrīto",

  sin: "pride",
  series: "the-daughter-of-evil",

  cover: {
    src: "/wiegenlied-of-green/cover.jpg",
    alt: "Wiegenlied of Green — Michaela and Clarith beneath the Millennium Tree at dusk",
    credit: "Cover Illustration by 鈴ノ助",
    width: 960,
    height: 548,
  },

  titlePage: {
    title: "The Daughter of Evil",
    subtitle: "Wiegenlied of Green",
    credits: [
      { role: "Original Work", name: "Akuno_P (mothy)" },
      {
        role: "Illustration",
        name: "鈴ノ助 (Suzunosuke), 壱加 (Ichika), 忱, なぎみそ (Nagimiso), かる (Karu), ゆーりん (Yūrin) @ 北乃友利, 吉田ドンドリアン (Yoshida Dondrian)",
      },
      { role: "Publisher", name: "雪名残" },
      { role: "Distributor", name: "雪名残" },
    ],
    publisher: "雪名残",
    distributor: "雪名残",
  },

  openingPoetry: {
    title: "Daughter of White",
    attribution: "Lyrics: Akuno_P (mothy)",
    songId: "daughter-of-white",
    stanzas: [
      { lines: ["Scene 1 · Forest"] },
      {
        lines: [
          '"I\'m sorry for being alive"',
          "A habit I keep on saying; I've always been softly complaining",
          "A meaningless existence",
        ],
      },
      {
        lines: [
          "Everybody in my village has beautiful green hair",
          "I'm an outcast with white hair that no one has",
          "Deep in the forest stands an old tree",
          "I always come here alone and pray to God",
        ],
      },
      {
        lines: ["Living all alone is very sad", "I just want someone, anyone", "To be my friend"],
      },
      { lines: ["Scene 2 · Village"] },
      {
        lines: [
          "Not very long, I met her",
          "It began when she fell to the ground near the Thousand-Year Tree.",
          "I rescued her.",
          "Before long, we became close",
          "But that girl and I are very different",
          "She had the most beautiful green hair in the village",
          "She was loved by everyone with her kind voice and smile",
          "Why are you being so kind to me?",
          "Are you just pitying me because I'm so inferior to you?",
          "You gently hold me and say to me as I was cringing",
          '"You\'re the most wonderful person I met"',
          "I cried in her arms",
          "Even if the entire world laughed and despised me",
          "I had a person who needed me; that's all I need to be happy",
        ],
      },
      { lines: ["Scene 3 · Urban"] },
      {
        lines: [
          "We ran away from the village and started living in the city.",
          "Even though everything seems unfamiliar, it's okay because we're together",
          "We became servants under a wealthy merchant lady",
          "It's a job we chose in order to live",
          "One day, a blue-haired man came by the mansion",
          "Their encounter twisted everything",
          "A king from across the ocean.",
          "He fell deeply in love with her",
          "So much that he rejected the neighbouring queen's marriage proposal",
        ],
      },
      {
        lines: [
          "The land was engulfed in war; the queen gave the order:",
          '"Seek out every green-haired woman and kill them"',
          "Everyone, everyone was gone",
          "Except for myself with the white hair",
          "I wish that I could've died in your place",
          "Why… Why…",
        ],
      },
      { lines: ["Scene 3.5 · Revolution"] },
    ],
  },

  openingGallery: [
    {
      illustration: {
        src: "/wiegenlied-of-green/artwork-1.jpg",
        alt: "Wiegenlied of Green — opening artwork 1",
      },
    },
    {
      illustration: {
        src: "/wiegenlied-of-green/artwork-2.jpg",
        alt: "Wiegenlied of Green — opening artwork 2",
      },
    },
    {
      illustration: {
        src: "/wiegenlied-of-green/artwork-3.jpg",
        alt: "Wiegenlied of Green — opening artwork 3",
      },
    },
    {
      illustration: {
        src: "/wiegenlied-of-green/artwork-4.jpg",
        alt: "Wiegenlied of Green — opening artwork 4",
      },
    },
    {
      illustration: {
        src: "/wiegenlied-of-green/artwork-5.jpg",
        alt: "Wiegenlied of Green — opening artwork 5",
      },
    },
    {
      illustration: {
        src: "/wiegenlied-of-green/artwork-6.jpg",
        alt: "Wiegenlied of Green — opening artwork 6",
      },
    },
    {
      illustration: {
        src: "/wiegenlied-of-green/artwork-7.jpg",
        alt: "Wiegenlied of Green — opening artwork 7",
      },
    },
  ],

  chapters: [
    {
      id: "wg-prologue",
      number: 0,
      title: "Prologue",
      pages: buildPages(...prologuePages),
      songIds: ["daughter-of-white"],
    },
    {
      id: "wg-ch1",
      number: 1,
      title: "Chapter 1 · Dream of a Mage",
      pages: buildPages(...ch1Pages),
    },
    {
      id: "wg-ch2-s1",
      number: 2,
      title: "Chapter 2 · The So-called Humans",
      pages: buildPages(...ch2s1Pages),
    },
    {
      id: "wg-ch2-s2",
      number: 3,
      title: "Chapter 2 · Wooden Girl and White-Haired Girl",
      pages: buildPages(...ch2s2Pages),
    },
    {
      id: "wg-ch3-s1",
      number: 4,
      title: "Chapter 3 · Waltz of the Diva",
      pages: buildPages(...ch3s1Pages),
    },
    {
      id: "wg-ch3-s2",
      number: 5,
      title: "Chapter 3 · The Lady Who Staggered",
      pages: buildPages(...ch3s2Pages),
    },
    {
      id: "wg-ch4-s1",
      number: 6,
      title: "Chapter 4 · Lost Destination",
      pages: buildPages(...ch4s1Pages),
    },
    {
      id: "wg-ch4-s2",
      number: 7,
      title: "Chapter 4 · Seaside's Small Bottle",
      pages: buildPages(...ch4s2Pages),
    },
  ],

  description:
    "The second volume of The Daughter of Evil — told from the green country, Elphegort, as the Lucifenian war engulfs it. The forest spirit Michaela takes human form to find a sin vessel; the white-haired outcast Clarith, despised as a Netsuma, finds her first friend. Their lullaby threads through the Story of Evil from the other side of the sea.",

  translation: {
    language: "en",
    source: "fan",
  },
};
