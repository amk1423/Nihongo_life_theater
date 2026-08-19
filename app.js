const scenes = [
  {
    id: "ticket",
    number: "01",
    symbol: "駅",
    title: "车站买票",
    description: "从窗口买一张去东京的车票。",
    goal: "你要去哪里？先学会说出目的地。",
    duration: "约 5 分钟",
    phrases: [
      { jp: "東京までお願いします。", zh: "请给我一张到东京的票。", roman: "Tokyo made onegaishimasu." },
      { jp: "片道ですか、往復ですか？", zh: "单程还是往返？", roman: "Katamichi desu ka, oufuku desu ka?" },
      { jp: "片道でお願いします。", zh: "请给我单程票。", roman: "Katamichi de onegaishimasu." }
    ],
    turns: [
      { npc: "こんにちは。どちらまでですか？", zh: "你好，请问要去哪里？", roman: "Konnichiwa. Dochira made desu ka?", hint: "目的地 + までお願いします", replies: ["東京までお願いします。", "新宿までお願いします。"], expected: ["東京", "新宿", "まで", "とうきょう", "しんじゅく"] },
      { npc: "片道ですか、往復ですか？", zh: "单程还是往返？", roman: "Katamichi desu ka, oufuku desu ka?", hint: "选择：片道（单程）或往復（往返）", replies: ["片道でお願いします。", "往復でお願いします。"], expected: ["片道", "往復", "かたみち", "おうふく"] },
      { npc: "わかりました。410円です。", zh: "好的，一共410日元。", roman: "Wakarimashita. Yonhyaku juu-en desu.", hint: "试着说：好的，请给你钱。", replies: ["はい、どうぞ。", "ありがとうございます。"], expected: ["はい", "どうぞ", "ありがとう", "ありがとうございます"] },
      { npc: "ありがとうございます。良い旅を！", zh: "谢谢，祝你旅途愉快！", roman: "Arigatou gozaimasu. Yoi tabi o!", hint: "用一句谢谢结束对话。", replies: ["ありがとうございます。", "はい、ありがとう。"], expected: ["ありがとう"] }
    ]
  },
  {
    id: "directions",
    number: "02",
    symbol: "↗",
    title: "问路与换乘",
    description: "在陌生车站找到正确的换乘路线。",
    goal: "先学会礼貌地问：去哪里？",
    duration: "约 5 分钟",
    phrases: [
      { jp: "すみません、渋谷駅はどこですか？", zh: "不好意思，涩谷站在哪里？", roman: "Sumimasen, Shibuya-eki wa doko desu ka?" },
      { jp: "この電車で大丈夫です。", zh: "坐这班电车就可以。", roman: "Kono densha de daijoubu desu." },
      { jp: "助かりました、ありがとうございます。", zh: "帮大忙了，谢谢。", roman: "Tasukarimashita, arigatou gozaimasu." }
    ],
    turns: [
      { npc: "どうしましたか？", zh: "怎么了吗？", roman: "Dou shimashita ka?", hint: "先用すみません（不好意思）引起对方注意。", replies: ["すみません。", "すみません、お願いします。"], expected: ["すみません", "sumimasen"] },
      { npc: "どこへ行きたいですか？", zh: "你想去哪里？", roman: "Doko e ikitai desu ka?", hint: "说出地点：涩谷站是 渋谷駅。", replies: ["渋谷駅へ行きたいです。", "渋谷駅はどこですか？"], expected: ["渋谷", "駅", "涩谷", "しぶや"] },
      { npc: "2番線の電車に乗ってください。", zh: "请乘坐2号线的电车。", roman: "Ni-bansen no densha ni notte kudasai.", hint: "可以先回应：好的。", replies: ["はい、わかりました。", "はい、ありがとうございます。"], expected: ["はい", "わかりました", "ありがとう"] },
      { npc: "気をつけて行ってください。", zh: "路上请小心。", roman: "Ki o tsukete itte kudasai.", hint: "用谢谢结束这次问路。", replies: ["ありがとうございます。", "助かりました。"], expected: ["ありがとう", "助かりました"] }
    ]
  },
  {
    id: "taxi",
    number: "03",
    symbol: "＋",
    title: "出租车沟通",
    description: "告诉司机目的地，并确认时间和费用。",
    goal: "学会说：请带我去这里。",
    duration: "约 5 分钟",
    phrases: [
      { jp: "この住所までお願いします。", zh: "请带我到这个地址。", roman: "Kono juusho made onegaishimasu." },
      { jp: "どのくらいかかりますか？", zh: "大概要花多长时间？", roman: "Dono kurai kakarimasu ka?" },
      { jp: "ここで大丈夫です。", zh: "在这里停就可以了。", roman: "Koko de daijoubu desu." }
    ],
    turns: [
      { npc: "こんにちは。どちらまで行きますか？", zh: "你好，请问要去哪里？", roman: "Konnichiwa. Dochira made ikimasu ka?", hint: "可以用：这个地址 + までお願いします。", replies: ["この住所までお願いします。", "東京駅までお願いします。"], expected: ["住所", "東京駅", "まで", "お願いします"] },
      { npc: "はい、かしこまりました。", zh: "好的，明白了。", roman: "Hai, kashikomarimashita.", hint: "试着问：大概需要多久？", replies: ["どのくらいかかりますか？", "ありがとうございます。"], expected: ["どのくらい", "かかります", "ありがとう"] },
      { npc: "20分くらいかかります。", zh: "大约需要20分钟。", roman: "Nijuppun kurai kakarimasu.", hint: "回应：好的，麻烦你了。", replies: ["はい、お願いします。", "わかりました。"], expected: ["はい", "お願いします", "わかりました"] },
      { npc: "到着しました。", zh: "到了。", roman: "Touchaku shimashita.", hint: "用：这里就可以了。", replies: ["ここで大丈夫です。", "ありがとうございます。"], expected: ["ここ", "大丈夫", "ありがとう"] }
    ]
  }
];

