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
];

export const songs: Record<string, Song> = Object.fromEntries(all.map((s) => [s.id, s]));

export function getSong(id: string): Song | undefined {
  return songs[id];
}
