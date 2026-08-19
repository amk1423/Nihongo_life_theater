import fs from "node:fs/promises";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const elements = new Map();
const makeElement = () => ({
  innerHTML: "",
  textContent: "",
  value: "",
  hidden: false,
  style: {},
  dataset: {},
  classList: { add() {}, remove() {}, toggle() {} },
  addEventListener() {},
  querySelectorAll() { return []; },
  querySelector() { return makeElement(); },
  focus() {},
  requestSubmit() {},
  scrollTop: 0,
  scrollHeight: 0
});
const getElement = (selector) => {
  if (!elements.has(selector)) elements.set(selector, makeElement());
  return elements.get(selector);
};
const storage = new Map();
const document = {
  querySelector: getElement,
  querySelectorAll() { return []; },
  addEventListener() {}
};
const context = {
  console,
  document,
  localStorage: { getItem: (key) => storage.get(key) || null, setItem: (key, value) => storage.set(key, String(value)) },
  location: { protocol: "http:" },
  navigator: { serviceWorker: { register: async () => {} } },
  window: {
    document,
    location: { protocol: "http:" },
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    addEventListener() {},
    scrollTo() {},
    speechSynthesis: { cancel() {}, speak() {} }
  },
  fetch: async (request) => {
    const url = new URL(String(request), "http://local.test/");
    if (url.origin !== "http://local.test") throw new Error(`Unexpected external request: ${url.href}`);
    const filePath = path.join(projectRoot, url.pathname.replace(/^\//, ""));
    try {
      const text = await fs.readFile(filePath, "utf8");
      return { ok: true, status: 200, json: async () => JSON.parse(text) };
    } catch {
      return { ok: false, status: 404, json: async () => ({}) };
    }
  }
};
vm.createContext(context);
const source = await fs.readFile(path.join(projectRoot, "app.js"), "utf8");
vm.runInContext(`${source}\n;globalThis.__dictionaryTest = { lookupOnlineDictionary };`, context, { filename: "app.js" });

const queries = process.argv.slice(2);
const defaults = ["车站", "厕所", "学校", "冰箱", "新宿", "駅", "eki", "不存在的中文词"];
for (const query of (queries.length ? queries : defaults)) {
  const result = await context.__dictionaryTest.lookupOnlineDictionary(query);
  console.log(JSON.stringify({ query, entries: result.entries.slice(0, 3).map(({ word, hiragana, romanization, meanings, source }) => ({ word, hiragana, romanization, meanings, source })) }, null, 2));
}