const wordMeanings = {
  "こんにちは": "你好",
  "どちら": "哪里／哪一边",
  "まで": "到……为止",
  "ですか": "吗？（疑问）",
  "東京": "东京",
  "新宿": "新宿",
  "切符": "车票",
  "片道": "单程",
  "往復": "往返",
  "わかりました": "明白了",
  "はい": "好的／是的",
  "どうぞ": "请／给你",
  "ありがとうございます": "谢谢（礼貌）",
  "良い旅": "愉快的旅程",
  "旅": "旅途",
  "どこ": "哪里",
  "行きたい": "想去",
  "渋谷": "涩谷",
  "新宿": "新宿（东京地名）",
  "駅": "车站",
  "食べる": "吃",
  "ホテル": "酒店／旅馆",
  "東京": "东京",
  "タクシー": "出租车",
  "この": "这个",
  "電車": "电车",
  "大丈夫": "没问题／可以",
  "すみません": "不好意思／对不起",
  "お願いします": "拜托了／请",
  "2番線": "2号站台",
  "乗ってください": "请乘坐",
  "乗る": "乘坐／搭乘",
  "気をつけて": "请小心",
  "助かりました": "帮大忙了",
  "住所": "地址",
  "かしこまりました": "明白了（非常礼貌）",
  "どのくらい": "多久／多少",
  "かかります": "需要花费（时间或费用）",
  "20分": "20分钟",
  "ここ": "这里",
  "到着": "到达",
  "しました": "已经做了／完成了"
};

const defaultProgress = { streak: 1, completed: 0, reviewItems: [], lastScene: "ticket" };
const state = {
  progress: loadProgress(),
  activeScene: scenes[0],
  turnIndex: 0,
  messages: [],
  mistakes: [],
  showHint: true,
  showReading: false,
  showRoman: false,
  secondsLeft: 300,
  timerId: null,
  sessionCompleted: false
};
let deferredInstallPrompt = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function loadProgress() {
  try { return { ...defaultProgress, ...(JSON.parse(localStorage.getItem("nihongo-life-progress")) || {}) }; }
  catch { return { ...defaultProgress }; }
}

function saveProgress() { localStorage.setItem("nihongo-life-progress", JSON.stringify(state.progress)); }

function updateProgressUI() {
  $("#sidebar-streak").textContent = `${state.progress.streak} 天连续`;
  $("#home-streak").textContent = state.progress.streak;
  $("#home-review-count").textContent = state.progress.reviewItems.length || 3;
  $("#review-total-count").textContent = state.progress.reviewItems.length || 3;
  $("#progress-bar-fill").style.width = `${Math.min(92, 28 + state.progress.completed * 12)}%`;
  $("#progress-copy").textContent = state.progress.completed ? "做得很好，今天的练习已经留下了一个脚印。" : "再完成一次练习，就能保持今天的节奏。";
}

function sceneCard(scene, library = false) {
  return `<article class="scene-card" data-scene="${scene.id}" tabindex="0" role="button" aria-label="开始${scene.title}">
    <div class="scene-card-top"><div class="scene-symbol">${scene.symbol}</div><span class="scene-number">${scene.number} / 03</span></div>
    <div><h3>${scene.title}</h3><p>${scene.description}</p></div>
    <div class="scene-card-footer"><span>${scene.duration}</span><span class="card-arrow">↗</span></div>
  </article>`;
}

function renderSceneLists() {
  $("#home-scenes").innerHTML = scenes.map((scene) => sceneCard(scene)).join("");
  $("#all-scenes").innerHTML = scenes.map((scene) => sceneCard(scene, true)).join("");
  $$(".scene-card").forEach((card) => {
    card.addEventListener("click", () => startSession(card.dataset.scene));
    card.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); startSession(card.dataset.scene); } });
  });
}

