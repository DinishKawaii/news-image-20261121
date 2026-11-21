// news-image-20261121 — "The World Today", Saturday 21 November 2026.
// The entry image lives in this repository as entry.png; this program
// copies it to the output directory. No network, no randomness:
// every run writes exactly the same bytes.
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const source = join(repoDir, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

if (!existsSync(source)) {
  throw new Error(`entry image not found: ${source}`);
}
const expected = statSync(source).size;
mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
const size = statSync(target).size;
if (size !== expected) {
  throw new Error(`copy incomplete: ${size} of ${expected} bytes`);
}
const sha = createHash("sha256").update(readFileSync(target)).digest("hex");
console.log(`wrote ${target}: ${size} bytes, sha256 ${sha}`);
