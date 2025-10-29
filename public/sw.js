const CACHE_NAME = "schofoni-v1";
const STATIC_CACHE = "schofoni-static-v1";
const DYNAMIC_CACHE = "schofoni-dynamic-v1";

// URLs to cache on install
const STATIC_ASSETS = [
  "/",
  "/offline",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");

  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log("Service Worker: Caching static assets");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log("Service Worker: Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and external requests
  if (request.method !== "GET" || !url.origin.includes(self.location.origin)) {
    return;
  }

  // Handle different URL patterns with different strategies
  if (url.pathname.startsWith("/api/")) {
    // API calls - Network first with fallback to cache
    event.respondWith(networkFirstWithFallback(request));
  } else if (/\.(png|jpg|jpeg|svg|gif|webp|ico)$/.test(url.pathname)) {
    // Images - Cache first
    event.respondWith(cacheFirst(request));
  } else if (/\.(js|css|html|json)$/.test(url.pathname)) {
    // Static files - Stale while revalidate
    event.respondWith(staleWhileRevalidate(request));
  } else {
    // Pages - Network first with offline fallback
    event.respondWith(networkFirstWithOfflineFallback(request));
  }
});

// Network first with fallback strategy
async function networkFirstWithFallback(request) {
  try {
    const networkResponse = await fetch(request);

    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log("Network failed, trying cache:", error);
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response("Offline", { status: 503, statusText: "Service Unavailable" });
  }
}

// Cache first strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    // Cache the response
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log("Network failed for cache-first:", error);
    return new Response("Offline", { status: 503, statusText: "Service Unavailable" });
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    // Update cache in background
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });

  // Return cached version immediately, or wait for network
  return cachedResponse || fetchPromise;
}

// Network first with offline fallback
async function networkFirstWithOfflineFallback(request) {
  try {
    const networkResponse = await fetch(request);

    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log("Network failed, trying cache:", error);
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page for navigation requests
    if (request.mode === "navigate") {
      return caches.match("/offline");
    }

    return new Response("Offline", { status: 503, statusText: "Service Unavailable" });
  }
}

// Handle messages from clients
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Push notification handler (for future use)
self.addEventListener("push", (event) => {
  const options = {
    body: event.data.text(),
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-192x192.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification("Schofoni", options)
  );
});

// Background sync for future use
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-data") {
    event.waitUntil(syncData());
  }
});

// Placeholder for data synchronization
async function syncData() {
  // Implement background sync logic here
  console.log("Background sync triggered");
  return Promise.resolve();
}
