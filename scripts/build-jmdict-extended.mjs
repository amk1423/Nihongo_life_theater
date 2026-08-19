import fs from "node:fs/promises";
import zlib from "node:zlib";

const release = "3.6.2+20260817122448";
const asset = `jmdict-eng-${release}.json.tgz`;
const localArchive = new URL("../data/jmdict-full.json.tgz", import.meta.url);
const url = `https://github.com/scriptin/jmdict-simplified/releases/download/${encodeURIComponent(release)}/${asset}`;

async function readArchive() {
  let source;
  try {
    source = await fs.readFile(localArchive);
  } catch {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Download failed: ${response.status}`);
    source = Buffer.from(await response.arrayBuffer());
  }

  const tar = zlib.gunzipSync(source);
  for (let offset = 0; offset < tar.length; offset += 512) {
    const name = tar.toString("utf8", offset, offset + 100).replace(/\0.*$/, "");
    const sizeText = tar.toString("ascii", offset + 124, offset + 136).replace(/\0.*$/, "").trim();
    const size = sizeText ? parseInt(sizeText, 8) : 0;
    if (name && size) return JSON.parse(tar.toString("utf8", offset + 512, offset + 512 + size));
    if (!name && !size) break;
    offset += Math.ceil(size / 512) * 512 - 512;
  }
  throw new Error("Dictionary archive did not contain a JSON file");
}

const dictionary = await readArchive();
const entries = dictionary.words.flatMap((entry) => {
  const glosses = [...new Set(entry.sense.flatMap((sense) => sense.gloss.filter((item) => item.lang === "eng").map((item) => item.text)))].slice(0, 8);
  const pos = [...new Set(entry.sense.flatMap((sense) => sense.partOfSpeech))];
  const kanjiForms = entry.kanji.length ? entry.kanji : [{ text: entry.kana[0]?.text, common: false }];
  return kanjiForms.filter((kanji) => kanji.text).map((kanji) => {
    const readings = entry.kana.filter((kana) => kana.appliesToKanji.includes("*") || kana.appliesToKanji.includes(kanji.text)).map((kana) => kana.text);
    return { word: kanji.text, readings: [...new Set(readings)], glosses, pos, common: kanji.common };
  });
}).filter((entry) => entry.readings.length && entry.glosses.length).map(({ glosses, ...entry }) => entry);

const readings = {};
for (const entry of entries) {
  readings[entry.word] = [...new Set([...(readings[entry.word] || []), ...entry.readings])];
}

await fs.writeFile(new URL("../data/jmdict-extended.json", import.meta.url), JSON.stringify({ source: "JMdict English full", release, entries }));
await fs.writeFile(new URL("../data/jmdict-readings.json", import.meta.url), JSON.stringify({ source: "JMdict readings", release, readings }));
console.log(`Wrote ${entries.length} entries from ${asset}`);
