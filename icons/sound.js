/* 字母聲音：用家長自己的聲音錄製，只存在這台裝置的瀏覽器（IndexedDB），不會上傳。
   播放順序：① 你錄的聲音 ② 專案裡的 audio/phonics/字母.mp3（如果你放了） ③ 沒有就回報 false。
   瀏覽器的內建語音只會唸字母「名稱」（例如 s 唸成 ess），不是發音，所以不拿來示範字母聲音。 */
(function () {
  "use strict";
  var DB = "mfe_sound", STORE = "clips", db = null, cur = null, rec = null, chunks = [];

  function open() {
    if (db) return Promise.resolve(db);
    return new Promise(function (ok, no) {
      if (!window.indexedDB) return no(new Error("noidb"));
      var r = indexedDB.open(DB, 1);
      r.onupgradeneeded = function () { r.result.createObjectStore(STORE); };
      r.onsuccess = function () { db = r.result; ok(db); };
      r.onerror = function () { no(r.error); };
    });
  }
  function tx(mode, fn) { return open().then(function (d) { return new Promise(function (ok, no) { var t = d.transaction(STORE, mode), q = fn(t.objectStore(STORE)); t.oncomplete = function () { ok(q && q.result); }; t.onerror = function () { no(t.error); }; }); }); }
  function get(id) { return tx("readonly", function (s) { return s.get(id); }).catch(function () { return null; }); }
  function stop() { if (cur) { try { cur.pause(); } catch (e) {} cur = null; } }
  function playUrl(u) {
    return new Promise(function (ok) {
      stop(); var a = new Audio(u); cur = a;
      a.onended = function () { ok(true); }; a.onerror = function () { ok(false); };
      var p = a.play(); if (p && p.catch) p.catch(function () { ok(false); });
    });
  }
  var S = {
    supported: function () { return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder && window.indexedDB); },
    has: function (id) { return get(id).then(function (b) { return !!b; }); },
    play: function (id) {
      return get(id).then(function (b) {
        if (b) { var u = URL.createObjectURL(b); return playUrl(u).then(function (r) { URL.revokeObjectURL(u); return r; }); }
        return playUrl("audio/phonics/" + id + ".mp3");
      });
    },
    remove: function (id) { return tx("readwrite", function (s) { return s.delete(id); }); },
    recording: function () { return !!rec; },
    start: function () {
      return navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
        chunks = []; rec = new MediaRecorder(stream);
        rec.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
        rec._stream = stream; rec.start(); return true;
      });
    },
    finish: function (id) {
      return new Promise(function (ok) {
        if (!rec) return ok(false);
        var r = rec; rec = null;
        r.onstop = function () {
          r._stream.getTracks().forEach(function (t) { t.stop(); });
          var blob = new Blob(chunks, { type: r.mimeType || "audio/webm" });
          if (!blob.size) return ok(false);
          tx("readwrite", function (s) { return s.put(blob, id); }).then(function () { ok(true); }, function () { ok(false); });
        };
        try { r.stop(); } catch (e) { ok(false); }
      });
    }
  };
  window.MFE_SOUND = S;
})();

/* 設定頁的錄音區 */
(function () {
  "use strict";
  var recId = null;
  function api() { return window.MFE_API; }
  function letters() {
    var out = [];
    (api().WCATS || []).forEach(function (c) { c.words.forEach(function (w) { if (w[6]) out.push(w); }); });
    return out;
  }
  window.MFE_SOUND_SETTINGS = function () {
    var S = window.MFE_SOUND, L = letters();
    if (!L.length) return "";
    var h = '<div class="card"><h2>🔤 字母聲音（用你的聲音錄）</h2><p class="muted">瀏覽器內建語音只會唸字母名稱（例如 s 唸成「ess」），不是發音，所以這裡請你自己錄：輕輕發出<b>聲音</b>，不是名稱（s 是「ssss」，m 是「mmmm」）。不用標準，短短 1 秒就好。錄音只存在這台裝置，不會上傳，也不會進備份檔。</p>';
    if (!S.supported()) h += '<p class="muted">⚠️ 這個瀏覽器或開啟方式不支援錄音（需要 https 網址，例如放上 GitHub Pages 後；直接雙擊檔案開啟通常不行）。你也可以把音檔命名成 <b>字母.mp3</b>（例如 s.mp3）放進 <code>audio/phonics/</code> 資料夾上傳。</p>';
    h += '<div class="srows">' + L.map(function (w) {
      var on = recId === w[6];
      return '<div class="srow" data-l="' + w[6] + '"><b class="sl">' + w[6] + '</b><span class="sw">' + api().esc(w[2]) + '</span><span class="ss muted" data-state="' + w[6] + '">…</span>' +
        '<button class="btn small ' + (on ? "orange" : "blue") + '" data-x="srec" data-l="' + w[6] + '">' + (on ? "⏹ 停止並儲存" : "🎙 錄音") + '</button>' +
        '<button class="btn small white" data-x="splay" data-l="' + w[6] + '">▶</button><button class="btn small white" data-x="sdel" data-l="' + w[6] + '" aria-label="刪除錄音">🗑</button></div>';
    }).join("") + "</div></div>";
    return h;
  };
  function refresh() {
    var S = window.MFE_SOUND;
    document.querySelectorAll("[data-state]").forEach(function (el) { S.has(el.dataset.state).then(function (y) { el.textContent = y ? "✅ 已錄" : "（用內建單字語音）"; }); });
  }
  window.MFE_AFTER = window.MFE_AFTER || {};
  window.MFE_AFTER.settings = refresh;
  window.MFE_X = window.MFE_X || {};
  var X = window.MFE_X, S = window.MFE_SOUND;
  X.srec = function (el) {
    var l = el.dataset.l;
    if (S.recording()) { var id = recId; recId = null; S.finish(id).then(function (ok) { api().toast(ok ? "已儲存 " + id : "沒有錄到聲音"); api().render(); }); return; }
    S.start().then(function () { recId = l; api().render(); }, function () { api().toast("無法錄音：請允許麥克風，並確認使用 https 網址"); });
  };
  X.splay = function (el) { S.play(el.dataset.l).then(function (ok) { if (!ok) api().toast("還沒有錄這個聲音"); }); };
  X.sdel = function (el) { if (confirm("刪除 " + el.dataset.l + " 的錄音？")) S.remove(el.dataset.l).then(function () { api().render(); }); };
  X.lsound = function (el) { S.play(el.dataset.l).then(function (ok) { if (!ok) api().toast("還沒有錄這個聲音，請到 ⚙️ 設定錄一下"); }); };
})();
