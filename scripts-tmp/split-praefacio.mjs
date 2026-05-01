#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";
import { join, basename } from "node:path";

const CHAP_DIR =
  "/home/yukiyami/Desktop/evillious-chronicles/evillious-chronicles/src/data/volumes/praefacio-of-blue/chapters";
const ILLUSTRATION_RE = /<!--\s*illustration:\s*([\w-]+)\s*-->/g;

const files = readdirSync(CHAP_DIR).filter((f) => f.endsWith(".md") && f !== "afterword.md");

for (const f of files) {
  const stem = basename(f, ".md");
  const src = readFileSync(join(CHAP_DIR, f), "utf8");
  const chunks = src.split(/<!--\s*page\s*-->/);
  const pages = [];
  for (const chunk of chunks) {
    const parts = chunk.split(ILLUSTRATION_RE);
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        const prose = parts[i].trim();
        if (prose) pages.push({ kind: "prose", text: prose });
      } else {
        pages.push({ kind: "ill", name: parts[i] });
      }
    }
  }
  if (pages.length === 0) {
    const prose = src.trim();
    if (prose) pages.push({ kind: "prose", text: prose });
  }
  const outDir = join(CHAP_DIR, stem);
  mkdirSync(outDir, { recursive: true });
  pages.forEach((p, idx) => {
    const nn = String(idx + 1).padStart(2, "0");
    const outPath = join(outDir, `${nn}.md`);
    const content = p.kind === "prose" ? p.text + "\n" : `<!-- illustration: ${p.name} -->\n`;
    writeFileSync(outPath, content);
  });
  console.log(`${stem}: ${pages.length} pages written`);
  unlinkSync(join(CHAP_DIR, f));
}
