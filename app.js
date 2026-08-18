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
  "駅": "车站",
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

const dictionaryEntries = [
  { word: "駅", reading: "えき", roman: "eki", meaning: "车站", part: "名词", example: "駅はどこですか？", exampleZh: "车站在哪里？" },
  { word: "電車", reading: "でんしゃ", roman: "densha", meaning: "电车；火车", part: "名词", example: "電車に乗ります。", exampleZh: "乘坐电车。" },
  { word: "切符", reading: "きっぷ", roman: "kippu", meaning: "车票", part: "名词", example: "切符を一枚お願いします。", exampleZh: "请给我一张车票。" },
  { word: "片道", reading: "かたみち", roman: "katamichi", meaning: "单程", part: "名词", example: "片道でお願いします。", exampleZh: "请给我单程票。" },
  { word: "往復", reading: "おうふく", roman: "oufuku", meaning: "往返", part: "名词", example: "往復ですか？", exampleZh: "是往返吗？" },
  { word: "お願いします", reading: "おねがいします", roman: "onegaishimasu", meaning: "拜托了；请……", part: "表达", example: "東京までお願いします。", exampleZh: "请给我一张到东京的票。" },
  { word: "すみません", reading: "すみません", roman: "sumimasen", meaning: "不好意思；对不起", part: "表达", example: "すみません、渋谷駅はどこですか？", exampleZh: "不好意思，涩谷站在哪里？" },
  { word: "どのくらい", reading: "どのくらい", roman: "dono kurai", meaning: "多久；多少", part: "疑问词", example: "どのくらいかかりますか？", exampleZh: "大概要花多长时间？" },
  { word: "大丈夫", reading: "だいじょうぶ", roman: "daijoubu", meaning: "没问题；可以", part: "形容动词", example: "ここで大丈夫です。", exampleZh: "在这里停就可以了。" },
  { word: "助かりました", reading: "たすかりました", roman: "tasukarimashita", meaning: "帮大忙了", part: "表达", example: "助かりました、ありがとうございます。", exampleZh: "帮大忙了，谢谢。" },
  { word: "乗る", reading: "のる", roman: "noru", meaning: "乘坐；搭乘", part: "动词", example: "この電車に乗ってください。", exampleZh: "请乘坐这班电车。" },
  { word: "ここ", reading: "ここ", roman: "koko", meaning: "这里", part: "指示词", example: "ここで大丈夫です。", exampleZh: "在这里就可以了。" }
];

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

function renderDictionary(query = "") {
  const normalized = query.trim().toLowerCase();
  const results = normalized ? dictionaryEntries.filter((entry) => [entry.word, entry.reading, entry.roman, entry.meaning, entry.example, entry.exampleZh].some((value) => value.toLowerCase().includes(normalized))) : dictionaryEntries;
  $("#dictionary-suggestions").innerHTML = ["駅", "電車", "すみません", "お願いします", "大丈夫"].map((word) => `<button type="button" class="suggestion-button" data-dictionary-word="${word}">${word}</button>`).join("");
  $("#dictionary-result-meta").textContent = normalized ? `找到 ${results.length} 个结果` : `离线词库 · ${results.length} 个常用词条`;
  $("#dictionary-results").innerHTML = results.length ? results.map((entry) => `<article class="dictionary-card">
    <div class="dictionary-main"><h3>${renderJapaneseText(entry.word)}</h3><span class="dictionary-reading">${entry.reading} · ${entry.roman}</span></div>
    <div class="dictionary-meaning-wrap"><div class="dictionary-meaning">${entry.meaning} <span class="dictionary-reading">· ${entry.part}</span></div><div class="dictionary-example">例：${renderJapaneseText(entry.example)} <span>｜${entry.exampleZh}</span></div></div>
    <button type="button" class="dictionary-audio" data-speak="${encodeURIComponent(entry.word)}" title="朗读词语" aria-label="朗读 ${entry.word}">◖</button>
  </article>`).join("") : `<div class="dictionary-empty">还没有找到这个词。可以试试输入日语、中文或罗马音。</div>`;
  $$("#dictionary-results [data-speak]").forEach((button) => button.addEventListener("click", () => speak(decodeURIComponent(button.dataset.speak))));
  $$("#dictionary-suggestions [data-dictionary-word]").forEach((button) => button.addEventListener("click", () => { $("#dictionary-search").value = button.dataset.dictionaryWord; renderDictionary(button.dataset.dictionaryWord); }));
  bindWordTokens($("#dictionary-results"));
}

function showView(viewName) {
  $$(".view").forEach((view) => view.classList.toggle("is-visible", view.id === `${viewName}-view`));
  $$(".nav-item").forEach((item) => item.classList.toggle("is-active", item.dataset.view === viewName));
  const labels = { home: "今日练习 / 轻轻开始", scenes: "场景库 / 旅行与交通", review: "复习记录 / 留在手边", dictionary: "查词典 / 离线词库", session: "今日练习 / 进行中", "review-detail": "复习记录 / 本次完成" };
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
  $("#dictionary-search").addEventListener("input", (event) => renderDictionary(event.target.value)); $("#clear-dictionary-search").addEventListener("click", () => { $("#dictionary-search").value = ""; renderDictionary(); $("#dictionary-search").focus(); });
  document.addEventListener("click", (event) => { if (!event.target.closest(".word-token, .word-popover")) closeWordPopover(); });
}

renderSceneLists(); renderReviewList(); renderDictionary(); updateProgressUI(); bindEvents(); registerPWA();
