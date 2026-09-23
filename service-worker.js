// LOOP service worker
// Bump this version string on every deploy to invalidate old caches.
const CACHE_VERSION = "loop-v1.6.0";
const CACHE_NAME = CACHE_VERSION;

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// The app's own page can ask this service worker to check for a new
// version right away (used by pull-to-refresh) instead of waiting for
// the browser's normal update check cycle.
self.addEventListener("message", (event) => {
  if (event.data === "CHECK_FOR_UPDATE") {
    self.registration.update();
  }
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Never cache Firestore / Google API calls — always go to network.
  if (url.hostname.includes("googleapis.com") || url.hostname.includes("firestore")) {
    return;
  }

  const isCoreAsset = event.request.mode === "navigate" ||
    url.pathname.endsWith("/style.css") ||
    url.pathname.endsWith("/app.js") ||
    url.pathname.endsWith("/manifest.json");

  if (isCoreAsset) {
    // Network-first: always try to fetch the latest HTML/CSS/JS so a new
    // deploy shows up on the very next load, falling back to cache only
    // when offline.
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request).then((r) => r || caches.match("./index.html")))
    );
    return;
  }

  // Cache-first for everything else (icons, fonts) — these rarely change.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response && response.status === 200 && event.request.method === "GET") {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached);
    })
  );
});