function renderReviewList() {
  const items = state.progress.reviewItems.length ? state.progress.reviewItems : scenes[0].phrases;
  $("#review-list").innerHTML = items.slice(0, 8).map((item, index) => `<article class="review-item">
    <div class="review-item-index">${String(index + 1).padStart(2, "0")}</div>
    <div><h3>${renderJapaneseText(item.jp)}</h3><p>${item.zh}</p></div>
    <button class="audio-button" data-speak="${encodeURIComponent(item.jp)}" title="朗读句子" aria-label="朗读 ${item.jp}">◖</button>
  </article>`).join("");
  $$("[data-speak]").forEach((button) => button.addEventListener("click", () => speak(decodeURIComponent(button.dataset.speak))));
  bindWordTokens($("#review-list"));
}

let dictionaryRequestId = 0;
let dictionarySearchTimer = null;
const jotobaApi = "https://jotoba.de/api/search/words";
const jotobaNamesApi = "https://jotoba.de/api/search/names";
const wiktionaryApi = "https://zh.wiktionary.org/w/api.php?action=query&format=json&prop=extracts&explaintext=1&origin=*";
let localDictionaryPromise = null;
let localNamesPromise = null;

const localChineseAliases = {
  "车站": "駅", "火车": "電車", "电车": "電車", "涩谷": "渋谷", "涉谷": "渋谷", "新宿": "新宿", "东京": "東京", "酒店": "ホテル", "旅馆": "ホテル", "吃": "食べる", "谢谢": "ありがとう", "出租车": "タクシー"
};

const preferredNameReadings = {
  "新宿": "しんじゅく", "渋谷": "しぶや", "東京": "とうきょう", "大阪": "おおさか", "京都": "きょうと", "成田": "なりた", "羽田": "はねだ"
};

const dictionaryPosLabels = { n: "名词", v1: "一段动词", v5u: "五段动词", v5k: "五段动词", v5s: "五段动词", vt: "他动词", vi: "自动词", "adj-i": "い形容词", "adj-na": "な形容词", adv: "副词", ctr: "量词", pn: "专名", exp: "表达" };
const nameTypeLabels = { Place: "地名", RailwayStation: "车站", Person: "人名", Surname: "姓氏", Company: "公司名", Organization: "组织名", Product: "产品名", Work: "作品名", Female: "女性名", Male: "男性名", Given: "名字", Unclassified: "专名" };

function formatPartOfSpeech(values = []) {
  return [...new Set(values.map((value) => dictionaryPosLabels[value] || value))].join(" / ") || "词条";
}

function formatNameType(values = []) {
  return [...new Set(values.map((value) => nameTypeLabels[value] || value))].join(" / ") || "专名";
}

function dictionarySuggestions() {
  return ["駅", "電車", "食べる", "ホテル", "ありがとう"].map((word) => `<button type="button" class="suggestion-button" data-dictionary-word="${word}">${word}</button>`).join("");
}

const romajiKanaMap = {
  kya: "きゃ", kyu: "きゅ", kyo: "きょ", sha: "しゃ", shu: "しゅ", sho: "しょ", cha: "ちゃ", chu: "ちゅ", cho: "ちょ", nya: "にゃ", nyu: "にゅ", nyo: "にょ", hya: "ひゃ", hyu: "ひゅ", hyo: "ひょ", mya: "みゃ", myu: "みゅ", myo: "みょ", rya: "りゃ", ryu: "りゅ", ryo: "りょ", gya: "ぎゃ", gyu: "ぎゅ", gyo: "ぎょ", ja: "じゃ", ju: "じゅ", jo: "じょ", bya: "びゃ", byu: "びゅ", byo: "びょ", pya: "ぴゃ", pyu: "ぴゅ", pyo: "ぴょ", fa: "ふぁ", fi: "ふぃ", fe: "ふぇ", fo: "ふぉ", va: "ゔぁ", vi: "ゔぃ", ve: "ゔぇ", vo: "ゔぉ", she: "しぇ", je: "じぇ", che: "ちぇ", wi: "うぃ", we: "うぇ", wo: "を", tsu: "つ", shi: "し", chi: "ち", fu: "ふ", ji: "じ", di: "ぢ", du: "づ", ka: "か", ki: "き", ku: "く", ke: "け", ko: "こ", ga: "が", gi: "ぎ", gu: "ぐ", ge: "げ", go: "ご", sa: "さ", su: "す", se: "せ", so: "そ", za: "ざ", zi: "じ", zu: "ず", ze: "ぜ", zo: "ぞ", ta: "た", ti: "ち", tu: "つ", te: "て", to: "と", da: "だ", de: "で", do: "ど", na: "な", ni: "に", nu: "ぬ", ne: "ね", no: "の", ha: "は", hi: "ひ", hu: "ふ", he: "へ", ho: "ほ", ba: "ば", bi: "び", bu: "ぶ", be: "べ", bo: "ぼ", pa: "ぱ", pi: "ぴ", pu: "ぷ", pe: "ぺ", po: "ぽ", ma: "ま", mi: "み", mu: "む", me: "め", mo: "も", ya: "や", yu: "ゆ", yo: "よ", ra: "ら", ri: "り", ru: "る", re: "れ", ro: "ろ", wa: "わ", n: "ん", a: "あ", i: "い", u: "う", e: "え", o: "お" };
