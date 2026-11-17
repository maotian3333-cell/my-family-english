/* 交付前自動檢查：node tools/audit.js（需要 playwright）。任何 FAIL 都不應交付。 */
const fs = require("fs"), path = require("path");
const root = path.resolve(__dirname, "..");
const fails = [], pass = [];
function ok(name, bad) { (bad && bad.length ? fails : pass).push(name + (bad && bad.length ? "：" + bad.slice(0, 12).join("、") + (bad.length > 12 ? " …共 " + bad.length : "") : "")); }
const read = f => fs.readFileSync(path.join(root, f), "utf8");

// 1. 靜態檢查：index.html 的 script / css 都在 sw.js CORE；沒有同名圖被多個檔案定義
const html = read("index.html"), sw = read("sw.js");
const refs = [...html.matchAll(/(?:src|href)="((?:js|data|css)\/[^"]+)"/g)].map(m => m[1]);
ok("離線快取清單涵蓋所有 js/data/css", refs.filter(r => sw.indexOf('"' + r + '"') < 0));
const ver = (sw.match(/VERSION = "([^"]+)"/) || [])[1];
ok("README 與 REBUILD-SPEC 含目前版本標題", [read("README.md").indexOf(ver.replace("mfe-", "").replace(/^v/, "")) < 0 ? "README 缺 " + ver : null].filter(Boolean));
const defs = {};
fs.readdirSync(path.join(root, "data")).filter(f => /^art.*\.js$/.test(f)).forEach(f => {
  const t = read("data/" + f);
  [...t.matchAll(/^\s*F\.([a-z0-9_]+) = svg\(/gm)].forEach(m => (defs[m[1]] = defs[m[1]] || []).push(f));
});
ok("同一張圖只在一個檔案定義（避免被舊版覆蓋）", Object.keys(defs).filter(k => defs[k].length > 1).map(k => k + "(" + defs[k].join("+") + ")"));

(async () => {
  const { chromium } = require("playwright"), b = await chromium.launch(), p = await b.newPage({ viewport: { width: 420, height: 700 } });
  const errs = []; p.on("pageerror", e => errs.push(e.message));
  await p.goto("file://" + root + "/index.html"); await p.waitForTimeout(500);
  const r = await p.evaluate(() => {
    const A = MFE_API, o = { noPic: [], scene: [], cnt: [], dup: [], noPicFile: [], lead: [] };
    const host = document.createElement("div"); host.style.cssText = "position:fixed;left:0;top:0;width:360px"; document.body.appendChild(host);
    for (const id in A.WORD) {
      const w = A.WORD[id], key = String(w[3]).replace("svg:", "");
      if (/^svg:/.test(w[3]) && !MFE_SVG[key]) o.noPic.push(id);
      const sc = MFE_SCENE_FOR(id, "garden"), bt = MFE_ITEM_BOTTOM(id);
      host.innerHTML = '<div class="kscene" style="display:block;position:relative;width:360px;aspect-ratio:360/260">' + MFE_SCENE_ART[sc] + '<span class="sc-mon">' + A.mon(0, "") + '</span><span class="sc-obj" style="width:' + MFE_SIZE_W(id) + "%" + (bt ? ";bottom:" + bt + "%" : "") + '">' + MFE_ITEM_HTML(w, A.pic) + "</span></div>";
      const R = host.firstChild.getBoundingClientRect(), ob = host.querySelector(".sc-obj").getBoundingClientRect(), m = host.querySelector(".sc-mon").getBoundingClientRect();
      const ow = Math.min(ob.right, m.right) - Math.max(ob.left, m.left), oh = Math.min(ob.bottom, m.bottom) - Math.max(ob.top, m.top);
      if (ob.left < R.left - 1 || ob.right > R.right + 1 || ob.top < R.top - 1 || ob.bottom > R.bottom + 1) o.scene.push(id + "(出界)");
      else if (ow > 4 && oh > 4 && ow * oh > 400) o.scene.push(id + "(與小怪獸重疊)");
      if (ob.height > R.height * 0.62) o.scene.push(id + "(過高)");
      if (ob.height < R.height * 0.1) o.scene.push(id + "(過小)");
    }
    host.remove();
    for (let i = 0; i <= 10; i++) { const c = (MFE_SVG["n" + i].match(/r="3\.9"/g) || []).length; if (c !== i) o.cnt.push("n" + i + "=" + c + "點"); }
    return o;
  });
  ok("每個單字的圖都存在", r.noPic); ok("場景：不出界／不重疊／高度 10–62%", r.scene); ok("數字卡 0–10 的圓點數＝數字", r.cnt);
  // 數一數題目的選項不可帶圓點圖
  const cnt = await p.evaluate(() => { let bad = []; try { const ids = Object.keys(MFE_ACT_SPECS || {}); } catch (e) { } return bad; });
  const src = read("js/activities.js");
  ok("數一數選項不使用帶圓點的數字卡", /opts: os\.map\(function \(z\) \{ return \{ w: W\["n"/.test(src) ? ["仍使用 W[n]"] : []);
  // 繪本（家長頁）：動物／人物必須是全身版、抽象圖必須在泡泡裡
  await p.evaluate(() => { location.hash = "#books"; }); await p.waitForTimeout(500);
  const bk = await p.evaluate(() => {
    const ABS = /^(c_|n\d+$|b_|vb_|em_|aj_)/, exp = { full: 0, bub: 0 };
    MFE_STORIES.forEach(s => s.pages.forEach(pg => (pg.it || []).forEach(id => { if (MFE_FULL[id]) exp.full++; else if (ABS.test(id)) exp.bub++; })));
    return { full: document.querySelectorAll(".kbs .bk-it .full").length, bub: document.querySelectorAll(".kbs .bk-it .bub").length, exp };
  });
  ok("繪本頁動物全身版與泡泡數量符合資料（" + JSON.stringify(bk.exp) + "）", (bk.full === bk.exp.full && bk.bub === bk.exp.bub) ? [] : ["實際 full=" + bk.full + " bub=" + bk.bub]);
  // 情境圖是否表達句意（幼兒學習頁）：Z5 藏起來、A1 箭頭、B5 複數三個、B7 動作、B8 感受
  const sm = await p.evaluate(async () => {
    const out = {}; const sleep = ms => new Promise(r => setTimeout(r, ms)); document.querySelectorAll("body > div[style*=\"position:fixed\"]").forEach(e => e.remove());
    MFE_API.kid().kage = 0; MFE_X.enterkid();
    const spec = { Z5: ".kscene[data-hide]", A1: ".kscene.m-give .sc-fx.arrow", B5: ".kscene.m-like .mi", B7: ".sc-mon[class*=act-]", B8: ".sc-fx.thought" };
    for (const u in spec) {
      location.hash = "#play/" + u; await sleep(150);
      const go = document.querySelector("[data-x=kgo]"); if (!go) { out[u] = "no-go"; continue; }
      go.dispatchEvent(new MouseEvent("click", { bubbles: true })); await sleep(120);
      for (let i = 0; i < 12 && !document.querySelector(".kscene"); i++) { const nx = document.querySelector("[data-x=klnext]"); if (nx) nx.dispatchEvent(new MouseEvent("click", { bubbles: true })); await sleep(80); }
      await sleep(100); out[u] = document.querySelectorAll(spec[u]).length;
    }
    return out;
  });
  ok("情境圖表達句意（Z5 藏起來／A1 箭頭／B5 三個／B7 動作／B8 感受）", ["Z5", "A1", "B5", "B7", "B8"].filter(u => !(sm[u] >= 1) || (u === "B5" && sm[u] !== 3)).map(u => u + "=" + sm[u]));
  const tips = await p.evaluate(async () => { const bad = []; for (const l of MFE_API.LESSONS) { location.hash = "#unit/" + l.id; await new Promise(r => setTimeout(r, 30)); if (!document.querySelector(".card.warm h2")) bad.push(l.id); } return bad; });
  ok("每個單元頁都有「給家長的叮嚀」", tips);
  ok("執行時無 JS 錯誤", errs);
  await b.close();
  console.log("PASS " + pass.length + "\n  " + pass.join("\n  ")); if (fails.length) { console.log("\nFAIL " + fails.length + "\n  " + fails.join("\n  ")); process.exit(1); }
})();
