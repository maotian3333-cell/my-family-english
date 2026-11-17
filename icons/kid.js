/* 孩子模式（v3.0 引導式）：看一看 → 玩一玩 → 找一找；每次只學 3 個；每步都有中文語音說明；答對答錯都有回饋，不扣分。
   （v2.0）：圖示優先、最多兩層、不扣分、可設定使用時間、離開要過家長鎖。
   只使用 app.js 公開的 MFE_API，不直接碰資料；孩子的遊玩次數記入「一起玩過」。 */
(function () {
  "use strict";
  var st = { startTs: 0, unit: null, chunk: [], idx: 0, qs: [], qi: 0, miss: 0, answered: false, ended: false, timer: null, gi: 0, ri: 0, mem: null };
  var CHUNK = 3, COLORS = ["#FFC943", "#9CD0F2", "#8FC6A7", "#F9A06B", "#E3B6E8", "#F7B6C6"];

  var EXT = window.MFE_KID_EXT = {};
  function api() { return window.MFE_API; }
  function minutes() { var s = api().getS(); return s.kidMin == null ? 10 : s.kidMin; }
  function cat(unit) {
    var m = (api().LCARDS || {})[unit]; if (!m) return null;
    for (var i = 0; i < api().WCATS.length; i++) if (api().WCATS[i].id === m.cat) return { cat: api().WCATS[i], pat: m.pat };
    return null;
  }
  function kidAge() { var c = api().kid(); if (c.kage != null) return c.kage; var u = api().LESSONS.filter(function (x) { return x.id === c.unit; })[0]; return (u && u.age) || 3; }
  function kidUnits() { var a = kidAge(); return api().LESSONS.filter(function (l) { return cat(l.id) && (!a || (l.age || 3) <= a + 1); }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function say(w) {
    if (!w) return;
    var p = w[3] || "";
    if (w[6] && window.MFE_SOUND) { window.MFE_SOUND.play(w[6]).then(function (ok) { if (!ok) api().speak(w[1]); }); return; }
    if (p.indexOf("txt:") === 0 && window.MFE_SOUND) { window.MFE_SOUND.play(w[0]).then(function (ok) { if (!ok) api().speak(w[5] || w[1]); }); return; }
    api().speak(w[1]);
  }
  function exitBtn() { return '<button class="kbtn lock" data-x="exitkid" aria-label="家長：離開孩子模式">🔒</button>'; }
  function homeBtn() { return '<button class="kbtn home" data-x="khome" aria-label="回地圖">🏠</button>'; }
  function bar(back) { return '<div class="kbar">' + (back ? homeBtn() : '<span class="kmon">' + api().mon(api().kid().mon) + "</span>") + '<span class="kspacer"></span>' + exitBtn() + "</div>"; }
  function timeBar() {
    var m = minutes(); if (!m) return "";
    var pct = Math.min(100, Math.round((Date.now() - st.startTs) / (m * 600)));
    return '<div class="ktime" aria-hidden="true"><span style="width:' + (100 - pct) + '%"></span></div>';
  }


  /* ===== 學習紀錄與間隔複習（Leitner）：每個字／每個聲音各一筆，存在孩子資料 kmem ===== */
  var DAY = 86400000, GAP = [1, 1, 3, 7, 14];
  function mem() { var c = k(); c.kmem = c.kmem || {}; return c.kmem; }
  function seen(key, o) { var m = mem(); if (!m[key]) { o.b = 0; o.due = Date.now() + DAY; o.ok = 0; o.x = 0; m[key] = o; api().save(); } }
  function rec(key, ok, o) {
    var m = mem(), e = m[key]; if (!e) { seen(key, o); e = m[key]; }
    if (ok) { e.ok++; e.b = Math.min(4, e.b + 1); e.due = Date.now() + GAP[e.b] * DAY; }
    else { e.x++; e.b = 0; e.due = Date.now() + 300000; }
    e.ts = Date.now(); api().save();
  }
  function wkey(w) { return "w:" + w[0]; }
  function skey(u, g) { return "s:" + u + ":" + g.key; }
  function wrec(w, ok, u) { rec(wkey(w), ok, { t: "w", id: w[0], u: u }); }
  function srec(g, ok, u) { rec(skey(u, g), ok, { t: "s", g: g.key, u: u }); }
  function sessions(u) { var c = k(); return (c.kdone && c.kdone[u]) || 0; }
  function dueCount() { var m = mem(), n = Date.now(), c = 0; Object.keys(m).forEach(function (x) { if (m[x].due <= n) c++; }); return c; }
  function learnedCount() { return Object.keys(mem()).length; }
  function rateOf(miss) { return miss === 0 ? 3 : miss <= 2 ? 2 : 1; }
  function starsHtml(n) { return "⭐".repeat(n) + '<span class="off">' + "⭐".repeat(3 - n) + "</span>"; }

  var CHEERS = ["Great job!", "Yay!", "Wow!", "Super!", "You did it!"];
  function k() { return api().kid(); }
  function stars(u) { var c = k(); return (c.kstars && c.kstars[u]) || 0; }
  function unitOf(id) { return api().LESSONS.filter(function (x) { return x.id === id; })[0]; }
  function scWords() { var c = st.chunk; return c.length >= 3 ? [c[0], c[2]] : c.length ? [c[0]] : []; }
  function pickChunk(u) {
    var ws = cat(u).cat.words, c = k(); c.kcur = c.kcur || {};
    var cur = c.kcur[u] || 0, n = Math.min(CHUNK, ws.length), out = [], i;
    for (i = 0; i < n; i++) out.push(ws[(cur + i) % ws.length]);
    return out;
  }
  function zh(t) { if (api().speakZh) api().speakZh(t); }
  function sayQ(w) { if (!w) return; var c = cat(st.unit) || {}, s = (!w[6] && c.pat === "where_is") ? api().sentence("where_is", w, null) : null; if (s) api().speak(s); else say(w); }
  function stageBar(step) {
    var S3 = [["learn", "👀", "看一看"], ["play", "🎮", "玩一玩"], ["find", "⭐", "找一找"]], idx = step === "learn" ? 0 : step === "play" ? 1 : 2;
    return '<div class="kstage">' + S3.map(function (x, i) { return '<span class="ks ' + (i < idx ? "done" : i === idx ? "now" : "") + '"><b>' + (i < idx ? "✔" : x[1]) + "</b><i>" + x[2] + "</i></span>"; }).join('<span class="kar">›</span>') + "</div>";
  }
  function progRow(n, on) { var h = '<div class="kprog" aria-hidden="true">'; for (var i = 0; i < n; i++) h += '<span class="' + (i < on ? "on" : "") + '"></span>'; return h + "</div>"; }
  function dotsRow(n, on) { var h = '<div class="kdots">'; for (var i = 0; i < n; i++) h += '<span class="' + (i < on ? "on" : "") + '">⭐</span>'; return h + "</div>"; }
  function cheerPop(txt) {
    var e = document.createElement("div"); e.className = "kcheerpop"; e.textContent = "⭐ " + txt; document.body.appendChild(e); setTimeout(function () { e.remove(); }, 1400);
  }


  /* ===== 拼讀單元（直接教學）：聽音版 看一看／玩一玩／找一找 ===== */
  function isDI(u) { return !!(window.MFE_DI && window.MFE_DI.kidSets && window.MFE_DI.kidSets(u)); }
  function rot(a, n) { if (!a.length) return a; n = ((n % a.length) + a.length) % a.length; return a.slice(n).concat(a.slice(0, n)); }
  function diSetup(u) {
    var gs = window.MFE_DI.kidSets(u), c = k(); c.kcur = c.kcur || {}; var n = c.kcur[u] || 0, g = gs[n % gs.length], off = Math.floor(n / gs.length) * 2;
    var pos = rot(g.pos, off), near = rot(g.near, off), far = rot(g.far, off);
    if (near.length < 2) near = near.concat(far); if (far.length < 2) far = far.concat(near);
    st.dg = g; st.dpos = pos.slice(0, 4); st.dnear = near.slice(0, 3); st.dfar = far.slice(0, 3); st.dn = n;
    st.dl = pos.slice(0, 3).map(function (w) { return { w: w, p: 1 }; }).concat([{ w: st.dfar[0], p: 0 }, { w: st.dnear[0], p: 0 }]);
    st.idx = 0; st.ri = 0; st.gi = 0; st.target = null; st.qs = []; st.qi = 0;
  }
  function symTxt(g) { return g.sym.replace(/\//g, ""); }
  function diTop() { var g = st.dg; return '<button class="kdi" data-x="kdisnd" aria-label="聽聲音"><b>' + api().esc(g.big) + '</b><i>🔊 ' + api().esc(g.sym) + "</i></button>"; }
  function diSay(w) { say(w); }
  function viewDiLearn() {
    var it = st.dl[st.idx], g = st.dg, last = st.idx >= st.dl.length - 1;
    return '<div class="kmode">' + bar(true) + stageBar("learn") + diTop() + '<button class="kbig sm ' + (it.p ? "pos" : "neg") + '" data-x="khear" aria-label="再聽一次">' + api().pic(it.w) + '<span class="kbadge ' + (it.p ? "y" : "n") + '">' + (it.p ? "✔" : "✖") + "</span></button>" +
      '<div class="kword">' + api().esc(it.w[1]) + '</div>' + (it.p ? '<div class="ksay">🗣 換你說</div>' : '') + '<div class="kbtns"><button class="kbtn slow" data-x="kslow" aria-label="慢慢聽">🐢</button><button class="kbtn replay2" data-x="khear" aria-label="再聽一次">🔊</button><button class="kgo sm" id="knext" data-x="klnext" aria-label="下一個">▶</button></div>' +
      progRow(st.dl.length, st.idx + 1) + timeBar() + "</div>";
  }
  function newDiFeed() {
    var pos = st.dpos[st.ri % 3], neg = st.ri < 2 ? st.dfar[(st.ri + 1) % st.dfar.length] : st.dnear[1 % st.dnear.length];
    st.target = pos; st.dneg = neg; st.choices = shuffle([pos, neg]); st.miss = 0; st.answered = false;
  }
  function viewDiFeed() {
    var h = '<div class="kmode">' + bar(true) + stageBar("play") + diTop() + '<div class="kfeed"><span class="kmon feedmon" id="kfm">' + api().mon(k().mon, "bob") + '</span></div><div class="kchoices c2">';
    st.choices.forEach(function (w) { h += '<button class="kcard" data-x="kdfeed" data-id="' + w[0] + '">' + api().pic(w) + "</button>"; });
    return h + "</div>" + dotsRow(3, st.ri) + timeBar() + "</div>";
  }
  function buildDiQs() {
    var seq = (sessions(st.unit) % 2 === 0) ? "PPNPNP" : "PNPNNPPN", pi = 0, ni = 0, qs = [], negs = (sessions(st.unit) % 2 === 0) ? [st.dfar[0], st.dfar[1]] : [st.dfar[0], st.dnear[0], st.dnear[1], st.dfar[1]];
    seq.split("").forEach(function (ch) { qs.push(ch === "P" ? { w: st.dpos[pi++ % 4], p: 1 } : { w: negs[ni++ % negs.length], p: 0 }); });
    var p3 = seq === "PPNPNP" ? [1, 5] : [2, 6], negPool = shuffle(uniqW(st.dnear.concat(st.dfar)));
    p3.forEach(function (ix) { var q = qs[ix]; if (!q || !q.p) return; var ng = negPool.filter(function (w) { return w !== q.w; }).slice(0, 2); if (ng.length === 2) { q.k3 = shuffle([q.w].concat(ng)); } });
    st.qs = qs; st.qi = 0; st.answered = false; st.miss = 0; st.mt = 0;
  }
  function uniqW(a) { var seenI = {}, out = []; a.forEach(function (w) { if (w && !seenI[w[0]]) { seenI[w[0]] = 1; out.push(w); } }); return out; }
  function viewDiFind() {
    var q = st.qs[st.qi];
    if (q.k3) { var h3 = '<div class="kmode">' + bar(true) + stageBar("find") + diTop() + '<div class="kask3">' + "🔊 " + api().esc(st.dg.sym) + '</div><div class="kchoices c3">'; q.k3.forEach(function (w) { h3 += '<button class="kcard" data-x="kd3" data-id="' + w[0] + '">' + api().pic(w) + "</button>"; }); return h3 + "</div>" + dotsRow(st.qs.length, st.qi) + timeBar() + "</div>"; }
    return '<div class="kmode">' + bar(true) + stageBar("find") + diTop() + '<button class="kbig sm" data-x="kask" aria-label="再聽一次">' + api().pic(q.w) + '</button><div class="kword">' + api().esc(q.w[1]) + '</div>' +
      '<div class="kyn"><button class="kyes" data-x="kyn" data-a="1" aria-label="有">✔</button><button class="kno" data-x="kyn" data-a="0" aria-label="沒有">✖</button></div>' + dotsRow(st.qs.length, st.qi) + timeBar() + "</div>";
  }


  /* ===== 情境句子：場景底圖＋角色＋物品＋句子與中文意思 ===== */
  function sceneId(u) { var c = cat(u); var m = window.MFE_SCENE_OF || {}; return (c && m[c.cat.id]) || m.def || "play"; }
  function sceneSvg(id) { return (window.MFE_SCENE_ART && window.MFE_SCENE_ART[id]) || ""; }
  function sentOf(u, w) {
    var c = cat(u) || {}, pat = c.pat; if (!pat || pat === "sound" || pat === "or_choice") pat = "this_is";
    var P = (api().PATS || []).filter(function (x) { return x.id === pat; })[0];
    var en = api().sentence(pat, w, null) || w[1], zhs = P && P.zh ? P.zh.replace("___", w[2]).replace(/（[^）]*）/g, "") : w[2];
    return { en: en, zh: zhs };
  }
  /* ----- 情境圖：依句型表達句意（喜歡＝抱著＋愛心；給我＝箭頭；在哪裡＝藏起來再點開；動作／感受＝小怪獸本人演出；想要＝想像泡泡；來了＝從旁邊駛入） ----- */
  var FX = {
    hearts: '<svg viewBox="0 0 60 36" aria-hidden="true"><g fill="#F06292" stroke="#3E4A59" stroke-width="2" stroke-linejoin="round"><path d="M14 30C-2 18 6 6 14 14C22 6 30 18 14 30Z"/><path d="M40 20C28 11 34 2 40 8C46 2 52 11 40 20Z"/></g></svg>',
    arrow: '<svg viewBox="0 0 100 50" aria-hidden="true"><path d="M94 38Q52 -6 18 26" fill="none" stroke="#F9A825" stroke-width="5" stroke-linecap="round" stroke-dasharray="1 9"/><path d="M4 34L22 18L26 40Z" fill="#F9A825" stroke="#3E4A59" stroke-width="2" stroke-linejoin="round"/></svg>',
    q: '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" fill="#fff" stroke="#3E4A59" stroke-width="3"/><text x="20" y="28" text-anchor="middle" font-size="24" font-weight="900" fill="#F9A825" font-family="sans-serif">?</text></svg>',
    zz: '<svg viewBox="0 0 40 40" aria-hidden="true"><text x="4" y="34" font-size="16" font-weight="900" fill="#5C6BC0" font-family="sans-serif">z</text><text x="14" y="22" font-size="20" font-weight="900" fill="#5C6BC0" font-family="sans-serif">Z</text><text x="26" y="12" font-size="12" font-weight="900" fill="#5C6BC0" font-family="sans-serif">z</text></svg>'
  };
  var ACT_FX = { vb_sleep: "zz", em_sleepy: "zz" };
  function isPluralLike(w, en) { var m = /^I like (.+)\.$/.exec(en || ""); return !!(m && w[4] !== "p" && m[1].toLowerCase() !== w[1].toLowerCase()); }
  function composeScene(w, en) {
    var pat = (cat(st.unit) || {}).pat, id = w[0], sc = window.MFE_SCENE_FOR ? MFE_SCENE_FOR(id, sceneId(st.unit)) : sceneId(st.unit);
    var wd = window.MFE_SIZE_W ? MFE_SIZE_W(id) : 30, bt = window.MFE_ITEM_BOTTOM ? MFE_ITEM_BOTTOM(id) : null;
    var item = window.MFE_ITEM_HTML ? MFE_ITEM_HTML(w, api().pic) : api().pic(w), mode = "", monCls = "", fx = "", obj = "", attrs = "", hint = "";
    var isVerb = /^vb_/.test(id), isEm = /^em_/.test(id);
    if (pat === "i_can" && isVerb) { mode = "act"; monCls = " act-" + id.slice(3); if (ACT_FX[id]) fx += '<span class="sc-fx zz">' + FX.zz + "</span>"; }
    else if (pat === "im" && isEm) { mode = "feel"; monCls = " feel-" + id.slice(3); fx += '<span class="sc-fx thought">' + api().pic(w) + "</span>"; if (ACT_FX[id]) fx += '<span class="sc-fx zz">' + FX.zz + "</span>"; }
    else if (pat === "i_want") { mode = "want"; fx += '<span class="sc-fx thought">' + item + "</span>"; }
    else {
      var multi = pat === "i_like" && isPluralLike(w, en);
      if (multi) wd = Math.round(wd * 1.5); if (multi) item = '<span class="multi">' + [[0, 0], [48, 0], [24, 36]].map(function (q) { return '<span class="mi" style="left:' + q[0] + '%;bottom:' + q[1] + '%">' + item + "</span>"; }).join("") + "</span>";
      obj = '<span class="sc-obj' + (pat === "here_comes" ? " comes" : "") + '" style="width:' + wd + "%" + (bt ? ";bottom:" + bt + "%" : "") + '">' + item + "</span>";
      if (pat === "i_like") { mode = "like"; fx += '<span class="sc-fx hearts">' + FX.hearts + "</span>"; }
      else if (pat === "give_me") { mode = "give"; fx += '<span class="sc-fx arrow">' + FX.arrow + "</span>"; }
      else if (pat === "where_is") { mode = "hide"; attrs = ' data-hide="1"'; fx += '<span class="sc-fx q">' + FX.q + '</span><span class="sc-cover" style="width:' + Math.max(wd + 10, 34) + '%"></span>'; hint = '<div class="khint">👆 點一點，找找看</div>'; }
      else if (pat === "here_comes") mode = "comes";
    }
    return '<button class="kscene' + (mode ? " m-" + mode : "") + '" data-x="khear" aria-label="再聽一次"' + attrs + ">" + sceneSvg(sc) + '<span class="sc-mon' + monCls + '">' + api().mon(k().mon, "bob") + "</span>" + obj + fx + "</button>" + hint;
  }
  function viewScene(w) {
    var s = sentOf(st.unit, w), n = st.chunk.length + st.sc.length, h;
    var en = api().esc(s.en).replace(new RegExp("(" + w[1].replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "i"), '<b class="hl">$1</b>');
    h = '<div class="kmode">' + bar(true) + stageBar("learn") + composeScene(w, s.en) +
      '<div class="ksent"><div class="ken">' + en + '</div><div class="kzh">' + api().esc(s.zh) + '</div><div class="ksay">🗣 換你說</div></div><div class="kbtns"><button class="kbtn slow" data-x="kslow" aria-label="慢慢聽">🐢</button><button class="kbtn replay2" data-x="khear" aria-label="再聽一次">🔊</button><button class="kgo sm" id="knext" data-x="klnext" aria-label="下一個">▶</button></div>' +
      progRow(n, st.idx + 1) + timeBar() + "</div>";
    return h;
  }

  /* ----- 地圖：每個小島有名字與星星 ----- */
  function viewMap() {
    var h = '<div class="kmode">' + bar(false) + '<div class="kmap">', dn = dueCount();
    h += '<button class="kisland pa" style="background:#CDE7F7" data-x="kpamenu" aria-label="聽聲音"><span>🎧</span><em class="kil">聽聲音</em></button>';
    Object.keys(EXT).forEach(function (kx) { var i = EXT[kx].island; if (i) h += '<button class="kisland" style="background:' + i.bg + '" data-x="kext" data-id="' + kx + '" aria-label="' + i.label + '"><span>' + i.icon + '</span><em class="kil">' + i.label + "</em></button>"; });
    if (learnedCount()) h += '<button class="kisland review" style="background:#FFD9A8" data-x="krstart" aria-label="今日小任務"><span>🔁</span><em class="kil">今日小任務</em>' + (dn ? '<b class="kbadge2">' + Math.min(dn, 9) + "</b>" : '<b class="kst">✔</b>') + "</button>";
    kidUnits().forEach(function (l, i) {
      var n = stars(l.id);
      h += '<button class="kisland" style="background:' + COLORS[i % COLORS.length] + '" data-x="kopen" data-id="' + l.id + '" aria-label="' + api().esc(l.title) + '"><span>' + l.icon + '</span><em class="kil">' + api().esc(l.title.replace(/（.*$/, "")) + '</em>' + (n ? '<b class="kst">' + "⭐".repeat(Math.min(n, 3)) + "</b>" : "") + "</button>";
    });
    return h + "</div>" + timeBar() + "</div>";
  }
  /* ----- 單元入口：說明三步驟 ----- */
  function viewIntro(id) {
    var l = unitOf(id);
    return '<div class="kmode">' + bar(true) + '<div class="khero">' + l.icon + '</div><div class="kname">' + api().esc(l.title.replace(/（.*$/, "")) + "</div>" +
      '<div class="kpath"><span class="kp"><b>👀</b><i>看一看</i></span><span class="kar">›</span><span class="kp"><b>🎮</b><i>玩一玩</i></span><span class="kar">›</span><span class="kp"><b>⭐</b><i>找一找</i></span></div>' +
      '<div class="kgames"><button class="kgo" data-x="kgo" data-s="learn" aria-label="開始">▶</button></div>' +
      '<div class="kgames small"><button class="kgame2" data-x="kgames" aria-label="遊戲間">🎲<i>遊戲間</i></button></div>' + timeBar() + "</div>";
  }
  /* ----- 看一看：一次一張大卡，慢慢唸，再唸一次 ----- */
  function viewLearn() {
    if (st.idx >= st.chunk.length) return viewScene(st.sc[st.idx - st.chunk.length]);
    var w = st.chunk[st.idx], c = cat(st.unit), last = false;
    return '<div class="kmode">' + bar(true) + stageBar("learn") + '<button class="kbig" data-x="khear" aria-label="再聽一次">' + api().pic(w) + '</button>' +
      '<div class="kword">' + api().esc(w[1]) + '</div><div class="ksay">🗣 換你說</div><div class="kbtns"><button class="kbtn slow" data-x="kslow" aria-label="慢慢聽">🐢</button><button class="kbtn replay2" data-x="khear" aria-label="再聽一次">🔊</button><button class="kgo sm" id="knext" data-x="klnext" aria-label="下一個">▶</button></div>' +
      progRow(st.chunk.length + st.sc.length, st.idx + 1) + timeBar() + "</div>";
  }
  /* ----- 玩一玩：第 1 關 餵怪獸（看得到答案的配對）、第 2 關 翻翻樂 ----- */
  function newFeed() {
    var w = st.chunk[st.ri % st.chunk.length], others = shuffle(st.chunk.filter(function (x) { return x !== w; })).slice(0, 1);
    st.target = w; st.choices = shuffle([w].concat(others)); st.miss = 0; st.answered = false;
  }
  function viewFeed() {
    var h = '<div class="kmode">' + bar(true) + stageBar("play") + '<div class="kfeed"><span class="kmon feedmon" id="kfm">' + api().mon(k().mon, "bob") + '</span><div class="kwant">' + api().pic(st.target) + '</div></div><div class="kchoices c2">';
    st.choices.forEach(function (w) { h += '<button class="kcard" data-x="kfeed" data-id="' + w[0] + '">' + api().pic(w) + "</button>"; });
    return h + "</div>" + dotsRow(st.chunk.length, st.ri) + timeBar() + "</div>";
  }
  function newMem() {
    var ws = st.chunk.slice(0, 3), cards = []; ws.forEach(function (w) { cards.push({ w: w, k: w[0] + "a" }, { w: w, k: w[0] + "b" }); });
    st.mem = { cards: shuffle(cards), open: [], done: {}, lock: false, pairs: ws.length };
  }
  function viewMem() {
    var m = st.mem, h = '<div class="kmode">' + bar(true) + stageBar("play") + '<div class="kmem">';
    m.cards.forEach(function (c, i) {
      var on = m.done[c.w[0]] || m.open.indexOf(i) >= 0;
      h += '<button class="kflip ' + (on ? "on" : "") + (m.done[c.w[0]] ? " ok" : "") + '" data-x="kflip" data-i="' + i + '"><span class="f">' + (on ? api().pic(c.w) : "❓") + "</span></button>";
    });
    return h + "</div>" + timeBar() + "</div>";
  }
  /* ----- 找一找：先聽問題，再選；答對有星星，答錯再試、會提示 ----- */
  function buildQs() {
    var qs = [], order = shuffle(st.chunk).concat(shuffle(st.chunk));
    for (var i = 1; i < order.length; i++) if (order[i] === order[i - 1]) { var j = (i + 1) % order.length; var t = order[i]; order[i] = order[j]; order[j] = t; }
    order.forEach(function (w, i) { var n = i < st.chunk.length ? 2 : Math.min(3, st.chunk.length), oth = shuffle(st.chunk.filter(function (x) { return x !== w; })).slice(0, n - 1); qs.push({ w: w, ch: shuffle([w].concat(oth)) }); });
    st.qs = qs; st.qi = 0; st.answered = false; st.miss = 0; st.mt = 0;
  }
  function viewFind() {
    var q = st.qs[st.qi], h = '<div class="kmode">' + bar(true) + stageBar("find") + '<button class="kbtn replay" data-x="kask" aria-label="再聽一次">🔊</button><div class="kfs">' + sceneSvg(sceneId(st.unit)) + '<div class="kchoices c' + q.ch.length + '">';
    q.ch.forEach(function (w) { h += '<button class="kcard" data-x="kpick" data-id="' + w[0] + '">' + api().pic(w) + "</button>"; });
    return h + "</div></div>" + dotsRow(st.qs.length, st.qi) + timeBar() + "</div>";
  }
  function viewDone() {
    var n = stars(st.unit);
    return '<div class="kmode">' + bar(true) + '<div class="kcheer"><span class="kmon big">' + api().mon(k().mon, "pop") + '</span><div class="kstars">' + starsHtml(st.rate == null ? 3 : st.rate) + '</div><div class="kbye2">Great job!</div></div>' +
      '<div class="kgames"><button class="kgo" data-x="kmore" aria-label="再學三個">▶</button><button class="kgame2" data-x="kgames" aria-label="遊戲間">🎲<i>遊戲間</i></button></div></div>';
  }
  function viewGames(id) {
    var ks = (window.MFE_KINDS_OF ? window.MFE_KINDS_OF(id) : []).filter(function (x) { return x !== "teach"; }), h = '<div class="kmode">' + bar(true) + '<div class="kname">🎲</div><div class="kgrid">';
    if (learnedCount()) h += '<button class="kgame2" data-x="krstart" data-u="' + id + '"><span>🔁</span><i>複習</i></button>';
    if (isDI(id)) h += '<button class="kgame2" data-x="kgstart" data-t="bubble"><span>🫧</span><i>聽音泡泡</i></button><button class="kgame2" data-x="kgstart" data-t="hunt"><span>🧭</span><i>聽音尋寶</i></button>';
    ks.forEach(function (x) { var i = window.MFE_ACT_INFO(x); h += '<button class="kgame2" data-x="kact" data-k="' + x + '"><span>' + i[0] + "</span><i>" + api().esc(i[1]) + "</i></button>"; });
    return h + "</div>" + timeBar() + "</div>";
  }

  /* ===== 今日小任務（跨單元間隔複習）：從學過的字與聲音裡挑「到期」的，最多 5 題 ===== */
  function wordOf(e) { return api().WORD[e.id]; }
  function otherWords(w, n) {
    var m = mem(), pool = Object.keys(m).filter(function (x) { return m[x].t === "w" && m[x].id !== w[0]; }).map(function (x) { return api().WORD[m[x].id]; }).filter(Boolean);
    pool = shuffle(pool.filter(function (x) { return x && x[0] !== w[0]; }));
    if (pool.length < n) {
      var all = []; api().LESSONS.forEach(function (l) { var c = cat(l.id); if (c && !isDI(l.id)) all = all.concat(c.cat.words); });
      pool = pool.concat(shuffle(all.filter(function (x) { return x[0] !== w[0] && pool.indexOf(x) < 0; })));
    }
    return pool.slice(0, n);
  }
  function rvBuild(u) {
    var m = mem(), now = Date.now(), arr = Object.keys(m).map(function (x) { m[x].k = x; return m[x]; }).filter(function (e) { return !u || e.u === u; });
    var due = arr.filter(function (e) { return e.due <= now; }), pool = due.length ? due : arr;
    pool.sort(function (a, b) { return a.b - b.b || a.due - b.due; });
    var qs = [];
    pool.slice(0, 5).forEach(function (e, i) {
      if (e.t === "w") { var w = wordOf(e); if (!w) return; var n = e.b < 2 ? 2 : 3; qs.push({ t: "w", e: e, w: w, ch: shuffle([w].concat(otherWords(w, n - 1))) }); }
      else {
        var g = (window.MFE_DI.kidSets(e.u) || []).filter(function (x) { return x.key === e.g; })[0]; if (!g) return;
        var p = i % 2 === 0, ws = p ? g.pos : g.far; qs.push({ t: "s", e: e, g: g, p: p, w: ws[(e.ok + e.x) % ws.length] });
      }
    });
    st.rv = { qs: qs, qi: 0, mt: 0, practice: !due.length, u: u || null }; st.answered = false; st.miss = 0;
  }
  function viewRvEmpty() {
    return '<div class="kmode">' + bar(true) + '<div class="kcheer"><span class="kmon big">' + api().mon(k().mon, "pop") + '</span><div class="kbye2">' + (learnedCount() ? "✔" : "👀") + '</div></div><div class="kgames"><button class="kgo" data-x="khome" aria-label="回地圖">▶</button></div></div>';
  }
  function viewRv() {
    var r = st.rv, q = r.qs[r.qi];
    if (!q) return viewRvEmpty();
    var h = '<div class="kmode">' + bar(true) + '<div class="kstage"><span class="ks now"><b>🔁</b><i>今日小任務</i></span></div>';
    if (q.t === "w") {
      h += '<button class="kbtn replay" data-x="krask" aria-label="再聽一次">🔊</button><div class="kchoices c' + q.ch.length + '">';
      q.ch.forEach(function (w) { h += '<button class="kcard" data-x="krpick" data-id="' + w[0] + '">' + api().pic(w) + "</button>"; });
      h += "</div>";
    } else {
      st.dg = q.g;
      h += diTop() + '<button class="kbig sm" data-x="krask" aria-label="再聽一次">' + api().pic(q.w) + '</button><div class="kword">' + api().esc(q.w[1]) + '</div><div class="kyn"><button class="kyes" data-x="kryn" data-a="1" aria-label="有">✔</button><button class="kno" data-x="kryn" data-a="0" aria-label="沒有">✖</button></div>';
    }
    return h + dotsRow(r.qs.length, r.qi) + timeBar() + "</div>";
  }
  function viewRvDone() {
    return '<div class="kmode">' + bar(true) + '<div class="kcheer"><span class="kmon big">' + api().mon(k().mon, "pop") + '</span><div class="kstars">' + starsHtml(st.rv.rate || 3) + '</div><div class="kbye2">Great job!</div></div><div class="kgames"><button class="kgo" data-x="khome" aria-label="回地圖">▶</button></div></div>';
  }
  function rvAsk() { var q = st.rv && st.rv.qs[st.rv.qi]; if (!q) return; if (q.t === "w") { var c = null; if (!/^(vb|em|pp|aj|c)_/.test(q.w[0]) && !q.w[6] && q.w[3] && q.w[3].indexOf("txt:") !== 0) api().speak(api().sentence("where_is", q.w, null)); else say(q.w); } else { say(q.w); setTimeout(function () { if (!st.answered) window.MFE_DI.playSound(q.g); }, 1400); } }


  /* ===== 聽聲音（語音覺識）：拍音節、找韻腳。不需要認字母，只靠聽。 ===== */
  var PA_SYL = { cat: 1, dog: 1, sun: 1, bed: 1, pig: 1, hat: 1, box: 1, cup: 1, fish: 1, car: 1, star: 1, frog: 1, ball: 1, egg: 1, bus: 1, apple: 2, tiger: 2, rabbit: 2, monkey: 2, banana: 3, elephant: 3, butterfly: 3, strawberry: 3, pineapple: 3, dinosaur: 3, umbrella: 3, watermelon: 4 };
  var PA_RHYME = [["cat", "hat"], ["pan", "van"], ["r_hen", "pen", "n10"], ["dog", "frog"], ["fox", "box", "ox"], ["car", "star", "jar"], ["bear", "pear", "chair", "b_hair"], ["bed", "c_red"]];
  function paWordByEn(en) { var W = api().WORD, ks = Object.keys(W); if (W[en] && W[en][1] === en && W[en][3] && W[en][3].indexOf("svg:") === 0) return W[en]; for (var i = 0; i < ks.length; i++) if (W[ks[i]][1] === en && W[ks[i]][3] && W[ks[i]][3].indexOf("svg:") === 0) return W[ks[i]]; return null; }
  function paBuild(type) {
    var W = api().WORD, qs = [], i;
    if (type === "clap") {
      var byN = { 1: [], 2: [], 3: [], 4: [] };
      Object.keys(PA_SYL).forEach(function (en) { var w = paWordByEn(en); if (w) byN[PA_SYL[en]].push({ w: w, n: PA_SYL[en] }); });
      [1, 2, 1, 3, 2].forEach(function (n) { var a = shuffle(byN[n].filter(function (x) { return !qs.some(function (q) { return q.w === x.w; }); })); if (a[0]) qs.push(a[0]); });
    } else {
      var fams = shuffle(PA_RHYME.map(function (f) { return f.filter(function (id) { return W[id]; }); }).filter(function (f) { return f.length >= 2; })).slice(0, 5);
      fams.forEach(function (f, qi) {
        var two = shuffle(f), t = W[two[0]], ok = W[two[1]], others = shuffle([].concat.apply([], PA_RHYME.filter(function (x) { return x !== f && f.indexOf(x[0]) < 0; }).map(function (x) { return x.filter(function (id) { return W[id]; }); }))).slice(0, qi < 2 ? 1 : 2);
        qs.push({ t: t, ok: ok, ch: shuffle([ok].concat(others.map(function (id) { return W[id]; }))) });
      });
    }
    st.pa = { type: type, qs: qs, qi: 0, mt: 0, claps: 0, done: false }; st.answered = false; st.miss = 0;
  }
  function viewPaMenu() {
    return '<div class="kmode">' + bar(true) + '<div class="kname">🎧</div><div class="kgrid"><button class="kgame2" data-x="kpastart" data-t="clap"><span>👏</span><i>拍拍手</i></button><button class="kgame2" data-x="kpastart" data-t="rhyme"><span>🎵</span><i>找韻腳</i></button></div>' + timeBar() + "</div>";
  }
  function viewPa() {
    var r = st.pa, q = r.qs[r.qi], h;
    if (r.done) return '<div class="kmode">' + bar(true) + '<div class="kcheer"><span class="kmon big">' + api().mon(k().mon, "pop") + '</span><div class="kstars">' + starsHtml(r.rate || 3) + '</div><div class="kbye2">Great job!</div></div><div class="kgames"><button class="kgo" data-x="kpamenu" aria-label="再玩">▶</button></div></div>';
    if (!q) return viewPaMenu();
    if (r.type === "clap") {
      h = '<div class="kmode">' + bar(true) + '<div class="kstage"><span class="ks now"><b>👏</b><i>拍拍手</i></span></div><button class="kbig sm" data-x="kpahear" aria-label="再聽一次">' + api().pic(q.w) + '</button><div class="kword">' + api().esc(q.w[1]) + '</div>' +
        '<div class="kclapdots" id="kcd"></div><div class="kbtns"><button class="kclapbtn" data-x="kclap" aria-label="拍手">👏</button><button class="kgo sm" data-x="kclapok" aria-label="好了">✔</button></div>';
    } else {
      h = '<div class="kmode">' + bar(true) + '<div class="kstage"><span class="ks now"><b>🎵</b><i>找韻腳</i></span></div><button class="kbig sm" data-x="kpahear" aria-label="再聽一次">' + api().pic(q.t) + '</button><div class="kword">' + api().esc(q.t[1]) + '</div><div class="kchoices c' + q.ch.length + '">';
      q.ch.forEach(function (w) { h += '<button class="kcard" data-x="krhy" data-id="' + w[0] + '">' + api().pic(w) + "</button>"; });
      h += "</div>";
    }
    return h + dotsRow(r.qs.length, r.qi) + timeBar() + "</div>";
  }

  function viewEnd() {
    return '<div class="kmode ended">' + '<div class="kbar"><span class="kspacer"></span>' + exitBtn() + "</div>" + '<div class="kcheer"><div class="kmoon">🌙</div><div class="kbye">Bye-bye!</div></div></div>';
  }

  window.MFE_ROUTES = window.MFE_ROUTES || {};
  window.MFE_ROUTES.play = function (parts) {
    if (!st.startTs) st.startTs = Date.now();
    if (st.ended) return viewEnd();
    var id = parts[1], g = parts[2];
    if (EXT[id]) return EXT[id].view(parts);
    if (id === "pa") { if (!st.pa || !g) { if (g) paBuild(g); else st.pa = null; } return st.pa ? viewPa() : viewPaMenu(); }
    if (id === "review") { if (!st.rv) rvBuild(parts[2] || null); return st.rv.done ? viewRvDone() : viewRv(); }
    if (!id || !cat(id)) return viewMap();
    var DI = isDI(id);
    if (st.unit !== id) { st.unit = id; if (DI) diSetup(id); else { st.chunk = pickChunk(id); st.sc = scWords(); st.idx = 0; st.ri = 0; st.gi = 0; } }
    if (DI) {
      if (g === "learn") return viewDiLearn();
      if (g === "play") { if (!st.target || st.ri >= 3) { st.ri = 0; newDiFeed(); } return viewDiFeed(); }
      if (g === "find") { if (!st.qs.length) buildDiQs(); return st.qi >= st.qs.length ? viewDone() : viewDiFind(); }
      if (g === "done") return viewDone();
      if (g === "games") return viewGames(id);
      if (g && g.indexOf("g-") === 0) { var gt = g.slice(2); if (!st.gm || st.gm.type !== gt) newGame(gt); return viewGame(gt); }
      return viewIntro(id);
    }
    if (g === "learn") return viewLearn();
    if (g === "play") { if (st.gi === 0) { if (!st.target || st.ri >= st.chunk.length) { st.ri = 0; newFeed(); } return viewFeed(); } if (!st.mem) newMem(); return viewMem(); }
    if (g === "find") { if (!st.qs.length) buildQs(); return st.qi >= st.qs.length ? viewDone() : viewFind(); }
    if (g === "done") return viewDone();
    if (g === "games") return viewGames(id);
    return viewIntro(id);
  };
  window.MFE_AFTER = window.MFE_AFTER || {};
  window.MFE_AFTER.play = function (parts) {
    if (!st.timer) st.timer = setInterval(function () {
      var m = minutes(); if (!m || st.ended) return;
      if (Date.now() - st.startTs >= m * 60000) { st.ended = true; api().render(); try { api().speak("Bye-bye!"); } catch (e) {} }
      else { var bar = document.querySelector(".ktime span"); if (bar) bar.style.width = Math.max(0, 100 - (Date.now() - st.startTs) / (m * 600)) + "%"; }
    }, 3000);
    if (EXT[parts[1]]) { if (EXT[parts[1]].after) EXT[parts[1]].after(parts); return; }
    if (parts[1] === "pa") { setTimeout(function () { var r = st.pa; if (!r) zh("聽聲音遊戲。選一個玩。"); else if (r.done) zh("好棒！"); else if (r.type === "clap") { if (r.qi === 0) zh("拍拍手。聽，這個字有幾拍？"); setTimeout(function () { if (!st.answered) paAsk(); }, r.qi === 0 ? 2800 : 100); } else { if (r.qi === 0) zh("找韻腳。哪一個聽起來跟它很像？"); setTimeout(function () { if (!st.answered) paAsk(); }, r.qi === 0 ? 3000 : 100); } }, 350); return; }
    if (parts[1] === "review") { var r = st.rv; setTimeout(function () { if (!r || !r.qs.length) zh(learnedCount() ? "今天沒有要複習的。" : "先去學一學，明天再來複習。"); else if (r.done) zh("複習完成，好棒！"); else { if (r.qi === 0) zh(r.practice ? "今日小任務。再玩一次學過的。" : "今日小任務。來複習學過的。"); setTimeout(function () { if (!st.answered) rvAsk(); }, r.qi === 0 ? 2600 : 100); } }, 350); return; }
    var g = parts[2];
    if (!g && parts[1] && cat(parts[1])) setTimeout(function () { zh("我們來學" + unitOf(parts[1]).title.replace(/（.*$/, "") + "。先看一看，再玩一玩，最後找一找。按綠色箭頭開始。"); }, 400);
    if (g && g.indexOf("g-") === 0 && st.unit && isDI(st.unit)) { setTimeout(function () { zh(g === "g-bubble" ? "戳泡泡。只戳有 " + symTxt(st.dg) + " 聲音的圖。" : "找寶藏。找出所有有 " + symTxt(st.dg) + " 聲音的圖。"); }, 300); setTimeout(function () { window.MFE_DI.playSound(st.dg); }, 3300); return; }
    if (g && st.unit && isDI(st.unit)) { diAfter(g); return; }
    if (g === "learn" && st.idx === st.chunk.length) setTimeout(function () { zh("這個字可以這樣說。"); }, 300), setTimeout(function () { hearTwice(); }, 2000);
    else if (g === "learn") { setTimeout(function () { hearTwice(); }, 450); if (st.idx < 2) setTimeout(function () { if (st.idx < 2) zh("換你說說看。"); }, 7000); setTimeout(function () { var b = document.getElementById("knext"); if (b) b.classList.add("pulse"); }, 3200); }
    if (g === "play" && st.gi === 0 && st.target) setTimeout(function () { zh(st.ri === 0 ? "餵小怪獸。找一樣的圖給牠吃。" : ""); }, 300), setTimeout(function () { say(st.target); }, st.ri === 0 ? 2800 : 450);
    if (g === "play" && st.gi === 1) setTimeout(function () { zh("翻翻樂。翻兩張，找一樣的。"); }, 300);
    if (g === "find" && st.qs[st.qi] && st.qi < st.qs.length) setTimeout(function () { if (st.qi === 0) zh("現在換你找找看。"); setTimeout(function () { if (!st.answered) sayQ(st.qs[st.qi].w); }, st.qi === 0 ? 1700 : 100); }, 350);
  };
  window.MFE_LEAVE = function (base) { if (base !== "play" && st.timer) { clearInterval(st.timer); st.timer = null; st.startTs = 0; st.ended = false; st.unit = null; st.target = null; st.qs = []; st.mem = null; st.rv = null; st.pa = null; } };

  function wordById(id) { var c = cat(st.unit); return c.cat.words.filter(function (w) { return w[0] === id; })[0]; }
  function hearTwice() { var w = st.idx >= st.chunk.length ? st.sc[st.idx - st.chunk.length] : st.chunk[st.idx]; if (!w || !cat(st.unit)) return; if (st.idx >= st.chunk.length) { var s0 = sentOf(st.unit, w).en; api().speak(s0, { rate: 0.5 }); setTimeout(function () { api().speak(s0); }, 3200); return; } say(w); setTimeout(function () { say(w); var c = cat(st.unit) || {}, s = (!w[6] && c.pat) ? api().sentence(c.pat, w, null) : null; if (s && c.pat !== "where_is") setTimeout(function () { api().speak(s, { queue: true }); }, 1600); }, 2000); }
  function award() { var c = k(); c.kstars = c.kstars || {}; c.kdone = c.kdone || {}; st.rate = rateOf(st.mt || 0); c.kstars[st.unit] = Math.max(c.kstars[st.unit] || 0, st.rate); c.kdone[st.unit] = (c.kdone[st.unit] || 0) + 1; st.mt = 0; c.plays.push({ unit: st.unit, act: "kid", ts: Date.now() }); c.resist = []; api().save(); api().burst(); }
  window.MFE_X = window.MFE_X || {};
  var X = window.MFE_X;
  X.enterkid = function () { st.startTs = Date.now(); st.ended = false; api().go("play"); };
  X.exitkid = function () { st.nav = (st.nav || 0) + 1; api().gate(function () { st.startTs = 0; st.ended = false; api().go("home"); }); };
  X.khome = function () { Object.keys(EXT).forEach(function (kx) { if (EXT[kx].reset) EXT[kx].reset(); }); st.nav = (st.nav || 0) + 1; st.pa = null; st.rv = null; st.target = null; st.qs = []; st.mem = null; st.unit = null; api().go("play"); };
  X.kopen = function (el) { st.nav = (st.nav || 0) + 1; st.rv = null; st.unit = null; st.qs = []; st.mem = null; st.target = null; api().go("play/" + el.dataset.id); };
  X.kgo = function (el) { st.nav = (st.nav || 0) + 1; var s = el.dataset.s || "learn"; if (s === "learn" && isDI(st.unit)) { diSetup(st.unit); } else if (s === "learn") { st.sc = scWords(); st.idx = 0; st.ri = 0; st.gi = 0; st.target = null; st.mem = null; st.qs = []; } api().go("play/" + st.unit + "/" + s); };
  X.kgames = function () { st.nav = (st.nav || 0) + 1; api().go("play/" + st.unit + "/games"); };
  X.kact = function (el) { api().go("act/" + st.unit + "/k-" + el.dataset.k); };
  X.kmore = function () { st.nav = (st.nav || 0) + 1; var c = k(); c.kcur = c.kcur || {}; c.kcur[st.unit] = isDI(st.unit) ? ((c.kcur[st.unit] || 0) + 1) % 60 : ((c.kcur[st.unit] || 0) + CHUNK) % cat(st.unit).cat.words.length; api().save(); var u = st.unit; st.unit = null; st.qs = []; st.mem = null; st.target = null; api().go("play/" + u); };
  X.khear = function () {
    var hid = document.querySelector(".kscene[data-hide=\"1\"]:not(.open)");
    if (hid && !isDI(st.unit)) { hid.classList.add("open"); var h = document.querySelector(".khint"); if (h) h.textContent = "找到了！"; api().burst && api().burst(); api().speak("Here it is!"); return; }
    if (isDI(st.unit)) diHear(); else hearTwice();
  };
  X.kslow = function () { var w = isDI(st.unit) ? (st.dl[st.idx] || {}).w : (st.idx >= st.chunk.length ? st.sc[st.idx - st.chunk.length] : st.chunk[st.idx]); if (!w) return; if (!isDI(st.unit) && st.idx >= st.chunk.length) { api().speak(sentOf(st.unit, w).en, { rate: 0.38 }); return; } if (w[6]) say(w); else api().speak(w[1], { rate: 0.38 }); };
  X.klnext = function () {
    var n = isDI(st.unit) ? st.dl.length : st.chunk.length + st.sc.length;
    if (isDI(st.unit)) { if (st.dl[st.idx] && st.dl[st.idx].p) seen(wkey(st.dl[st.idx].w), { t: "w", id: st.dl[st.idx].w[0], u: st.unit }); if (st.idx === 0) seen(skey(st.unit, st.dg), { t: "s", g: st.dg.key, u: st.unit }); }
    else if (st.chunk[st.idx] && st.idx < st.chunk.length) seen(wkey(st.chunk[st.idx]), { t: "w", id: st.chunk[st.idx][0], u: st.unit });
    if (st.idx < n - 1) { st.idx++; api().go("play/" + st.unit + "/learn"); }
    else { st.gi = 0; st.ri = 0; st.target = null; st.mem = null; api().go("play/" + st.unit + "/play"); }
  };
  X.kask = function () { if (isDI(st.unit)) { diAsk(); return; } var q = st.qs[st.qi]; if (q) sayQ(q.w); };

  X.krstart = function (el) { st.nav = (st.nav || 0) + 1; st.rv = null; st.unit = null; st.qs = []; api().go("play/review" + (el.dataset.u ? "/" + el.dataset.u : "")); };
  X.krask = function () { rvAsk(); };
  function rvNext() {
    var r = st.rv; r.qi++; st.answered = false; st.miss = 0;
    if (r.qi >= r.qs.length) { r.done = true; r.rate = rateOf(r.mt); var c = k(); c.plays.push({ unit: "review", act: "kid", ts: Date.now() }); api().save(); api().burst(); }
    api().render();
  }
  X.krpick = function (el) {
    if (st.answered) return; var r = st.rv, q = r.qs[r.qi], w = api().WORD[el.dataset.id];
    if (w === q.w) { st.answered = true; say(w); if (st.miss === 0) rec(q.e.k, true, q.e); afterRight(el, rvNext); }
    else { if (st.miss === 0) rec(q.e.k, false, q.e); r.mt++; wrong(el, q.w); }
  };
  X.kryn = function (el) {
    if (st.answered) return; var r = st.rv, q = r.qs[r.qi], a = el.dataset.a === "1";
    if (a === !!q.p) { st.answered = true; say(q.w); if (st.miss === 0) rec(q.e.k, true, q.e); afterRight(el, rvNext); }
    else { if (st.miss === 0) rec(q.e.k, false, q.e); r.mt++; el.classList.add("shake"); st.miss++; setTimeout(function () { el.classList.remove("shake"); }, 500); setTimeout(function () { zh(q.p ? "有喔，再聽一次。" : "沒有喔，再聽一次。"); }, 450); setTimeout(rvAsk, 2300);
      if (st.miss >= 2) { var d = document.querySelector('.kyn [data-a="' + (q.p ? 1 : 0) + '"]'); if (d) d.classList.add("hint"); } }
  };

  X.kext = function (el) { st.nav = (st.nav || 0) + 1; st.unit = null; Object.keys(EXT).forEach(function (kx) { if (EXT[kx].reset) EXT[kx].reset(); }); api().go("play/" + el.dataset.id); };
  window.MFE_KIDU = { api: api, zh: zh, say: say, shuffle: shuffle, bar: bar, timeBar: timeBar, afterRight: afterRight, cheerPop: cheerPop, starsHtml: starsHtml, rateOf: rateOf, dotsRow: dotsRow, seen: seen, wrec: wrec, sceneSvg: sceneSvg, st: st, learned: learnedCount };
  X.kpastart = function (el) { st.nav = (st.nav || 0) + 1; st.unit = null; paBuild(el.dataset.t); api().go("play/pa/" + el.dataset.t); };
  X.kpamenu = function () { st.pa = null; api().go("play/pa"); };
  function paAsk() { var q = st.pa && st.pa.qs[st.pa.qi]; if (!q) return; if (st.pa.type === "clap") { say(q.w); } else { say(q.t); } }
  X.kpahear = function () { paAsk(); };
  function paNext() { var r = st.pa; r.qi++; r.claps = 0; st.answered = false; st.miss = 0; if (r.qi >= r.qs.length) { r.done = true; r.rate = rateOf(r.mt); var c = k(); c.plays.push({ unit: "pa", act: "kid", ts: Date.now() }); api().save(); api().burst(); } api().render(); }
  X.kclap = function (el) {
    var r = st.pa; if (!r || st.answered) return; r.claps++; el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop");
    var d = document.getElementById("kcd"); if (d) { var n = document.createElement("i"); n.className = "on"; d.appendChild(n); }
  };
  X.kclapok = function (el) {
    var r = st.pa, q = r && r.qs[r.qi]; if (!q || st.answered) return;
    if (r.claps === q.n) { st.answered = true; if (r.claps > 0) { api().speak(q.w[1] + "! " + q.n, { queue: true, rate: 0.7 }); } afterRight(el, paNext); }
    else {
      r.mt++; st.miss++; var shown = r.claps; r.claps = 0; setTimeout(function () { zh(q.n === 1 ? "這個字是一拍。" : "我們一起拍。這個字有 " + q.n + " 拍。"); }, 300);
      if (st.miss >= 2) { for (var i = 0; i < q.n; i++) (function (i) { setTimeout(function () { var d = document.getElementById("kcd"); if (d) { if (i === 0) d.innerHTML = ""; var n = document.createElement("i"); n.className = "on"; d.appendChild(n); } }, 2200 + i * 650); })(i); }
      var d0 = document.getElementById("kcd"); if (d0) d0.innerHTML = "";
      setTimeout(function () { say(q.w); }, 1400);
    }
  };
  X.krhy = function (el) {
    var r = st.pa, q = r && r.qs[r.qi]; if (!q || st.answered) return; var w = api().WORD[el.dataset.id];
    if (w === q.ok) { st.answered = true; say(w); afterRight(el, paNext); }
    else { r.mt++; el.classList.add("shake"); st.miss++; setTimeout(function () { el.classList.remove("shake"); }, 500); say(w); setTimeout(function () { zh("聽起來不太像。再聽一次。"); }, 1500); setTimeout(function () { say(q.t); }, 3200);
      if (st.miss >= 2) { var d = document.querySelector('.kcard[data-id="' + q.ok[0] + '"]'); if (d) d.classList.add("hint"); } }
  };

  function afterRight(el, next) { el.classList.add("yes"); var t = CHEERS[(st.qi + st.ri) % CHEERS.length]; cheerPop(t); setTimeout(function () { api().speak(t, { queue: true, rate: 0.7 }); }, 900); var nv = st.nav || 0; setTimeout(function () { if (nv === (st.nav || 0)) next(); }, 2300); }
  function wrong(el, target) {
    el.classList.add("shake"); setTimeout(function () { el.classList.remove("shake"); }, 500); st.miss++;
    setTimeout(function () { zh("再試一次"); }, 450);
    setTimeout(function () { say(target); }, 1300);
    if (st.miss >= 2) { var d = document.querySelector('.kcard[data-id="' + target[0] + '"]'); if (d) d.classList.add("hint"); }
  }

  function diAfter(g) {
    var G = st.dg;
    if (g === "learn") {
      var it = st.dl[st.idx];
      setTimeout(function () {
        if (st.idx === 0) zh("聽聲音。這些字都有 " + symTxt(G) + " 的聲音。");
        else if (!it.p && st.idx === 3) zh("這個不是喔。");
        else if (!it.p) zh("這個也不是。");
      }, 400);
      setTimeout(function () { diHear(); }, st.idx === 0 ? 2800 : 1700);
      if (st.idx < 2 && it.p) setTimeout(function () { zh("換你說說看。"); }, st.idx === 0 ? 6200 : 5100);
      setTimeout(function () { var b = document.getElementById("knext"); if (b) b.classList.add("pulse"); }, 5200);
    }
    if (g === "play") setTimeout(function () { zh(st.ri === 0 ? "餵小怪獸。牠只吃有 " + symTxt(G) + " 聲音的圖。" : "牠要吃有 " + symTxt(G) + " 的。"); }, 300), setTimeout(function () { window.MFE_DI.playSound(G); }, st.ri === 0 ? 3600 : 1300);
    if (g === "find" && st.qs[st.qi]) setTimeout(function () { if (st.qi === 0) zh("現在換你判斷。有這個聲音按 ✔，沒有按 ✖。"); setTimeout(function () { if (!st.answered) diAsk(); }, st.qi === 0 ? 4300 : 150); }, 350);
  }
  function diHear() { var it = st.dl[st.idx]; if (!it) return; say(it.w); setTimeout(function () { if (it.p) window.MFE_DI.playSound(st.dg); }, 1500); }
  function diAsk() { var q = st.qs[st.qi]; if (!q) return; if (q.k3) { zh("哪一個有 " + symTxt(st.dg) + " 的聲音？"); setTimeout(function () { if (!st.answered) window.MFE_DI.playSound(st.dg); }, 2200); return; } say(q.w); setTimeout(function () { if (!st.answered) window.MFE_DI.playSound(st.dg); }, 1400); }
  X.kdisnd = function () { window.MFE_DI.playSound(st.dg); };
  X.kdfeed = function (el) {
    if (st.answered) return; var w = wordById2(el.dataset.id);
    if (w === st.target) {
      st.answered = true; say(w); el.classList.add("eaten"); var fm = document.getElementById("kfm"); if (fm) fm.classList.add("yum");
      afterRight(el, function () { st.ri++; if (st.ri >= 3) { st.gi = 1; st.qs = []; api().go("play/" + st.unit + "/find"); } else { newDiFeed(); api().go("play/" + st.unit + "/play"); } api().render(); });
    } else { el.classList.add("shake"); st.miss++; setTimeout(function () { el.classList.remove("shake"); }, 500); setTimeout(function () { zh("牠不吃這個。找有 " + symTxt(st.dg) + " 的。"); }, 450); setTimeout(function () { say(w); }, 2600);
      if (st.miss >= 2) { var d = document.querySelector('.kcard[data-id="' + st.target[0] + '"]'); if (d) d.classList.add("hint"); } }
  };
  function wordById2(id) { var all = st.dpos.concat(st.dnear, st.dfar); return all.filter(function (w) { return w[0] === id; })[0]; }

  X.kd3 = function (el) {
    if (st.answered) return; var q = st.qs[st.qi], w = wordById2(el.dataset.id);
    if (w === q.w) { st.answered = true; say(w); if (st.miss === 0) srec(st.dg, true, st.unit); afterRight(el, function () { st.qi++; st.answered = false; st.miss = 0; if (st.qi >= st.qs.length) { award(); api().go("play/" + st.unit + "/done"); } api().render(); }); }
    else { if (st.miss === 0) srec(st.dg, false, st.unit); st.mt = (st.mt || 0) + 1; el.classList.add("shake"); st.miss++; setTimeout(function () { el.classList.remove("shake"); }, 500); setTimeout(function () { say(w); }, 500); setTimeout(function () { zh("這個沒有喔。再聽一次。"); }, 1700); setTimeout(function () { window.MFE_DI.playSound(st.dg); }, 3300);
      if (st.miss >= 2) { var d = document.querySelector('.kcard[data-id="' + q.w[0] + '"]'); if (d) d.classList.add("hint"); } }
  };
  X.kyn = function (el) {
    if (st.answered) return; var q = st.qs[st.qi], a = el.dataset.a === "1";
    if (a === !!q.p) { st.answered = true; say(q.w); if (st.miss === 0) srec(st.dg, true, st.unit); afterRight(el, function () { st.qi++; st.answered = false; st.miss = 0; if (st.qi >= st.qs.length) { award(); api().go("play/" + st.unit + "/done"); } api().render(); }); }
    else { if (st.miss === 0) srec(st.dg, false, st.unit); st.mt = (st.mt || 0) + 1; el.classList.add("shake"); st.miss++; setTimeout(function () { el.classList.remove("shake"); }, 500); setTimeout(function () { zh(q.p ? "有喔，再聽一次。" : "沒有喔，再聽一次。"); }, 450); setTimeout(diAsk, 2300);
      if (st.miss >= 2) { var d = document.querySelector('.kyn [data-a="' + (q.p ? 1 : 0) + '"]'); if (d) d.classList.add("hint"); } }
  };

  /* ----- 拼讀遊戲間：聽音泡泡、聽音尋寶（只點有這個聲音的圖；點錯會搖頭、不扣分） ----- */
  function uniq(ws) { var seen = {}, out = []; ws.forEach(function (w) { if (w && !seen[w[0]]) { seen[w[0]] = 1; out.push(w); } }); return out; }
  function newGame(type) {
    if (!st.dg) diSetup(st.unit);
    var n = type === "bubble" ? 3 : 4, pos = st.dpos.slice(0, n), negs = uniq([st.dfar[0], st.dnear[0], st.dnear[1], st.dfar[1], st.dnear[2], st.dfar[2]]).filter(function (w) { return pos.indexOf(w) < 0; }).slice(0, type === "bubble" ? 3 : 5);
    var items = shuffle(pos.map(function (w) { return { w: w, p: 1, d: 0 }; }).concat(negs.map(function (w) { return { w: w, p: 0, d: 0 }; })));
    st.gm = { type: type, items: items, need: pos.length, found: 0, miss: 0 };
  }
  function viewGame(type) {
    var m = st.gm, h = '<div class="kmode">' + bar(true) + diTop() + '<div class="kgm ' + type + '">';
    m.items.forEach(function (it, i) {
      h += '<button class="kg ' + (it.d ? "done" : "") + '" data-x="kgtap" data-i="' + i + '">' + (it.d ? '<em>⭐</em>' : api().pic(it.w)) + "</button>";
    });
    return h + "</div>" + dotsRow(m.need, m.found) + timeBar() + "</div>";
  }
  X.kgstart = function (el) { st.nav = (st.nav || 0) + 1; st.gm = null; var t = el.dataset.t; if (!st.unit) return; newGame(t); api().go("play/" + st.unit + "/g-" + t); };
  X.kgtap = function (el) {
    var m = st.gm; if (!m) return; var it = m.items[+el.dataset.i]; if (!it || it.d) return;
    if (it.p) {
      it.d = 1; m.found++; say(it.w); api().burst();
      if (m.found >= m.need) { cheerPop("Great job!"); setTimeout(function () { api().speak("Great job!", { queue: true, rate: 0.7 }); }, 900); var nv = st.nav || 0; setTimeout(function () { if (nv !== (st.nav || 0) || !st.unit) return; var c = k(); c.plays.push({ unit: st.unit, act: "kid", ts: Date.now() }); api().save(); st.gm = null; api().go("play/" + st.unit + "/games"); }, 2400); }
      else cheerPop(CHEERS[m.found % CHEERS.length]);
      api().render();
    } else {
      el.classList.add("shake"); m.miss++; setTimeout(function () { el.classList.remove("shake"); }, 500);
      setTimeout(function () { zh("這個沒有 " + symTxt(st.dg) + "。再找找。"); }, 400); setTimeout(function () { say(it.w); }, 2600);
    }
  };
  X.kfeed = function (el) {
    if (st.answered) return; var w = wordById(el.dataset.id);
    if (w === st.target) {
      st.answered = true; say(w); el.classList.add("eaten"); var fm = document.getElementById("kfm"); if (fm) fm.classList.add("yum");
      afterRight(el, function () { st.ri++; if (st.ri >= st.chunk.length) { st.gi = 1; st.mem = null; st.ri = 0; } else newFeed(); api().go("play/" + st.unit + "/play"); api().render(); });
    } else wrong(el, st.target);
  };
  X.kflip = function (el) {
    var m = st.mem; if (!m || m.lock) return; var i = +el.dataset.i, c = m.cards[i];
    if (m.open.indexOf(i) >= 0 || m.done[c.w[0]]) return;
    m.open.push(i); say(c.w); api().render();
    if (m.open.length === 2) {
      var a = m.cards[m.open[0]], b = m.cards[m.open[1]]; m.lock = true;
      if (a.w === b.w) { m.done[a.w[0]] = 1; setTimeout(function () { cheerPop(CHEERS[Object.keys(m.done).length % CHEERS.length]); api().burst(); m.open = []; m.lock = false; api().render();
          if (Object.keys(m.done).length >= m.pairs) { var nv = st.nav || 0; setTimeout(function () { if (nv !== (st.nav || 0) || !st.unit) return; st.qs = []; api().go("play/" + st.unit + "/find"); buildQs(); api().render(); }, 1700); } }, 900); }
      else setTimeout(function () { m.open = []; m.lock = false; api().render(); }, 1400);
    }
  };
  X.kpick = function (el) {
    if (st.answered) return; var q = st.qs[st.qi], w = wordById(el.dataset.id);
    if (w === q.w) {
      st.answered = true; say(w); if (st.miss === 0) wrec(q.w, true, st.unit);
      afterRight(el, function () { st.qi++; st.answered = false; st.miss = 0; if (st.qi >= st.qs.length) { award(); api().go("play/" + st.unit + "/done"); } api().render(); });
    } else { if (st.miss === 0) wrec(q.w, false, st.unit); st.mt = (st.mt || 0) + 1; wrong(el, q.w); }
  };

  function ledgerCard() {
    var c = k(), m = c.kmem || {}, keys = Object.keys(m), now = Date.now(), due = keys.filter(function (x) { return m[x].due <= now; }).length;
    var weak = keys.map(function (x) { return m[x]; }).filter(function (e) { return e.x > 0 && e.x >= e.ok; }).sort(function (a, b) { return (b.x - b.ok) - (a.x - a.ok); }).slice(0, 8);
    function nm(e) { if (e.t === "w") { var w = api().WORD[e.id]; return w ? w[1] + "（" + w[2] + "）" : e.id; } var l = null, gs = window.MFE_DI && window.MFE_DI.kidSets(e.u); var g = gs && gs.filter(function (x) { return x.key === e.g; })[0]; return "聲音 " + (g ? g.sym : e.g) + "（" + e.u + "）"; }
    var h = '<div class="card"><h2>📈 ' + api().esc(c.name || "孩子") + ' 的學習紀錄</h2><p class="muted">孩子模式會記錄每個字、每個聲音第一次答對或答錯，答對的隔 1、3、7、14 天再複習，答錯的當天再出現。</p>' +
      "<p>已學過 <b>" + keys.length + "</b> 項；今天該複習 <b>" + due + "</b> 項。</p>";
    if (weak.length) h += "<h3>需要多陪的</h3><ul>" + weak.map(function (e) { return "<li>" + api().esc(nm(e)) + "　答錯 " + e.x + " 次／答對 " + e.ok + " 次</li>"; }).join("") + "</ul><p class=\"muted\">建議：用實物、你說一次、孩子指，不要用考的。</p>";
    else if (keys.length) h += "<p>目前沒有特別常錯的項目。</p>";
    return h + "</div>";
  }
  window.MFE_KID_SETTINGS = function () {
    var m = minutes();
    var ka = kidAge(), agec = '<div class="card"><h2>🎂 孩子模式顯示哪些單元</h2><p class="muted">依孩子年齡顯示「該年齡與再大一歲」以內的單元，避免太難的內容。預設依目前進度的年齡。</p><div class="row">' + [2, 3, 4, 5, 6, 0].map(function (n) { return '<button class="btn small ' + (ka === n ? "green" : "white") + '" data-x="kage" data-n="' + n + '">' + (n ? n + " 歲" : "全部") + "</button>"; }).join("") + "</div></div>";
    return ledgerCard() + agec + '<div class="card"><h2>👶 孩子模式使用時間</h2><p class="muted">到時間畫面會變成 Bye-bye，只能由家長解鎖離開。孩子模式沒有計分、沒有失敗；點錯只會再聽一次。</p><div class="row">' +
      [5, 10, 15, 0].map(function (n) { return '<button class="btn small ' + (m === n ? "green" : "white") + '" data-x="kmin" data-n="' + n + '">' + (n ? n + " 分鐘" : "不限時") + "</button>"; }).join("") + "</div></div>";
  };
  X.kage = function (el) { api().kid().kage = +el.dataset.n; api().save(); api().render(); };
  X.kmin = function (el) { var s = api().getS(); s.kidMin = +el.dataset.n; api().save(); api().render(); };
})();
