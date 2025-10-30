// Simplified Service Worker for Schofoni PWA
const CACHE_NAME = "schofoni-v1";
const urlsToCache = [
  "/",
  "/offline",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

// Install event
self.addEventListener("install", function (event) {
  console.log("[SW] Installing service worker");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        console.log("[SW] Caching essential files");
        return cache.addAll(urlsToCache);
      })
      .then(function () {
        console.log("[SW] Installation complete");
        return self.skipWaiting();
      })
      .catch(function (error) {
        console.error("[SW] Installation failed:", error);
      }),
  );
});

// Activate event
self.addEventListener("activate", function (event) {
  console.log("[SW] Activating service worker");
  event.waitUntil(
    caches
      .keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (cacheName !== CACHE_NAME) {
              console.log("[SW] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(function () {
        console.log("[SW] Activation complete");
        return self.clients.claim();
      }),
  );
});

// Fetch event
self.addEventListener("fetch", function (event) {
  const request = event.request;

  // Only handle GET requests
  if (request.method !== "GET") {
    return;
  }

  // Handle navigation requests
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(function () {
        return caches.match("/offline");
      }),
    );
    return;
  }

  // Handle other requests with cache first strategy
  event.respondWith(
    caches
      .match(request)
      .then(function (response) {
        // Return cached version if available
        if (response) {
          return response;
        }

        // Otherwise fetch from network
        return fetch(request).then(function (response) {
          // Don't cache non-successful responses
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response since it can only be consumed once
          var responseToCache = response.clone();

          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(request, responseToCache);
          });

          return response;
        });
      })
      .catch(function () {
        // If both cache and network fail, return a basic offline response for images
        if (request.url.match(/\.(png|jpg|jpeg|svg|gif)$/)) {
          return new Response("Image not available offline", {
            status: 503,
            statusText: "Service Unavailable",
          });
        }
      }),
  );
});

// Handle messages
self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

console.log("[SW] Service worker script loaded");