const romajiKanaKeys = Object.keys(romajiKanaMap).sort((a, b) => b.length - a.length);

function romanToHiragana(value = "") {
  let text = value.toLowerCase().replace(/[ā]/g, "aa").replace(/[ī]/g, "ii").replace(/[ū]/g, "uu").replace(/[ē]/g, "ee").replace(/[ō]/g, "ou").replace(/[^a-z]/g, "");
  let result = "";
  while (text) {
    if (text.length > 1 && text[0] === text[1] && !"aeiou n".includes(text[0])) { result += "っ"; text = text.slice(1); continue; }
    if (text.startsWith("nn")) { result += "ん"; text = text.slice(2); continue; }
    const key = romajiKanaKeys.find((candidate) => text.startsWith(candidate));
    if (!key) { text = text.slice(1); continue; }
    result += romajiKanaMap[key]; text = text.slice(key.length);
  }
  return result;
}

function hiraganaToKatakana(value = "") {
  return Array.from(value).map((char) => { const code = char.charCodeAt(0); return code >= 0x3041 && code <= 0x3096 ? String.fromCharCode(code + 0x60) : char; }).join("");
}

function katakanaToHiragana(value = "") {
  return Array.from(value).map((char) => { const code = char.charCodeAt(0); return code >= 0x30a1 && code <= 0x30f6 ? String.fromCharCode(code - 0x60) : char; }).join("");
}

function isKana(value = "") { return /^[ぁ-ゖァ-ヺー]+$/.test(value); }

const kanaRomajiMap = Object.fromEntries(Object.entries(romajiKanaMap).sort((a, b) => b[1].length - a[1].length).map(([romaji, kana]) => [kana, romaji]));
const kanaRomajiKeys = Object.keys(kanaRomajiMap).sort((a, b) => b.length - a.length);

function hiraganaToRomaji(value = "") {
  const text = katakanaToHiragana(value);
  let result = "";
  let geminate = false;
  for (let index = 0; index < text.length;) {
    if (text[index] === "っ") { geminate = true; index += 1; continue; }
    if (text[index] === "ー") { result += "-"; index += 1; continue; }
    const key = kanaRomajiKeys.find((candidate) => text.startsWith(candidate, index)) || text[index];
    const roman = kanaRomajiMap[key] || key;
    result += geminate ? roman[0] + roman : roman;
    geminate = false;
    index += key.length;
  }
  return result;
}

async function loadLocalDictionary() {
  if (!localDictionaryPromise) {
    localDictionaryPromise = fetch("./data/jmdict-common.json?v=3.6.2").then((response) => {
      if (!response.ok) throw new Error(`local-dictionary-${response.status}`);
      return response.json();
    });
  }
  return localDictionaryPromise;
}

async function loadLocalNames() {
  if (!localNamesPromise) {
    localNamesPromise = fetch("./data/names-common.json?v=1").then((response) => {
      if (!response.ok) throw new Error(`local-names-${response.status}`);
      return response.json();
    });
  }
  return localNamesPromise;
}

function dictionarySearchTerm(query) {
  return localChineseAliases[query] || query;
}

function localChineseMeaning(word, glosses = []) {
  if (wordMeanings[word]) return wordMeanings[word];
  return glosses.length ? `英文释义：${glosses.slice(0, 3).join("；")}` : "暂未找到中文释义";
}

function mapLocalEntry(entry) {
  const hiragana = entry.readings[0] || "";
  return {
    word: entry.word,
    hiragana,
    katakana: hiraganaToKatakana(hiragana),
    romanization: hiraganaToRomaji(hiragana),
    part: formatPartOfSpeech(entry.pos),
    meanings: [localChineseMeaning(entry.word, entry.glosses)],
    glosses: entry.glosses,
    source: "本地 JMdict"
  };
}

async function lookupLocalDictionary(query) {
  const names = await loadLocalNames();
  const nameTerm = dictionarySearchTerm(query);
  const localNameMatches = names.entries.filter((entry) => entry.word === nameTerm || entry.hiragana === nameTerm || entry.romanization.toLowerCase() === nameTerm.toLowerCase());
  if (localNameMatches.length) {
    return { query, lookupTerm: nameTerm, entries: localNameMatches.map((entry) => ({ word: entry.word, hiragana: entry.hiragana, katakana: hiraganaToKatakana(entry.hiragana), romanization: entry.romanization, part: "地名", meanings: [entry.meaning], source: "本地常用专名" })) };
  }
  const dictionary = await loadLocalDictionary();
  const term = dictionarySearchTerm(query);
  const kanaTerm = isKana(term) ? katakanaToHiragana(term) : romanToHiragana(term);
  const exact = dictionary.entries.filter((entry) => entry.word === term || entry.readings.includes(term) || entry.readings.includes(kanaTerm));
  const candidates = exact.length ? exact : dictionary.entries.filter((entry) => entry.word.startsWith(term) || entry.readings.some((reading) => reading.startsWith(kanaTerm))).slice(0, 8);
  return { query, lookupTerm: term, entries: candidates.slice(0, 8).map(mapLocalEntry) };
}

