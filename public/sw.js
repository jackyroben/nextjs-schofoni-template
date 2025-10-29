// Service Worker for Schofoni PWA
const CACHE_VERSION = "v1";
const STATIC_CACHE = `schofoni-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `schofoni-dynamic-${CACHE_VERSION}`;

// Files to cache on install
const STATIC_ASSETS = [
  "/",
  "/offline",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

// Install event - cache essential files
self.addEventListener("install", (event) => {
  console.log("[SW] Installing...");

  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log("[SW] Caching static assets");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log("[SW] Installation complete");
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("[SW] Installation failed:", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating...");

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log("[SW] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("[SW] Activation complete");
        return self.clients.claim();
      })
  );
});

// Fetch event - handle requests with caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests from our origin
  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  // Route to appropriate caching strategy
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  } else if (/\.(png|jpg|jpeg|svg|gif|webp|ico)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (/\.(js|css|html|json)$/i.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
  } else {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  }
});

// Network First strategy - try network, fallback to cache
async function networkFirst(request, cacheName) {
  try {
    console.log("[SW] Network first for:", request.url);

    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log("[SW] Network failed, trying cache:", error);
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response("Network error", {
      status: 508,
      statusText: "Network Timeout"
    });
  }
}

// Cache First strategy - try cache, fallback to network
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    console.log("[SW] Cache hit for:", request.url);
    return cachedResponse;
  }

  try {
    console.log("[SW] Cache miss, fetching:", request.url);

    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log("[SW] Network failed for cache-first:", error);
    return new Response("Offline", {
      status: 503,
      statusText: "Service Unavailable"
    });
  }
}

// Stale While Revalidate strategy - serve cache, update in background
async function staleWhileRevalidate(request, cacheName) {
  const cachedResponse = await caches.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch((error) => {
    console.log("[SW] Background fetch failed:", error);
  });

  return cachedResponse || fetchPromise;
}

// Handle messages from clients
self.addEventListener("message", (event) => {
  console.log("[SW] Message received:", event.data);

  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Push notification handler (ready for future implementation)
self.addEventListener("push", (event) => {
  console.log("[SW] Push notification received:", event);

  const options = {
    body: event.data ? event.data.text() : "New update available!",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-192x192.png",
    vibrate: [100, 50, 100],
    tag: "schofoni-update",
  };

  event.waitUntil(
    self.registration.showNotification("Schofoni", options)
  );
});

// Background sync handler
self.addEventListener("sync", (event) => {
  console.log("[SW] Background sync triggered:", event.tag);

  if (event.tag === "background-sync") {
    event.waitUntil(performBackgroundSync());
  }
});

// Placeholder for background sync functionality
async function performBackgroundSync() {
  console.log("[SW] Performing background sync...");
  // Implement your sync logic here
  return Promise.resolve();
}
