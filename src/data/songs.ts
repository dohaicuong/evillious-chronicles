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
];

export const songs: Record<string, Song> = Object.fromEntries(all.map((s) => [s.id, s]));

export function getSong(id: string): Song | undefined {
  return songs[id];
}
