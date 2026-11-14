/* 學習單＋互動版引擎：同一份題目，同時產生 A4 紙本（#sheet/單元/版本）與大圖互動版（#act/單元/版本）。
   每個單元 3 版：題目相似、順序與選項位置不同，孩子每次都是新鮮的練習。
   規格在 data/curriculum.js（MFE_ACT）。孩子操作的部分盡量大，家長只有一行提示。 */
(function () {
  "use strict";
  var A = window.MFE_API, ACT = window.MFE_ACT, AGES = window.MFE_AGES;
  var W = A.WORD, esc = A.esc, LES = {};
  A.LESSONS.forEach(function (l) { LES[l.id] = l; });
  var X = window.MFE_X = window.MFE_X || {};
  var NUMW = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
  var STORY = ["A", "B", "C"];

  /* ---------- 亂數（固定種子：同一版每次一樣） ---------- */
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0; }
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function shuf(a, r) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function rot(a, n) { if (!a.length) return a; n = ((n % a.length) + a.length) % a.length; return a.slice(n).concat(a.slice(0, n)); }
  function words(ids) { return (ids || []).map(function (i) { return W[i]; }).filter(Boolean); }
  function fmt(t, w) { return t.replace(/\{a\}/g, A.art(w)).replace(/\{w\}/g, w[1]); }
  function others(pool, not, n, r) { return shuf(pool.filter(function (x) { return not.indexOf(x) < 0; }), r).slice(0, n); }
  function mkOpts(t, pool, n, r) {
    var list = shuf([t].concat(others(pool, [t], n - 1, r)), r);
    return { opts: list, ok: list.indexOf(t) };
  }
  function sameOrder(a, b) { for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; }
  function derange(a, r) { var b = shuf(a, r), k = 0; while (a.length > 1 && sameOrder(a, b) && k++ < 9) b = shuf(a, r); return b; }

  var KIND = {};
  /* ---------- 產生題目 ---------- */
  function genReview(unit, v, more) {
    var s = ACT[unit], r = rng(hash(unit) + v * 977 + 1), n = more ? 6 : 3, src = shuf(s.review, r), rounds = [], i;
    for (i = 0; i < n; i++) {
      var d = gen(src[i % src.length], v + i, false); if (!d) continue;
      rounds.push(d.rounds[(v + i) % d.rounds.length]);
    }
    (s.extra || []).forEach(function (k, j) {
      var idx = rounds.length - 1 - j; if (idx < 0) return;
      rounds[idx] = { k: k, qs: KIND[k].gen({ s: s, unit: unit, v: v, r: r, ri: j, age: s.age, bank: [], tgt: function () {}, sayT: function () { return ""; }, more: more }) };
    });
    return { unit: unit, v: v, age: s.age, title: s.title, icon: s.icon, tip: s.tip, rounds: rounds, review: true };
  }
  function gen(unit, v, more) {
    var s = ACT[unit]; if (!s) return null;
    if (v === "t") return KIND.teach.genTeach(unit);
    if (s.review) return genReview(unit, v, more);
    var l = LES[unit]; if (!l) return null;
    var age = l.age, r = rng(hash(unit) + v * 977 + 1);
    var bank = words(s.bank), rb = rot(bank, v * 2), ti = 0;
    var nOpt = age <= 2 ? 2 : 3;
    function tgt() { return rb[ti++ % rb.length]; }
    var plan = rot(s.plan, v), rounds = [], i;
    if (s.plans) {
      if (more) { var uq = []; s.plans.forEach(function (pl) { pl.forEach(function (kk) { if (uq.indexOf(kk) < 0) uq.push(kk); }); }); plan = shuf(uq, r).slice(0, 6); }
      else plan = s.plans[((v % 3) + 3) % 3];
    } else if (more) plan = plan.concat(rot(s.plan, v + 1));
    function sayT(i) { var t = s.say; return Array.isArray(t) ? t[((i % t.length) + t.length) % t.length] : t; }
    plan.forEach(function (k, ri) {
      var qs = [], n, q, t, m;
      if (KIND[k] && KIND[k].gen) {
        qs = KIND[k].gen({ s: s, unit: unit, v: v, r: r, ri: ri, age: age, bank: bank, tgt: tgt, sayT: sayT, more: more });
        rounds.push({ k: k, qs: qs }); return;
      }
      if (k === "pick") {
        n = age <= 2 ? 2 : 3;
        for (i = 0; i < n; i++) { t = tgt(); m = mkOpts(t, bank, nOpt, r); qs.push({ lab: fmt(sayT(ti + v), t), opts: m.opts.map(function (w) { return { w: w }; }), ok: m.ok, au: { say: fmt(sayT(ti + v), t) } }); }
      } else if (k === "dots") {
        t = tgt(); qs.push({ w: t, n: 4, au: { say: t[1] } });
      } else if (k === "paint") {
        for (i = 0; i < 2; i++) { t = tgt(); qs.push({ w: t, au: { say: t[1] } }); }
      } else if (k === "match") {
        var L = []; for (i = 0; i < 3; i++) L.push(tgt());
        var R = derange(L, r);
        qs.push({ left: L.map(function (w) { return { w: w, au: { say: w[1] } }; }), right: R.map(function (w) { return { w: w, shadow: !s.mm, au: { say: w[1] } }; }), map: L.map(function (w) { return R.indexOf(w); }) });
      } else if (k === "count") {
        var objs = rot(words(s.objs), v), ns = shuf([1, 2, 3, 4, 5], r), ox = [];
        for (i = 0; i < 3; i++) {
          var c = ns[(i + ri) % 5], ob = objs[(i + ri) % objs.length], nw = W["n" + c];
          var cand = [1, 2, 3, 4, 5].filter(function (z) { return z !== c; }); var d = shuf(cand, r).slice(0, 2);
          var os = shuf([c].concat(d), r);
          qs.push({ w: ob, n: c, lab: "How many? " + NUMW[c], opts: os.map(function (z) { return { w: W["n" + z] }; }), ok: os.indexOf(c), au: { say: "How many " + ob[1] + (ob[4] ? "" : "s") + "?" }, fin: NUMW[c] });
        }
      } else if (k === "lpick" && s.lex) {
        var lts = Object.keys(s.lex);
        rot(lts, v).forEach(function (lt, qi) {
          var ex = words(s.lex[lt]), t = ex[((v + qi + ri) % ex.length + ex.length) % ex.length], os = [t];
          lts.forEach(function (o) { if (o !== lt) { var e2 = words(s.lex[o]); os.push(e2[Math.floor(r() * e2.length)]); } });
          os = shuf(os, r);
          qs.push({ pr: { big: lt }, lab: "/" + (lt === "c" ? "k" : lt) + "/", opts: os.map(function (w) { return { w: w }; }), ok: os.indexOf(t), au: { sound: lt, w: t } });
        });
      } else if (k === "lmatch" && s.lex) {
        var l2 = rot(Object.keys(s.lex), v + 1), ex2 = l2.map(function (lt, qi) { var e = words(s.lex[lt]); return e[((v + ri + qi) % e.length + e.length) % e.length]; }), R2 = derange(ex2, r);
        qs.push({ left: l2.map(function (lt, qi) { return { t: lt, au: { sound: lt, w: ex2[qi] } }; }), right: R2.map(function (w) { return { w: w, au: { say: w[1] } }; }), map: ex2.map(function (w) { return R2.indexOf(w); }) });
      } else if (k === "trace" && s.lex) {
        rot(Object.keys(s.lex), v + 2).forEach(function (lt, qi) { var e = words(s.lex[lt]), w = e[((v + ri + qi) % e.length + e.length) % e.length]; qs.push({ w: w, letter: lt, au: { sound: lt, w: w } }); });
      } else if (k === "lpick") {
        rot(bank, v).forEach(function (t) {
          var o = shuf(bank, r); qs.push({ pr: { big: t[6] }, lab: "/" + (t[6] === "c" ? "k" : t[6]) + "/", opts: o.map(function (w) { return { w: w }; }), ok: o.indexOf(t), au: { sound: t[6], w: t } });
        });
      } else if (k === "lmatch") {
        var Lb = rot(bank, v + 1), Rb = derange(Lb, r);
        qs.push({ left: Lb.map(function (w) { return { t: w[6], au: { sound: w[6], w: w } }; }), right: Rb.map(function (w) { return { w: w, au: { say: w[1] } }; }), map: Lb.map(function (w) { return Rb.indexOf(w); }) });
      } else if (k === "trace") {
        rot(bank, v + 2).forEach(function (w) { qs.push({ w: w, letter: w[6], au: { sound: w[6], w: w } }); });
      } else if (k === "rmatch") {
        var ps = rot(s.pairs, v + ri).slice(0, 3), Lw = ps.map(function (p) { return W[p[0]]; }), Rw = derange(ps.map(function (p) { return W[p[1]]; }), r);
        qs.push({ left: Lw.map(function (w) { return { w: w, au: { say: w[1] } }; }), right: Rw.map(function (w) { return { w: w, au: { say: w[1] } }; }), map: ps.map(function (p) { return Rw.indexOf(W[p[1]]); }) });
      } else if (k === "rpick") {
        var all = []; s.pairs.forEach(function (p) { all.push(W[p[0]], W[p[1]]); });
        rot(s.pairs, v * 2 + 1).slice(0, 3).forEach(function (p) {
          var a = W[p[0]], b = W[p[1]], o = shuf([b].concat(others(all, [a, b], 2, r)), r);
          qs.push({ pr: { w: a }, lab: "Which rhymes with " + a[1] + "?", opts: o.map(function (w) { return { w: w }; }), ok: o.indexOf(b), au: { say: a[1] + ", " + b[1] + "." } , fin: a[1] + ", " + b[1] + "!" });
        });
      } else if (k === "build") {
        rot(words(s.words), v).slice(0, 3).forEach(function (w) {
          var ls = w[1].split(""); qs.push({ w: w, letters: ls, tiles: derange(ls.map(function (x, j) { return x + "|" + j; }), r).map(function (x) { return x.split("|")[0]; }), au: { say: w[1] } });
        });
      } else if (k === "fill") {
        rot(words(s.words), v + 1).slice(0, 3).forEach(function (w) {
          var ls = w[1].split(""), mid = ls[1], vow = "aeiou".split("").filter(function (z) { return z !== mid; });
          var o = shuf([mid].concat(shuf(vow, r).slice(0, 2)), r);
          qs.push({ pr: { w: w, txt: ls[0] + " _ " + ls[2] }, opts: o.map(function (x) { return { t: x }; }), ok: o.indexOf(mid), au: { say: w[1] }, fin: w[1] });
        });
      } else if (k === "findword") {
        var wl = words(s.words);
        rot(wl, v * 2 + ri).slice(0, 3).forEach(function (w) {
          var m2 = mkOpts(w, wl, 3, r); qs.push({ pr: { w: w }, opts: m2.opts.map(function (x) { return { t: x[1] }; }), ok: m2.ok, au: { say: w[1] } });
        });
      } else if (k === "sight") {
        rot(s.sight, v * 3).slice(0, 3).forEach(function (t) {
          var m3 = mkOpts(t, s.sight, 3, r); qs.push({ pr: { speaker: true }, lab: t, opts: m3.opts.map(function (x) { return { t: x }; }), ok: m3.ok, au: { say: t } });
        });
      } else if (k === "sentmatch") {
        var ss = rot(s.sents, v * 2 + ri * 3).slice(0, 3), pool = s.sents.map(function (x) { return W[x[1]]; });
        ss.forEach(function (x) { var w = W[x[1]], m4 = mkOpts(w, pool, 3, r); qs.push({ pr: { txt: x[0] }, opts: m4.opts.map(function (y) { return { w: y }; }), ok: m4.ok, au: { say: x[0] } }); });
      } else if (k === "dialog") {
        rot(s.dlg, v * 2 + ri).slice(0, 3).forEach(function (d) {
          var o2 = shuf(d[1], r), good = d[1][d[2]];
          qs.push({ pr: { txt: d[0] }, opts: o2.map(function (x) { return { t: x }; }), ok: o2.indexOf(good), au: { say: d[0] }, ans: true });
        });
      } else if (k === "order") {
        var st = s.stories[(v + ri) % s.stories.length];
        var items = st.map(function (x, j) { return { w: W[x[0]], t: x[1], n: j }; });
        qs.push({ items: derange(items, r), au: {} });
      }
      rounds.push({ k: k, qs: qs });
    });
    return { unit: unit, v: v, age: age, title: l.title, icon: l.icon, tip: s.tip, rounds: rounds };
  }

  /* ---------- 紙本 ---------- */
  function pic(w) { return A.pic(w); }
  function opHtml(o) { return o.w ? pic(o.w) : '<b class="xtx">' + esc(o.t) + "</b>"; }
  function prompt(q) {
    var p = q.pr, h = "";
    if (p) {
      if (p.seq) h = '<div class="xseq">' + esc(p.seq) + "</div>";
      else if (p.big) h = '<div class="xbig">' + esc(p.big) + "</div>";
      else if (p.speaker) h = '<div class="xspk">🔊</div>';
      else if (p.txt && p.w) h = '<div class="xpp1">' + pic(p.w) + '</div><div class="xtx2">' + esc(p.txt) + "</div>";
      else if (p.txt) h = '<div class="xtx2 q">' + esc(p.txt) + "</div>";
      else if (p.w) h = '<div class="xpp1">' + pic(p.w) + "</div>";
    } else h = '<div class="xspk">🔊</div>';
    return '<div class="xpr">' + h + (q.lab && !(p && (p.txt && !p.w)) ? '<div class="xlab">' + esc(q.lab) + "</div>" : "") + "</div>";
  }
  function dashLetter(c) { return '<svg viewBox="0 0 48 64" aria-hidden="true"><text x="24" y="54" text-anchor="middle" font-family="GenSenRounded,sans-serif" font-weight="900" font-size="64" fill="none" stroke="#9AA8B0" stroke-width="1.8" stroke-dasharray="3.5 3.5">' + esc(c) + "</text></svg>"; }
  function paperRound(r, d) {
    var k = r.k, q = r.qs[0], h = "", i;
    if (KIND[k] && KIND[k].paper) {
      h = KIND[k].paper(r, d);
    } else if (k === "dots") {
      h = '<div class="xbigp">' + pic(q.w) + '</div><div class="xdots">' + "<i></i><i></i><i></i><i></i>" + "</div>";
    } else if (k === "paint") {
      h = '<div class="xpaint">' + r.qs.map(function (x) { return '<div class="xpt">' + pic(x.w) + "</div>"; }).join("") + "</div>";
    } else if (k === "match" || k === "lmatch" || k === "rmatch" || k === "capmatch") {
      var L = q.left, R = q.right, mid = k === "match" && R[0].shadow ? " sh" : "";
      h = '<div class="xm' + mid + '">';
      for (i = 0; i < L.length; i++) {
        h += '<div class="xmr"><div class="xmc">' + (L[i].t ? '<b class="xlt">' + esc(L[i].t) + "</b>" : pic(L[i].w)) + '</div><span class="xdt"></span><span class="xln"></span><span class="xdt"></span><div class="xmc r">' + (R[i].t ? '<b class="xlt">' + esc(R[i].t) + "</b>" : pic(R[i].w)) + "</div></div>";
      }
      h += "</div>";
    } else if (k === "count") {
      h = r.qs.map(function (x) {
        var os = ""; for (i = 0; i < x.n; i++) os += pic(x.w);
        return '<div class="xrow"><div class="xobjs n' + x.n + '">' + os + '</div><div class="xops">' + x.opts.map(function (o) { return '<div class="xop">' + opHtml(o) + "</div>"; }).join("") + "</div></div>";
      }).join("");
    } else if (k === "trace") {
      h = r.qs.map(function (x) { return '<div class="xrow xtr"><div class="xpp1">' + pic(x.w) + "</div>" + dashLetter(x.letter) + dashLetter(x.letter) + dashLetter(x.letter) + '<div class="xblank"></div></div>'; }).join("");
    } else if (k === "build") {
      h = r.qs.map(function (x) {
        return '<div class="xrow xbd"><div class="xpp1">' + pic(x.w) + '</div><div class="xsl">' + x.letters.map(function () { return "<i></i>"; }).join("") + '</div><div class="xtl">' + x.tiles.map(function (t) { return "<b>" + esc(t) + "</b>"; }).join("") + "</div></div>";
      }).join("");
    } else if (k === "order") {
      h = '<div class="xord">' + q.items.map(function (it) { return '<div class="xoi"><div class="xpp1">' + pic(it.w) + '</div><div class="xtx2">' + esc(it.t) + '</div><i class="xnb"></i></div>'; }).join("") + "</div>";
    } else {
      h = r.qs.map(function (x) { return '<div class="xrow">' + prompt(x) + '<div class="xops' + (x.opts[0].t ? " t" : "") + '">' + x.opts.map(function (o) { return '<div class="xop">' + opHtml(o) + "</div>"; }).join("") + "</div></div>"; }).join("");
    }
    return '<section class="xrd k-' + k + '"><span class="xno">' + (d.rounds.indexOf(r) + 1) + "</span>" + h + "</section>";
  }
  function sheetHtml(unit, v) {
    var d = gen(unit, v), a = AGES.filter(function (x) { return x.age === d.age; })[0];
    return '<div class="xs"><header class="xh"><span class="xi">' + d.icon + "</span><b>" + esc((d.review ? "" : unit + " ") + d.title) + '</b><span class="xage">' + d.age + ' 歲</span><span class="xv">第 ' + (v + 1) + ' 版</span></header>' +
      '<div class="xtip">💡 ' + esc(d.tip) + "</div>" + d.rounds.map(function (r) { return paperRound(r, d); }).join("") +
      '<footer class="xf">☆ ☆ ☆ ☆ ☆<small>My Family English</small></footer></div>';
  }
  function verBar(unit, v, cur) {
    return (ACT[unit].teach ? '<button class="btn small ' + (v === -1 ? "" : "white") + '" data-go="' + cur + "/" + unit + '/t">📖 教學</button>' : "") + [0, 1, 2].map(function (x) { return '<button class="btn small ' + (x === v ? "" : "white") + '" data-go="' + cur + "/" + unit + "/" + (x + 1) + '">第 ' + (x + 1) + " 版</button>"; }).join("");
  }
  function viewSheet(unit, vv) {
    if (!ACT[unit]) return "<p>找不到這個單元的學習單。</p>";
    if (vv === "t") return '<div class="sheet-bar noprint"><button class="btn small white" data-go="' + backTo(unit) + '">← 回單元</button>' + verBar(unit, -1, "sheet") + '<button class="btn small blue" onclick="window.print()">🖨 列印</button><button class="btn small orange" data-go="act/' + esc(unit) + '/t">▶ 互動教學</button></div><div class="xs-wrap">' + KIND.teach.sheet(unit) + "</div>";
    if (vv === "a") return '<div class="sheet-bar noprint"><button class="btn small white" data-go="' + backTo(unit) + '">← 回單元</button>' + verBar(unit, -2, "sheet") + '<button class="btn small blue" onclick="window.print()">🖨 列印這三版</button></div><div class="xs-wrap">' + [0, 1, 2].map(function (x) { return sheetHtml(unit, x); }).join("") + "</div>";
    var v = Math.max(0, Math.min(2, (+vv || 1) - 1));
    return '<div class="sheet-bar noprint"><button class="btn small white" data-go="' + backTo(unit) + '">← 回單元</button>' + verBar(unit, v, "sheet") +
      '<button class="btn small white" data-go="sheet/' + esc(unit) + '/a">三版一起</button><button class="btn small blue" onclick="window.print()">🖨 列印</button><button class="btn small orange" data-go="act/' + esc(unit) + "/" + (v + 1) + '">▶ 互動版</button></div><div class="xs-wrap">' + sheetHtml(unit, v) + "</div>";
  }

  /* ---------- 單元頁的入口 ---------- */
  window.MFE_UNIT_ACTS = function (unit) {
    if (!ACT[unit]) return "";
    var rv = ACT[unit].review;
    var h = '<div class="card"><h2>' + (rv ? "🔁 " + esc(ACT[unit].title) + "（混合前面學過的單元）" : "🧩 學習單與互動版") + '</h2><p class="muted">' + (rv ? "把學過的題目混在一起練。" : "三版內容相似、順序不同；想多練就用隨機練習。") + ' 互動版可以直接給孩子玩，也可以你拿著當教學圖卡。</p><div class="xlist">';
    [1, 2, 3].forEach(function (n) {
      h += '<div class="xl"><b>第 ' + n + ' 版</b><button class="btn small orange" data-go="act/' + unit + "/" + n + '">▶ 互動</button><button class="btn small white" data-go="sheet/' + unit + "/" + n + '">🖨 列印</button></div>';
    });
    if (ACT[unit].teach) h = h.replace('<div class="xlist">', '<div class="xlist"><div class="xl"><b>📖 先教</b><button class="btn small orange" data-go="act/' + unit + '/t">▶ 互動教學</button><button class="btn small white" data-go="sheet/' + unit + '/t">🖨 教學頁</button></div>');
    h += '<div class="xl"><b>♾ 不限次數</b><button class="btn small green" data-go="act/' + unit + '/r">隨機練習（每次新題）</button></div>';
    return h + "</div></div>";
  };

  /* ---------- 互動版 ---------- */
  var D = null, flat = [], tm = null;
  var PAL = ["#E53935", "#FFB300", "#43A047", "#1E88E5", "#8E24AA", "#F48FB1", "#795548", "#FFFFFF"];
  function say(au) {
    if (!au) return;
    if (au.sound && window.MFE_SOUND) { window.MFE_SOUND.play(au.sound).then(function (ok) { if (!ok) A.speak(au.w[1]); }); return; }
    if (au.say) A.speak(au.say);
  }
  function cur() { return flat[D.i]; }
  function later(f, ms) { clearTimeout(tm); tm = setTimeout(f, ms); }
  function start(unit, vv) {
    var teach = vv === "t", rnd = vv === "r", v = teach ? "t" : rnd ? 3 + Math.floor(Math.random() * 1000000) : Math.max(0, Math.min(2, (+vv || 1) - 1)), d = gen(unit, v, rnd), host = document.getElementById("xd");
    if (!d || !host) return;
    flat = []; d.rounds.forEach(function (r) { r.qs.forEach(function (q) { flat.push({ k: r.k, q: q, n: r.qs.length }); }); });
    D = { d: d, v: v, i: 0, tip: false, st: {}, lock: false, rnd: rnd, teach: teach };
    draw(true);
  }
  function opBtn(o, i, extra) { return '<button class="xo' + (extra || "") + '" data-x="axpick" data-i="' + i + '">' + opHtml(o) + "</button>"; }
  function drawBody(f) {
    var q = f.q, k = f.k, h = "", i;
    D.st = {};
    if (KIND[k] && KIND[k].draw) return KIND[k].draw(f);
    if (k === "dots") {
      D.st.n = 0;
      h = '<button class="xbigd" data-x="axsay">' + pic(q.w) + '</button><div class="xdots2">' + [0, 1, 2, 3].map(function (j) { return '<button class="xdc" data-x="axdot" data-i="' + j + '" aria-label="點一下"></button>'; }).join("") + "</div>";
    } else if (k === "paint") {
      D.st.col = PAL[0];
      h = '<div class="xcv outline" data-x="axpaint">' + pic(q.w) + '</div><div class="xpal">' + PAL.map(function (c, j) { return '<button class="xsw' + (j ? "" : " on") + '" style="background:' + c + '" data-x="axcol" data-c="' + c + '" aria-label="顏色"></button>'; }).join("") + '</div><button class="xgo" data-x="axnext">✔</button>';
    } else if (k === "match" || k === "lmatch" || k === "rmatch" || k === "capmatch") {
      D.st = { sel: -1, done: {}, got: 0 };
      h = '<div class="xmd"><div class="xcol">' + q.left.map(function (o, j) { return '<button class="xo l" data-x="axml" data-i="' + j + '">' + (o.t ? '<b class="xlt">' + esc(o.t) + "</b>" : pic(o.w)) + "</button>"; }).join("") + '</div><div class="xcol">' + q.right.map(function (o, j) { return '<button class="xo r' + (o.shadow ? " sh" : "") + '" data-x="axmr" data-i="' + j + '">' + (o.t ? '<b class="xlt">' + esc(o.t) + "</b>" : pic(o.w)) + "</button>"; }).join("") + "</div></div>";
    } else if (k === "count") {
      D.st.c = 0;
      var os = ""; for (i = 0; i < q.n; i++) os += '<button class="xob" data-x="axcnt" data-i="' + i + '">' + pic(q.w) + "</button>";
      h = '<div class="xobjs2">' + os + '</div><div class="xnum" id="xnum">&nbsp;</div><div class="xopsd c3 num">' + q.opts.map(function (o, j) { return opBtn(o, j, " num"); }).join("") + "</div>";
    } else if (k === "trace") {
      h = '<div class="xtrw"><div class="xtrbg">' + dashLetter(q.letter) + '</div><canvas id="xcv" class="xtrc"></canvas></div><button class="xsmall" data-x="axsay">' + pic(q.w) + '</button><button class="xgo" data-x="axnext">✔</button>';
    } else if (k === "build") {
      D.st.p = 0;
      h = '<div class="xpp1 d">' + pic(q.w) + '</div><div class="xslots">' + q.letters.map(function (c, j) { return '<span class="xs1" id="xs' + j + '"></span>'; }).join("") + '</div><div class="xtiles">' + q.tiles.map(function (c, j) { return '<button class="xtile" data-x="axtile" data-j="' + j + '" data-c="' + esc(c) + '">' + esc(c) + "</button>"; }).join("") + "</div>";
    } else if (k === "order") {
      D.st.p = 0;
      h = '<div class="xordd">' + q.items.map(function (it, j) { return '<button class="xo ord" data-x="axord" data-j="' + j + '"><span class="pw">' + pic(it.w) + '</span><span class="xtx2">' + esc(it.t) + '</span><i class="xnb"></i></button>'; }).join("") + "</div>";
    } else {
      var pr = q.pr || {}, ph = "";
      if (pr.seq) ph = '<button class="xtx3 q seq" data-x="axsay">' + esc(pr.seq) + "</button>";
      else if (pr.big) ph = '<button class="xbigl" data-x="axsay">' + esc(pr.big) + "</button>";
      else if (pr.txt && pr.w) ph = '<div class="xpp1 d">' + pic(pr.w) + '</div><div class="xtx3">' + esc(pr.txt) + "</div>";
      else if (pr.txt) ph = '<button class="xtx3 q" data-x="axsay">🔊 ' + esc(pr.txt) + "</button>";
      else if (pr.w) ph = '<button class="xbigd s" data-x="axsay">' + pic(pr.w) + "</button>";
      else ph = '<button class="xsp" data-x="axsay">🔊</button>';
      h = '<div class="xprd">' + ph + '</div><div class="xopsd' + (q.opts[0].t && !q.opts[0].w ? " t" : "") + " c" + q.opts.length + '">' + q.opts.map(function (o, j) { return opBtn(o, j); }).join("") + "</div>";
    }
    return h;
  }
  function initTrace() {
    var cv = document.getElementById("xcv"); if (!cv) return;
    var rc = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    cv.width = rc.width * dpr; cv.height = rc.height * dpr;
    var c = cv.getContext("2d"); c.scale(dpr, dpr); c.lineWidth = 16; c.lineCap = "round"; c.lineJoin = "round"; c.strokeStyle = "#1E88E5";
    var on = false, lx = 0, ly = 0;
    function pt(e) { var b = cv.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; }
    cv.onpointerdown = function (e) { on = true; var p = pt(e); lx = p[0]; ly = p[1]; c.beginPath(); c.arc(lx, ly, 8, 0, 6.3); c.fillStyle = "#1E88E5"; c.fill(); try { cv.setPointerCapture(e.pointerId); } catch (x) {} e.preventDefault(); };
    cv.onpointermove = function (e) { if (!on) return; var p = pt(e); c.beginPath(); c.moveTo(lx, ly); c.lineTo(p[0], p[1]); c.stroke(); lx = p[0]; ly = p[1]; e.preventDefault(); };
    cv.onpointerup = cv.onpointercancel = function () { on = false; };
  }
  function draw(first) {
    var host = document.getElementById("xd"); if (!host) return;
    D.lock = false; clearTimeout(tm);
    if (D.i >= flat.length) return finish(host);
    var f = cur(), dots = flat.map(function (x, j) { return '<i class="' + (j < D.i ? "d" : j === D.i ? "c" : "") + '"></i>'; }).join("");
    host.innerHTML = '<div class="xd-top"><button class="xb" data-x="axback" aria-label="回單元">←</button><div class="xd-dots">' + dots + '</div><button class="xb" data-x="axtip" aria-label="家長提示">💡</button></div>' +
      (D.tip ? '<div class="xd-tip">' + esc(D.d.tip) + "</div>" : "") + '<div class="xd-body k-' + f.k + '">' + drawBody(f) + "</div>";
    if (f.k === "trace") initTrace();
    if (KIND[f.k] && KIND[f.k].init) KIND[f.k].init(f);
    if (KIND[f.k] && KIND[f.k].noauto) { if (KIND[f.k].auto) later(function () { KIND[f.k].auto(f); }, 450); }
    else if (f.q.au && (f.q.au.say || f.q.au.sound) && f.k !== "dots" && f.k !== "match" && f.k !== "lmatch" && f.k !== "rmatch" && f.k !== "capmatch" && f.k !== "build" && f.k !== "paint" && f.k !== "count") later(function () { say(f.q.au); }, first ? 200 : 450);
    if (f.k === "count") later(function () { say(f.q.au); }, 450);
    if (f.k === "paint" || f.k === "dots" || f.k === "build") later(function () { say(f.q.au); }, 450);
  }
  function next(ms) { D.lock = true; later(function () { D.i++; draw(); }, ms || 1000); }
  function finish(host) {
    var c = A.kid(); c.plays.push({ unit: D.d.unit, act: "act", ts: Date.now() }); c.resist = []; A.save(); A.burst();
    host.innerHTML = '<div class="xd-end"><div class="xcheer">🎉</div><div class="xstars">⭐⭐⭐</div><div class="xend-t">Good job!</div><div class="xd-btns"><button class="xbtn" data-x="axagain">🔁</button><button class="xbtn" data-x="axnextv">▶</button><button class="xbtn" data-x="axback">🏠</button></div></div>';
    A.speak("Good job!");
  }
  function ok(el, au, ms) { el.classList.add("ok"); say(au); next(ms); }
  function bad(el) { el.classList.add("no"); setTimeout(function () { el.classList.remove("no"); }, 500); }

  function backTo(u) { return LES[u] ? "unit/" + u : "units"; }
  X.axback = function () { clearTimeout(tm); A.go(backTo(D.d.unit)); };
  X.axtip = function () { D.tip = !D.tip; var t = document.querySelector(".xd-tip"); if (t) t.remove(); else { var b = document.querySelector(".xd-top"); b.insertAdjacentHTML("afterend", '<div class="xd-tip">' + esc(D.d.tip) + "</div>"); } };
  X.axagain = function () { A.go("act/" + D.d.unit + "/r"); };
  X.axnextv = function () { var n = (D.rnd || D.teach) ? 0 : (D.v + 1) % 3; A.go("act/" + D.d.unit + "/" + (n + 1)); };
  X.axsay = function () { say(cur().q.au); };
  X.axnext = function () { if (D.lock) return; next(150); };
  X.axpick = function (el) {
    if (D.lock) return; var f = cur(), q = f.q, i = +el.dataset.i;
    if (i === q.ok) {
      document.querySelectorAll(".xo").forEach(function (b) { if (b !== el) b.classList.add("dim"); });
      var o = q.opts[i];
      ok(el, q.ans ? { say: o.t } : f.k === "count" ? { say: q.fin } : q.fin ? { say: q.fin } : o.w ? { say: o.w[1] } : { say: o.t }, 1300);
    } else { bad(el); setTimeout(function () { say(q.au); }, 350); }
  };
  X.axdot = function (el) {
    if (D.lock || el.classList.contains("on")) return; var q = cur().q;
    el.classList.add("on"); el.innerHTML = pic(q.w); say(q.au); D.st.n++;
    if (D.st.n >= q.n) next(1100);
  };
  X.axcol = function (el) { D.st.col = el.dataset.c; document.querySelectorAll(".xsw").forEach(function (b) { b.classList.toggle("on", b === el); }); };
  function shade(hex) { var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; function m(x) { return Math.round(x + (255 - x) * 0.35); } return "rgb(" + m(r) + "," + m(g) + "," + m(b) + ")"; }
  X.axpaint = function (el, e) {
    var t = e.target, c = D.st.col; if (!t || !t.closest) return;
    var g = t.closest("g[clip-path]");
    if (g) {
      var rc = g.querySelector("rect"), pp = g.querySelector("path"); if (rc) rc.style.setProperty("fill", c, "important"); if (pp) pp.style.setProperty("fill", shade(c), "important"); say(cur().q.au); return;
    }
    var f = t.getAttribute && t.getAttribute("fill");
    if (f && f !== "none" && f !== "#3E4A59") t.style.setProperty("fill", c, "important");
  };
  X.axml = function (el) {
    if (D.lock || D.st.done["l" + el.dataset.i]) return; var q = cur().q, i = +el.dataset.i;
    D.st.sel = i; document.querySelectorAll(".xo.l").forEach(function (b) { b.classList.toggle("sel", b === el); }); say(q.left[i].au);
  };
  X.axmr = function (el) {
    if (D.lock || D.st.sel < 0 || D.st.done["r" + el.dataset.i]) return; var q = cur().q, j = +el.dataset.i, i = D.st.sel;
    if (q.map[i] === j) {
      var lb = document.querySelector('.xo.l[data-i="' + i + '"]'), col = D.st.got++;
      [lb, el].forEach(function (b) { b.classList.remove("sel"); b.classList.add("ok", "c" + col); b.classList.remove("sh"); });
      D.st.done["l" + i] = D.st.done["r" + j] = 1; D.st.sel = -1; say(q.right[j].au);
      if (D.st.got >= q.left.length) next(1200);
    } else { bad(el); }
  };
  X.axcnt = function (el) {
    if (D.lock || el.classList.contains("on")) return; var q = cur().q; el.classList.add("on"); D.st.c++;
    var nm = document.getElementById("xnum"); nm.textContent = D.st.c; A.speak(NUMW[D.st.c]);
  };
  X.axtile = function (el) {
    if (D.lock || el.classList.contains("used")) return; var q = cur().q, p = D.st.p;
    if (el.dataset.c === q.letters[p]) {
      el.classList.add("used"); var s = document.getElementById("xs" + p); s.textContent = el.dataset.c; s.classList.add("on"); D.st.p++;
      if (D.st.p >= q.letters.length) { say(q.au); next(1300); }
    } else bad(el);
  };
  X.axord = function (el) {
    if (D.lock || el.classList.contains("ok")) return; var q = cur().q, j = +el.dataset.j, it = q.items[j];
    if (it.n === D.st.p) { el.classList.add("ok"); el.querySelector(".xnb").textContent = it.n + 1; D.st.p++; A.speak(it.t); if (D.st.p >= q.items.length) next(1600); } else bad(el);
  };

  /* ---------- 路由 ---------- */
  window.MFE_ROUTES = window.MFE_ROUTES || {};
  window.MFE_AFTER = window.MFE_AFTER || {};
  window.MFE_ROUTES.sheet = function (p) { return viewSheet(p[1], p[2]); };
  window.MFE_ROUTES.act = function (p) {
    if (!ACT[p[1]]) return "<p>找不到這個單元。</p>";
    return '<div class="xd" id="xd"></div>';
  };
  window.MFE_AFTER.act = function (p) { start(p[1], p[2]); };
  window.MFE_GEN = gen;
  window.MFE_ACTKIND = KIND;
  window.MFE_ACTH = { rng: rng, hash: hash, shuf: shuf, rot: rot, derange: derange, words: words, fmt: fmt, pic: pic, esc: esc, say: say, later: later, next: next, bad: bad, cur: cur, D: function () { return D; }, dashLetter: dashLetter, opHtml: opHtml, A: A, W: W, ACT: ACT, LES: LES, X: X, NUMW: NUMW, gen: gen };
  window.MFE_ACTCUR = function () { return D && flat[D.i] ? flat[D.i] : null; };
})();