function extractWiktionaryChineseMeaning(extract = "") {
  const japaneseSection = extract.match(/==\s*(?:日語|日语|日本語)\s*==([\s\S]*?)(?=\n==|$)/)?.[1] || extract;
  const candidates = japaneseSection.split(/\r?\n/).map((line) => line.trim())
    .filter((line) => line && !line.startsWith("=") && /[\u4e00-\u9fff]/.test(line) && !/[ぁ-ゖァ-ヺ]/.test(line))
    .filter((line) => !/^(詞源|词源|發音|发音|名詞|名词|動詞|动词|形容詞|形容词|來源|来源|參考|参考|讀音|读音)/.test(line));
  return [...new Set(candidates)].slice(0, 3);
}

async function lookupWiktionaryMeaning(word) {
  const response = await fetch(`${wiktionaryApi}&titles=${encodeURIComponent(word)}`);
  if (!response.ok) return [];
  const payload = await response.json();
  const page = Object.values(payload.query?.pages || {})[0];
  return extractWiktionaryChineseMeaning(page?.extract || "");
}

async function enrichChineseMeanings(result) {
  const targets = result.entries.filter((entry) => entry.meanings.some((meaning) => meaning.startsWith("英文释义：") || meaning === "暂未找到中文释义")).slice(0, 3);
  const translations = await Promise.all(targets.map((entry) => lookupWiktionaryMeaning(entry.word).catch(() => [])));
  translations.forEach((meanings, index) => {
    if (meanings.length) targets[index].meanings = meanings;
  });
  return result;
}

async function lookupJotoba(query) {
  const response = await fetch(jotobaApi, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query, language: "English", no_english: false }) });
  if (!response.ok) throw new Error(`jotoba-${response.status}`);
  const payload = await response.json();
  return payload.words || [];
}

async function lookupJotobaNames(query) {
  const response = await fetch(jotobaNamesApi, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query }) });
  if (!response.ok) throw new Error(`jotoba-names-${response.status}`);
  const payload = await response.json();
  return (payload.names || []).filter((name) => name.kanji === query || name.kana === query).sort((a, b) => {
    const preferred = preferredNameReadings[query];
    return Number(b.kana === preferred) - Number(a.kana === preferred);
  });
}

function mapNameEntries(names) {
  return names.slice(0, 6).map((name) => {
    const hiragana = name.kana || "";
    const type = formatNameType(name.name_type);
    const meaning = name.name_type?.includes("Place") ? "地名" : "日本专名";
    return { word: name.kanji || name.kana, hiragana, katakana: hiraganaToKatakana(hiragana), romanization: name.transcription || hiraganaToRomaji(hiragana), part: type, meanings: [meaning], source: "Jotoba / JMnedict" };
  });
}

async function lookupOnlineDictionary(query) {
  const localResult = await lookupLocalDictionary(query);
  if (localResult.entries.length) return enrichChineseMeanings(localResult);

  const names = await lookupJotobaNames(dictionarySearchTerm(query)).catch(() => []);
  if (names.length) return { query, lookupTerm: dictionarySearchTerm(query), entries: mapNameEntries(names) };

  const words = await lookupJotoba(dictionarySearchTerm(query)).catch(() => []);
  const entries = words.slice(0, 6).map((word) => {
    const japaneseWord = word.reading?.kanji || word.reading?.kana || dictionarySearchTerm(query);
    const hiragana = word.reading?.kana || "";
    const rawPart = word.senses?.[0]?.pos?.[0] ? (typeof word.senses[0].pos[0] === "string" ? word.senses[0].pos[0] : Object.keys(word.senses[0].pos[0])[0]) : "词条";
    const part = formatPartOfSpeech([rawPart]);
    return { word: japaneseWord, hiragana, katakana: hiraganaToKatakana(hiragana), romanization: hiraganaToRomaji(hiragana), part, meanings: ["暂未找到中文释义"], source: "Jotoba 在线补充" };
  });
  return enrichChineseMeanings({ query, lookupTerm: dictionarySearchTerm(query), entries });
}

