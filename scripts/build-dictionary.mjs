import fs from "node:fs/promises";
import zlib from "node:zlib";

const release = "3.6.2+20260817122448";
const asset = `jmdict-eng-common-${release}.json.tgz`;
const url = `https://github.com/scriptin/jmdict-simplified/releases/download/${encodeURIComponent(release)}/${asset}`;

function extractTarGz(buffer) {
  const tar = zlib.gunzipSync(buffer);
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

const response = await fetch(url);
if (!response.ok) throw new Error(`Download failed: ${response.status}`);
const source = await response.arrayBuffer();
const dictionary = extractTarGz(Buffer.from(source));

const entries = dictionary.words.flatMap((entry) => {
  const glosses = [...new Set(entry.sense.flatMap((sense) => sense.gloss.filter((item) => item.lang === "eng").map((item) => item.text)))].slice(0, 8);
  const pos = [...new Set(entry.sense.flatMap((sense) => sense.partOfSpeech))];
  const kanjiForms = entry.kanji.length ? entry.kanji : [{ text: entry.kana[0]?.text, common: true }];
  return kanjiForms.filter((kanji) => kanji.text).map((kanji) => {
    const readings = entry.kana.filter((kana) => kana.appliesToKanji.includes("*") || kana.appliesToKanji.includes(kanji.text)).map((kana) => kana.text);
    return { word: kanji.text, readings: [...new Set(readings)], glosses, pos, common: kanji.common };
  });
}).filter((entry) => entry.readings.length && entry.glosses.length);

await fs.mkdir("data", { recursive: true });
await fs.writeFile("data/jmdict-common.json", JSON.stringify({ source: "JMdict English common", release, entries }, null, 0));
console.log(`Wrote ${entries.length} entries from ${asset}`);
