/* 小繪本、小對話、動一動（Simon says）：幼兒模式的擴充頁面＋家長腳本頁。
   透過 kid.js 的 MFE_KID_EXT / MFE_KIDU 掛進幼兒模式；資料在 data/stories.js、data/dialogs.js。 */
(function () {
  "use strict";
  var U = window.MFE_KIDU, EXT = window.MFE_KID_EXT, X = window.MFE_X; if (!U || !EXT) return;
  var api = U.api, st = U.st, BK = null, TK = null, SM = null;
  function Wd(id) { return api().WORD[id]; }
  function esc(t) { return api().esc(t); }
  function cap(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
  function fid(list, id) { return list.filter(function (x) { return x.id === id; })[0]; }
  function best(map, id) { var c = api().kid(); return (c[map] && c[map][id]) || 0; }
  function setBest(map, id, r) { var c = api().kid(); c[map] = c[map] || {}; c[map][id] = Math.max(c[map][id] || 0, r); c.plays.push({ unit: map, act: "kid", ts: Date.now() }); api().save(); }
  function nowav(id) { return !/^(vb|em|pp|aj|c)_/.test(id); }
  var LAY = { one: { mon: 1, it: [[56, 7, 38]] }, two: { mon: 0, it: [[10, 8, 36], [54, 8, 36]] }, three: { mon: 0, it: [[5, 9, 28], [36, 9, 28], [67, 9, 28]] }, big: { mon: 0, it: [[28, 3, 44]] } };
  function sceneHtml(pg, small, monIdx) {
    var L = LAY[pg.lay] || LAY.one, sc0 = pg.sc, art0 = (pg.it || []).some(function (x) { return (window.MFE_AQUATIC || {})[x]; }) ? "sea" : sc0, art = (window.MFE_SCENE_ART || {})[art0] || "", h = '<div class="kbs' + (small ? " sm" : "") + '">' + art;
    if (L.mon) h += '<span class="sc-mon">' + api().mon(monIdx == null ? api().kid().mon : monIdx, "bob") + "</span>";
    var n = pg.it.length, sz = window.MFE_SIZE_W || function () { return 30; };
    pg.it.forEach(function (id, i) { var w = Wd(id); if (!w) return; var wd = sz(id), cap = n > 1 ? Math.min(wd, 86 / n) : wd, zone = L.mon ? [44, 96] : [4, 96], slot = (zone[1] - zone[0]) / n, left = zone[0] + slot * i + (slot - cap) / 2; h += '<span class="bk-it" style="left:' + left.toFixed(1) + "%;bottom:" + ((window.MFE_ITEM_BOTTOM && MFE_ITEM_BOTTOM(id)) || (n > 1 ? 8 : 7)) + "%;width:" + cap.toFixed(1) + '%">' + (window.MFE_ITEM_HTML ? MFE_ITEM_HTML(w, api().pic) : api().pic(w)) + "</span>"; });
    return h + "</div>";
  }
  function textOf(pg, ans) {
    if (!pg.q) return esc(pg.en);
    var a = ans ? Wd(pg.q.ans)[1] : null, e = esc(pg.en);
    if (a) { var t = pg.en.indexOf("___") === 0 ? cap(a) : a; return e.replace("___", '<b class="hl">' + esc(t) + "</b>"); }
    return e.replace("___", '<span class="bk-blank"></span>');
  }
  function fullEn(pg) { var a = pg.q ? Wd(pg.q.ans)[1] : ""; return pg.en.replace("___", pg.en.indexOf("___") === 0 ? cap(a) : a); }
  function leadEn(pg) { var i = pg.en.indexOf("___"); return i <= 0 ? "" : pg.en.slice(0, i).trim(); }

  /* ================= 小繪本 ================= */
  function shelf() {
    var h = '<div class="kmode">' + U.bar(true) + '<div class="kname">📖</div><div class="kgrid">';
    window.MFE_STORIES.forEach(function (s) { var r = best("kbooks", s.id); h += '<button class="kgame2 kbk" data-x="kbkopen" data-id="' + s.id + '"><span>' + s.icon + "</span><i>" + esc(s.title) + "</i>" + (r ? '<b class="kst2">' + "⭐".repeat(r) + "</b>" : "") + "</button>"; });
    return h + "</div>" + U.timeBar() + "</div>";
  }
  function pageView() {
    var s = BK.s, pg = s.pages[BK.pi], n = s.pages.length, h = '<div class="kmode">' + U.bar(true) + '<div class="kbtitle">' + esc(s.title) + "</div>" + '<button class="kbookscene" data-x="kbkhear" aria-label="再聽一次">' + sceneHtml(pg) + "</button>" +
      '<div class="ksent"><div class="ken">' + textOf(pg, BK.ans) + '</div><div class="kzh">' + esc(pg.zh) + "</div></div>";
    if (pg.q && !BK.ans) { h += '<div class="kchoices c' + pg.q.ch.length + '">'; U.shuffle(pg.q.ch.slice()).forEach(function (id) { h += '<button class="kcard" data-x="kbkpick" data-id="' + id + '">' + api().pic(Wd(id)) + "</button>"; }); BK.order = null; h += "</div>"; }
    else h += '<div class="kbtns"><button class="kbtn replay2" data-x="kbkhear" aria-label="再聽一次">🔊</button><button class="kgo sm" id="knext" data-x="kbknext" aria-label="下一頁">▶</button></div>';
    return h + U.dotsRow(n, BK.pi + 1) + U.timeBar() + "</div>";
  }
  function endView() {
    return '<div class="kmode">' + U.bar(true) + '<div class="kcheer"><span class="kmon big">' + api().mon(api().kid().mon, "pop") + '</span><div class="kstars">' + U.starsHtml(BK.rate) + '</div><div class="kbye2">The End</div></div><div class="kgames"><button class="kgo" data-x="kbkshelf" aria-label="回書架">▶</button><button class="kgame2" data-x="kbkagain" aria-label="再讀一次">🔁<i>再讀一次</i></button></div></div>';
  }
  EXT.book = {
    island: { icon: "📖", label: "小繪本", bg: "#F7D9C4" },
    reset: function () { BK = null; },
    view: function (parts) {
      if (!parts[2]) { BK = null; return shelf(); }
      if (!BK || BK.s.id !== parts[2]) { var s = fid(window.MFE_STORIES, parts[2]); if (!s) return shelf(); BK = { s: s, pi: 0, ans: false, miss: 0, mt: 0, spoken: "", done: false }; }
      return BK.done ? endView() : pageView();
    },
    after: function (parts) {
      if (!BK) { if (!parts[2]) setTimeout(function () { U.zh("選一本小繪本。"); }, 300); return; }
      var key = BK.pi + ":" + BK.ans + ":" + BK.done; if (BK.spoken === key) return; BK.spoken = key; var b = BK, nv = st.nav || 0;
      if (b.done) { setTimeout(function () { U.zh("讀完了，好棒！"); }, 300); return; }
      var pg = b.s.pages[b.pi];
      setTimeout(function () {
        if (nv !== (st.nav || 0)) return;
        if (b.pi === 0 && !b.ans) U.zh("我們來讀小繪本。");
        setTimeout(function () {
          if (b.ans) { api().speak(fullEn(pg), { rate: 0.6 }); return; }
          if (pg.q) { var lead = leadEn(pg); if (lead) api().speak(lead, { rate: 0.6 }); setTimeout(function () { if (!b.ans) U.zh(b.pi < 3 ? "點對的圖，補上這個字。" : "哪一個？"); }, lead ? 1500 : 100); }
          else { api().speak(pg.en, { rate: 0.6 }); }
        }, b.pi === 0 ? 1500 : 150);
      }, 300);
    }
  };
  X.kbkopen = function (el) { BK = null; st.nav = (st.nav || 0) + 1; api().go("play/book/" + el.dataset.id); };
  X.kbkshelf = function () { BK = null; st.nav = (st.nav || 0) + 1; api().go("play/book"); };
  X.kbkagain = function () { var s = BK.s; BK = null; st.nav = (st.nav || 0) + 1; api().go("play/book/" + s.id); api().render(); };
  X.kbkhear = function () { if (!BK) return; var pg = BK.s.pages[BK.pi]; if (pg.q && !BK.ans) { var l = leadEn(pg); api().speak(l || pg.zh, { rate: 0.6 }); } else api().speak(fullEn(pg), { rate: 0.6 }); };
  X.kbknext = function () { if (!BK) return; BK.pi++; BK.ans = false; BK.miss = 0; st.nav = (st.nav || 0) + 1; if (BK.pi >= BK.s.pages.length) { BK.done = true; BK.rate = U.rateOf(BK.mt); setBest("kbooks", BK.s.id, BK.rate); api().burst(); } api().render(); };
  X.kbkpick = function (el) {
    if (!BK || BK.ans) return; var pg = BK.s.pages[BK.pi], id = el.dataset.id, w = Wd(id);
    if (id === pg.q.ans) {
      BK.ans = true; if (BK.miss === 0 && nowav(id)) U.wrec(w, true, "book"); else if (nowav(id)) U.seen("w:" + id, { t: "w", id: id, u: "book" });
      el.classList.add("yes"); U.cheerPop(["Great job!", "Yay!", "Wow!"][BK.pi % 3]); var nv = st.nav || 0, b = BK;
      setTimeout(function () { if (nv === (st.nav || 0)) api().render(); }, 900);
    } else {
      if (BK.miss === 0 && nowav(pg.q.ans)) U.wrec(Wd(pg.q.ans), false, "book"); BK.miss++; BK.mt++; el.classList.add("shake"); setTimeout(function () { el.classList.remove("shake"); }, 500);
      setTimeout(function () { U.zh("再看一看圖。"); }, 400); setTimeout(function () { api().speak(leadEn(pg) || pg.en, { rate: 0.6 }); }, 1400);
      if (BK.miss >= 2) { var d = document.querySelector('.kcard[data-id="' + pg.q.ans + '"]'); if (d) d.classList.add("hint"); }
    }
  };

  /* ================= 小對話 ================= */
  function tShelf() {
    var h = '<div class="kmode">' + U.bar(true) + '<div class="kname">💬</div><div class="kgrid">';
    window.MFE_DIALOGS.forEach(function (d) { var r = best("kdlg", d.id); h += '<button class="kgame2 kbk" data-x="kdlopen" data-id="' + d.id + '"><span>' + d.icon + "</span><i>" + esc(d.title) + "</i>" + (r ? '<b class="kst2">' + "⭐".repeat(r) + "</b>" : "") + "</button>"; });
    return h + "</div>" + U.timeBar() + "</div>";
  }
  function dlgScene(pic) { var pg = { sc: TK.d.sc, lay: pic ? "one" : "one", it: pic ? [pic] : [] }; return sceneHtml(pg, false, (api().kid().mon || 0) + 3); }
  function dlgView() {
    var T = TK, d = T.d, t = d.turns[T.ti], ys = d.turns.filter(function (x) { return x.sp === "y"; }).length, yd = d.turns.slice(0, T.ti).filter(function (x) { return x.sp === "y"; }).length;
    if (T.done) return '<div class="kmode">' + U.bar(true) + '<div class="kcheer"><span class="kmon big">' + api().mon(api().kid().mon, "pop") + '</span><div class="kstars">' + U.starsHtml(T.rate) + '</div><div class="kbye2">Great job!</div></div><div class="kgames"><button class="kgo" data-x="kdlshelf" aria-label="回選單">▶</button><button class="kgame2" data-x="kdlagain" aria-label="再玩一次">🔁<i>再玩一次</i></button></div></div>';
    var line = T.phase === "r" ? { who: "p", en: T.reply.r, zh: "" } : T.phase === "you" ? { who: "y", en: T.reply.en, zh: T.reply.zh } : t.sp === "p" ? { who: "p", en: t.en, zh: t.zh } : { who: "p", en: T.last ? T.last.en : "", zh: T.last ? T.last.zh : "" };
    var h = '<div class="kmode">' + U.bar(true) + '<div class="kbtitle">' + esc(d.title) + '</div><div class="kdlg">' + dlgScene(T.pic) + '<div class="bk-bubble ' + line.who + '">' + (line.who === "y" ? "🗣 " : "") + '<b>' + esc(line.en) + "</b>" + (line.zh ? "<i>" + esc(line.zh) + "</i>" : "") + "</div></div>";
    if (t.sp === "y" && T.phase === "ask") { h += '<div class="kreplies">'; t.ch.forEach(function (c, i) { h += '<button class="kreply" data-x="kdlpick" data-i="' + i + '">' + (c.pic ? '<span class="rp">' + api().pic(Wd(c.pic)) + "</span>" : "") + '<b>' + esc(c.en) + "</b><i>" + esc(c.zh) + "</i></button>"; }); h += "</div>"; }
    else h += '<div class="kbtns"><button class="kbtn replay2" data-x="kdlhear" aria-label="再聽一次">🔊</button></div>';
    return h + U.dotsRow(ys, yd) + U.timeBar() + "</div>";
  }
  function dlgSpeak(txt, rate) { api().speak(txt, { rate: rate || 0.62 }); }
  function dlgStep() {
    var T = TK; if (!T || T.done) return;
    if (T.ti >= T.d.turns.length) { T.done = true; T.rate = U.rateOf(T.mt); setBest("kdlg", T.d.id, T.rate); api().burst(); api().render(); return; }
    var t = T.d.turns[T.ti], nv = st.nav || 0, me = T;
    if (t.sp === "p") { T.phase = "say"; T.last = { en: t.en, zh: t.zh }; T.pic = t.pic || T.pic; api().render(); setTimeout(function () { if (nv === (st.nav || 0)) dlgSpeak(t.en); }, 500);
      setTimeout(function () { if (nv !== (st.nav || 0) || TK !== me) return; me.ti++; dlgStep(); }, 2800); }
    else { T.phase = "ask"; T.miss = 0; api().render(); setTimeout(function () { if (nv === (st.nav || 0) && me.phase === "ask") U.zh(me.ti <= 1 ? "你怎麼回答？點一個。" : "換你說。"); }, 500); }
  }
  EXT.talk = {
    island: { icon: "💬", label: "小對話", bg: "#D9E8F7" },
    reset: function () { TK = null; },
    view: function (parts) {
      if (!parts[2]) { TK = null; return tShelf(); }
      if (!TK || TK.d.id !== parts[2]) { var d = fid(window.MFE_DIALOGS, parts[2]); if (!d) return tShelf(); TK = { d: d, ti: 0, phase: "say", mt: 0, miss: 0, started: false, done: false, last: null, pic: null }; }
      return dlgView();
    },
    after: function (parts) {
      if (!TK) { if (!parts[2]) setTimeout(function () { U.zh("選一段對話。"); }, 300); return; }
      if (TK.started) return; TK.started = true; var nv = st.nav || 0, me = TK;
      setTimeout(function () { if (nv === (st.nav || 0) && TK === me) { U.zh("小怪獸會跟你說話。聽一聽，再選回答。"); setTimeout(function () { if (nv === (st.nav || 0) && TK === me) dlgStep(); }, 3800); } }, 300);
    }
  };
  X.kdlopen = function (el) { TK = null; st.nav = (st.nav || 0) + 1; api().go("play/talk/" + el.dataset.id); };
  X.kdlshelf = function () { TK = null; st.nav = (st.nav || 0) + 1; api().go("play/talk"); };
  X.kdlagain = function () { var id = TK.d.id; TK = null; st.nav = (st.nav || 0) + 1; api().go("play/talk/" + id); api().render(); };
  X.kdlhear = function () { if (!TK) return; var t = TK.d.turns[TK.ti]; if (TK.phase === "ask" && TK.last) dlgSpeak(TK.last.en); else if (t && t.en) dlgSpeak(t.en); };
  X.kdlpick = function (el) {
    var T = TK; if (!T || T.phase !== "ask") return; var t = T.d.turns[T.ti], c = t.ch[+el.dataset.i], nv = st.nav || 0;
    if (c.ok) {
      T.phase = "you"; T.reply = c; api().render(); dlgSpeak(c.en, 0.7);
      setTimeout(function () { if (nv !== (st.nav || 0) || TK !== T) return; T.phase = "r"; api().render(); dlgSpeak(c.r); U.cheerPop(["Great job!", "Yay!", "Wow!", "Super!"][T.ti % 4]); }, 1900);
      setTimeout(function () { if (nv !== (st.nav || 0) || TK !== T) return; T.ti++; dlgStep(); }, 4600);
    } else {
      T.mt++; T.miss++; el.classList.add("shake"); setTimeout(function () { el.classList.remove("shake"); }, 500);
      setTimeout(function () { U.zh("再想想看。"); }, 400); setTimeout(function () { if (T.last) dlgSpeak(T.last.en); }, 1500);
      if (T.miss >= 2) t.ch.forEach(function (x, i) { if (x.ok) { var d = document.querySelectorAll(".kreply")[i]; if (d) d.classList.add("hint"); } });
    }
  };

  /* ================= 動一動：Simon says ================= */
  function smBuild() {
    var ids = U.shuffle(["vb_run", "vb_jump", "vb_walk", "vb_sit", "vb_stand", "vb_clap", "vb_wave", "vb_sleep"]), qs = [], i;
    for (i = 0; i < 5; i++) { var oth = U.shuffle(ids.filter(function (x) { return x !== ids[i]; })).slice(0, i < 2 ? 1 : 2); qs.push({ ans: ids[i], ch: U.shuffle([ids[i]].concat(oth)) }); }
    SM = { qs: qs, qi: 0, mt: 0, miss: 0, done: false, answered: false, spoken: "" };
  }
  function smView() {
    var S = SM, q = S.qs[S.qi];
    if (S.done) return '<div class="kmode">' + U.bar(true) + '<div class="kcheer"><span class="kmon big">' + api().mon(api().kid().mon, "pop") + '</span><div class="kstars">' + U.starsHtml(S.rate) + '</div><div class="kbye2">Great job!</div></div><div class="kgames"><button class="kgo" data-x="ksmagain" aria-label="再玩">▶</button></div></div>';
    var w = Wd(q.ans), h = '<div class="kmode">' + U.bar(true) + '<div class="kstage"><span class="ks now"><b>🕺</b><i>動一動</i></span></div><div class="kfeed"><span class="kmon feedmon">' + api().mon(api().kid().mon, "bob") + '</span><button class="bk-bubble p" data-x="ksmhear"><b>Simon says, ' + esc(w[1]) + '!</b><i>🔊</i></button></div><div class="kchoices c' + q.ch.length + '">';
    q.ch.forEach(function (id) { h += '<button class="kcard" data-x="ksmpick" data-id="' + id + '">' + api().pic(Wd(id)) + "</button>"; });
    return h + "</div>" + U.dotsRow(S.qs.length, S.qi) + U.timeBar() + "</div>";
  }
  EXT.simon = {
    island: { icon: "🕺", label: "動一動", bg: "#E5F2C9" },
    reset: function () { SM = null; },
    view: function (parts) { if (!SM) smBuild(); return smView(); },
    after: function (parts) {
      if (!SM || SM.done) return; var key = SM.qi + ":" + SM.answered; if (SM.spoken === key) return; SM.spoken = key; if (SM.answered) return; var S = SM, nv = st.nav || 0;
      setTimeout(function () { if (nv !== (st.nav || 0)) return; if (S.qi === 0) U.zh("動一動。聽 Simon 說什麼，點對的動作，然後一起做！"); setTimeout(function () { if (!S.answered && nv === (st.nav || 0)) api().speak("Simon says, " + Wd(S.qs[S.qi].ans)[1] + "!", { rate: 0.62 }); }, S.qi === 0 ? 4200 : 100); }, 300);
    }
  };
  X.ksmagain = function () { SM = null; st.nav = (st.nav || 0) + 1; api().render(); };
  X.ksmhear = function () { if (SM && !SM.done) api().speak("Simon says, " + Wd(SM.qs[SM.qi].ans)[1] + "!", { rate: 0.62 }); };
  X.ksmpick = function (el) {
    var S = SM; if (!S || S.answered) return; var q = S.qs[S.qi], id = el.dataset.id, nv = st.nav || 0;
    if (id === q.ans) {
      S.answered = true; if (S.miss === 0) U.wrec(Wd(id), true, "B7"); el.classList.add("yes", "do"); U.cheerPop(["Great job!", "Yay!", "Wow!"][S.qi % 3]);
      setTimeout(function () { U.zh("一起做動作！"); }, 900);
      setTimeout(function () { if (nv !== (st.nav || 0) || SM !== S) return; S.qi++; S.answered = false; S.miss = 0; if (S.qi >= S.qs.length) { S.done = true; S.rate = U.rateOf(S.mt); setBest("ksimon", "all", S.rate); api().burst(); } api().render(); }, 4600);
    } else {
      if (S.miss === 0) U.wrec(Wd(q.ans), false, "B7"); S.miss++; S.mt++; el.classList.add("shake"); setTimeout(function () { el.classList.remove("shake"); }, 500);
      setTimeout(function () { U.zh("再試一次。"); }, 400); setTimeout(function () { api().speak("Simon says, " + Wd(q.ans)[1] + "!", { rate: 0.62 }); }, 1400);
      if (S.miss >= 2) { var d = document.querySelector('.kcard[data-id="' + q.ans + '"]'); if (d) d.classList.add("hint"); }
    }
  };

  /* ================= 家長頁：腳本 ================= */
  window.MFE_ROUTES = window.MFE_ROUTES || {};
  window.MFE_ROUTES.books = function () {
    var h = '<div class="noprint"><h1>📖 小繪本與小對話</h1><p class="muted">給家長的腳本。孩子版在「孩子模式」的 📖 💬 🕺；這裡可以先看內容、陪孩子一起讀，也可以列印。孩子不用開口，指或點頭就算參與。</p></div>';
    h += "<h2>📖 小繪本（" + window.MFE_STORIES.length + " 本）</h2>";
    window.MFE_STORIES.forEach(function (s) {
      h += '<div class="card bkcard"><h3>' + s.icon + " " + esc(s.title) + "　<small>" + esc(s.zh) + "</small></h3><p class=\"muted\">" + s.age + " 歲以上　句型：" + esc(s.pat) + "<br>陪讀提醒：" + esc(s.tip) + '</p><div class="bkpages">';
      s.pages.forEach(function (pg, i) { h += '<div class="bkp">' + sceneHtml(pg, true) + "<b>" + (i + 1) + ". " + esc(fullEnP(pg)) + "</b><i>" + esc(pg.zh) + "</i></div>"; });
      h += '</div><p class="noprint"><button class="btn small blue" data-x="kbkplay" data-id="' + s.id + '">👶 給孩子玩</button></p></div>';
    });
    h += "<h2>💬 小對話（" + window.MFE_DIALOGS.length + " 段）</h2>";
    window.MFE_DIALOGS.forEach(function (d) {
      h += '<div class="card bkcard"><h3>' + d.icon + " " + esc(d.title) + "　<small>" + esc(d.zh) + "</small></h3><p class=\"muted\">" + d.age + " 歲以上　" + esc(d.tip) + '</p>' +
        '<div class="bkv"><b>A 中文為主</b><p>' + esc(d.a) + '</p><b>B 中英夾雜</b><p>' + esc(d.b) + "</p><b>C 英文</b><ul>";
      d.turns.forEach(function (t) {
        if (t.sp === "p") h += "<li><b>家長／小怪獸：</b>" + esc(t.en) + "　<span class=\"muted\">" + esc(t.zh) + "</span></li>";
        else h += "<li><b>孩子：</b>" + t.ch.filter(function (c) { return c.ok; }).map(function (c) { return esc(c.en) + "（" + esc(c.zh) + "）"; }).join(" ／ ") + "</li>";
      });
      h += '</ul></div><p class="noprint"><button class="btn small blue" data-x="kdlplay" data-id="' + d.id + '">👶 給孩子玩</button></p></div>';
    });
    return h + '<p class="noprint"><button class="btn white" onclick="window.print()">🖨 列印</button></p>';
  };
  function fullEnP(pg) { return pg.q ? fullEn(pg) : pg.en; }
  X.kbkplay = function (el) { api().go("play/book/" + el.dataset.id); };
  X.kdlplay = function (el) { api().go("play/talk/" + el.dataset.id); };
})();
