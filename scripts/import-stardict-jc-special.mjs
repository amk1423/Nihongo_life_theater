import fs from "node:fs/promises";
import zlib from "node:zlib";

const root = new URL("../", import.meta.url);
const archiveDir = new URL("data/stardict-jc-special-2.4.2/", root);
const idxPath = new URL("jc-special.idx", archiveDir);
const dictPath = new URL("jc-special.dict.dz", archiveDir);

const idx = await fs.readFile(idxPath);
const dict = zlib.gunzipSync(await fs.readFile(dictPath));
const entries = {};

for (let cursor = 0; cursor < idx.length;) {
  const wordEnd = idx.indexOf(0, cursor);
  if (wordEnd < 0 || wordEnd + 9 > idx.length) break;
  const word = idx.toString("utf8", cursor, wordEnd).trim();
  const offset = idx.readUInt32BE(wordEnd + 1);
  const size = idx.readUInt32BE(wordEnd + 5);
  const meaning = dict.toString("utf8", offset, offset + size).replace(/\s+/g, " ").trim();
  if (word && meaning) entries[word] = meaning;
  cursor = wordEnd + 9;
}

await fs.writeFile(new URL("data/jc-special.json", root), JSON.stringify(entries));
console.log(`Wrote ${Object.keys(entries).length} entries from jc-special`);
