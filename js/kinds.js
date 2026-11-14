/* 多元活動題型（接在 activities.js 後面）：賓果、尋寶找一樣、換字頭、轉盤、開頭聲音分類、泡泡字塗色、補字母順序、
   連點成圖、字母迷宮、照字母塗色、大小寫配對，以及「直接教學」頁。
   每個題型有三個部分：gen（出題）、paper（紙本）、draw（互動版）；紙本與互動版用同一份題目。 */
(function () {
  "use strict";
  var H = window.MFE_ACTH, KIND = window.MFE_ACTKIND;
  if (!H || !KIND) return;
  var shuf = H.shuf, rot = H.rot, derange = H.derange, words = H.words, pic = H.pic, esc = H.esc, say = H.say, later = H.later, next = H.next, bad = H.bad;
  var A = H.A, W = H.W, ACT = H.ACT, LES = H.LES, X = H.X;
  var PAL = ["#E53935", "#FFB300", "#43A047", "#1E88E5", "#8E24AA", "#F48FB1", "#795548", "#FFFFFF"];
  var ALLLET = ["s", "a", "t", "i", "p", "n", "m", "d", "c", "e", "h", "r", "b", "f", "l", "o", "u", "g"];
  var SPC = ["#FFCDD2", "#FFF9C4", "#C8E6C9", "#BBDEFB", "#E1BEE7", "#FFE0B2", "#B2EBF2", "#F8BBD0"];
  var PICIDX = null;

  /* ---------- 小工具 ---------- */
  function others(pool, not, n, r) { return shuf(pool.filter(function (x) { return not.indexOf(x) < 0; }), r).slice(0, n); }
  function mod(a, n) { return ((a % n) + n) % n; }
  function exOf(l) { for (var u in ACT) { var x = ACT[u].lex; if (x && x[l]) return W[x[l][0]]; } return null; }
  function picOfText(t) {
    if (!PICIDX) { PICIDX = {}; Object.keys(W).forEach(function (k) { var e = W[k][1].toLowerCase(); if (!PICIDX[e] && /^svg:/.test(W[k][3])) PICIDX[e] = W[k]; }); }
    return PICIDX[t] || null;
  }
  function sndLab(l) { return "/" + (l === "c" ? "k" : l) + "/"; }
  function dom(s, r) {
    if (s.lex) { var lts = Object.keys(s.lex); return { k: "let", lts: lts, pool: lts.concat(shuf(ALLLET.filter(function (x) { return lts.indexOf(x) < 0; }), r).slice(0, 8)) }; }
    if (s.sight) return { k: "txt", pool: s.sight };
    if (s.words && !s.bank) return { k: "txt", pool: words(s.words).map(function (w) { return w[1]; }) };
    return { k: "pic", pool: words(s.bank) };
  }
  function mkCell(dm, x, r, up) {
    if (dm.k === "let") return { t: (up === undefined ? r() < 0.5 : up) ? x.toUpperCase() : x, key: x };
    if (dm.k === "txt") return { t: x, key: x };
    return { w: x, key: x[0] };
  }
  function tdisp(dm, x) { return dm.k === "pic" ? { w: x } : dm.k === "let" ? { big: x } : { t: x }; }
  function auOf(dm, x) { return dm.k === "let" ? { sound: x, w: exOf(x) } : dm.k === "txt" ? { say: x } : { say: x[1] }; }
  function keyOf(dm, x) { return dm.k === "pic" ? x[0] : x; }
  function cellAu(dm, c) { return dm.k === "let" ? { sound: c.key, w: exOf(c.key) } : c.t ? { say: c.t } : { say: c.w[1] }; }
  function cellLab(dm, c) { return dm.k === "let" ? sndLab(c.key) : c.t ? c.t : c.w[1]; }
  function cellHtml(c) { return c.w ? pic(c.w) : '<b class="xct">' + esc(c.t) + "</b>"; }
  function tdHtml(p) { return p.w ? pic(p.w) : p.big ? '<b class="xbig2">' + esc(p.big.toUpperCase() + p.big) + "</b>" : '<b class="xtx2">' + esc(p.t) + "</b>"; }
  function pickTarget(dm, ctx) {
    if (dm.k === "let") return rot(dm.lts, ctx.v + ctx.ri)[0];
    if (dm.k === "txt") return dm.pool[mod(ctx.v + ctx.ri, dm.pool.length)];
    return ctx.tgt();
  }
  function bubbleLetter(l) { return '<svg viewBox="0 0 100 64" aria-hidden="true"><text x="50" y="52" text-anchor="middle" font-family="GenSenRounded,sans-serif" font-weight="900" font-size="62" fill="#fff" stroke="#2f3b42" stroke-width="2.6" stroke-linejoin="round">' + esc(l.toUpperCase() + l) + "</text></svg>"; }
  function hi(w) { return '<u class="hi">' + esc(w.charAt(0)) + "</u>" + esc(w.slice(1)); }
  function tiles3(w) { return w.split("").map(function (c, j, a) { return '<b class="t' + (j === 0 ? "o" : j === a.length - 1 ? "f" : "v") + '">' + esc(c) + "</b>"; }).join(""); }
  function famRows(fm, v) { return rot(fm[1], v || 0).slice(0, 6).map(function (o) { return { on: o, w: o + fm[0], pic: picOfText(o + fm[0]) }; }); }

  var SHAPES = (function () {
    var star = [], heart = [], i;
    for (i = 0; i < 10; i++) { var a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? 18 : 44; star.push([50 + rr * Math.cos(a), 54 + rr * Math.sin(a)]); }
    for (i = 0; i < 12; i++) { var t = i * 2 * Math.PI / 12; heart.push([50 + 16 * Math.pow(Math.sin(t), 3) * 2.6, 46 - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 2.6]); }
    return [{ n: "star", pts: star }, { n: "house", pts: [[20, 90], [20, 52], [8, 52], [50, 12], [92, 52], [80, 52], [80, 90], [58, 90], [58, 66], [42, 66], [42, 90]] },
      { n: "heart", pts: heart }, { n: "fish", pts: [[8, 50], [26, 30], [50, 24], [70, 34], [82, 46], [96, 30], [96, 70], [82, 54], [70, 66], [50, 76], [26, 70]] }];
  })();
  // 5、6 歲連點成圖用 26 個點（a 到 z）：把外框依邊長平均分配點數，尖角會保留
  function resample(poly, N) {
    var m = poly.length, lens = [], per = 0, i;
    for (i = 0; i < m; i++) { var p0 = poly[i], p1 = poly[(i + 1) % m]; lens.push(Math.hypot(p1[0] - p0[0], p1[1] - p0[1])); per += lens[i]; }
    var cnt = lens.map(function (l) { return Math.max(1, Math.round(N * l / per)); }), sum = cnt.reduce(function (x, y) { return x + y; }, 0), g = 0;
    while (sum !== N && g++ < 300) {
      var k = 0;
      for (i = 1; i < m; i++) { if (sum < N ? lens[i] / cnt[i] > lens[k] / cnt[k] : (cnt[i] > 1 && (cnt[k] <= 1 || lens[i] / cnt[i] < lens[k] / cnt[k]))) k = i; }
      if (sum < N) { cnt[k]++; sum++; } else if (cnt[k] > 1) { cnt[k]--; sum--; } else break;
    }
    var out = [];
    for (i = 0; i < m; i++) { var a0 = poly[i], b0 = poly[(i + 1) % m]; for (var j = 0; j < cnt[i]; j++) out.push([a0[0] + (b0[0] - a0[0]) * j / cnt[i], a0[1] + (b0[1] - a0[1]) * j / cnt[i]]); }
    return out;
  }
  var SHAPES26 = SHAPES.map(function (sh) {
    if (sh.n !== "heart") return { n: sh.n, pts: resample(sh.pts, 26) };
    var fine = [], t, i, cum = [0], tot = 0, hp = [], j = 0;
    for (i = 0; i <= 240; i++) { t = i * 2 * Math.PI / 240; fine.push([50 + 16 * Math.pow(Math.sin(t), 3) * 2.6, 46 - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 2.6]); }
    for (i = 1; i < fine.length; i++) { tot += Math.hypot(fine[i][0] - fine[i - 1][0], fine[i][1] - fine[i - 1][1]); cum.push(tot); }
    for (i = 0; i < 26; i++) { var d = tot * i / 26; while (j < cum.length - 2 && cum[j + 1] < d) j++; var f = (d - cum[j]) / ((cum[j + 1] - cum[j]) || 1); hp.push([fine[j][0] + (fine[j + 1][0] - fine[j][0]) * f, fine[j][1] + (fine[j + 1][1] - fine[j][1]) * f]); }
    return { n: "heart", pts: hp };
  });
  var PIX = [
    { n: "heart", rows: ["01100110", "12111111", "11111111", "01111110", "00111100", "00011000"], cols: ["#E53935", "#F8BBD0"] },
    { n: "house", rows: ["00011000", "00111100", "01111110", "11111111", "02222220", "02232220", "02232220"], cols: ["#E53935", "#FFD54F", "#8D6E63"] },
    { n: "tree", rows: ["00011000", "00111100", "01131110", "11111311", "01111110", "00011000", "00022000", "00022000"], cols: ["#43A047", "#8D6E63", "#E53935"] }];

  function mkPath(cols, rows, r) {
    function nb(c, rr, seen) { var n = 0; [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) { if (seen[(c + d[0]) + "," + (rr + d[1])]) n++; }); return n; }
    for (var tr = 0; tr < 80; tr++) {
      var seen = {}, path = [], sr = Math.floor(r() * rows);
      var go = function (c, rr) {
        seen[c + "," + rr] = 1; path.push([c, rr]);
        if (c === cols - 1 && path.length >= cols + 1) return true;
        var ns = shuf([[1, 0], [0, 1], [0, -1], [-1, 0]], r);
        for (var k = 0; k < ns.length; k++) {
          var nc = c + ns[k][0], nr = rr + ns[k][1];
          if (nc < 0 || nr < 0 || nc >= cols || nr >= rows || seen[nc + "," + nr] || nb(nc, nr, seen) > 1) continue;
          if (go(nc, nr)) return true;
        }
        path.pop(); delete seen[c + "," + rr]; return false;
      };
      if (go(0, sr)) return path;
    }
    var p = []; for (var c2 = 0; c2 < cols; c2++) p.push([c2, 0]); return p;
  }
  function spinSvg(q) {
    var n = q.sectors.length, R = 48, h = '<svg viewBox="-50 -50 100 100" aria-hidden="true">', i;
    for (i = 0; i < n; i++) {
      var a0 = -Math.PI / 2 + i * 2 * Math.PI / n, a1 = -Math.PI / 2 + (i + 1) * 2 * Math.PI / n, am = (a0 + a1) / 2, tx = (31 * Math.cos(am)).toFixed(2), ty = (31 * Math.sin(am)).toFixed(2);
      h += '<path d="M0 0L' + (R * Math.cos(a0)).toFixed(2) + " " + (R * Math.sin(a0)).toFixed(2) + "A" + R + " " + R + " 0 0 1 " + (R * Math.cos(a1)).toFixed(2) + " " + (R * Math.sin(a1)).toFixed(2) + 'Z" fill="' + SPC[i % SPC.length] + '" stroke="#3E4A59" stroke-width="1.2"/>';
      h += '<text x="' + tx + '" y="' + ty + '" text-anchor="middle" dominant-baseline="central" font-family="GenSenRounded,sans-serif" font-weight="900" font-size="' + (n > 6 ? 11 : 13) + '" fill="#2f3b42" transform="rotate(' + (am * 180 / Math.PI + 90).toFixed(1) + " " + tx + " " + ty + ')">' + esc(q.sectors[i].t) + "</text>";
    }
    h += '<circle r="' + (q.mode === "wheel" ? 15 : 6) + '" fill="#fff" stroke="#3E4A59" stroke-width="1.4"/>';
    if (q.mode === "wheel") h += '<text text-anchor="middle" dominant-baseline="central" font-family="GenSenRounded,sans-serif" font-weight="900" font-size="12" fill="#1E88E5">' + esc(q.rime) + "</text>";
    return h + "</svg>";
  }
  function ddSvg(q, dig) {
    var pts = q.pts, cx = 0, cy = 0, h = '<svg viewBox="0 0 100 100" class="xdd" aria-hidden="true">', i;
    pts.forEach(function (p) { cx += p[0]; cy += p[1]; }); cx /= pts.length; cy /= pts.length;
    if (dig) h += '<polygon id="xfill" points="' + pts.map(function (p) { return p[0].toFixed(1) + "," + p[1].toFixed(1); }).join(" ") + '" fill="none"/><g id="xdl"></g>';
    for (i = 0; i < pts.length; i++) {
      var p = pts[i], dx = p[0] - cx, dy = p[1] - cy, d = Math.sqrt(dx * dx + dy * dy) || 1, lx = p[0] + dx / d * 7, ly = p[1] + dy / d * 7;
      h += '<g class="xdp' + (i === 0 ? " st" : "") + '"' + (dig ? ' data-x="axdd" data-i="' + i + '"' : "") + '><circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + (pts.length > 14 ? (dig ? 3.8 : 2.8) : (dig ? 5 : 3.4)) + '" class="xdpc"/><text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="middle" dominant-baseline="central" font-family="GenSenRounded,sans-serif" font-weight="900" font-size="' + (dig ? 7 : 7.5) + '">' + esc(q.labels[i]) + "</text></g>";
    }
    return h + "</svg>";
  }
  function initCanvas(f) {
    var cv = document.getElementById("xcv"); if (!cv) return;
    var rc = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1, D0 = H.D();
    cv.width = rc.width * dpr; cv.height = rc.height * dpr;
    var c = cv.getContext("2d"); c.scale(dpr, dpr); c.lineWidth = 30; c.lineCap = "round"; c.lineJoin = "round";
    var on = false, lx = 0, ly = 0;
    function pt(e) { var b = cv.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; }
    cv.onpointerdown = function (e) { on = true; var p = pt(e), col = H.D().st.col || "#1E88E5"; lx = p[0]; ly = p[1]; c.strokeStyle = col; c.fillStyle = col; c.beginPath(); c.arc(lx, ly, 15, 0, 6.3); c.fill(); try { cv.setPointerCapture(e.pointerId); } catch (x) {} e.preventDefault(); };
    cv.onpointermove = function (e) { if (!on) return; var p = pt(e); c.beginPath(); c.moveTo(lx, ly); c.lineTo(p[0], p[1]); c.stroke(); lx = p[0]; ly = p[1]; e.preventDefault(); };
    cv.onpointerup = cv.onpointercancel = function () { on = false; };
  }

  /* ---------- 大小寫配對（沿用連連看畫面） ---------- */
  KIND.capmatch = { gen: function (c) {
    var lt = Object.keys(c.s.lex), L = shuf(lt.concat(shuf(ALLLET.filter(function (x) { return lt.indexOf(x) < 0; }), c.r).slice(0, 1)), c.r), R = derange(L, c.r);
    return [{ left: L.map(function (l) { return { t: l.toUpperCase(), au: { sound: l, w: exOf(l) } }; }), right: R.map(function (l) { return { t: l, au: { sound: l, w: exOf(l) } }; }), map: L.map(function (l) { return R.indexOf(l); }) }];
  } };

  /* ---------- 補字母順序 ---------- */
  KIND.abc = { gen: function (c) {
    var AL = "abcdefghijklmnopqrstuvwxyz".split(""), qs = [], i;
    for (i = 0; i < 3; i++) {
      var st = Math.floor(c.r() * 20), seq = AL.slice(st, st + 5), bi = 1 + Math.floor(c.r() * 3), good = seq[bi], o = shuf([good].concat(others(AL, [good], 2, c.r)), c.r);
      var spoken = seq.filter(function (x, j) { return j !== bi; }).join(", ");
      seq = seq.map(function (x, j) { return j === bi ? "_" : x; }).join(" ");
      qs.push({ pr: { seq: seq }, opts: o.map(function (x) { return { t: x }; }), ok: o.indexOf(good), au: { say: spoken } });
    }
    return qs;
  } };

  /* ---------- 尋寶找一樣 / 字母迷宮 ---------- */
  function huntGen(c, maze) {
    var s = c.s, r = c.r, dm = dom(s, r), tk = pickTarget(dm, c), j, pl = dm.pool.filter(function (x) { return x !== tk; });
    function filler() { return mkCell(dm, pl[Math.floor(r() * pl.length)], r); }
    if (!maze) {
      var tot = dm.k === "let" ? 20 : c.age <= 2 ? 8 : 12, nT = dm.k === "let" ? 6 : c.age <= 2 ? 3 : 4, cells = [];
      for (j = 0; j < nT; j++) cells.push(mkCell(dm, tk, r, j % 2));
      for (; j < tot; j++) cells.push(filler());
      return [{ cells: shuf(cells, r), key: keyOf(dm, tk), nT: nT, cols: dm.k === "let" ? 5 : 4, pr: tdisp(dm, tk), au: auOf(dm, tk) }];
    }
    var mc = dm.k === "pic" ? 4 : 5, mr = dm.k === "pic" ? 3 : 4, mp = mkPath(mc, mr, r), onP = {}, mcells = [];
    mp.forEach(function (p) { onP[p[1] * mc + p[0]] = 1; });
    for (j = 0; j < mc * mr; j++) mcells.push(onP[j] ? mkCell(dm, tk, r) : filler());
    return [{ cols: mc, rows: mr, cells: mcells, path: mp.map(function (p) { return p[1] * mc + p[0]; }), key: keyOf(dm, tk), pr: tdisp(dm, tk), au: auOf(dm, tk) }];
  }
  KIND.hunt = {
    gen: function (c) { return huntGen(c, false); },
    paper: function (r) { var q = r.qs[0]; return '<div class="xhunt"><div class="xhl">' + tdHtml(q.pr) + '</div><div class="xhg" style="--c:' + q.cols + '">' + q.cells.map(function (x) { return '<div class="xhc">' + cellHtml(x) + "</div>"; }).join("") + "</div></div>"; },
    draw: function (f) {
      var q = f.q; H.D().st = { n: 0 };
      return '<button class="xhd0" data-x="axsay">' + tdHtml(q.pr) + '<span class="xsp2">🔊</span></button><div class="xhd" style="--c:' + q.cols + '">' + q.cells.map(function (x, j) { return '<button class="xhb" data-x="axhunt" data-i="' + j + '">' + cellHtml(x) + "</button>"; }).join("") + "</div>";
    }
  };
  X.axhunt = function (el) {
    var D = H.D(); if (D.lock || el.classList.contains("ok")) return; var q = H.cur().q, c = q.cells[+el.dataset.i];
    if (c.key === q.key) { el.classList.add("ok"); D.st.n++; say(q.au); if (D.st.n >= q.nT) next(1100); } else bad(el);
  };
  KIND.maze = {
    gen: function (c) { return huntGen(c, true); },
    paper: function (r) {
      var q = r.qs[0], sr = Math.floor(q.path[0] / q.cols), er = Math.floor(q.path[q.path.length - 1] / q.cols);
      return '<div class="xmzw"><div class="xhl">' + tdHtml(q.pr) + '</div><div class="xmz" style="--c:' + q.cols + ";--r:" + q.rows + '">' + q.cells.map(function (x, ix) { var rr = Math.floor(ix / q.cols), cc = ix % q.cols; return '<div class="xmc2' + (cc === 0 && rr === sr ? " st" : "") + (cc === q.cols - 1 && rr === er ? " en" : "") + '">' + cellHtml(x) + "</div>"; }).join("") + "</div></div>";
    },
    draw: function (f) {
      var q = f.q, sr = Math.floor(q.path[0] / q.cols), er = Math.floor(q.path[q.path.length - 1] / q.cols); H.D().st = { p: 0 };
      return '<button class="xhd0" data-x="axsay">' + tdHtml(q.pr) + '<span class="xsp2">🔊</span></button><div class="xmzd" style="--c:' + q.cols + '">' + q.cells.map(function (x, j) { var rr = Math.floor(j / q.cols), cc = j % q.cols; return '<button class="xmb' + (cc === 0 && rr === sr ? " st" : "") + (cc === q.cols - 1 && rr === er ? " en" : "") + '" data-x="axmz" data-i="' + j + '">' + cellHtml(x) + "</button>"; }).join("") + "</div>";
    }
  };
  X.axmz = function (el) {
    var D = H.D(); if (D.lock || el.classList.contains("ok")) return; var q = H.cur().q;
    if (+el.dataset.i === q.path[D.st.p]) { el.classList.add("ok"); D.st.p++; if (D.st.p >= q.path.length) { say(q.au); next(1300); } } else bad(el);
  };

  /* ---------- 賓果 ---------- */
  KIND.bingo = {
    noauto: true,
    auto: function (f) { say(f.q.calls[0].au); },
    curAu: function (f) { var c = f.q.calls[H.D().st.c || 0]; return c ? c.au : null; },
    gen: function (c) {
      var s = c.s, r = c.r, cells = [], calls = [], base = c.age <= 2 ? 4 : 9, nC = c.age <= 2 ? 3 : 5, nb;
      if (s.pairs) {
        var pp = shuf(s.pairs, r).slice(0, 9); nb = pp.length;
        cells = shuf(pp.map(function (p) { return { w: W[p[1]], key: p[1] }; }), r);
        pp.slice(0, nC).forEach(function (p) { var ix = 0; cells.forEach(function (x, z) { if (x.key === p[1]) ix = z; }); calls.push({ idx: ix, au: { say: W[p[0]][1] }, lab: W[p[0]][1] }); });
      } else {
        var dm = dom(s, r);
        nb = dm.pool.length >= base ? base : dm.pool.length >= 6 ? 6 : 4;
        var bp = dm.k === "let" ? dm.lts.concat(shuf(dm.pool.filter(function (x) { return dm.lts.indexOf(x) < 0; }), r)).slice(0, nb) : shuf(dm.pool, r).slice(0, nb);
        cells = shuf(bp.map(function (x) { return mkCell(dm, x, r); }), r);
        var ord = shuf(cells.map(function (x, z) { return z; }), r);
        if (dm.k === "let") ord.sort(function (a, b) { return (dm.lts.indexOf(cells[b].key) >= 0 ? 1 : 0) - (dm.lts.indexOf(cells[a].key) >= 0 ? 1 : 0); });
        ord.slice(0, nC).forEach(function (z) { calls.push({ idx: z, au: cellAu(dm, cells[z]), lab: cellLab(dm, cells[z]) }); });
      }
      return [{ cells: cells, cols: nb === 4 ? 2 : 3, calls: calls, au: {} }];
    },
    paper: function (r) {
      var q = r.qs[0];
      return '<div class="xbing"><div class="xbg" style="--c:' + q.cols + '">' + q.cells.map(function (x) { return '<div class="xbc">' + cellHtml(x) + "</div>"; }).join("") + '</div><div class="xcall">🔊 ' + q.calls.map(function (x) { return esc(x.lab); }).join("　") + "</div></div>";
    },
    draw: function (f) {
      var q = f.q; H.D().st = { c: 0 };
      return '<button class="xsp" data-x="axsay">🔊</button><div class="xcalls" id="xcalls">' + q.calls.map(function () { return "<i></i>"; }).join("") + '</div><div class="xbgd" style="--c:' + q.cols + '">' + q.cells.map(function (x, j) { return '<button class="xbcd" data-x="axbing" data-i="' + j + '">' + cellHtml(x) + "</button>"; }).join("") + "</div>";
    }
  };
  X.axbing = function (el) {
    var D = H.D(); if (D.lock || el.classList.contains("ok")) return; var q = H.cur().q, call = q.calls[D.st.c];
    if (+el.dataset.i === call.idx) {
      el.classList.add("ok"); say(call.au); var dd = document.querySelectorAll("#xcalls i"); if (dd[D.st.c]) dd[D.st.c].classList.add("d"); D.st.c++;
      if (D.st.c >= q.calls.length) next(1300); else later(function () { say(q.calls[H.D().st.c].au); }, 900);
    } else { bad(el); setTimeout(function () { say(call.au); }, 400); }
  };

  /* ---------- 換字頭（word family）：同一個字尾，只換開頭的子音 ---------- */
  KIND.wordfam = {
    noauto: true,
    auto: function (f) { say(f.q.au); },
    gen: function (c) { var s = c.s, fm = s.fam[mod(c.v + c.ri, s.fam.length)]; return [{ rime: fm[0], rows: famRows(fm, c.v), au: { say: fm[0] } }]; },
    paper: function (r) {
      var q = r.qs[0];
      return '<div class="xfamr"><div class="xbank">' + q.rows.map(function (x) { return "<b>" + esc(x.on) + "</b>"; }).join("") + "</div>" + q.rows.map(function (x) { return '<div class="xfr"><div class="xfp">' + (x.pic ? pic(x.pic) : "") + '</div><i class="xbx"></i><b class="xri">' + esc(q.rime) + '</b><span class="xwl"></span></div>'; }).join("") + "</div>";
    },
    draw: function (f) {
      var q = f.q; H.D().st = { t: {}, n: 0 };
      return '<div class="xfamd"><div class="xfw"><span class="xfb" id="xfb">?</span><span class="xri">' + esc(q.rime) + '</span></div><div class="xfpic" id="xfpic"></div></div><div class="xtiles">' + q.rows.map(function (x, j) { return '<button class="xtile" data-x="axfam" data-i="' + j + '">' + esc(x.on) + "</button>"; }).join("") + "</div>";
    }
  };
  X.axfam = function (el) {
    var D = H.D(); if (D.lock) return; var q = H.cur().q, x = q.rows[+el.dataset.i], fb = document.getElementById("xfb"), pc = document.getElementById("xfpic");
    fb.textContent = x.on; fb.classList.add("on"); pc.innerHTML = x.pic ? pic(x.pic) : ""; A.speak(x.w);
    if (!D.st.t[el.dataset.i]) { D.st.t[el.dataset.i] = 1; D.st.n++; el.classList.add("used"); }
    if (D.st.n >= Math.min(5, q.rows.length)) next(1900);
  };

  /* ---------- 轉盤（字母轉盤 / CVC 字首轉盤） ---------- */
  KIND.spinner = {
    noauto: true,
    gen: function (c) {
      var s = c.s;
      if (s.lex) { var l3 = Object.keys(s.lex); return [{ mode: "let", sectors: shuf(l3.concat(l3), c.r).map(function (x) { return { t: x }; }), need: 5, au: {} }]; }
      var fm = s.fam[mod(c.v + c.ri, s.fam.length)];
      return [{ mode: "wheel", rime: fm[0], sectors: rot(fm[1], c.v).slice(0, 8).map(function (x) { return { t: x }; }), need: 5, au: {} }];
    },
    paper: function (r) {
      var q = r.qs[0];
      return '<div class="xspn"><div class="xsv">' + spinSvg(q) + '</div><div class="xsr">' + [0, 1, 2, 3, 4].map(function () { return '<div class="xsl2"><i></i>' + (q.mode === "wheel" ? "<b>" + esc(q.rime) + "</b>" : '<span class="xpbox"></span>') + "</div>"; }).join("") + "</div></div>";
    },
    draw: function (f) {
      H.D().st = { n: 0, ang: 0, busy: false };
      return '<div class="xspwrap"><div class="xpoint">▼</div><button class="xspw" id="xspw" data-x="axspin" aria-label="轉">' + spinSvg(f.q) + '</button></div><div class="xres" id="xres">&nbsp;</div><button class="xgo" data-x="axspin">🎡</button>';
    }
  };
  X.axspin = function () {
    var D = H.D(); if (D.lock || D.st.busy) return; var q = H.cur().q, n = q.sectors.length, sa = 360 / n, idx = Math.floor(Math.random() * n), base = D.st.ang;
    var ang = base + 720 + ((((-(idx + 0.5) * sa - base) % 360) + 360) % 360); D.st.ang = ang; D.st.busy = true;
    var w = document.getElementById("xspw"), res = document.getElementById("xres"); res.innerHTML = "&nbsp;";
    w.querySelector("svg").style.cssText = "transition:transform 2.2s cubic-bezier(.15,.65,.2,1);transform:rotate(" + ang + "deg)";
    later(function () {
      var t = q.sectors[idx].t, D2 = H.D(); D2.st.busy = false; D2.st.n++;
      if (q.mode === "wheel") { res.innerHTML = '<b class="xon">' + esc(t) + '</b><b class="xri">' + esc(q.rime) + '</b><span>=</span><b class="xwd">' + esc(t + q.rime) + "</b>"; A.speak(t + q.rime); }
      else { var ex = exOf(t); res.innerHTML = '<b class="xrl">' + esc(t.toUpperCase() + t) + "</b>" + (ex ? '<span class="xrp">' + pic(ex) + "</span>" : ""); say({ sound: t, w: ex }); }
      if (D2.st.n >= q.need) next(2400);
    }, 2400);
  };

  /* ---------- 開頭聲音分類 ---------- */
  function sortHtml(q, i) {
    var it = q.items[i], dots = q.items.map(function (x, j) { return '<i class="' + (j < i ? "d" : j === i ? "c" : "") + '"></i>'; }).join("");
    return '<div class="xd-dots s">' + dots + '</div><button class="xbigd s" data-x="axsay">' + pic(it.w) + '</button><div class="xlbs">' + [q.A, q.B].map(function (l) { return '<button class="xlb" data-x="axsort" data-k="' + l + '">' + esc(l.toUpperCase() + l) + "</button>"; }).join("") + "</div>";
  }
  KIND.sort = {
    noauto: true,
    auto: function (f) { say({ say: f.q.items[0].w[1] }); },
    curAu: function (f) { var i = H.D().st.i || 0; return { say: f.q.items[i].w[1] }; },
    gen: function (c) {
      var l5 = rot(Object.keys(c.s.lex), c.v + c.ri).slice(0, 2), its = [];
      l5.forEach(function (lt) { rot(words(c.s.lex[lt]), c.v).slice(0, 3).forEach(function (w) { its.push({ w: w, key: lt }); }); });
      return [{ A: l5[0], B: l5[1], items: shuf(its, c.r), au: {} }];
    },
    paper: function (r) {
      var q = r.qs[0];
      return '<div class="xsrt"><div class="xsh"><b>' + esc(q.A.toUpperCase() + q.A) + "</b><b>" + esc(q.B.toUpperCase() + q.B) + '</b></div><div class="xsg">' + q.items.map(function (it) { return '<div class="xsi">' + pic(it.w) + '<div class="xsc"><i>' + esc(q.A) + "</i><i>" + esc(q.B) + "</i></div></div>"; }).join("") + "</div></div>";
    },
    draw: function (f) { H.D().st = { i: 0 }; return sortHtml(f.q, 0); }
  };
  X.axsort = function (el) {
    var D = H.D(); if (D.lock) return; var q = H.cur().q, it = q.items[D.st.i];
    if (el.dataset.k === it.key) {
      el.classList.add("ok"); say({ say: it.w[1] }); D.st.i++;
      if (D.st.i >= q.items.length) next(900);
      else { D.lock = true; later(function () { var d2 = H.D(); document.querySelector(".xd-body").innerHTML = sortHtml(q, d2.st.i); d2.lock = false; say({ say: q.items[d2.st.i].w[1] }); }, 800); }
    } else { bad(el); setTimeout(function () { say({ say: it.w[1] }); }, 350); }
  };

  /* ---------- 泡泡字塗色 ---------- */
  KIND.bubble = {
    gen: function (c) {
      var out = [];
      rot(Object.keys(c.s.lex), c.v + 1).forEach(function (lt, qi) { var e = words(c.s.lex[lt]); out.push({ w: e[mod(c.v + c.ri + qi, e.length)], letter: lt, au: { sound: lt, w: e[mod(c.v + c.ri + qi, e.length)] } }); });
      return out;
    },
    paper: function (r) { return r.qs.map(function (x) { return '<div class="xrow xtr"><div class="xpp1">' + pic(x.w) + '</div><div class="xbub">' + bubbleLetter(x.letter) + "</div></div>"; }).join(""); },
    draw: function (f) {
      var q = f.q; H.D().st.col = PAL[3];
      return '<div class="xtrw"><div class="xtrbg bub">' + bubbleLetter(q.letter) + '</div><canvas id="xcv" class="xtrc"></canvas></div><div class="xpal">' + PAL.slice(0, 7).map(function (c, j) { return '<button class="xsw' + (j === 3 ? " on" : "") + '" style="background:' + c + '" data-x="axcol" data-c="' + c + '" aria-label="顏色"></button>'; }).join("") + '</div><button class="xsmall" data-x="axsay">' + pic(q.w) + '</button><button class="xgo" data-x="axnext">✔</button>';
    },
    init: initCanvas
  };

  /* ---------- 連點成圖 ---------- */
  KIND.dotdot = {
    noauto: true,
    gen: function (c) {
      var num = c.age <= 4, SL = num ? SHAPES : SHAPES26, sh = SL[mod(c.v + c.ri, SL.length)], up = c.v % 2 === 1;
      return [{ pts: sh.pts, name: sh.n, labels: sh.pts.map(function (p, z) { return num ? String(z + 1) : String.fromCharCode((up ? 65 : 97) + z); }), au: { say: sh.n } }];
    },
    paper: function (r) { return '<div class="xddw">' + ddSvg(r.qs[0], false) + "</div>"; },
    draw: function (f) { H.D().st = { p: 0 }; return '<div class="xddw d">' + ddSvg(f.q, true) + "</div>"; }
  };
  X.axdd = function (el) {
    var D = H.D(); if (D.lock) return; var q = H.cur().q, i = +el.dataset.i, p = D.st.p, NS = "http://www.w3.org/2000/svg";
    function line(a, b) { var l = document.createElementNS(NS, "line"); l.setAttribute("x1", a[0]); l.setAttribute("y1", a[1]); l.setAttribute("x2", b[0]); l.setAttribute("y2", b[1]); l.setAttribute("class", "xdline"); document.getElementById("xdl").appendChild(l); }
    if (i !== p) { el.classList.add("no"); setTimeout(function () { el.classList.remove("no"); }, 500); return; }
    el.classList.add("on"); if (p > 0) line(q.pts[p - 1], q.pts[p]); D.st.p++;
    if (D.st.p >= q.pts.length) { line(q.pts[q.pts.length - 1], q.pts[0]); var fl = document.getElementById("xfill"); fl.setAttribute("fill", PAL[(q.name.length * 3) % 6]); fl.setAttribute("fill-opacity", ".55"); say(q.au); next(2200); }
  };

  /* ---------- 照字母塗色 ---------- */
  KIND.colorby = {
    noauto: true,
    gen: function (c) {
      var lt = Object.keys(c.s.lex), px = PIX[mod(c.v + c.ri, PIX.length)], bgl = shuf(ALLLET.filter(function (x) { return lt.indexOf(x) < 0; }), c.r)[0], cb = [];
      px.rows.forEach(function (row) { row.split("").forEach(function (ch) { var key = ch === "0" ? bgl : lt[+ch - 1]; cb.push({ t: c.r() < 0.5 ? key.toUpperCase() : key, key: key, sym: +ch }); }); });
      return [{ cols: px.rows[0].length, rows: px.rows.length, cells: cb, legend: px.cols.map(function (col, z) { return { key: lt[z], col: col }; }), au: {} }];
    },
    paper: function (r) {
      var q = r.qs[0];
      return '<div class="xcbw"><div class="xleg">' + q.legend.map(function (l) { return '<span class="xlg" style="background:' + l.col + '">' + esc(l.key.toUpperCase() + l.key) + "</span>"; }).join("") + '</div><div class="xcb" style="--c:' + q.cols + ";--r:" + q.rows + '">' + q.cells.map(function (x) { return '<div class="xcc">' + esc(x.t) + "</div>"; }).join("") + "</div></div>";
    },
    draw: function (f) {
      var q = f.q; H.D().st = { sel: q.legend[0].key, left: q.cells.filter(function (c) { return c.sym; }).length };
      return '<div class="xleg d">' + q.legend.map(function (l, j) { return '<button class="xlg' + (j ? "" : " on") + '" style="background:' + l.col + '" data-x="axcbl" data-k="' + l.key + '">' + esc(l.key.toUpperCase() + l.key) + "</button>"; }).join("") + '</div><div class="xcbd" style="--c:' + q.cols + '">' + q.cells.map(function (x, j) { return '<button class="xcb" data-x="axcb" data-i="' + j + '">' + esc(x.t) + "</button>"; }).join("") + "</div>";
    }
  };
  X.axcbl = function (el) { H.D().st.sel = el.dataset.k; document.querySelectorAll(".xlg").forEach(function (b) { b.classList.toggle("on", b === el); }); };
  X.axcb = function (el) {
    var D = H.D(); if (D.lock || el.classList.contains("ok")) return; var q = H.cur().q, c = q.cells[+el.dataset.i];
    if (c.sym && c.key === D.st.sel) {
      var lg = q.legend.filter(function (l) { return l.key === c.key; })[0]; el.classList.add("ok"); el.style.background = lg.col; el.style.color = "#fff"; D.st.left--;
      if (D.st.left <= 0) { document.querySelector(".xcbd").classList.add("reveal"); A.speak("Wow!"); next(2400); }
    } else bad(el);
  };

  /* ---------- 直接教學：先示範，再練習 ---------- */
  KIND.teach = {
    noauto: true,
    auto: function (f) { say(KIND.teach.curAu(f)); },
    curAu: function (f) { var q = f.q; return q.mode === "let" ? { sound: q.t, w: q.ex[0] } : { say: q.t }; },
    genTeach: function (unit) {
      var s = ACT[unit], l = LES[unit], items = [], rounds = [];
      if (s.lex) Object.keys(s.lex).forEach(function (lt) { items.push({ mode: "let", t: lt, ex: words(s.lex[lt]).slice(0, 3) }); });
      else words(s.words).slice(0, 3).forEach(function (w) { items.push({ mode: "word", w: w, t: w[1] }); });
      rounds.push({ k: "teach", qs: items });
      if (s.fam) { var fm = s.fam[0]; rounds.push({ k: "wordfam", qs: [{ rime: fm[0], rows: famRows(fm, 0), au: { say: fm[0] } }] }); }
      return { unit: unit, teach: true, age: l.age, title: l.title, icon: l.icon, tip: "你念，孩子跟著念；點圖或字母可以再聽一次。", rounds: rounds };
    },
    sheet: function (unit) {
      var d = KIND.teach.genTeach(unit), rows = "", fam = "";
      d.rounds[0].qs.forEach(function (it) {
        if (it.mode === "let") rows += '<div class="xtrw3"><div class="xtl1"><b class="xcap">' + esc(it.t.toUpperCase() + it.t) + '</b><span class="xsnd">' + esc(sndLab(it.t)) + '</span><div class="xdl">' + H.dashLetter(it.t) + H.dashLetter(it.t) + '</div></div><div class="xtex">' + it.ex.map(function (w) { return '<div class="xte">' + pic(w) + "<b>" + hi(w[1]) + "</b></div>"; }).join("") + "</div></div>";
        else rows += '<div class="xtrw3"><div class="xpp1">' + pic(it.w) + '</div><div class="xtiles3">' + tiles3(it.t) + '</div><span class="xar">→</span><b class="xword">' + tiles3(it.t) + "</b></div>";
      });
      if (d.rounds[1]) { var fq = d.rounds[1].qs[0]; fam = '<div class="xfam">' + fq.rows.map(function (x) { return '<div class="xfc"><b class="xon">' + esc(x.on) + '</b><b class="xri">' + esc(fq.rime) + "</b><i>=</i><b>" + esc(x.w) + "</b></div>"; }).join("") + "</div>"; }
      return '<div class="xs teach"><header class="xh"><span class="xi">' + d.icon + "</span><b>" + esc(unit + " " + d.title) + '</b><span class="xage">' + d.age + ' 歲</span><span class="xv">教學頁</span></header><div class="xtip">💡 ' + esc(d.tip) + "</div>" + rows + fam + '<footer class="xf">☆ ☆ ☆ ☆ ☆<small>My Family English</small></footer></div>';
    },
    draw: function (f) {
      var q = f.q; H.D().st = {};
      if (q.mode === "let") return '<button class="xcap2" data-x="axsay">' + esc(q.t.toUpperCase() + q.t) + '</button><div class="xtex2">' + q.ex.map(function (w, j) { return '<button class="xte2" data-x="axtex" data-i="' + j + '">' + pic(w) + "<b>" + hi(w[1]) + "</b></button>"; }).join("") + '</div><button class="xgo" data-x="axnext">▶</button>';
      return '<button class="xpp1 d xbtn0" data-x="axtw">' + pic(q.w) + '</button><div class="xtiles3 d" id="xtt">' + tiles3(q.t) + '</div><button class="xword2" data-x="axtw">' + esc(q.t) + '</button><button class="xgo" data-x="axnext">▶</button>';
    }
  };
  X.axtex = function (el) { var w = H.cur().q.ex[+el.dataset.i]; el.classList.add("ok"); say({ say: w[1] }); setTimeout(function () { el.classList.remove("ok"); }, 700); };
  X.axtw = function () {
    var D = H.D(), q = H.cur().q, tl = document.querySelectorAll("#xtt b"), j = 0; if (D.st.busy) return; D.st.busy = true;
    tl.forEach(function (b) { b.classList.remove("on"); });
    (function step() { if (j < tl.length) { tl[j].classList.add("on"); j++; setTimeout(step, 600); } else { A.speak(q.t); H.D().st.busy = false; } })();
  };

  /* 有些題型的提示聲要看當下狀態（賓果、分類、教學） */
  var oldSay = X.axsay;
  X.axsay = function (el, e) {
    var f = H.cur();
    if (f && KIND[f.k] && KIND[f.k].curAu) say(KIND[f.k].curAu(f)); else oldSay(el, e);
  };
})();