function renderOnlineDictionaryResults(result) {
  const normalized = result.query.trim();
  $("#dictionary-suggestions").innerHTML = dictionarySuggestions();
  $("#dictionary-result-meta").textContent = result.entries.length ? `找到 ${result.entries.length} 个词条${result.lookupTerm !== normalized ? ` · 按“${result.lookupTerm}”查询` : ""}` : `词库没有找到“${normalized}”`;
  $("#dictionary-results").innerHTML = result.entries.length ? result.entries.map((entry) => `<article class="dictionary-card">
    <div class="dictionary-main"><h3>${renderJapaneseText(entry.word)}</h3><span class="dictionary-reading">${entry.hiragana ? `平假名 ${escapeHtml(entry.hiragana)} · 片假名 ${escapeHtml(entry.katakana)}` : "暂无假名"}<br>${escapeHtml(entry.romanization || entry.ipa || "暂无罗马音")}</span></div>
    <div class="dictionary-meaning-wrap"><div class="dictionary-meaning">${entry.meanings.map((meaning) => escapeHtml(meaning)).join("；")} <span class="dictionary-reading">· ${escapeHtml(entry.part)}</span></div><div class="dictionary-example">词库 · ${escapeHtml(entry.source)}</div></div>
    <button type="button" class="dictionary-audio" data-speak="${encodeURIComponent(entry.word)}" title="朗读词语" aria-label="朗读 ${entry.word}">◖</button>
  </article>`).join("") : `<div class="dictionary-empty">词库没有找到这个词。可以换成日语、中文、假名或罗马音再试。</div>`;
  $$("#dictionary-results [data-speak]").forEach((button) => button.addEventListener("click", () => speak(decodeURIComponent(button.dataset.speak))));
  $$("#dictionary-suggestions [data-dictionary-word]").forEach((button) => button.addEventListener("click", () => { $("#dictionary-search").value = button.dataset.dictionaryWord; renderDictionary(button.dataset.dictionaryWord); }));
  bindWordTokens($("#dictionary-results"));
}

async function renderDictionary(query = "") {
  const normalized = query.trim();
  $("#dictionary-suggestions").innerHTML = dictionarySuggestions();
  if (!normalized) {
    $("#dictionary-result-meta").textContent = "本地词库优先 · 输入后即时查询";
    $("#dictionary-results").innerHTML = `<div class="dictionary-empty">请输入日语、中文、假名或罗马音开始查询。</div>`;
    $$("#dictionary-suggestions [data-dictionary-word]").forEach((button) => button.addEventListener("click", () => { $("#dictionary-search").value = button.dataset.dictionaryWord; renderDictionary(button.dataset.dictionaryWord); }));
    return;
  }
  const requestId = ++dictionaryRequestId;
  $("#dictionary-result-meta").textContent = "正在查询本地词库……";
  $("#dictionary-results").innerHTML = `<div class="dictionary-empty">优先从本地词库查找，未命中时再联网补充。</div>`;
  try {
    const result = await lookupOnlineDictionary(normalized);
    if (requestId === dictionaryRequestId) renderOnlineDictionaryResults(result);
  } catch (error) {
    console.error("Dictionary lookup failed", error);
    if (requestId !== dictionaryRequestId) return;
    $("#dictionary-result-meta").textContent = "词库暂时无法连接";
    $("#dictionary-results").innerHTML = `<div class="dictionary-empty">本地词库加载失败，请刷新页面后重试。</div>`;
  }
}

