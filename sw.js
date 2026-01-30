const CACHE = "layer-cache-v3"; // ← ここを更新のたびに v4, v5... と上げれば確実
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",
  "./assets/css/main.css",
  "./assets/js/common.js",
  "./assets/js/index.js",
  "./assets/img/bg-index.png",
  "./assets/img/bg-research.png",
  "./assets/img/bg-counsel.png",
  "./assets/img/bg-biblio.png",
  "./assets/img/bg-about.png",
  "./assets/img/bg-hidden.png",
  "./assets/img/char-01.png",
  "./assets/img/char-02.png",
  "./assets/img/char-03.png",
  "./assets/img/hidden-hood-mosaic.png",  // ← ここ重要
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./pages/research-map.html",
  "./pages/research-map.js",
  "./pages/counseling.html",
  "./pages/counseling.js",
  "./pages/bibliography.html",
  "./pages/bibliography.js",
  "./pages/about.html",
  "./pages/about.js",
  "./pages/hidden.html",
  "./pages/hidden.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => (k === CACHE ? null : caches.delete(k)))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  // cache-first
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
});
