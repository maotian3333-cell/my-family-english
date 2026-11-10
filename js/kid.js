/* 孩子模式（v2.0）：圖示優先、最多兩層、不扣分、可設定使用時間、離開要過家長鎖。
   只使用 app.js 公開的 MFE_API，不直接碰資料；孩子的遊玩次數記入「一起玩過」。 */
(function () {
  "use strict";
  var st = { startTs: 0, unit: null, round: 0, target: null, choices: [], done: 0, answered: false, ended: false, timer: null };
  var ROUNDS = 5, COLORS = ["#FFC943", "#9CD0F2", "#8FC6A7", "#F9A06B", "#E3B6E8", "#F7B6C6"];

  function api() { return window.MFE_API; }
  function minutes() { var s = api().getS(); return s.kidMin == null ? 10 : s.kidMin; }
  function cat(unit) {
    var m = (api().LCARDS || {})[unit]; if (!m) return null;
    for (var i = 0; i < api().WCATS.length; i++) if (api().WCATS[i].id === m.cat) return { cat: api().WCATS[i], pat: m.pat };
    return null;
  }
  function kidUnits() { return api().LESSONS.filter(function (l) { return cat(l.id); }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function say(w) {
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

  function viewMap() {
    var h = '<div class="kmode">' + bar(false) + '<div class="kmap">';
    kidUnits().forEach(function (l, i) {
      h += '<button class="kisland" style="background:' + COLORS[i % COLORS.length] + '" data-x="kopen" data-id="' + l.id + '" aria-label="' + api().esc(l.title) + '"><span>' + l.icon + "</span></button>";
    });
    return h + "</div>" + timeBar() + "</div>";
  }
  function viewUnitMenu(id) {
    var c = cat(id), l = api().LESSONS.filter(function (x) { return x.id === id; })[0];
    return '<div class="kmode">' + bar(true) + '<div class="khero">' + l.icon + '</div><div class="kgames">' +
      '<button class="kgame" style="background:#9CD0F2" data-x="kgame" data-g="listen" aria-label="聽一聽，點一點">👂</button>' +
      '<button class="kgame" style="background:#FFC943" data-x="kgame" data-g="tap" aria-label="點一點，聽一聽">👆</button></div>' + timeBar() + "</div>";
  }
  function newRound() {
    var c = cat(st.unit), words = c.cat.words;
    st.target = words[Math.floor(Math.random() * words.length)];
    var others = shuffle(words.filter(function (w) { return w !== st.target; })).slice(0, 2);
    st.choices = shuffle([st.target].concat(others)); st.answered = false;
  }
  function viewListen(id) {
    if (!st.target) newRound();
    var h = '<div class="kmode">' + bar(true) + '<button class="kbtn replay" data-x="kreplay" aria-label="再聽一次">🔊</button><div class="kchoices">';
    st.choices.forEach(function (w) { h += '<button class="kcard" data-x="kpick" data-id="' + w[0] + '">' + api().pic(w) + "</button>"; });
    h += '</div><div class="kdots">';
    for (var i = 0; i < ROUNDS; i++) h += '<span class="' + (i < st.done ? "on" : "") + '">⭐</span>';
    return h + "</div>" + timeBar() + "</div>";
  }
  function viewTap(id) {
    var words = cat(id).cat.words, h = '<div class="kmode">' + bar(true) + '<div class="kchoices tap">';
    words.forEach(function (w) { h += '<button class="kcard" data-x="ktap" data-id="' + w[0] + '">' + api().pic(w) + "</button>"; });
    return h + "</div>" + timeBar() + "</div>";
  }
  function viewDone() {
    return '<div class="kmode">' + bar(true) + '<div class="kcheer"><span class="kmon big">' + api().mon(api().kid().mon, "pop") + '</span><div class="kstars">⭐⭐⭐</div></div>' +
      '<div class="kgames"><button class="kgame" style="background:#8FC6A7" data-x="kgame" data-g="listen" aria-label="再玩一次">🔄</button></div></div>';
  }
  function viewEnd() {
    return '<div class="kmode ended">' + '<div class="kbar"><span class="kspacer"></span>' + exitBtn() + "</div>" + '<div class="kcheer"><div class="kmoon">🌙</div><div class="kbye">Bye-bye!</div></div></div>';
  }

  window.MFE_ROUTES = window.MFE_ROUTES || {};
  window.MFE_ROUTES.play = function (parts) {
    if (!st.startTs) st.startTs = Date.now();
    if (st.ended) return viewEnd();
    var id = parts[1], g = parts[2];
    if (!id) return viewMap();
    if (!cat(id)) return viewMap();
    if (st.unit !== id) { st.unit = id; st.target = null; st.done = 0; }
    if (g === "listen") return st.done >= ROUNDS ? viewDone() : viewListen(id);
    if (g === "tap") return viewTap(id);
    return viewUnitMenu(id);
  };
  window.MFE_AFTER = window.MFE_AFTER || {};
  window.MFE_AFTER.play = function (parts) {
    if (!st.timer) st.timer = setInterval(function () {
      var m = minutes(); if (!m || st.ended) return;
      if (Date.now() - st.startTs >= m * 60000) { st.ended = true; api().render(); try { api().speak("Bye-bye!"); } catch (e) {} }
      else { var bar = document.querySelector(".ktime span"); if (bar) bar.style.width = Math.max(0, 100 - (Date.now() - st.startTs) / (m * 600)) + "%"; }
    }, 3000);
    if (parts[2] === "listen" && st.target && !st.answered && st.done < ROUNDS) setTimeout(function () { if (!st.answered) say(st.target); }, 350);
  };
  window.MFE_LEAVE = function (base) { if (base !== "play" && st.timer) { clearInterval(st.timer); st.timer = null; st.startTs = 0; st.ended = false; st.unit = null; st.target = null; st.done = 0; } };

  function wordById(id) { var c = cat(st.unit); return c.cat.words.filter(function (w) { return w[0] === id; })[0]; }
  function finishUnit() {
    var A_ = api(), c = A_.kid(); c.plays.push({ unit: st.unit, act: "kid", ts: Date.now() }); c.resist = []; A_.save(); A_.burst();
  }
  window.MFE_X = window.MFE_X || {};
  var X = window.MFE_X;
  X.enterkid = function () { st.startTs = Date.now(); st.ended = false; api().go("play"); };
  X.exitkid = function () { api().gate(function () { st.startTs = 0; st.ended = false; api().go("home"); }); };
  X.khome = function () { st.target = null; st.done = 0; api().go("play"); };
  X.kopen = function (el) { st.unit = null; api().go("play/" + el.dataset.id); };
  X.kgame = function (el) { st.target = null; st.done = 0; api().go("play/" + st.unit + "/" + el.dataset.g); };
  X.kreplay = function () { if (st.target) say(st.target); };
  X.kpick = function (el) {
    if (st.answered) return;
    var w = wordById(el.dataset.id);
    if (w === st.target) {
      st.answered = true; el.classList.add("yes"); st.done++; say(w);
      if (st.done >= ROUNDS) { setTimeout(function () { finishUnit(); api().render(); }, 900); }
      else setTimeout(function () { newRound(); api().render(); }, 1000);
    } else { el.classList.add("shake"); setTimeout(function () { el.classList.remove("shake"); }, 500); say(st.target); }
  };
  X.ktap = function (el) {
    var w = wordById(el.dataset.id); el.classList.add("yes"); setTimeout(function () { el.classList.remove("yes"); }, 500);
    say(w);
    var c = cat(st.unit), s = api().sentence(c.pat, w, null);
    if (s && c.pat && !w[6] && (w[3] || "").indexOf("txt:") !== 0) setTimeout(function () { api().speak(s); }, 1100);
  };

  window.MFE_KID_SETTINGS = function () {
    var m = minutes();
    return '<div class="card"><h2>👶 孩子模式使用時間</h2><p class="muted">到時間畫面會變成 Bye-bye，只能由家長解鎖離開。孩子模式沒有計分、沒有失敗；點錯只會再聽一次。</p><div class="row">' +
      [5, 10, 15, 0].map(function (n) { return '<button class="btn small ' + (m === n ? "green" : "white") + '" data-x="kmin" data-n="' + n + '">' + (n ? n + " 分鐘" : "不限時") + "</button>"; }).join("") + "</div></div>";
  };
  X.kmin = function (el) { var s = api().getS(); s.kidMin = +el.dataset.n; api().save(); api().render(); };
})();