function showView(viewName) {
  $$(".view").forEach((view) => view.classList.toggle("is-visible", view.id === `${viewName}-view`));
  $$(".nav-item").forEach((item) => item.classList.toggle("is-active", item.dataset.view === viewName));
  const labels = { home: "今日练习 / 轻轻开始", scenes: "场景库 / 旅行与交通", review: "复习记录 / 留在手边", dictionary: "查词典 / 联网词库", session: "今日练习 / 进行中", "review-detail": "复习记录 / 本次完成" };
  $("#breadcrumb").innerHTML = (labels[viewName] || labels.home).replace(" / ", " <span>/</span> ");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startSession(sceneId = state.progress.lastScene || "ticket") {
  const scene = scenes.find((item) => item.id === sceneId) || scenes[0];
  state.activeScene = scene; state.turnIndex = 0; state.messages = []; state.mistakes = []; state.sessionCompleted = false; state.secondsLeft = 300;
  $("#session-icon").textContent = scene.symbol; $("#session-title").textContent = scene.title; $("#session-goal").textContent = scene.goal; $("#session-total").textContent = String(scene.turns.length).padStart(2, "0");
  $("#chat-log").innerHTML = ""; $("#message-input").value = ""; $("#composer-hint").textContent = ""; $("#phrase-preview-list").innerHTML = scene.phrases.map((phrase) => `<div class="phrase-row"><span>${renderJapaneseText(phrase.jp)}</span><button data-speak="${encodeURIComponent(phrase.jp)}" title="朗读">◖</button></div>`).join("");
  $$("#phrase-preview-list [data-speak]").forEach((button) => button.addEventListener("click", () => speak(decodeURIComponent(button.dataset.speak))));
  bindWordTokens($("#phrase-preview-list"));
  stopTimer(); startTimer(); showView("session"); appendNpcTurn();
}

function startTimer() {
  state.timerId = window.setInterval(() => { state.secondsLeft = Math.max(0, state.secondsLeft - 1); renderTimer(); if (state.secondsLeft === 0) finishSession(); }, 1000);
  renderTimer();
}
function stopTimer() { if (state.timerId) { window.clearInterval(state.timerId); state.timerId = null; } }
function renderTimer() { const mins = String(Math.floor(state.secondsLeft / 60)).padStart(2, "0"); const secs = String(state.secondsLeft % 60).padStart(2, "0"); $("#session-timer").textContent = `${mins}:${secs}`; }

function appendNpcTurn() {
  const turn = state.activeScene.turns[state.turnIndex]; if (!turn) return finishSession();
  state.messages.push({ role: "assistant", ...turn }); renderMessages(); renderComposer(turn); $("#session-step").textContent = String(state.turnIndex + 1).padStart(2, "0");
}

function renderMessages() {
  $("#chat-log").innerHTML = state.messages.map((message) => `<div class="chat-message ${message.role}">
    <div class="chat-avatar">${message.role === "assistant" ? state.activeScene.symbol : "你"}</div>
    <div class="bubble"><span class="japanese">${renderJapaneseText(message.text || message.npc)}</span>${message.reading || message.roman ? `<span class="reading" data-roman="${escapeHtml(message.roman || "")}">${escapeHtml(message.reading || message.roman || "")}</span>` : ""}${message.zh ? `<span class="translation">${escapeHtml(message.zh)}</span>` : ""}${message.role === "assistant" ? `<button class="message-audio" data-speak="${encodeURIComponent(message.text || message.npc)}">◖ 朗读</button>` : ""}</div>
  </div>`).join("");
  $("#chat-log").classList.toggle("show-reading", state.showReading); $("#chat-log").classList.toggle("show-roman", state.showRoman); $("#chat-log").scrollTop = $("#chat-log").scrollHeight;
  $$("#chat-log [data-speak]").forEach((button) => button.addEventListener("click", () => speak(decodeURIComponent(button.dataset.speak))));
  bindWordTokens($("#chat-log"));
}

function renderComposer(turn) {
  $("#composer-hint").textContent = state.showHint ? `提示：${turn.hint}` : "";
  $("#quick-replies").innerHTML = turn.replies.map((reply) => `<button type="button" class="quick-reply">${reply}</button>`).join("");
  $$(".quick-reply").forEach((button) => button.addEventListener("click", () => { $("#message-input").value = button.textContent; $("#composer-form").requestSubmit(); }));
}

function handleSubmit(event) {
  event.preventDefault(); const input = $("#message-input"); const text = input.value.trim(); if (!text) { showToast("先输入一句，或选择下面的表达"); return; }
  const turn = state.activeScene.turns[state.turnIndex]; const isGood = turn.expected.some((word) => text.toLowerCase().includes(word.toLowerCase()));
  state.messages.push({ role: "user", text, zh: isGood ? "表达得很好" : "先继续对话，结束时再一起复盘" }); if (!isGood) state.mistakes.push({ text, expected: turn.replies[0], zh: turn.replies[0] });
  input.value = ""; state.turnIndex += 1; renderMessages(); window.setTimeout(appendNpcTurn, 220);
}

function finishSession() {
  if (state.sessionCompleted) return; state.sessionCompleted = true; stopTimer(); state.progress.completed += 1; state.progress.lastScene = state.activeScene.id;
  const today = new Date().toDateString(); const last = localStorage.getItem("nihongo-life-last-day"); if (last !== today) { state.progress.streak = Math.max(1, state.progress.streak + (last ? 1 : 0)); localStorage.setItem("nihongo-life-last-day", today); }
  const added = state.activeScene.phrases.filter((phrase) => !state.progress.reviewItems.some((item) => item.jp === phrase.jp)); state.progress.reviewItems = [...added, ...state.progress.reviewItems].slice(0, 8); saveProgress(); updateProgressUI(); renderReviewList();
  $("#review-lead").textContent = `你刚刚在「${state.activeScene.title}」完成了一次真实的日语交流。`;
  $("#review-summary").innerHTML = `<div class="summary-item"><strong>${state.activeScene.turns.length}</strong><span>轮对话完成</span></div><div class="summary-item"><strong>${state.activeScene.phrases.length}</strong><span>句表达已收藏</span></div><div class="summary-item"><strong>${state.mistakes.length || 0}</strong><span>句可以稍后复盘</span></div>`;
  showView("review-detail");
}

function renderJapaneseText(text) {
  const keys = Object.keys(wordMeanings).sort((a, b) => b.length - a.length).map(escapeRegExp);
  if (!keys.length) return escapeHtml(text);
  const tokenPattern = new RegExp(`(${keys.join("|")})`, "g");
  return String(text).split(tokenPattern).map((part) => wordMeanings[part]
    ? `<button type="button" class="word-token" data-word="${encodeURIComponent(part)}" data-meaning="${encodeURIComponent(wordMeanings[part])}" aria-label="查看${escapeHtml(part)}的中文意思">${escapeHtml(part)}</button>`
    : escapeHtml(part)).join("");
}

function bindWordTokens(container = document) {
  container.querySelectorAll(".word-token").forEach((token) => token.addEventListener("click", (event) => {
    event.stopPropagation();
    openWordPopover(decodeURIComponent(token.dataset.word), decodeURIComponent(token.dataset.meaning), token);
  }));
}

function openWordPopover(word, meaning, anchor) {
  const popover = $("#word-popover");
  $("#word-popover-jp").textContent = word;
  $("#word-popover-meaning").textContent = meaning;
  popover.classList.add("is-visible"); popover.setAttribute("aria-hidden", "false");
  const rect = anchor.getBoundingClientRect(); const width = 196;
  popover.style.left = `${Math.max(12, Math.min(rect.left, window.innerWidth - width - 12))}px`;
  popover.style.top = `${Math.min(window.innerHeight - 94, rect.bottom + 9)}px`;
}

function closeWordPopover() {
  const popover = $("#word-popover");
  popover.classList.remove("is-visible"); popover.setAttribute("aria-hidden", "true");
}

function speak(text) { if (!window.speechSynthesis) { showToast("当前系统暂不支持朗读"); return; } window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang = "ja-JP"; utterance.rate = .84; window.speechSynthesis.speak(utterance); }
function escapeRegExp(value) { return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char])); }
function showToast(message) { const toast = $("#toast"); toast.textContent = message; toast.classList.add("is-visible"); window.clearTimeout(showToast.timeout); showToast.timeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2200); }

