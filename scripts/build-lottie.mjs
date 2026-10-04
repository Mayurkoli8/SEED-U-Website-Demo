/**
 * Turns the raw After Effects export (design/lottie/corn-growing.source.json)
 * into the web-ready file the site loads (public/lottie/corn-growing.json):
 *
 *  1. Recolours it to the SEED U palette (earthy soil, SEED U greens, warm gold).
 *  2. Retimes it: long holds between growth stages are shortened so the plant
 *     responds quickly when driven by scroll. Growth phases keep their length.
 *  3. Shrinks it: rounds numbers to 2 decimals, drops editor-only metadata, minifies.
 *
 * Run: npm run lottie
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const SRC = "design/lottie/corn-growing.source.json";
const OUT = "public/lottie/corn-growing.json";

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);

// Source colour (0–255 "r,g,b") → SEED U colour.
const PALETTE = {
  "98,155,33": "#4b8a3b", // leaf green → leaf
  "131,186,58": "#74a95c", // light green → leaf-bright
  "226,195,96": "#e2b54e", // corn & silk gold → warm gold
};
const GROUND = "#a07b52"; // the ground mound shares the gold in the source; make it soil

// Old frame → new frame. Holds (20 frames) become 3; growth phases stay 10.
// New stage frames: sprout 16 · young plant 29 · cobs 42 · tassel 55 · full 68.
const TIME_MAP = [
  [0, 0], [20, 6], [30, 16], [50, 19], [60, 29], [80, 32], [90, 42],
  [110, 45], [120, 55], [140, 58], [150, 68], [240, 90],
];

function remapTime(t) {
  for (let i = 1; i < TIME_MAP.length; i++) {
    const [a0, b0] = TIME_MAP[i - 1];
    const [a1, b1] = TIME_MAP[i];
    if (t <= a1) return b0 + ((t - a0) / (a1 - a0)) * (b1 - b0);
  }
  return TIME_MAP.at(-1)[1];
}

const key = (c) => c.slice(0, 3).map((v) => Math.round(v * 255)).join(",");

function walk(node, { ground }) {
  if (Array.isArray(node)) return node.forEach((n) => walk(n, { ground }));
  if (!node || typeof node !== "object") return;

  delete node.mn; // editor match-names, unused at runtime

  // Static fill/stroke colours
  if ((node.ty === "fl" || node.ty === "st") && node.c && node.c.a === 0) {
    const target = ground ? GROUND : PALETTE[key(node.c.k)];
    if (target) node.c.k = [...rgb(target), node.c.k[3] ?? 1];
  }

  // Animated property: retime every keyframe
  if (node.a === 1 && Array.isArray(node.k)) {
    for (const kf of node.k) if (typeof kf.t === "number") kf.t = remapTime(kf.t);
  }

  for (const v of Object.values(node)) walk(v, { ground });
}

const round = (_, v) => (typeof v === "number" ? Math.round(v * 100) / 100 : v);

const src = JSON.parse(readFileSync(SRC, "utf8"));
delete src.meta;
src.nm = "SEED U corn growing";
src.op = remapTime(src.op);
for (const layer of src.layers) {
  layer.ip = remapTime(layer.ip);
  layer.op = remapTime(layer.op);
  walk(layer, { ground: layer.nm === "Ground Outlines" });
}

const out = JSON.stringify(src, round);
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, out);
const before = readFileSync(SRC).length;
console.log(`${OUT}: ${(before / 1024).toFixed(0)} KB → ${(out.length / 1024).toFixed(0)} KB, ${src.op} frames @ ${src.fr.toFixed(2)} fps`);
