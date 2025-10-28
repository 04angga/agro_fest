const CACHE_NAME = "agroferts-cache-v1";
const urlsToCache = [
  "index.html",
  "akp.html",
  "rekapan.html",
  "style.css",
  "akp.js",
  "rekapan.js",
  "manifest.json",
  "icon-512.png",
];

// Install service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching files...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch request
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Update cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("Old cache removed:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});
