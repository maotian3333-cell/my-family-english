/* My Family English v1.0 — 純前端，資料存在瀏覽器 localStorage，不上傳任何資料 */
(function () {
  "use strict";
  var SCENES = window.MFE_SCENES, LESSONS = window.MFE_LESSONS, GUIDE = window.MFE_GUIDE;
  var KEY = "mfe_v1";
  var WCATS = window.MFE_WORD_CATS || [], PATS = window.MFE_PATTERNS || [], LCARDS = window.MFE_LESSON_CARDS || {};
  var WORD = {};
  WCATS.forEach(function (c) { c.words.forEach(function (w) { WORD[w[0]] = w; }); });
  var STATUS = ["新", "學習中", "已會"];
  var PHRASE = {};
  SCENES.forEach(function (s) { s.phrases.forEach(function (p) { p.scene = s.id; PHRASE[p.id] = p; }); });
  var LESSON = {};
  LESSONS.forEach(function (l) { LESSON[l.id] = l; });

  /* ---------- 小工具 ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function uid() { return "k" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function toast(msg) {
    var t = $("#toast"); t.textContent = msg; t.classList.add("on");
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove("on"); }, 2200);
  }

  /* ---------- 動物怪獸頭像（不使用暱稱） ---------- */
  var MONS = [
    '<svg viewBox="0 0 100 100"><circle cx="24" cy="28" r="12" fill="#AED581" stroke="#3E4A59" stroke-width="4"/><circle cx="76" cy="28" r="12" fill="#AED581" stroke="#3E4A59" stroke-width="4"/><circle cx="50" cy="56" r="36" fill="#AED581" stroke="#3E4A59" stroke-width="4"/><circle cx="38" cy="50" r="6" fill="#fff" stroke="#3E4A59" stroke-width="3"/><circle cx="62" cy="50" r="6" fill="#fff" stroke="#3E4A59" stroke-width="3"/><circle cx="38" cy="51" r="2.5" fill="#3E4A59"/><circle cx="62" cy="51" r="2.5" fill="#3E4A59"/><path d="M38 68 Q50 78 62 68" fill="none" stroke="#3E4A59" stroke-width="4" stroke-linecap="round"/></svg>',
    '<svg viewBox="0 0 100 100"><path d="M26 30 L34 8 L44 28Z M56 28 L66 8 L74 30Z" fill="#FFD54F" stroke="#3E4A59" stroke-width="4" stroke-linejoin="round"/><rect x="14" y="22" width="72" height="68" rx="34" fill="#64B5F6" stroke="#3E4A59" stroke-width="4"/><circle cx="38" cy="52" r="6" fill="#fff" stroke="#3E4A59" stroke-width="3"/><circle cx="62" cy="52" r="6" fill="#fff" stroke="#3E4A59" stroke-width="3"/><circle cx="38" cy="53" r="2.5" fill="#3E4A59"/><circle cx="62" cy="53" r="2.5" fill="#3E4A59"/><path d="M40 70 Q50 76 60 70" fill="none" stroke="#3E4A59" stroke-width="4" stroke-linecap="round"/></svg>',
    '<svg viewBox="0 0 100 100"><path d="M18 90 Q10 40 50 14 Q90 40 82 90Z" fill="#FF8A65" stroke="#3E4A59" stroke-width="4" stroke-linejoin="round"/><circle cx="50" cy="50" r="15" fill="#fff" stroke="#3E4A59" stroke-width="4"/><circle cx="50" cy="52" r="6" fill="#3E4A59"/><path d="M36 76 Q50 86 64 76" fill="none" stroke="#3E4A59" stroke-width="4" stroke-linecap="round"/></svg>',
    '<svg viewBox="0 0 100 100"><path d="M20 40 Q50 -4 80 40 L88 80 Q50 98 12 80Z" fill="#BA68C8" stroke="#3E4A59" stroke-width="4" stroke-linejoin="round"/><circle cx="38" cy="50" r="6" fill="#fff" stroke="#3E4A59" stroke-width="3"/><circle cx="62" cy="50" r="6" fill="#fff" stroke="#3E4A59" stroke-width="3"/><circle cx="38" cy="51" r="2.5" fill="#3E4A59"/><circle cx="62" cy="51" r="2.5" fill="#3E4A59"/><path d="M34 66 L66 66 L62 78 L56 70 L50 78 L44 70 L38 78Z" fill="#fff" stroke="#3E4A59" stroke-width="3" stroke-linejoin="round"/></svg>'
  ];
  function mon(i, cls) { return '<span class="mon ' + (cls || "") + '">' + MONS[i % MONS.length] + "</span>"; }

  /* ---------- 資料 ---------- */
  var S;
  function newChild(monIdx, seed) {
    var c = { id: uid(), mon: monIdx, unit: "A1", plays: [], phr: {}, notes: [], badges: [], resist: [] };
    if (seed) { SCENES.forEach(function (s) { s.phrases.forEach(function (p) { if (p.known) c.phr[p.id] = p.known; }); }); }
    return c;
  }
  function load() {
    try { var r = localStorage.getItem(KEY); if (r) { var o = JSON.parse(r); if (o && o.children && o.children.length) return o; } } catch (e) {}
    var a = newChild(0, true), b = newChild(1, false);
    return { v: 1, active: a.id, mode: "A", children: [a, b] };
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast("無法儲存（瀏覽器可能封鎖了儲存空間）"); } }
  function kid() { for (var i = 0; i < S.children.length; i++) if (S.children[i].id === S.active) return S.children[i]; S.active = S.children[0].id; return S.children[0]; }
  function pstat(c, id) { return c.phr[id] || 0; }

  /* ---------- 發音（瀏覽器內建 TTS；字母聲音不適用） ---------- */
  function speak(text) {
    if (!("speechSynthesis" in window)) { toast("此瀏覽器不支援朗讀"); return; }
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text.replace(/___/g, "apple"));
      u.lang = "en-US"; u.rate = 0.85; speechSynthesis.speak(u);
    } catch (e) { toast("朗讀失敗"); }
  }

  /* ---------- 家長鎖：一元一次方程式 ---------- */
  var gateCb = null, gateAns = 0;
  function newEq() {
    var a = 2 + Math.floor(Math.random() * 4), x = 2 + Math.floor(Math.random() * 8), b = 1 + Math.floor(Math.random() * 15);
    gateAns = x; $("#gateEq").textContent = a + "x + " + b + " = " + (a * x + b); $("#gateIn").value = ""; $("#gateIn").focus();
  }
  function gate(cb) { gateCb = cb; $("#gate").classList.add("open"); newEq(); }
  function closeGate() { $("#gate").classList.remove("open"); gateCb = null; }
  function submitGate() {
    var v = parseInt($("#gateIn").value, 10);
    if (v === gateAns) { var cb = gateCb; closeGate(); if (cb) cb(); } else { toast("再算一次看看"); newEq(); }
  }

  /* ---------- 共用片段 ---------- */
  function phraseRow(p, c) {
    var s = pstat(c, p.id);
    return '<div class="phrase' + (p.main ? " main" : "") + '"><button class="spk" data-say="' + esc(p.say || p.en) + '" aria-label="播放發音">🔊</button>' +
      '<div class="t"><div class="en">' + esc(p.en) + '</div><div>' + esc(p.zh) + '</div><div class="muted">' + esc(p.when) + (p.main ? "　⭐ 本場景主打" : "") + "</div></div>" +
      '<button class="st s' + s + '" data-cyc="' + p.id + '" aria-label="切換狀態">' + STATUS[s] + (s === 2 ? "（複習用）" : "") + "</button></div>";
  }
  function scriptBox(l) {
    var m = S.mode || "A";
    return '<div class="tabs" role="tablist">' +
      [["A", "A 中文帶領"], ["B", "B 中英夾雜"], ["C", "C 全英文"]].map(function (t) { return '<button data-mode="' + t[0] + '" class="' + (m === t[0] ? "on" : "") + '">' + t[1] + "</button>"; }).join("") +
      '</div><div class="script">' + esc(l.scripts[m]) + "</div>" +
      '<p class="muted">依孩子當下的接受度切換；孩子抗拒時用 A，熟悉的情境用 B，很投入時用 C。</p>';
  }
  function list(arr, ordered) { var t = ordered ? "ol" : "ul"; return "<" + t + ">" + arr.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</" + t + ">"; }
  function caterpillar(n, max) {
    var h = '<div class="cat" aria-label="已一起玩過 ' + n + ' 次">';
    for (var i = 0; i < max; i++) h += '<span class="seg' + (i < n ? " on" : "") + '"></span>';
    return h + '<span class="seg head"></span></div>';
  }
  function playsOf(c, unit) { return c.plays.filter(function (p) { return p.unit === unit; }).length; }
  function lessonPhrases(l, c) { return l.phrases.map(function (id) { return PHRASE[id]; }).filter(Boolean).map(function (p) { return phraseRow(p, c); }).join(""); }

  /* ---------- 首頁 ---------- */
  var openAct = null;
  function activityBody(l, key, c) {
    var h = "";
    if (key === "quick") {
      h = "<h3>⚡ 5 分鐘版</h3><p>" + esc(l.quick) + "</p><p><b>玩偶說：</b>" + esc(l.puppet[0]) + ' <button class="spk" data-say="' + esc(l.puppet[0]) + '" aria-label="播放">🔊</button></p>';
    } else if (key === "sing") {
      h = "<h3>🎵 唱唱跳跳</h3><p>" + esc(l.song) + "</p><p class=\"muted\">歌曲庫與歌詞在 v1.1 加入。現在可先用他已會的歌（例如小星星）配動作。</p>";
    } else if (key === "play") {
      h = "<h3>🧸 玩一玩</h3><p>" + esc(l.game) + "</p><p><b>玩偶台詞：</b>" + l.puppet.map(esc).join("、") + "</p>" + scriptBox(l);
    } else if (key === "read") {
      h = "<h3>📖 讀一讀</h3><p>" + esc(l.book) + "</p><p class=\"muted\">原則：先中文故事，英文只夾 1 到 2 個詞；孩子抗拒就用中文念完。</p>";
    } else {
      h = "<h3>🍳 生活中用</h3><p>" + esc(l.life) + "</p>" + lessonPhrases(l, c);
    }
    return '<div class="card warm">' + h + '<div class="row"><button class="btn green" data-played="' + key + '">✅ 一起玩過</button></div></div>';
  }
  function viewHome() {
    var c = kid(), l = LESSON[c.unit] || LESSONS[0], n = playsOf(c, l.id);
    var main = PHRASE[l.phrases[0]];
    var h = '<div class="card soft" style="display:flex;gap:14px;align-items:center">' + mon(c.mon, "jelly") +
      '<div style="flex:1"><div class="muted">目前單元</div><h2 style="margin:0">' + esc(l.id) + " " + esc(l.icon) + " " + esc(l.title) + '</h2>' + caterpillar(Math.min(n, 8), 8) + "</div></div>";
    h += '<div class="card"><h3>這個單元的主打句</h3>' + phraseRow(main, c) +
      '<div class="row"><button class="btn white small" data-go="unit/' + l.id + '">看完整教材卡</button><button class="btn white small" data-go="units">換單元</button></div></div>';
    h += '<div class="card"><h3>今天想做什麼？</h3><p class="muted">不用全部做，做 1 項就很好。沒有「今天沒完成」。</p><div class="menu">' +
      [["quick", "⚡", "5 分鐘版", "最輕鬆"], ["sing", "🎵", "唱唱跳跳", "約 5 分鐘"], ["play", "🧸", "玩一玩", "5 到 8 分鐘"], ["read", "📖", "讀一讀", "5 到 8 分鐘"], ["life", "🍳", "生活中用", "隨時"]].map(function (a) {
        return '<button class="btn" data-act="' + a[0] + '"><span class="em">' + a[1] + "</span>" + a[2] + "<small>" + a[3] + "</small></button>";
      }).join("") + "</div></div>";
    h += '<div id="actArea">' + (openAct ? activityBody(l, openAct, c) : "") + "</div>";
    h += '<div class="card"><button class="btn orange" data-resist="1">🙅 孩子今天不想</button> <button class="btn blue" data-go="phrases">📍 我現在在哪裡？（生活短語）</button></div>';
    h += '<details><summary>不背單字的 5 個原則</summary>' + GUIDE.principles.map(function (p, i) { return "<p><b>" + (i + 1) + ". " + esc(p[0]) + "</b><br>" + esc(p[1]) + "</p>"; }).join("") + "</details>";
    return h;
  }

  /* ---------- 生活短語庫 ---------- */
  var openScene = "meal";
  function viewPhrases() {
    var c = kid(), sc = SCENES.filter(function (s) { return s.id === openScene; })[0] || SCENES[0];
    var h = '<h1>📍 我現在在哪裡？</h1><p class="muted">點場景，只挑 1 到 2 句用就好。點右側標籤可切換「' + "新 → 學習中 → 已會" + '」（目前顯示的是這位孩子的狀態）。</p>';
    h += '<div class="scenes">' + SCENES.map(function (s) { return '<button class="btn' + (s.id === sc.id ? "" : " white") + '" data-scene="' + s.id + '"><span class="em">' + s.icon + "</span>" + esc(s.name) + "</button>"; }).join("") + "</div>";
    h += '<div class="card" style="margin-top:16px"><h2>' + sc.icon + " " + esc(sc.name) + "</h2>" + sc.phrases.map(function (p) { return phraseRow(p, c); }).join("") + "</div>";
    return h;
  }

  /* ---------- 單元列表與教材卡 ---------- */
  function viewUnits() {
    var c = kid();
    var h = '<h1>📚 階段 A：生活情境句與歌曲</h1><p class="muted">不依日期，孩子準備好再往下；孩子抗拒時，退回或重複都沒關係。</p><div class="grid">';
    LESSONS.forEach(function (l) {
      var cur = l.id === c.unit;
      h += '<div class="card" style="margin:0;' + (cur ? "background:#FFF3C4" : "") + '"><div style="font-size:2rem">' + l.icon + "</div><h3>" + l.id + " " + esc(l.title) + "</h3>" +
        (cur ? '<span class="tag y">目前單元</span> ' : "") + '<span class="tag b">玩過 ' + playsOf(c, l.id) + " 次</span>" +
        '<div class="row" style="margin-top:10px"><button class="btn small white" data-go="unit/' + l.id + '">打開</button>' + (cur ? "" : '<button class="btn small blue" data-setunit="' + l.id + '">設為目前</button>') + "</div></div>";
    });
    h += '</div><div class="card" style="margin-top:16px"><h3>階段 A 檢查點（參考，不用全部達成）</h3>' + list(GUIDE.checkpoints) + '<p class="muted">達到約一半以上，就可以考慮進入階段 B（B 單元會在 v1.1 加入）。</p></div>';
    return h;
  }
  function viewUnit(id) {
    var c = kid(), l = LESSON[id];
    if (!l) return "<p>找不到這個單元。</p>";
    var i = LESSONS.indexOf(l);
    var h = '<p><button class="btn small white" data-go="units">← 單元列表</button></p>';
    h += '<div class="card soft"><div class="muted">階段 ' + l.stage + "</div><h1>" + l.icon + " " + l.id + " " + esc(l.title) + "</h1><p><b>目標：</b>" + esc(l.goal) + "</p>" +
      '<div class="row"><button class="btn green" data-played="unit">✅ 一起玩過</button>' + (c.unit === l.id ? '<span class="tag y" style="align-self:center">目前單元</span>' : '<button class="btn blue" data-setunit="' + l.id + '">設為目前單元</button>') +
      '<button class="btn orange" data-resist="1">🙅 孩子今天不想</button></div></div>';
    if (LCARDS[l.id]) h += '<div class="card"><button class="btn blue" data-go="cards/' + LCARDS[l.id].pat + "/" + LCARDS[l.id].cat + '">🃏 用圖卡練習這個單元</button> <span class="muted">有圖、有發音、自動組好完整句</span></div>';
    h += '<div class="two"><div>';
    h += '<div class="card"><h2>句子</h2><p class="muted">整句記憶：先當「情境配對」學會，不要求換詞。</p>' + lessonPhrases(l, c) +
      (l.words.length ? "<h3>單字</h3>" + list(l.words) : "") + "</div>";
    h += '<div class="card"><h2>家長腳本</h2>' + scriptBox(l) + "<h3>玩偶台詞</h3><p>" + l.puppet.map(function (t) { return '<button class="btn small white" data-say="' + esc(t) + '">🔊 ' + esc(t) + "</button> "; }).join("") + "</p></div>";
    if (l.ladder) {
      h += '<div class="card"><h2>引導階梯</h2><table><tr><th>級</th><th>你做什麼</th><th>孩子做什麼</th></tr>' + l.ladder.map(function (r) { return "<tr><td>" + esc(r[0]) + "</td><td>" + esc(r[1]) + "</td><td>" + esc(r[2]) + "</td></tr>"; }).join("") + "</table><p class=\"muted\">孩子卡在哪一級就停在哪一級，能接上一個詞就是進步，不需要糾正。</p></div>";
    }
    h += "</div><div>";
    h += '<div class="card"><h2>教學步驟</h2>' + list(l.steps, true) + "<p><b>⚡ 5 分鐘版：</b>" + esc(l.quick) + "</p></div>";
    h += '<div class="card"><h2>遊戲、歌曲、繪本</h2><p><b>遊戲：</b>' + esc(l.game) + "</p><p><b>歌曲：</b>" + esc(l.song) + "</p><p><b>繪本：</b>" + esc(l.book) + "</p><p><b>生活中用：</b>" + esc(l.life) + "</p></div>";
    h += '<div class="card"><h2>兩個孩子一起用</h2><p>' + esc(l.twoKids) + "</p></div>";
    h += '<div class="card"><h2>孩子抗拒時</h2>' + list(l.resist) + '<div class="note">抗拒常常不是英文本身，而是「這本書／這個情境和他預期的不一樣」。先換回他熟悉的方式，只換一小部分。</div></div>';
    h += "</div></div>";
    h += "<details><summary>觀察、紙本轉化、複習</summary><p><b>觀察重點：</b>" + esc(l.observe) + "</p><p><b>紙本轉化：</b>" + esc(l.paper) + "</p><p><b>複習：</b>" + esc(l.review) + "</p></details>";
    var k = l.kid;
    h += "<details><summary>孩子模式預留（目前只是參考）</summary><ul><li><b>主角：</b>" + esc(k.hero) + "</li><li><b>按鈕：</b>" + esc(k.buttons) + "</li><li><b>遊戲：</b>" + esc(k.game) + "</li><li><b>色系：</b>" + esc(k.palette) + "</li><li>" + esc(k.note) + "</li></ul></details>";
    h += '<div class="row">' + (i > 0 ? '<button class="btn white" data-go="unit/' + LESSONS[i - 1].id + '">← ' + LESSONS[i - 1].id + "</button>" : "") + (i < LESSONS.length - 1 ? '<button class="btn white" data-go="unit/' + LESSONS[i + 1].id + '">' + LESSONS[i + 1].id + " →</button>" : "") + "</div>";
    return h;
  }

  /* ---------- 圖卡 ---------- */
  var cardPat = "give_me", cardCat = "fruit", picked = [];
  function pic(w) {
    var p = w[3];
    if (p.indexOf("svg:") === 0) return '<span class="pic svg">' + ((window.MFE_SVG || {})[p.slice(4)] || "") + "</span>";
    return '<span class="pic">' + p + "</span>";
  }
  function art(w) { if (w[4] === "u" || w[4] === "p") return w[1]; return (/^[aeiou]/i.test(w[1]) ? "an " : "a ") + w[1]; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function sentence(pat, w, w2) {
    var t = w[4], n = w[1];
    if (pat === "give_me") return "Give me " + art(w) + ", please.";
    if (pat === "here_is") return (t === "p" ? "Here are your " : "Here is your ") + n + ".";
    if (pat === "where_is") return (t === "p" ? "Where are the " : "Where is the ") + n + "?";
    if (pat === "this_is") return t === "p" ? "These are " + n + "." : "This is " + art(w) + ".";
    if (pat === "i_want") return "I want " + art(w) + ".";
    if (pat === "or_choice") return w2 ? cap(n) + " or " + w2[1] + "?" : "";
    return n;
  }
  function viewCards() {
    var pat = PATS.filter(function (p) { return p.id === cardPat; })[0] || PATS[0];
    var cat = WCATS.filter(function (c) { return c.id === cardCat; })[0] || WCATS[0];
    var isOr = pat.id === "or_choice";
    var h = '<div class="noprint"><h1>🃏 圖卡</h1><p class="muted">選一個句型、一個類別，點卡片放進「今日圖卡」，照著唸即可。🔊 可聽單字發音，💬 可聽完整句。</p>';
    h += '<div class="row" style="margin-bottom:8px">' + PATS.map(function (p) { return '<button class="btn small ' + (p.id === pat.id ? "" : "white") + '" data-pat="' + p.id + '">' + esc(p.name) + "</button>"; }).join("") + "</div>";
    h += '<p class="muted"><b>' + esc(pat.zh) + "</b>　" + esc(pat.hint) + "</p>";
    h += '<div class="row" style="margin-bottom:12px">' + WCATS.map(function (c) { return '<button class="btn small ' + (c.id === cat.id ? "blue" : "white") + '" data-wcat="' + c.id + '">' + c.icon + " " + esc(c.name) + "</button>"; }).join("") + "</div>";
    var max = isOr ? 2 : 4, ws = picked.map(function (id) { return WORD[id]; }).filter(Boolean);
    h += '<div class="card warm"><h2>今日圖卡 <span class="muted" style="font-weight:400">（最多 ' + max + " 張）</span></h2>";
    if (!ws.length) {
      h += '<p class="muted">還沒選。點下面的卡片，或</p>';
    } else {
      h += '<div class="tray">' + ws.map(function (w, i) {
        var s = isOr ? (i === 0 && ws[1] ? sentence("or_choice", ws[0], ws[1]) : "") : sentence(pat.id, w);
        return '<div class="wcard big on">' + pic(w) + '<div class="we">' + esc(w[1]) + '</div><div class="wz">' + esc(w[2]) + "</div>" + (s ? '<div class="ws">' + esc(s) + ' <button class="spk" data-say="' + esc(s) + '" aria-label="唸整句">💬</button></div>' : "") + "</div>";
      }).join("") + "</div>";
      if (isOr && ws.length < 2) h += '<p class="muted">再選 1 張，就會組成「A or B?」。</p>';
      var tip = pat.stem ? "你說「" + pat.stem + "…」後停住，等孩子接（只接一個詞也算成功）。" : "把兩張卡舉到孩子面前，一次說一個詞，讓他用手指選。";
      h += '<div class="note">' + tip + (pat.ask ? "　可以問：" + esc(pat.ask) : "") + "</div>";
    }
    h += '<div class="row"><button class="btn green small" data-rand="1">🎲 隨機抽 2 張</button>' + (ws.length ? '<button class="btn white small" data-clearpick="1">清除</button>' : "") + "</div></div></div>";
    h += '<div class="row noprint" style="justify-content:space-between;align-items:center"><h2 style="margin:0">' + cat.icon + " " + esc(cat.name) + "（" + cat.words.length + " 個）</h2><button class=\"btn small white\" data-print=\"1\">🖨 列印這一類圖卡</button></div>";
    h += '<div class="wgrid">' + cat.words.map(function (w) {
      var s = isOr ? "" : sentence(pat.id, w), on = picked.indexOf(w[0]) >= 0;
      return '<div class="wcard' + (on ? " on" : "") + '" data-pick="' + w[0] + '" role="button" tabindex="0" aria-pressed="' + on + '">' + pic(w) + '<div class="we">' + esc(w[1]) + '</div><div class="wz">' + esc(w[2]) + "</div>" +
        '<div class="row noprint" style="justify-content:center;gap:6px"><button class="spk" data-say="' + esc(w[1]) + '" aria-label="唸單字">🔊</button>' + (s ? '<button class="spk" data-say="' + esc(s) + '" aria-label="唸整句">💬</button>' : "") + "</div>" +
        (s ? '<div class="ws">' + esc(s) + "</div>" : "") + "</div>";
    }).join("") + "</div>";
    return h;
  }

  /* ---------- 指南 ---------- */
  function viewGuide() {
    var h = "<h1>🧭 家長通用指南</h1><div class=\"card\"><h2>不背單字的 5 個原則</h2>" + GUIDE.principles.map(function (p, i) { return "<p><b>" + (i + 1) + ". " + esc(p[0]) + "</b><br>" + esc(p[1]) + "</p>"; }).join("") + "</div>";
    h += '<div class="card"><h2>常見狀況</h2>' + GUIDE.tips.map(function (t) { return "<p><b>" + esc(t[0]) + "</b><br>" + esc(t[1]) + "</p>"; }).join("") + "</div>";
    h += '<div class="card"><h2>孩子說「不是不是」時</h2>' + list(GUIDE.resistTips) + "</div>";
    return h;
  }

  /* ---------- 紀錄 ---------- */
  function viewRecord() {
    var c = kid(), total = c.plays.length;
    var cnt = [0, 0, 0];
    SCENES.forEach(function (s) { s.phrases.forEach(function (p) { cnt[pstat(c, p.id)]++; }); });
    var h = '<div class="card soft" style="display:flex;gap:14px;align-items:center">' + mon(c.mon) + '<div><h1 style="margin:0">⭐ 一起玩過 ' + total + " 次</h1><p class=\"muted\" style=\"margin:0\">輕量紀錄，重點是鼓勵。</p></div></div>";
    h += '<div class="card"><h2>各單元</h2>' + LESSONS.map(function (l) { return "<p><b>" + l.id + " " + esc(l.title) + "</b>" + caterpillar(Math.min(playsOf(c, l.id), 8), 8) + "</p>"; }).join("") + "</div>";
    h += '<div class="card"><h2>短語狀態</h2><p><span class="st s2">已會 ' + cnt[2] + '</span> <span class="st s1">學習中 ' + cnt[1] + '</span> <span class="st s0">新 ' + cnt[0] + '</span></p><p class="muted">狀態由你手動判斷：要在不同日子、不同情境都觀察到，才標「已會」。到「生活短語」頁點標籤即可切換。</p></div>';
    h += '<div class="card"><h2>🏅 里程碑（手動點選）</h2><div class="row">' + GUIDE.milestones.map(function (m, i) { var on = c.badges.indexOf(m) >= 0; return '<button class="btn small ' + (on ? "green" : "white") + '" data-badge="' + i + '">' + (on ? "🏅 " : "") + esc(m) + "</button>"; }).join("") + "</div></div>";
    h += '<div class="card"><h2>📝 這週的小亮點</h2><textarea id="noteIn" placeholder="孩子今天說了什麼、做了什麼？一句話就好"></textarea><p><button class="btn blue" data-addnote="1">儲存</button></p>' +
      (c.notes.length ? c.notes.slice().reverse().map(function (n, ri) { var idx = c.notes.length - 1 - ri; return '<div class="note"><span class="muted">' + new Date(n.ts).toLocaleDateString() + '</span><br>' + esc(n.text) + ' <button class="btn small white" data-delnote="' + idx + '" aria-label="刪除">🗑</button></div>'; }).join("") : '<p class="muted">還沒有紀錄。</p>') + "</div>";
    return h;
  }

  /* ---------- 設定（需家長鎖） ---------- */
  function viewSettings() {
    var h = "<h1>⚙️ 設定</h1>";
    h += '<div class="card"><h2>孩子（以動物怪獸代表，不用暱稱）</h2><div class="row" style="align-items:center">' + S.children.map(function (c) {
      return '<div style="text-align:center">' + mon(c.mon) + '<br><button class="btn small white" data-delkid="' + c.id + '">移除</button></div>';
    }).join("") + "</div>";
    if (S.children.length < 4) {
      var used = S.children.map(function (c) { return c.mon; });
      h += "<h3>新增孩子：選一個怪獸</h3><div class=\"row\">" + MONS.map(function (m, i) { return used.indexOf(i) >= 0 ? "" : '<button class="kidbtn" data-addkid="' + i + '" aria-label="新增">' + m + "</button>"; }).join("") + "</div>";
    }
    h += "</div>";
    h += '<div class="card"><h2>備份</h2><p class="muted">資料只存在這個瀏覽器；換裝置或清除瀏覽器資料會消失。建議偶爾匯出備份。</p><div class="row"><button class="btn blue" data-export="1">⬇ 匯出備份</button><label class="btn white">⬆ 匯入備份<input type="file" id="imp" accept="application/json" style="display:none"></label></div></div>';
    h += '<div class="card"><h2>清除所有資料</h2><button class="btn orange" data-reset="1">清除並重新開始</button></div>';
    return h;
  }

  /* ---------- 路由與渲染 ---------- */
  var NAV = [["home", "🏠", "首頁"], ["phrases", "📍", "短語"], ["cards", "🃏", "圖卡"], ["units", "📚", "單元"], ["guide", "🧭", "指南"], ["record", "⭐", "紀錄"], ["settings", "⚙️", "設定"]];
  var unlocked = false;
  function route() { var h = (location.hash || "#home").slice(1); return h; }
  function render() {
    var r = route(), parts = r.split("/"), base = parts[0], c = kid();
    $("#kids").innerHTML = S.children.map(function (k) { return '<button class="kidbtn' + (k.id === S.active ? " on" : "") + '" data-kid="' + k.id + '" aria-label="切換孩子">' + MONS[k.mon] + "</button>"; }).join("");
    $("#nav").innerHTML = NAV.map(function (n) { return '<button data-go="' + n[0] + '" class="' + (base === n[0] || (base === "unit" && n[0] === "units") ? "on" : "") + '"><span class="i">' + n[1] + "</span>" + n[2] + "</button>"; }).join("");
    var out = "";
    if (base === "phrases") out = viewPhrases();
    else if (base === "units") out = viewUnits();
    else if (base === "unit") out = viewUnit(parts[1]);
    else if (base === "cards") out = viewCards();
    else if (base === "guide") out = viewGuide();
    else if (base === "record") out = viewRecord();
    else if (base === "settings") out = unlocked ? viewSettings() : '<div class="card"><h2>🔒 家長設定</h2><p>需要通過家長鎖才能進入。</p><button class="btn" data-unlock="1">解鎖</button></div>';
    else out = viewHome();
    $("#view").innerHTML = out;
  }
  function go(r) { if (r !== "settings") unlocked = false; location.hash = r; if (route() === r) render(); window.scrollTo(0, 0); }
  window.addEventListener("hashchange", function () { if (route().split("/")[0] !== "settings") unlocked = false; render(); });

  /* ---------- 動作 ---------- */
  function played(key) {
    var c = kid(), l = LESSON[c.unit];
    var unitId = key === "unit" ? (route().split("/")[1] || c.unit) : c.unit;
    c.plays.push({ unit: unitId, act: key, ts: Date.now() }); c.resist = [];
    save(); toast("⭐ 一起玩過！做得好");
    if (key !== "unit") { openAct = null; }
    render();
  }
  function resistModal() {
    var c = kid(), streak = c.resist.length, h = "<h2>孩子今天不想 🙅</h2><p>先不辯解、不追問，說一句：「好，那我們說中文。」然後立刻改回中文。</p>" + list(GUIDE.resistTips.slice(1));
    h += '<p><button class="btn orange" data-logresist="1">記一次（幫我留意）</button></p>';
    if (streak >= 3) {
      h += '<div class="note">已連續 ' + streak + " 次沒玩成。建議退回上一個單元，或只保留他喜歡的歌。";
      var old = c.resist[0];
      if (Date.now() - old > 14 * 86400000) h += "<br>已超過 2 週，建議暫停英文 2 到 4 週，只保留歌曲。";
      h += '</div><p><button class="btn blue" data-back="1">退回上一單元</button></p>';
    } else if (streak > 0) { h += '<p class="muted">已記錄 ' + streak + " 次（累積 3 次會有退回建議；有一起玩過就歸零）。</p>"; }
    $("#resistBody").innerHTML = h; $("#resist").classList.add("open");
  }
  function download(name, text) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "application/json" })); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-go],[data-say],[data-cyc],[data-mode],[data-act],[data-played],[data-scene],[data-setunit],[data-kid],[data-resist],[data-logresist],[data-back],[data-badge],[data-addnote],[data-delnote],[data-unlock],[data-addkid],[data-delkid],[data-export],[data-reset],[data-pat],[data-wcat],[data-pick],[data-rand],[data-clearpick],[data-print],#gateOk,#gateX,#resistX");
    if (!t) return;
    var d = t.dataset, c = kid();
    if (t.id === "gateOk") return submitGate();
    if (t.id === "gateX") return closeGate();
    if (t.id === "resistX") return $("#resist").classList.remove("open");
    if (d.go) {
      var gp = d.go.split("/");
      if (gp[0] === "cards" && gp.length === 3) { cardPat = gp[1]; cardCat = gp[2]; picked = []; return go("cards"); }
      return go(d.go);
    }
    if (d.pat) { cardPat = d.pat; picked = []; return render(); }
    if (d.wcat) { cardCat = d.wcat; return render(); }
    if (d.pick) { togglePick(d.pick); return render(); }
    if (d.rand) {
      var cw = (WCATS.filter(function (x) { return x.id === cardCat; })[0] || WCATS[0]).words.slice();
      cw.sort(function () { return Math.random() - 0.5; }); picked = [cw[0][0], cw[1][0]]; return render();
    }
    if (d.clearpick) { picked = []; return render(); }
    if (d.print) return window.print();
    if (d.say) return speak(d.say);
    if (d.cyc) { c.phr[d.cyc] = (pstat(c, d.cyc) + 1) % 3; save(); return render(); }
    if (d.mode) { S.mode = d.mode; save(); return render(); }
    if (d.act) { openAct = openAct === d.act ? null : d.act; return render(); }
    if (d.played) return played(d.played);
    if (d.scene) { openScene = d.scene; return render(); }
    if (d.setunit) { c.unit = d.setunit; save(); toast("已設為目前單元"); return render(); }
    if (d.kid) { S.active = d.kid; save(); return render(); }
    if (d.resist) return resistModal();
    if (d.logresist) { c.resist.push(Date.now()); save(); resistModal(); return; }
    if (d.back) { var i = LESSONS.map(function (l) { return l.id; }).indexOf(c.unit); if (i > 0) c.unit = LESSONS[i - 1].id; c.resist = []; save(); $("#resist").classList.remove("open"); toast("已退回上一單元"); return render(); }
    if (d.badge != null) { var m = GUIDE.milestones[+d.badge], k = c.badges.indexOf(m); if (k >= 0) c.badges.splice(k, 1); else { c.badges.push(m); toast("🏅 " + m); } save(); return render(); }
    if (d.addnote) { var v = $("#noteIn").value.trim(); if (!v) return; c.notes.push({ ts: Date.now(), text: v }); save(); return render(); }
    if (d.delnote != null) { c.notes.splice(+d.delnote, 1); save(); return render(); }
    if (d.unlock) return gate(function () { unlocked = true; render(); });
    if (d.addkid != null) { var nc = newChild(+d.addkid, false); S.children.push(nc); save(); toast("已新增"); return render(); }
    if (d.delkid) {
      if (S.children.length <= 1) return toast("至少要保留一位孩子");
      if (!confirm("移除這位孩子與他所有紀錄？此動作無法復原。")) return;
      S.children = S.children.filter(function (k) { return k.id !== d.delkid; });
      if (S.active === d.delkid) S.active = S.children[0].id; save(); return render();
    }
    if (d.export) { download("my-family-english-backup.json", JSON.stringify(S, null, 2)); return toast("已匯出"); }
    if (d.reset) { if (confirm("確定清除所有資料？建議先匯出備份。")) { localStorage.removeItem(KEY); S = load(); save(); unlocked = false; go("home"); } return; }
  });
  document.addEventListener("change", function (e) {
    if (e.target.id !== "imp") return;
    var f = e.target.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        var o = JSON.parse(r.result);
        if (!o || !Array.isArray(o.children) || !o.children.length || !o.active) throw new Error("格式不符");
        if (!confirm("匯入會覆蓋目前資料，確定嗎？")) return;
        S = o; save(); toast("已匯入"); render();
      } catch (err) { toast("匯入失敗：檔案格式不正確"); }
    };
    r.readAsText(f);
  });
  function togglePick(id) {
    var i = picked.indexOf(id), max = cardPat === "or_choice" ? 2 : 4;
    if (i >= 0) picked.splice(i, 1); else { picked.push(id); while (picked.length > max) picked.shift(); }
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target.id === "gateIn") submitGate();
    if ((e.key === "Enter" || e.key === " ") && e.target.dataset && e.target.dataset.pick) { e.preventDefault(); togglePick(e.target.dataset.pick); render(); }
  });

  S = load(); save();
  render();
  if ("serviceWorker" in navigator && false) { /* PWA 預留（v2.0） */ }
})();
