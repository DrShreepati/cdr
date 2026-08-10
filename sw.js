const CACHE_NAME = 'cbcdr-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Install the Service Worker and save the files to the phone's cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Intercept network requests and serve from cache if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
