import type { Song } from "./schema";

/*
 * Global song catalog. Songs are independent works that cross-reference
 * volumes — Poetry.songId, Page.songCue, Chapter.songIds all reference
 * songs by id from this catalog.
 */

const all: Song[] = [
  {
    id: "daughter-of-evil",
    title: "Daughter of Evil",
    originalTitle: "悪ノ娘",
    romanizedTitle: "Aku no Musume",
    youtubeUrl: "https://www.youtube.com/watch?v=W77q-kK8iA8",
    duration: 232,
    vocalist: "Kagamine Rin",
    composer: "Akuno-P (mothy)",
    releaseYear: 2008,
  },
  {
    id: "servant-of-evil",
    title: "Servant of Evil",
    originalTitle: "悪ノ召使",
    romanizedTitle: "Aku no Meshitsukai",
    youtubeUrl: "https://www.youtube.com/watch?v=yzpNpaS0uLc",
    duration: 241,
    vocalist: "Kagamine Len",
    composer: "Akuno-P (mothy)",
    releaseYear: 2008,
  },
  {
    id: "regret-message",
    title: "Regret Message",
    originalTitle: "リグレットメッセージ",
    romanizedTitle: "Riguretto Messēji",
    youtubeUrl: "https://www.youtube.com/watch?v=7bdSWHkHbec",
    duration: 207,
    vocalist: "Kagamine Rin",
    composer: "Akuno-P (mothy)",
    releaseYear: 2008,
  },
  {
    id: "daughter-of-white",
    title: "Daughter of White",
    originalTitle: "白ノ娘",
    romanizedTitle: "Shiro no Musume",
    youtubeUrl: "https://www.youtube.com/watch?v=LMIsQWvgEUM",
    duration: 360,
    vocalist: "Hatsune Miku",
    composer: "Akuno-P (mothy)",
    releaseYear: 2009,
  },
  {
    id: "twiright-prank",
    title: "Twiright Prank",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "tree-maiden",
    title: "Tree Maiden ~Millennium Wiegenlied~",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "handbeat-clocktower",
    title: "Handbeat Clocktower",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "blink",
    title: "Blink",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "heros-armor-crimson",
    title: "A Hero's Armor is Always Crimson",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "neomaria-inverted-gravestone",
    title: "Neomaria of the Inverted Gravestone",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "swear-oath-bridge",
    title: "Swear an Oath on that Bridge",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "king-born-from-mud",
    title: "That King was Born from Mud",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "reach-for-the-stars",
    title: "Reach for the Stars ~The Letter She Kept Waiting For~",
    composer: "Akuno-P (mothy)",
  },

  // --- Deadly Sins of Evil song series ---
  {
    id: "lunacy-of-duke-venomania",
    title: "The Lunacy of Duke Venomania",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "evil-food-eater-conchita",
    title: "Evil Food Eater Conchita",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "gift-from-princess-sleep",
    title: "Gift from the Princess who Brought Sleep",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "tailor-of-enbizaka",
    title: "The Tailor of Enbizaka",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "judgment-of-corruption",
    title: "Judgment of Corruption",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "muzzle-of-nemesis",
    title: "The Muzzle of Nemesis",
    composer: "Akuno-P (mothy)",
  },

  // --- Original Sin Story songs ---
  {
    id: "queen-of-the-glass",
    title: "Queen of the Glass",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "project-ma",
    title: "Project 'Ma'",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "escape-of-salmhofer",
    title: "Escape of Salmhofer the Witch",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "moonlit-bear",
    title: "Moonlit Bear",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "barisols-child",
    title: "Barisol's Child is an Only Child",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "ma-survival",
    title: "Ma Survival",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "whereabouts-of-miracle",
    title: "Whereabouts of the Miracle",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "recollective-musicbox",
    title: "Recollective Musicbox",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "song-i-heard-somewhere",
    title: "The Song I Heard Somewhere",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "tale-of-abandonment-moonlit",
    title: "Tale of Abandonment on a Moonlit Night",
    composer: "Akuno-P (mothy)",
  },
  {
    id: "chrono-story",
    title: "Chrono Story",
    composer: "Akuno-P (mothy)",
  },
];

export const songs: Record<string, Song> = Object.fromEntries(all.map((s) => [s.id, s]));

export function getSong(id: string): Song | undefined {
  return songs[id];
}
