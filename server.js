const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".md": "text/plain; charset=utf-8"
};

function sendJson(response, status, payload, extraHeaders = {}) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", ...extraHeaders });
  response.end(JSON.stringify(payload));
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;
    request.on("data", (chunk) => {
      total += chunk.length;
      if (total > 100000) {
        reject(new Error("payload-too-large"));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    request.on("error", reject);
  });
}

function normalizeAiReply(content) {
  const cleaned = String(content || "").replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  let parsed;
  try { parsed = JSON.parse(cleaned); } catch { parsed = { reply: cleaned }; }
  const text = (value, max) => String(value || "").trim().slice(0, max);
  return {
    reply: text(parsed.reply, 500) || "すみません、もう一度お願いします。",
    translation: text(parsed.translation, 500),
    reading: text(parsed.reading, 500),
    romanization: text(parsed.romanization, 500),
    suggestedReplies: Array.isArray(parsed.suggestedReplies) ? parsed.suggestedReplies.map((item) => text(item, 120)).filter(Boolean).slice(0, 3) : [],
    correction: text(parsed.correction, 500)
  };
}

async function handleAiChat(request, response) {
  const allowedOrigin = process.env.AI_ALLOWED_ORIGIN || "*";
  const corsHeaders = { "Access-Control-Allow-Origin": allowedOrigin, "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "POST, OPTIONS" };
  if (request.method === "OPTIONS") { response.writeHead(204, corsHeaders); response.end(); return; }
  if (request.method !== "POST") { sendJson(response, 405, { error: "只支持 POST" }, corsHeaders); return; }
  if (!process.env.DEEPSEEK_API_KEY) { sendJson(response, 503, { error: "DEEPSEEK_API_KEY 未配置" }, corsHeaders); return; }

  try {
    const body = JSON.parse(await readRequestBody(request));
    const sceneTitle = String(body.sceneTitle || "旅行与交通").slice(0, 80);
    const messages = (Array.isArray(body.messages) ? body.messages : []).filter((message) => ["user", "assistant"].includes(message.role) && typeof message.content === "string").slice(-12).map((message) => ({ role: message.role, content: message.content.slice(0, 1000) }));
    const systemPrompt = `你是“日语生活剧场”的友好日语陪练，当前场景是“${sceneTitle}”。用户是刚入门的中文母语者。请像聊天助手一样自然回应，但每次只说1到2句简单日语，不要因为小错误立刻打断对话。必要时温和地给出更自然的说法。请始终只返回合法 JSON，不要 Markdown 代码块，字段必须是：reply（日语回复）、translation（中文意思）、reading（完整平假名）、romanization（罗马音）、suggestedReplies（最多3个可直接发送的日语短句数组）、correction（简短中文纠错，没有就留空）。如果用户使用中文，也要继续陪练并给出适合初学者的日语表达。`;
    const upstream = await fetch("https://api.deepseek.com/chat/completions", { method: "POST", headers: { Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: process.env.DEEPSEEK_MODEL || "deepseek-v4-flash", temperature: 0.7, max_tokens: 600, messages: [{ role: "system", content: systemPrompt }, ...messages] }) });
    const upstreamPayload = await upstream.json().catch(() => ({}));
    if (!upstream.ok) { console.error(`DeepSeek request failed: ${upstream.status}`); sendJson(response, 502, { error: "DeepSeek 暂时不可用" }, corsHeaders); return; }
    const content = upstreamPayload.choices?.[0]?.message?.content || "";
    sendJson(response, 200, normalizeAiReply(content), corsHeaders);
  } catch (error) {
    if (error.message === "payload-too-large") { sendJson(response, 413, { error: "请求内容过大" }, corsHeaders); return; }
    console.error(`AI proxy failed: ${error.message}`);
    sendJson(response, 400, { error: "AI 请求格式不正确" }, corsHeaders);
  }
}

const server = http.createServer((request, response) => {
  const pathname = request.url.split("?")[0];
  if (pathname === "/api/ai-chat") { void handleAiChat(request, response); return; }
  const requestedPath = request.url === "/" ? "/index.html" : request.url.split("?")[0];
  const filePath = path.join(root, path.normalize(requestedPath));
  if (!filePath.startsWith(root) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }
  response.writeHead(200, { "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream" });
  fs.createReadStream(filePath).pipe(response);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`电脑打开：http://127.0.0.1:${port}/`);
  const addresses = Object.values(os.networkInterfaces()).flat().filter((item) => item && item.family === "IPv4" && !item.internal).map((item) => item.address);
  addresses.forEach((address) => console.log(`手机打开：http://${address}:${port}/`));
  console.log("按 Ctrl+C 停止服务。");
});
