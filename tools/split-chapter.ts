#!/usr/bin/env bun
// One-shot helper: split a combined chapter .md into per-page NN.md files in
// a per-chapter subfolder. Splits on `<!-- page -->` separators and emits a
// single-line illustration page for each `<!-- illustration: NAME -->` marker
// that appears as its own line.
//
// Usage:
//   bun tools/split-chapter.ts <path/to/chapter.md> [...more]
//
// For each input, creates a directory next to it named after the file stem
// and writes 01.md, 02.md, ... inside.

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";

const PAGE_MARKER = /^\s*<!--\s*page\s*-->\s*$/;
const ILL_MARKER = /^\s*<!--\s*illustration:\s*([\w-]+)\s*-->\s*$/;

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function trimEdges(arr: string[]): string[] {
  let i = 0;
  let j = arr.length;
  while (i < j && arr[i]!.trim() === "") i++;
  while (j > i && arr[j - 1]!.trim() === "") j--;
  return arr.slice(i, j);
}

function splitChapter(srcPath: string): { outDir: string; pages: number } {
  const outDir = srcPath.replace(/\.md$/, "");
  if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  const lines = readFileSync(srcPath, "utf-8").split(/\r?\n/);
  let buf: string[] = [];
  let n = 0;

  const flush = () => {
    const out = trimEdges(buf);
    if (out.length === 0) {
      buf = [];
      return;
    }
    n++;
    writeFileSync(join(outDir, `${pad(n)}.md`), out.join("\n") + "\n");
    buf = [];
  };

  for (const line of lines) {
    if (PAGE_MARKER.test(line)) {
      flush();
      continue;
    }
    const m = line.match(ILL_MARKER);
    if (m) {
      flush();
      n++;
      writeFileSync(join(outDir, `${pad(n)}.md`), `<!-- illustration: ${m[1]} -->\n`);
      continue;
    }
    buf.push(line);
  }
  flush();

  return { outDir, pages: n };
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("usage: bun tools/split-chapter.ts <chapter.md> [...]");
  process.exit(1);
}

for (const src of args) {
  const { outDir, pages } = splitChapter(src);
  console.log(`${src} → ${outDir}/  (${pages} pages)`);
}
