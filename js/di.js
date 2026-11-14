/* 直接教學（Direct Instruction）：C1–C6 認識字母聲音、D1–D3 認識 CVC 結構。
   教的是「概念」（/s/ 這個聲音、C-V-C 這個結構），不是單字量。
   做法：先示範（只給正例）→ 再對比（給反例）→ 再判斷（✔/✖），而且正例／反例的數量、順序、難度都固定。
   固定規則（每一回合都檢查得到，tests 見 docs/REBUILD-SPEC.md 8.5）：
     第 1 回  6 題：正 4 ／ 反 2（反例都是「遠」的），順序 P P N P N P
     第 2 回  8 題：正 4 ／ 反 4（2 遠 + 2 近），順序 P N P N N P P N
     第 3 回 10 題：正 4 ／ 反 6（4 近 + 2 遠），順序 P N P N N P N N P N
     ・第 1 題一定是正例；反例最多連續 2 題；同一回合不重複圖片
     ・「近」反例 = 長得／聽起來最容易混淆的（字母：同單元的另外兩個字母；CVC：3 個字母但不是 C-V-C，或 CCVC / CVCC）
   本檔案載入在 kinds.js 之後。 */
(function () {
  "use strict";
  var H = window.MFE_ACTH, KIND = window.MFE_ACTKIND;
  if (!H || !KIND) return;
  var shuf = H.shuf, rot = H.rot, words = H.words, pic = H.pic, esc = H.esc, say = H.say, later = H.later, next = H.next, bad = H.bad;
  var A = H.A, W = H.W, ACT = H.ACT, X = H.X;

  var SPEC = window.MFE_DI_SPEC || { LET: [], OVR: {}, GRP: {} };
  var LET_UNITS = ["C1", "C2", "C3", "C4", "C5", "C6"].concat(SPEC.LET), CVC_UNITS = ["D1", "D2", "D3"];
  var TPL = [
    { seq: "PPNPNP", neg: "FF" },
    { seq: "PNPNNPPN", neg: "FNFN" },
    { seq: "PNPNNPNNPN", neg: "NNFNNF" }
  ];
  var NEAR_CVC = ["ant", "egg", "milk", "frog", "drum"], FAR_CVC = ["apple", "tiger", "rabbit", "banana", "chair", "kite"];
  var FAR_GEN = ["apple", "tiger", "rabbit", "banana", "duck", "ball"];
  var CVC_LEG = [["tc", "C"], ["tw", "V"], ["tc", "C"]];
  /* 每個單元 → 一組「概念群組」。字母單元＝每個字母一組；結構單元＝規格表（MFE_DI_SPEC.GRP）。 */
  var GROUPS = {};
  CVC_UNITS.forEach(function (u) {
    GROUPS[u] = { pat: true, groups: [{ key: "cvc", sym: "CVC", big: "CVC", bigLegend: true, legend: CVC_LEG, mode: "pat", near: NEAR_CVC, far: FAR_CVC, ask: "Is {w} C-V-C?", rule: "三個聲音：子音－母音－子音 ＝ ✔　不是 ＝ ✖", neg: "不是 CVC" }],
      tip: "看字母格子：藍＝子音、紅＝母音。「子音－母音－子音」三格剛好就點 ✔；太長、太短或開頭是母音就點 ✖。", teachTip: "先看 ✔ 三個 CVC 字（藍紅藍），再看 ✖ 兩個不是的；孩子跟著念。" };
  });
  Object.keys(SPEC.GRP).forEach(function (u) { GROUPS[u] = SPEC.GRP[u]; GROUPS[u].pat = true; });
  var SAME = { c: "ckq", k: "ckq", q: "ckq" };
  function sameSnd(a, b) { return a === b || (SAME[a] && SAME[a].indexOf(b) >= 0); }
  window.MFE_DI = { TPL: TPL, NEAR_CVC: NEAR_CVC, FAR_CVC: FAR_CVC, LET_UNITS: LET_UNITS, CVC_UNITS: CVC_UNITS, PAT_UNITS: Object.keys(GROUPS), GROUPS: GROUPS };

  function isLet(u) { return LET_UNITS.indexOf(u) >= 0; }
  function isDI(u) { return isLet(u) || !!GROUPS[u]; }
  function sndLab(l) { return l === "x" ? "/ks/" : l === "q" ? "/kw/" : "/" + (l === "c" ? "k" : l) + "/"; }
  function cap(l) { return l.toUpperCase() + l; }
  function exWord(u, l) { var x = ACT[u].lex[l]; return W[x[0]]; }
  function isV(c) { return "aeiou".indexOf(c) >= 0; }
  function dtiles(w, cls, silent) {
    var t = w[1].replace(/ /g, "").toLowerCase(), n = t.length;
    return '<div class="dtl' + (cls ? " " + cls : "") + '">' + t.split("").map(function (c, i) { return '<b class="' + (silent && i === n - 1 && c === "e" ? "tq" : isV(c) ? "tw" : "tc") + '">' + esc(c) + "</b>"; }).join("") + "</div>";
  }
  function legend(g, cls) { return '<span class="dtl ' + (cls || "lg") + '">' + g.legend.map(function (x) { return '<b class="' + x[0] + '">' + esc(x[1]) + "</b>"; }).join("") + "</span>"; }
  function bigHtml(g) { return g.bigLegend ? legend(g, "lg") : esc(g.big || g.sym); }
  function hi(w) { return '<u class="hi">' + esc(w.charAt(0)) + "</u>" + esc(w.slice(1)); }
  var PIDX = null;
  function picOfText(t) { if (!PIDX) { PIDX = {}; Object.keys(W).forEach(function (k) { var e = W[k][1].toLowerCase(); if (!PIDX[e] && /^svg:/.test(W[k][3])) PIDX[e] = W[k]; }); } return PIDX[t] || null; }

  /* 取得單元的概念群組：{key,sym,big,mode,pos,near,far,ask,...} */
  function groupsOf(u) {
    if (GROUPS[u]) { GROUPS[u].groups.forEach(function (g) { if (!g.pos) g.pos = ACT[u].words; }); return GROUPS[u].groups; }
    var s = ACT[u], ov = SPEC.OVR || {};
    return Object.keys(s.lex).map(function (l) {
      var o = ov[l] || {}, end = l === "x";
      return { key: l, sym: sndLab(l), big: cap(l), mode: end ? "end" : "init", snd: l, pos: o.pos || s.lex[l], near: o.near || null, far: o.far || null,
        ask: end ? "Does {w} end with " + sndLab(l) + "?" : "Does {w} start with " + sndLab(l) + "?", rule: end ? "圈 ✔ ＝ 字尾是 " + sndLab(l) + "　圈 ✖ ＝ 不是" : "圈 ✔ ＝ 一開始是 " + sndLab(l) + "　圈 ✖ ＝ 不是", neg: "不是 " + sndLab(l) };
    });
  }
  /* 自動反例：近＝同單元另外的字母；遠＝其他單元的字母；排除同音（c/k/q）與同字母開頭 */
  function autoNeg(u, g) {
    var near = [], far = [], lt = g.key;
    LET_UNITS.forEach(function (uu) {
      Object.keys(ACT[uu].lex).forEach(function (l) {
        if (l === lt || l === "x") return;
        if (g.mode === "init" && sameSnd(lt, l)) return;
        (uu === u ? near : far).push.apply(uu === u ? near : far, ACT[uu].lex[l]);
      });
    });
    var ok = function (id) { var e = W[id][1].toLowerCase(); return g.mode === "end" ? !/x$/.test(e) && !/ks$/.test(e) : !sameSnd(lt, e.charAt(0)); };
    return { near: near.filter(ok), far: far.filter(ok) };
  }
  function pickDistinct(pool, n, used, r) {
    var out = [], p = shuf(pool, r), i;
    for (i = 0; i < p.length && out.length < n; i++) if (used.indexOf(p[i]) < 0 && out.indexOf(p[i]) < 0) { out.push(p[i]); }
    return out;
  }
  function negsOf(u, g) { var a = (g.near && g.far) ? null : autoNeg(u, g); return { near: g.near || a.near, far: g.far || a.far || FAR_GEN }; }

  /* 產生一回合：每題一個物件 */
  function genRound(u, v, t, r, g, off) {
    var tp = TPL[t % 3], nNear = (tp.neg.match(/N/g) || []).length, nFar = (tp.neg.match(/F/g) || []).length, pat = !isLet(u), ng = negsOf(u, g);
    var posIds = rot(g.pos, off), pos = posIds.slice(0, 4);
    var nn = pickDistinct(ng.near, nNear, pos, r), ff = pickDistinct(ng.far, nFar, pos.concat(nn), r);
    var qs = [], pi = 0, ni = 0;
    tp.seq.split("").forEach(function (ch, ix) {
      var id, kind;
      if (ch === "P") { id = pos[pi++]; kind = "P"; }
      else { kind = tp.neg.charAt(ni++); id = kind === "N" ? nn.shift() : ff.shift(); }
      var w = W[id];
      qs.push({
        mode: pat ? "pat" : "let", unit: u, lt: g.key, g: g, w: w, pos: ch === "P", kind: kind, idx: ix + 1, total: tp.seq.length, round: (t % 3) + 1, seq: tp.seq,
        au: { say: w[1] }, lab: g.ask.replace("{w}", w[1])
      });
    });
    return qs;
  }
  function gAt(u, i) { var gs = groupsOf(u); return gs[i % gs.length]; }

  KIND.disc = {
    noauto: true,
    auto: function (f) {
      var q = f.q; say({ say: q.w[1] });
      if (q.mode === "let") later(function () { say({ sound: q.lt, w: exWord(q.unit, q.lt) }); }, 1000);
    },
    curAu: function (f) { var q = f.q; return q.mode === "let" ? { sound: q.lt, w: exWord(q.unit, q.lt) } : { say: q.w[1] }; },
    gen: function (c) {
      var u = c.unit, ng = groupsOf(u).length, qs = [], base = c.more ? 0 : (c.ri % 3), cnt = c.more ? 3 : 1, i;
      for (i = 0; i < cnt; i++) {
        var t = base + i, gi = c.more ? c.v + i : c.ri + c.v + i, off = c.more ? c.v + i : c.v * 2 + Math.floor(c.ri / 3) + i;
        qs = qs.concat(genRound(u, c.v, t, c.r, gAt(u, gi), off));
      }
      return qs;
    },
    paper: function (r) {
      var q0 = r.qs[0], g = q0.g, head = "", cells, n = r.qs.length, showHead = q0.round === 1 || q0.mode === "let" || groupsOf(q0.unit).length > 1;
      if (showHead) {
        if (q0.mode === "let") head = '<div class="xdh"><b class="xcap">' + esc(g.big) + '</b><b class="xsnd">' + esc(g.sym) + "</b><span>" + esc(g.rule) + "</span></div>";
        else head = '<div class="xdh"><b class="xcap pat">' + bigHtml(g) + "</b><span>" + esc(g.rule) + "</span></div>";
      }
      cells = r.qs.map(function (q) {
        return '<div class="xdi"><i class="xdn">' + q.idx + '</i><div class="xdp">' + pic(q.w) + "</div>" + (q.mode === "pat" ? dtiles(q.w, "", GROUPS[q.unit].silent) : "") + '<div class="xdyn"><span>✔</span><span>✖</span></div></div>';
      }).join("");
      return '<div class="xdisc n' + n + (q0.mode === "pat" ? " cvc" : "") + (q0.mode === "pat" && groupsOf(q0.unit).length > 1 ? " mg" : "") + '" style="--dc:' + Math.ceil(n / 2) + '">' + head + '<div class="xdg">' + cells + "</div></div>";
    },
    draw: function (f) {
      var q = f.q, g = q.g; H.D().st = { miss: 0 };
      var top = q.mode === "let" ? '<button class="xdsnd" data-x="axsay"><span class="xcap3">' + esc(g.big) + "</span><span>" + esc(g.sym) + '</span><span class="xsp2">🔊</span></button>'
        : '<div class="xdsnd leg"><span class="xcap3 pat">' + bigHtml(g) + "</span></div>";
      return top + '<button class="xdpic" data-x="axdw">' + pic(q.w) + "</button>" + (q.mode === "pat" ? dtiles(q.w, "d", GROUPS[q.unit].silent) : "") + '<div class="xdv" id="xdv">&nbsp;</div>' +
        '<div class="xdyn d"><button class="xyes" data-x="axdy" data-a="1" aria-label="是">✔</button><button class="xnot" data-x="axdy" data-a="0" aria-label="不是">✖</button></div>';
    }
  };
  X.axdw = function () { say({ say: H.cur().q.w[1] }); };
  X.axdy = function (el) {
    var D = H.D(); if (D.lock) return; var q = H.cur().q, ans = el.dataset.a === "1", host = document.getElementById("xdv");
    if (ans === q.pos) {
      el.classList.add("ok");
      if (host) host.innerHTML = q.mode === "let" && q.pos && q.g.mode === "init" ? "✔ " + hi(q.w[1]) + " — " + esc(q.g.sym) : (q.pos ? "✔ " : "✖ ") + esc(q.w[1]);
      say({ say: q.w[1] }); next(1300);
    } else {
      bad(el); D.st.miss++;
      var right = document.querySelector('.xdyn button[data-a="' + (q.pos ? "1" : "0") + '"]'); if (right) right.classList.add("hint");
      say({ say: q.w[1] });
    }
  };

  /* ---------- 教學頁：示範（正例）→ 對比（反例） ---------- */
  var T = KIND.teach, oldGen = T.genTeach, oldSheet = T.sheet, oldDraw = T.draw, oldAu = T.curAu;
  T.genTeach = function (unit) {
    if (!isDI(unit)) return oldGen(unit);
    var s = ACT[unit], l = H.LES[unit], items = [], rounds = [], r = H.rng(H.hash(unit) + 5), pat = !isLet(unit);
    groupsOf(unit).forEach(function (g) {
      var ng = negsOf(unit, g), nn = pickDistinct(ng.near, 2, [], r);
      items.push({ mode: pat ? "pat" : "let", di: true, unit: unit, t: g.key, g: g, pos: words(g.pos).slice(0, 3), neg: words(nn) });
    });
    rounds.push({ k: "teach", qs: items });
    if (s.fam) { var fm = s.fam[0]; rounds.push({ k: "wordfam", qs: [{ rime: fm[0], rows: rot(fm[1], 0).slice(0, 6).map(function (o) { return { on: o, w: o + fm[0], pic: picOfText(o + fm[0]) }; }), au: { say: fm[0] } }] }); }
    var tip = (GROUPS[unit] && GROUPS[unit].teachTip) || "先看 ✔ 這一排：都是這個聲音（正例）；再看 ✖ 那一排：不是（反例）。孩子跟著念，點圖可以再聽。";
    return { unit: unit, teach: true, di: true, age: l.age, title: l.title, icon: l.icon, tip: tip, rounds: rounds };
  };
  function row(label, cls, ws, tiles, silent, hiFirst) {
    return '<div class="xdtrow ' + cls + '"><div class="xdtlab">' + label + '</div><div class="xdtws">' + ws.map(function (w) {
      return '<div class="xdtw"><div class="xdp">' + pic(w) + "</div>" + (tiles ? dtiles(w, "", silent) : "<b>" + (hiFirst ? hi(w[1]) : esc(w[1])) + "</b>") + "</div>";
    }).join("") + "</div></div>";
  }
  T.sheet = function (unit) {
    if (!isDI(unit)) return oldSheet(unit);
    var d = T.genTeach(unit), body = "", silent = GROUPS[unit] && GROUPS[unit].silent;
    d.rounds[0].qs.forEach(function (it) {
      var g = it.g;
      if (it.mode === "let") {
        body += '<div class="xdtblk"><div class="xtl1"><b class="xcap">' + esc(g.big) + '</b><span class="xsnd">' + esc(g.sym) + '</span><div class="xdl">' + (g.big.length === 2 && g.key.length === 1 ? H.dashLetter(g.key) + H.dashLetter(g.key) : "") + "</div></div><div class=\"xdtrows\">" +
          row("✔ 是 " + esc(g.sym), "yes", it.pos, false, false, g.mode === "init") + row("✖ " + esc(g.neg), "no", it.neg, false, false, false) + "</div></div>";
      } else {
        body += '<div class="xdtrule"><b class="xcap pat">' + bigHtml(g) + "</b><span>" + esc(g.rule) + '</span></div><div class="xdtrows big">' + row("✔ 是 " + esc(g.sym), "yes", it.pos, true, silent) + row("✖ " + esc(g.neg), "no", it.neg, true, silent) + "</div>";
      }
    });
    if (d.rounds[1]) { var fq = d.rounds[1].qs[0]; body += '<div class="xfam">' + fq.rows.map(function (x) { return '<div class="xfc"><b class="xon">' + esc(x.on) + '</b><b class="xri">' + esc(fq.rime) + "</b><i>=</i><b>" + esc(x.w) + "</b></div>"; }).join("") + "</div>"; }
    var n = d.rounds[0].qs.length;
    return '<div class="xs teach di n' + n + '"><header class="xh"><span class="xi">' + d.icon + "</span><b>" + esc(unit + " " + d.title) + '</b><span class="xage">' + d.age + ' 歲</span><span class="xv">教學頁</span></header><div class="xtip">💡 ' + esc(d.tip) + "</div>" + body + '<footer class="xf">先看 ✔ 再看 ✖ ，然後做練習頁<small>My Family English</small></footer></div>';
  };
  T.curAu = function (f) { var q = f.q; if (!q.di) return oldAu(f); return q.mode === "let" ? { sound: q.t, w: q.pos[0] } : { say: q.pos[0][1] }; };
  T.draw = function (f) {
    var q = f.q; if (!q.di) return oldDraw(f);
    H.D().st = {}; var g = q.g, silent = GROUPS[q.unit] && GROUPS[q.unit].silent;
    function btns(ws, k) { return ws.map(function (w, j) { return '<button class="xte2 ' + k + '" data-x="axtex2" data-g="' + k + '" data-i="' + j + '">' + pic(w) + (q.mode === "pat" ? dtiles(w, "s", silent) : "<b>" + (k === "p" && g.mode === "init" ? hi(w[1]) : esc(w[1])) + "</b>") + "</button>"; }).join(""); }
    var top = q.mode === "let" ? '<button class="xcap2" data-x="axsay">' + esc(g.big) + "</button>" : '<div class="xcap2 pat">' + bigHtml(g) + "</div>";
    return top + '<div class="xdtl yes">✔ 是 ' + esc(g.sym) + '</div><div class="xtex2">' + btns(q.pos, "p") + '</div><div class="xdtl no">✖ ' + esc(g.neg) + '</div><div class="xtex2">' + btns(q.neg, "n") + '</div><button class="xgo" data-x="axnext">▶</button>';
  };
  X.axtex2 = function (el) {
    var q = H.cur().q, w = (el.dataset.g === "p" ? q.pos : q.neg)[+el.dataset.i]; el.classList.add("on"); say({ say: w[1] }); setTimeout(function () { el.classList.remove("on"); }, 700);
  };

  /* ---------- 單元設定：三版都是 3 回合直接教學 ---------- */
  LET_UNITS.concat(Object.keys(GROUPS)).forEach(function (u) {
    var s = ACT[u]; if (!s) return;
    s.plans = [["disc", "disc", "disc"], ["disc", "disc", "disc"], ["disc", "disc", "disc"]]; s.plan = s.plans[0];
    s.tip = GROUPS[u] ? GROUPS[u].tip : "你說單字，問「一開始是 /s/ 嗎？」孩子點 ✔ 或 ✖。答錯就示範一次再繼續。";
    s.teach = true; s.di = true;
  });
  if (location.hash.indexOf("#act") === 0 || location.hash.indexOf("#sheet") === 0) { try { A.render(); } catch (e) { } }
})();