function registerPWA() {
  if ("serviceWorker" in navigator && location.protocol !== "file:") navigator.serviceWorker.register("./sw.js").catch(() => {});
  window.addEventListener("beforeinstallprompt", (event) => { event.preventDefault(); deferredInstallPrompt = event; $("#install-app").hidden = false; });
  window.addEventListener("appinstalled", () => { deferredInstallPrompt = null; $("#install-app").hidden = true; showToast("已安装到主屏幕"); });
  $("#install-app").addEventListener("click", async () => {
    if (!deferredInstallPrompt) { showToast("请打开浏览器菜单，选择“添加到主屏幕”"); return; }
    deferredInstallPrompt.prompt(); await deferredInstallPrompt.userChoice; deferredInstallPrompt = null; $("#install-app").hidden = true;
  });
}

function bindEvents() {
  $$("[data-view]").forEach((button) => button.addEventListener("click", () => showView(button.dataset.view)));
  $("#start-today").addEventListener("click", () => startSession()); $("#back-home").addEventListener("click", () => { stopTimer(); showView("home"); }); $("#finish-session").addEventListener("click", finishSession); $("#review-again").addEventListener("click", () => startSession(state.activeScene.id)); $("#composer-form").addEventListener("submit", handleSubmit);
  $("#hint-toggle").addEventListener("click", () => { state.showHint = !state.showHint; $("#hint-toggle").classList.toggle("is-active", state.showHint); const turn = state.activeScene.turns[state.turnIndex]; if (turn) renderComposer(turn); });
  $("#reading-toggle").addEventListener("click", () => { state.showReading = !state.showReading; state.showRoman = false; $("#reading-toggle").classList.toggle("is-active", state.showReading); $("#roman-toggle").classList.remove("is-active"); renderMessages(); });
  $("#roman-toggle").addEventListener("click", () => { state.showRoman = !state.showRoman; state.showReading = false; $("#roman-toggle").classList.toggle("is-active", state.showRoman); $("#reading-toggle").classList.remove("is-active"); renderMessages(); });
  $("#session-help").addEventListener("click", () => showToast(state.activeScene.goal)); $("#toggle-theme").addEventListener("click", () => { document.body.classList.toggle("dark-mode"); showToast(document.body.classList.contains("dark-mode") ? "已切换到深色阅读模式" : "已切换到浅色阅读模式"); });
  $("#dictionary-search").addEventListener("input", (event) => { window.clearTimeout(dictionarySearchTimer); dictionarySearchTimer = window.setTimeout(() => renderDictionary(event.target.value), 420); });
  $("#dictionary-search").addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); window.clearTimeout(dictionarySearchTimer); renderDictionary(event.target.value); } });
  $("#clear-dictionary-search").addEventListener("click", () => { window.clearTimeout(dictionarySearchTimer); $("#dictionary-search").value = ""; renderDictionary(); $("#dictionary-search").focus(); });
  document.addEventListener("click", (event) => { if (!event.target.closest(".word-token, .word-popover")) closeWordPopover(); });
}

renderSceneLists(); renderReviewList(); renderDictionary(); updateProgressUI(); bindEvents(); registerPWA();
