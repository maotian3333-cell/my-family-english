// 離線快取：核心檔案先存起來，PDF 學習單第一次打開時再存。
// 更新網站內容時，把 VERSION 改成新的編號，舊快取會自動清除。
var VERSION = "mfe-v2.8";
var CORE = [
  "./",
  "index.html",
  "css/style.css",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "js/activities.js",
  "js/app.js",
  "js/kid.js",
  "js/kinds.js",
  "js/di.js",
  "js/sound.js",
  "data/art-b.js",
  "data/art-c.js",
  "data/art-d.js",
  "data/art.js",
  "data/curriculum.js",
  "data/lessons-b.js",
  "data/lessons-zcd.js",
  "data/lessons.js",
  "data/media-b.js",
  "data/media.js",
  "data/phrases-b.js",
  "data/phrases.js",
  "data/practice.js",
  "data/practice2.js",
  "data/phonics.js",
  "data/stage-c.js",
  "data/words-b.js",
  "data/words.js",
  "fonts/GenSenRounded2TW-B.woff",
  "fonts/GenSenRounded2TW-H.woff",
  "fonts/GenSenRounded2TW-R.woff",
  "fonts/OFL.txt"
];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(caches.match(r, { ignoreSearch: true }).then(function (hit) {
    return hit || fetch(r).then(function (res) {
      if (res && res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(r, copy); }); }
      return res;
    });
  }));
});
