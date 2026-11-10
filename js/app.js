/* My Family English v1.0 — 純前端，資料存在瀏覽器 localStorage，不上傳任何資料 */
(function () {
  "use strict";
  var SCENES = window.MFE_SCENES, LESSONS = window.MFE_LESSONS, GUIDE = window.MFE_GUIDE;
  var KEY = "mfe_v1";
  var WCATS = window.MFE_WORD_CATS || [], PATS = window.MFE_PATTERNS || [], LCARDS = window.MFE_LESSON_CARDS || {};
  var WORD = {};
  WCATS.forEach(function (c) { c.words.forEach(function (w) { WORD[w[0]] = w; }); });
  var STATUS = ["新", "學習中", "已會"];
  var LEVELS = ["新", "聽過", "有反應", "能指認", "主動使用"];
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
  var TINT = ["#DDF1E4", "#DCEEFB", "#FFE6D6", "#EDE2F8"];
  var MON_DEF = [
    { base: "#8BC99E", shade: "#79B98E",
      back: '<circle cx="46" cy="56" r="25"/><circle cx="134" cy="56" r="25"/>',
      backIn: '<circle cx="46" cy="58" r="12" fill="#F9D9B7"/><circle cx="134" cy="58" r="12" fill="#F9D9B7"/>',
      face: '<ellipse cx="90" cy="126" rx="31" ry="22" fill="#F9D9B7"/>', nose: '<ellipse cx="90" cy="113" rx="8" ry="5.5" fill="#344b4a"/>', mouth: '<path d="M90 118Q84 130 76 122M90 118Q96 130 104 122" fill="none" stroke="#344b4a" stroke-width="4.5" stroke-linecap="round"/>' },
    { base: "#8CC8F2", shade: "#64AEE0",
      back: '<path d="M28 84C18 44 34 20 56 33C70 42 76 58 74 78Z"/><path d="M152 84C162 44 146 20 124 33C110 42 104 58 106 78Z"/>',
      backIn: '<path d="M40 74C35 52 44 42 54 49C60 55 62 63 61 72Z" fill="#F8BBD0"/><path d="M140 74C145 52 136 42 126 49C120 55 118 63 119 72Z" fill="#F8BBD0"/>',
      face: '<path d="M80 58L82 71M90 55V71M100 58L98 71" stroke="#64AEE0" stroke-width="5" stroke-linecap="round" fill="none"/>', nose: '<path d="M84 112H96L90 119Z" fill="#F48FB1" stroke="#F48FB1" stroke-width="3" stroke-linejoin="round"/>', mouth: '<path d="M90 119Q84 130 76 123M90 119Q96 130 104 123" fill="none" stroke="#344b4a" stroke-width="4.5" stroke-linecap="round"/>' },
    { base: "#FFA977", shade: "#F4864F",
      back: '<path d="M58 54L67 12L86 46Z" fill="#FFE082"/><path d="M94 46L113 12L122 54Z" fill="#FFE082"/>',
      backIn: '',
      face: '<ellipse cx="78" cy="68" rx="5" ry="3.5" fill="#F4864F" opacity=".7"/><ellipse cx="90" cy="61" rx="5" ry="3.5" fill="#F4864F" opacity=".7"/><ellipse cx="102" cy="68" rx="5" ry="3.5" fill="#F4864F" opacity=".7"/>', nose: '',
      mouth: '<path d="M75 120Q90 144 105 120Z" fill="#344b4a" stroke="#344b4a" stroke-width="3" stroke-linejoin="round"/><ellipse cx="90" cy="133" rx="8" ry="4.5" fill="#F48FB1"/>' },
    { base: "#C9A7EB", shade: "#AB84D6",
      back: '<path d="M54 74C34 30 42 2 60 2C77 2 84 34 82 74Z"/><path d="M126 74C146 30 138 2 120 2C103 2 96 34 98 74Z"/>',
      backIn: '<path d="M61 62C52 36 54 14 60 14C67 14 71 38 71 62Z" fill="#F8BBD0"/><path d="M119 62C128 36 126 14 120 14C113 14 109 38 109 62Z" fill="#F8BBD0"/>',
      face: '', nose: '<ellipse cx="90" cy="112" rx="6.5" ry="4.8" fill="#F48FB1"/>',
      mouth: '<path d="M90 117V124M90 124Q83 131 76 125M90 124Q97 131 104 125" fill="none" stroke="#344b4a" stroke-width="4.5" stroke-linecap="round"/><rect x="84" y="127" width="12" height="10" rx="3" fill="#fff" stroke="#344b4a" stroke-width="2.5"/><path d="M90 127V137" stroke="#344b4a" stroke-width="2"/>' }
  ];
  function monSvg(d) {
    var W = 'stroke="#fff" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"';
    return '<svg viewBox="-6 -4 192 214" aria-hidden="true">' +
      '<ellipse cx="90" cy="200" rx="56" ry="7" fill="#37474F" opacity=".1"/>' +
      '<g fill="' + (d.back.indexOf("fill=") >= 0 ? "none" : d.shade) + '" ' + W + ">" + d.back + "</g>" + d.backIn +
      '<ellipse cx="40" cy="166" rx="13" ry="26" transform="rotate(25 40 166)" fill="' + d.shade + '" ' + W + "/>" +
      '<ellipse cx="140" cy="166" rx="13" ry="26" transform="rotate(-25 140 166)" fill="' + d.shade + '" ' + W + "/>" +
      '<ellipse cx="90" cy="172" rx="38" ry="26" fill="' + d.shade + '" ' + W + "/>" +
      '<path d="M24 100C22 56 54 40 90 40C128 40 160 58 156 102C154 140 124 160 90 160C54 160 26 140 24 100Z" fill="' + d.base + '" stroke="#fff" stroke-width="8" stroke-linejoin="round"/>' +
      d.face +
      '<ellipse cx="64" cy="104" rx="7.5" ry="10.5" fill="#344b4a"/><ellipse cx="116" cy="104" rx="7.5" ry="10.5" fill="#344b4a"/><circle cx="66.5" cy="99.5" r="2.8" fill="#fff"/><circle cx="118.5" cy="99.5" r="2.8" fill="#fff"/>' +
      '<ellipse cx="46" cy="124" rx="11" ry="7" fill="#F4A4A0" opacity=".85"/><ellipse cx="134" cy="124" rx="11" ry="7" fill="#F4A4A0" opacity=".85"/>' +
      d.nose + d.mouth + "</svg>";
  }
  var MONS = MON_DEF.map(monSvg);
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
  function band(l) { return l === 0 ? 0 : (l <= 2 ? 1 : 2); }
  function lvOf(c, id) { if (c.lv && c.lv[id] != null) return c.lv[id]; var p = pstat(c, id); return p === 0 ? 0 : (p === 1 ? 2 : 4); }
  function setLevel(c, id, l) { c.lv = c.lv || {}; c.pts = c.pts || {}; c.lv[id] = l; c.phr[id] = band(l); c.pts[id] = c.plays.length; }
  var REVIEW_AFTER = 8;
  function reviewList(c) {
    var out = [];
    SCENES.forEach(function (sc) { sc.phrases.forEach(function (p) { if (pstat(c, p.id) === 1 && c.plays.length - ((c.pts || {})[p.id] || 0) >= REVIEW_AFTER) out.push(p); }); });
    return out;
  }
  function summaryText(c) {
    var done = [], learning = [];
    SCENES.forEach(function (sc) { sc.phrases.forEach(function (p) { var st = pstat(c, p.id); if (st === 2) done.push(p.en); else if (st === 1) learning.push(p.en); }); });
    var played = LESSONS.filter(function (l) { return playsOf(c, l.id) > 0; }).map(function (l) { return l.id + "×" + playsOf(c, l.id); });
    return "My Family English 進度摘要\n一起玩過：" + c.plays.length + " 次\n玩過的單元：" + (played.join("、") || "（還沒有）") + "\n已會的短語（" + done.length + "）：" + (done.join("；") || "—") + "\n學習中（" + learning.length + "）：" + (learning.join("；") || "—") + "\n里程碑：" + (c.badges.join("；") || "—") + "\n最近的亮點：\n" + (c.notes.slice(-5).map(function (n) { return "・" + n.text; }).join("\n") || "—");
  }

  /* ---------- 發音（瀏覽器內建 TTS；字母聲音不適用） ---------- */
  function speak(text) {
    if (S.mute) { toast("聲音已關閉（右上角喇叭可開啟）"); return; }
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
      '<button class="st s' + s + '" data-cyc="' + p.id + '" aria-label="切換狀態">' + (S.detail ? LEVELS[lvOf(c, p.id)] : STATUS[s] + (s === 2 ? "（複習用）" : "")) + "</button></div>";
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

  /* ---------- 歌曲與繪本 ---------- */
  var MEDIA = window.MFE_MEDIA || {};
  var KIND = { pd: ["公版歌曲", "g"], own: ["自編韻文", "y"], title: ["只列歌名", "b"] };
  function songHtml(s) {
    var k = KIND[s.kind] || KIND.title, saved = (S.lyr || {})[s.id] || "";
    var h = '<div class="sub"><h3 style="margin-bottom:4px">🎵 ' + esc(s.t) + (s.zh ? "（" + esc(s.zh) + "）" : "") + ' <span class="tag ' + k[1] + '">' + k[0] + "</span></h3>";
    if (s.act) h += "<p><b>動作／玩法：</b>" + esc(s.act) + "</p>";
    if (s.lyrics) {
      h += '<pre class="lyr">' + esc(s.lyrics) + '</pre><p><button class="btn small white" data-say="' + esc(s.lyrics.replace(/\n/g, " ")) + '">🔊 念給我聽（慢速朗讀，不是唱）</button></p>';
    } else {
      if (s.note) h += '<p class="muted">' + esc(s.note) + "</p>";
      if (saved) h += '<pre class="lyr">' + esc(saved) + "</pre>";
      h += "<details><summary>" + (saved ? "編輯我的歌詞" : "貼上我的歌詞") + '（只存在這個瀏覽器）</summary><textarea id="lyr-' + s.id + '" placeholder="把你找到的歌詞貼在這裡">' + esc(saved) + '</textarea><p><button class="btn small blue" data-savelyr="' + s.id + '">儲存</button></p></details>';
    }
    h += '<p><a class="btn small white" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=' + encodeURIComponent(s.q || s.t + " nursery rhyme") + '">▶ 到 YouTube 搜尋（建議只聽聲音）</a></p></div>';
    return h;
  }
  function songsHtml(id) {
    var m = MEDIA[id];
    return m && m.songs ? m.songs.map(songHtml).join("") : "<p class=\"muted\">這個單元還沒有歌曲。</p>";
  }
  function booksHtml(id) {
    var m = MEDIA[id];
    if (!m || !m.books) return "<p class=\"muted\">這個單元還沒有繪本建議。</p>";
    return m.books.map(function (b) { return '<div class="sub"><b>' + esc(b.t) + '</b> <span class="muted">' + esc(b.au) + "</span><br>" + esc(b.why) + '<br><button class="btn small white" data-copy="' + esc(b.t) + '">📋 複製書名，去北市圖查</button></div>'; }).join("") +
      '<p class="muted">念法：先用中文講故事，只在重複出現的詞夾英文；孩子要自己選書；抗拒就用中文念完。書名、作者是依記憶整理，尚未逐一核對臺北市立圖書館館藏；請複製書名到北市圖館藏查詢，查不到可找中文版或同作者的其他書。各版本字數可能不同。</p>';
  }

  /* ---------- 首頁 ---------- */
  var openAct = null;
  function activityBody(l, key, c) {
    var h = "";
    if (key === "quick") {
      h = "<h3>⚡ 5 分鐘版</h3><p>" + esc(l.quick) + "</p><p><b>玩偶說：</b>" + esc(l.puppet[0]) + ' <button class="spk" data-say="' + esc(l.puppet[0]) + '" aria-label="播放">🔊</button></p>';
    } else if (key === "sing") {
      h = "<h3>🎵 唱唱跳跳</h3>" + songsHtml(l.id);
    } else if (key === "play") {
      h = "<h3>🧸 玩一玩</h3><p>" + esc(l.game) + "</p><p><b>玩偶台詞：</b>" + l.puppet.map(esc).join("、") + "</p>" + scriptBox(l);
    } else if (key === "read") {
      h = "<h3>📖 讀一讀</h3>" + booksHtml(l.id);
    } else {
      h = "<h3>🍳 生活中用</h3><p>" + esc(l.life) + "</p>" + lessonPhrases(l, c);
    }
    return '<div class="card warm">' + h + '<div class="row"><button class="btn green" data-played="' + key + '">✅ 一起玩過</button></div></div>';
  }
  var STK_COL = ["#FFD54F", "#AED581", "#81D4FA", "#F8BBD0", "#FFAB91", "#CE93D8", "#80CBC4", "#FFE082", "#B39DDB"];
  function stickerCount(c) { return LESSONS.filter(function (l) { return playsOf(c, l.id) >= 3; }).length; }
  function stars(n) { return [1, 3, 6].map(function (t) { return '<span class="' + (n >= t ? "on" : "") + '">★</span>'; }).join(""); }
  function viewHome() {
    var c = kid(), l = LESSON[c.unit] || LESSONS[0], total = c.plays.length, sc = stickerCount(c);
    var main = PHRASE[l.phrases[0]];
    var h = '<section class="hero"><div class="hero-copy"><div class="eyebrow">A LITTLE ENGLISH EVERY DAY</div>' +
      '<h2 class="sticker-title">一起玩，<br>一起說英文！</h2><p class="hero-p">不用排日期，想玩哪一個就玩哪一個。做 1 項就很棒。</p>' +
      '<div class="stats"><div class="stat"><b>' + total + '</b>一起玩過</div><div class="stat"><b>' + sc + " / " + LESSONS.length + '</b>貼紙</div><div class="stat"><b>' + esc(l.id) + '</b>目前單元</div></div></div>' +
      '<div class="hero-stage"><div class="mascot">' + MONS[c.mon] + '</div><div class="play-wrap"><button class="play-btn" data-play="1" aria-label="開始今天的英文">▶</button><div class="play-label">LET\'S PLAY!</div></div></div>' +
      '<span class="deco a">✿</span><span class="deco b">☁️</span></section>';
    h += '<div class="card"><h2>🗺️ 學習地圖</h2><p class="muted">點島嶼看教材。玩 1、3、6 次各得一顆星；玩滿 3 次拿到貼紙。沒有鎖，想去哪都可以。</p><div class="map">' +
      LESSONS.map(function (x) {
        var n = playsOf(c, x.id);
        return '<button class="isl' + (x.id === c.unit ? " cur" : "") + (n >= 3 ? " done" : "") + '" data-go="unit/' + x.id + '"><span class="ib">' + x.icon + "</span><b>" + x.id + '</b><span class="stars">' + stars(n) + "</span></button>";
      }).join("") + "</div></div>";
    h += '<div class="card"><div class="muted">目前單元 ' + esc(l.id) + " " + esc(l.icon) + " " + esc(l.title) + "</div><h3>這個單元的主打句</h3>" + phraseRow(main, c) +
      '<div class="row"><button class="btn white small" data-go="unit/' + l.id + '">看完整教材卡</button><button class="btn white small" data-go="units">換單元</button></div></div>';
    h += '<div class="card" id="menuCard"><h2>今天想做什麼？</h2><p class="muted">沒有「今天沒完成」這種事。</p><div class="menu">' +
      [["quick", "⚡", "5 分鐘版", "最輕鬆"], ["sing", "🎵", "唱唱跳跳", "約 5 分鐘"], ["play", "🧸", "玩一玩", "5 到 8 分鐘"], ["read", "📖", "讀一讀", "5 到 8 分鐘"], ["life", "🍳", "生活中用", "隨時"]].map(function (a) {
        return '<button class="btn" data-act="' + a[0] + '"><span class="em">' + a[1] + "</span>" + a[2] + "<small>" + a[3] + "</small></button>";
      }).join("") + "</div></div>";
    h += '<div id="actArea">' + (openAct ? activityBody(l, openAct, c) : "") + "</div>";
    h += '<div class="card"><div class="row"><button class="btn orange" data-resist="1">🙅 孩子今天不想</button><button class="btn blue" data-go="phrases">📍 我現在在哪裡？</button><button class="btn green" data-go="cards">🃏 拿圖卡來玩</button></div></div>';
    h += '<div class="card"><h2>🏅 貼紙冊（' + sc + " / " + LESSONS.length + "）</h2><div class=\"stickers\">" + LESSONS.map(function (x, i) {
      var n = playsOf(c, x.id), on = n >= 3;
      return '<div class="stk' + (on ? "" : " off") + '"><div class="sb" style="background:' + STK_COL[i % STK_COL.length] + ";--rot:" + (i % 2 ? 5 : -5) + 'deg">' + x.icon + "</div>" + esc(x.id) + " " + esc(x.title) + (on ? "" : '<br><span class="muted">再玩 ' + (3 - n) + " 次</span>") + "</div>";
    }).join("") + "</div></div>";
    h += '<details><summary>不背單字的 5 個原則</summary>' + GUIDE.principles.map(function (p, i) { return "<p><b>" + (i + 1) + ". " + esc(p[0]) + "</b><br>" + esc(p[1]) + "</p>"; }).join("") + "</details>";
    return h;
  }
  function burst() {
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var e = ["⭐", "✨", "🎉", "💛", "🌟"];
    for (var i = 0; i < 14; i++) {
      var d = document.createElement("span"); d.className = "pop"; d.textContent = e[i % e.length];
      d.style.setProperty("--dx", Math.round((Math.random() - .5) * 320) + "px"); d.style.setProperty("--dy", Math.round(-60 - Math.random() * 200) + "px"); d.style.setProperty("--rot", Math.round((Math.random() - .5) * 120) + "deg");
      document.body.appendChild(d); (function (x) { setTimeout(function () { x.remove(); }, 1100); })(d);
    }
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
  function unitCard(l, c) {
    var cur = l.id === c.unit;
    return '<div class="card" style="margin:0;' + (cur ? "background:#FFF3C4" : "") + '"><div style="font-size:2rem">' + l.icon + "</div><h3>" + l.id + " " + esc(l.title) + "</h3>" +
      (cur ? '<span class="tag y">目前單元</span> ' : "") + '<span class="tag b">玩過 ' + playsOf(c, l.id) + " 次</span>" +
      '<div class="row" style="margin-top:10px"><button class="btn small white" data-go="unit/' + l.id + '">打開</button>' + (cur ? "" : '<button class="btn small blue" data-setunit="' + l.id + '">設為目前</button>') + "</div></div>";
  }
  function viewUnits() {
    var c = kid();
    var h = '<h1>📚 單元</h1><p class="muted">不依日期，孩子準備好再往下；孩子抗拒時，退回或重複都沒關係。</p>';
    h += '<h2>階段 A：生活情境句與歌曲</h2><div class="grid">' + LESSONS.filter(function (l) { return l.stage === "A"; }).map(function (l) { return unitCard(l, c); }).join("") + "</div>";
    h += '<div class="card" style="margin-top:16px"><h3>階段 A 檢查點（參考，不用全部達成）</h3>' + list(GUIDE.checkpoints) + '<p class="muted">達到約一半以上，就可以考慮進入階段 B；階段 B 也可以和階段 A 混著玩。</p></div>';
    h += '<h2 style="margin-top:20px">階段 B：單字放進句子框</h2><p class="muted">只換一個眼前的詞，孩子聽得懂、會指就是成功，不要求開口。</p><div class="grid">' + LESSONS.filter(function (l) { return l.stage === "B"; }).map(function (l) { return unitCard(l, c); }).join("") + "</div>";
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
    h += '<div class="card"><h2>遊戲與生活中用</h2><p><b>遊戲：</b>' + esc(l.game) + "</p><p><b>生活中用：</b>" + esc(l.life) + "</p></div>";
    h += '<div class="card"><h2>🎵 歌曲與韻文</h2>' + songsHtml(l.id) + '</div><div class="card"><h2>📖 繪本</h2>' + booksHtml(l.id) + "</div>";
    h += '<div class="card"><h2>兩個孩子一起用</h2><p>' + esc(l.twoKids) + "</p></div>";
    h += '<div class="card"><h2>孩子抗拒時</h2>' + list(l.resist) + '<div class="note">抗拒常常不是英文本身，而是「這本書／這個情境和他預期的不一樣」。先換回他熟悉的方式，只換一小部分。</div></div>';
    h += "</div></div>";
    h += sheetLinks(l.id);
    h += "<details open><summary>觀察、紙本轉化、複習</summary><p><b>觀察重點：</b>" + esc(l.observe) + "</p><p><b>紙本轉化：</b>" + esc(l.paper) + "</p><p><b>複習：</b>" + esc(l.review) + "</p></details>";
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
    if (p.indexOf("txt:") === 0) return '<span class="pic txt">' + esc(p.slice(4)) + "</span>";
    return '<span class="pic">' + p + "</span>";
  }
  function art(w) { if (w[4] === "u" || w[4] === "p") return w[1]; return (/^[aeiou]/i.test(w[1]) ? "an " : "a ") + w[1]; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function plural(w) {
    var n = w[1], t = w[4];
    if (t === "u" || t === "p") return n;
    if (/[^aeiou]y$/.test(n)) return n.replace(/y$/, "ies");
    if (/(s|x|ch|sh|o)$/.test(n)) return n + "es";
    return n + "s";
  }
  function sentence(pat, w, w2) {
    var t = w[4], n = w[1];
    if (pat === "give_me") return "Give me " + art(w) + ", please.";
    if (pat === "here_is") return (t === "p" ? "Here are your " : "Here is your ") + n + ".";
    if (pat === "where_is") return (t === "p" ? "Where are the " : "Where is the ") + n + "?";
    if (pat === "this_is") return t === "p" ? "These are " + n + "." : "This is " + art(w) + ".";
    if (pat === "i_want") return "I want " + art(w) + ".";
    if (pat === "or_choice") return w2 ? cap(n) + " or " + w2[1] + "?" : "";
    if (pat === "sound") return w[6] ? "/" + (w[6] === "c" ? "k" : w[6]) + "/, /" + (w[6] === "c" ? "k" : w[6]) + "/, " + n + "." : n;
    if (pat === "its") return "It's " + n + ".";
    if (pat === "i_see") return "I see " + art(w) + ".";
    if (pat === "touch_your") return "Touch your " + n + ".";
    if (pat === "i_like") return "I like " + plural(w) + ".";
    if (pat === "here_comes") return "Here comes the " + n + ".";
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
        '<div class="row noprint" style="justify-content:center;gap:6px"><button class="spk" data-say="' + esc(w[1]) + '" aria-label="唸單字">🔊</button>' + (w[6] ? '<button class="spk" data-x="lsound" data-l="' + w[6] + '" aria-label="聽字母聲音">🔤</button>' : "") + (s ? '<button class="spk" data-say="' + esc(s) + '" aria-label="唸整句">💬</button>' : "") + "</div>" +
        (s ? '<div class="ws">' + esc(s) + "</div>" : "") + "</div>";
    }).join("") + "</div>";
    return h;
  }

  /* ---------- 紙本學習單 ---------- */
  function sheetLinks(id) {
    var W = window.MFE_SHEETS; if (!W || !W.SPEC[id]) return "";
    var d = {
      2: "貼貼紙、塗色。練手指力量，聽到就有反應。",
      3: "連連看、圈圈看、描虛線。用手指指出就算完成。",
      4: "配對說對的話、排順序、剪卡片、貼紙表。"
    };
    return '<div class="card"><h2>📄 紙本學習單（PDF）</h2><p class="muted">依年齡分三份，列印後直接玩。孩子還小也可以先挑 2–3 歲那份，只貼貼紙就很好。</p><div class="dl-list">' +
      [2, 3, 4].map(function (a) {
        return '<div class="sub"><b>' + W.AGES[a] + "</b><br><span class=\"muted\">" + d[a] + '</span><p class="row" style="margin:8px 0 0"><a class="btn small blue" href="worksheets/' + id + "-" + a + '.pdf" download>⬇ 下載 PDF</a><button class="btn small white" data-go="sheet/' + id + "/" + a + '">網頁預覽／列印</button></p></div>';
      }).join("") + "</div></div>";
  }
  function viewSheet(id, age) {
    var W = window.MFE_SHEETS; age = +age || 2;
    var h = '<div class="sheet-bar"><button class="btn small white" data-go="unit/' + esc(id) + '">← 回教材卡</button>' +
      [2, 3, 4].map(function (a) { return '<button class="btn small ' + (a === age ? "" : "white") + '" data-go="sheet/' + esc(id) + "/" + a + '">' + W.AGES[a] + "</button>"; }).join("") +
      '<button class="btn small green" data-print="1">🖨 列印／存成 PDF</button></div>';
    return h + W.render(id, age);
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
    var rv = reviewList(c);
    if (rv.length) h += '<div class="card warm"><h2>💭 可以再帶一次</h2><p class="muted">這些短語標成「學習中」後，已經一起玩了好幾次別的內容。想到的時候自然帶一句就好，不是功課。</p>' + rv.slice(0, 6).map(function (p) { return phraseRow(p, c); }).join("") + "</div>";
    h += '<div class="card"><h2>📋 進度摘要</h2><p class="muted">複製成文字，可以貼到筆記或傳給家人。不含孩子的姓名與日期。</p><button class="btn blue small" data-summary="1">複製摘要</button></div>';
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
      h += "<h3>新增孩子：選一個怪獸</h3><div class=\"row\">" + MONS.map(function (m, i) { return used.indexOf(i) >= 0 ? "" : '<button class="kidbtn" style="background:' + TINT[i] + '" data-addkid="' + i + '" aria-label="新增">' + m + "</button>"; }).join("") + "</div>";
    }
    h += "</div>";
    h += window.MFE_KID_SETTINGS ? window.MFE_KID_SETTINGS() : "";
    h += window.MFE_SOUND_SETTINGS ? window.MFE_SOUND_SETTINGS() : "";
    h += '<div class="card"><h2>短語紀錄方式</h2><p class="muted">預設是三種狀態（新／學習中／已會）。如果你想記得更細，可以改成五級：新、聽過、有反應、能指認、主動使用。只是給你自己看的參考，不影響教材。</p><button class="btn ' + (S.detail ? "green" : "white") + '" data-detail="1">' + (S.detail ? "✅ 目前：詳細五級（點一下改回簡單）" : "目前：簡單三種（點一下改成五級）") + "</button></div>";
    h += '<div class="card"><h2>備份</h2><p class="muted">資料只存在這個瀏覽器；換裝置或清除瀏覽器資料會消失。建議偶爾匯出備份。</p><div class="row"><button class="btn blue" data-export="1">⬇ 匯出備份</button><label class="btn white">⬆ 匯入備份<input type="file" id="imp" accept="application/json" style="display:none"></label></div></div>';
    h += '<div class="card"><h2>清除所有資料</h2><button class="btn orange" data-reset="1">清除並重新開始</button></div>';
    return h;
  }

  /* ---------- 路由與渲染 ---------- */
  var NAV = [["home", "🏠", "首頁"], ["phrases", "📍", "短語"], ["cards", "🃏", "圖卡"], ["units", "📚", "單元"], ["guide", "🧭", "指南"], ["record", "⭐", "紀錄"]];
  var unlocked = false;
  function route() { var h = (location.hash || "#home").slice(1); return h; }
  function render() {
    var r = route(), parts = r.split("/"), base = parts[0], c = kid();
    $("#kids").innerHTML = S.children.map(function (k) { return '<button class="kidbtn' + (k.id === S.active ? " on" : "") + '" style="background:' + TINT[k.mon] + '" data-kid="' + k.id + '" aria-label="切換孩子">' + MONS[k.mon] + "</button>"; }).join("");
    $("#tools").innerHTML = '<button class="tool-btn" data-x="enterkid" aria-label="孩子模式">👶</button><button class="tool-btn" data-sound="1" aria-label="聲音開關">' + (S.mute ? "🔇" : "🔊") + '</button><button class="tool-btn" data-gear="1" aria-label="家長設定">⚙️</button>';
    $("#nav").innerHTML = NAV.map(function (n) { return '<button data-go="' + n[0] + '" class="' + (base === n[0] || (base === "unit" && n[0] === "units") ? "on" : "") + '"><span class="i">' + n[1] + "</span>" + n[2] + "</button>"; }).join("");
    var out = "";
    if (base === "phrases") out = viewPhrases();
    else if (base === "units") out = viewUnits();
    else if (base === "unit") out = viewUnit(parts[1]);
    else if (base === "cards") out = viewCards();
    else if (base === "sheet") out = viewSheet(parts[1], parts[2]);
    else if (base === "guide") out = viewGuide();
    else if (base === "record") out = viewRecord();
    else if (base === "settings") out = unlocked ? viewSettings() : '<div class="card"><h2>🔒 家長設定</h2><p>需要通過家長鎖才能進入。</p><button class="btn" data-unlock="1">解鎖</button></div>';
    else if (window.MFE_ROUTES && window.MFE_ROUTES[base]) out = window.MFE_ROUTES[base](parts);
    else out = viewHome();
    document.body.classList.toggle("kidmode", base === "play");
    $("#view").innerHTML = out;
    if (window.MFE_AFTER && window.MFE_AFTER[base]) window.MFE_AFTER[base](parts);
    else if (window.MFE_LEAVE) window.MFE_LEAVE(base);
  }
  function go(r) { if (r !== "settings") unlocked = false; location.hash = r; if (route() === r) render(); window.scrollTo(0, 0); }
  window.addEventListener("hashchange", function () { if (route().split("/")[0] !== "settings") unlocked = false; render(); });

  /* ---------- 動作 ---------- */
  function played(key) {
    var c = kid(), l = LESSON[c.unit];
    var unitId = key === "unit" ? (route().split("/")[1] || c.unit) : c.unit;
    c.plays.push({ unit: unitId, act: key, ts: Date.now() }); c.resist = [];
    save(); toast("⭐ 一起玩過！做得好"); burst();
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
    var xk = e.target.closest("[data-x]");
    if (xk && window.MFE_X && window.MFE_X[xk.dataset.x]) { window.MFE_X[xk.dataset.x](xk, e); return; }
    var t = e.target.closest("[data-go],[data-say],[data-cyc],[data-mode],[data-act],[data-played],[data-scene],[data-setunit],[data-kid],[data-resist],[data-logresist],[data-back],[data-badge],[data-addnote],[data-delnote],[data-unlock],[data-addkid],[data-delkid],[data-export],[data-reset],[data-pat],[data-wcat],[data-pick],[data-rand],[data-clearpick],[data-print],[data-savelyr],[data-play],[data-copy],[data-detail],[data-summary],[data-sound],[data-gear],#gateOk,#gateX,#resistX");
    if (t && t.dataset.copy) { var txt = t.dataset.copy; try { navigator.clipboard.writeText(txt).then(function () { toast("已複製：" + txt); }, function () { toast(txt); }); } catch (x) { toast(txt); } return; }
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
    if (d.play) { var mc = document.getElementById("menuCard"); if (mc) { mc.scrollIntoView({ behavior: "smooth", block: "start" }); mc.classList.add("pulse"); setTimeout(function () { mc.classList.remove("pulse"); }, 1300); } return; }
    if (d.sound) { S.mute = !S.mute; save(); toast(S.mute ? "聲音已關閉" : "聲音已開啟"); return render(); }
    if (d.gear) return gate(function () { unlocked = true; go("settings"); });
    if (d.savelyr) { var ta = document.getElementById("lyr-" + d.savelyr); if (!S.lyr) S.lyr = {}; S.lyr[d.savelyr] = ta ? ta.value.trim() : ""; save(); toast("已儲存歌詞"); return render(); }
    if (d.say) return speak(d.say);
    if (d.cyc) { if (S.detail) setLevel(c, d.cyc, (lvOf(c, d.cyc) + 1) % 5); else { c.phr[d.cyc] = (pstat(c, d.cyc) + 1) % 3; c.pts = c.pts || {}; c.pts[d.cyc] = c.plays.length; } save(); return render(); }
    if (d.detail) { S.detail = !S.detail; save(); return render(); }
    if (d.summary) { var tx = summaryText(c); try { navigator.clipboard.writeText(tx).then(function () { toast("已複製進度摘要"); }, function () { alert(tx); }); } catch (x) { alert(tx); } return; }
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
  window.MFE_API = { getS: function () { return S; }, kid: kid, save: save, speak: speak, toast: toast, gate: gate, go: go, render: render, burst: burst, esc: esc, mon: mon, pic: pic, art: art, cap: cap, sentence: sentence, playsOf: playsOf, WORD: WORD, WCATS: WCATS, LESSONS: LESSONS, LCARDS: LCARDS, PATS: PATS, TINT: TINT };
  render();
  if ("serviceWorker" in navigator && false) { /* PWA 預留（v2.0） */ }
})();
