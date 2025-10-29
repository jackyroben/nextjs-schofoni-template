"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Register the service worker
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered successfully:",
            registration.scope,
          );

          // Handle updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (
                  newWorker.state === "installed" &&
                  navigator.serviceWorker.controller
                ) {
                  // Show update prompt to user
                  if (
                    confirm("A new version is available. Refresh to update?")
                  ) {
                    newWorker.postMessage({ type: "SKIP_WAITING" });
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });

      // Handle service worker messages
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("Message from service worker:", event.data);

        // Handle different message types
        if (event.data.type === "CACHE_UPDATED") {
          console.log("Cache has been updated");
        }
      });

      // Check for connection status
      const updateConnectionStatus = () => {
        const isOnline = navigator.onLine;
        console.log(`Network status: ${isOnline ? "online" : "offline"}`);
      };

      window.addEventListener("online", updateConnectionStatus);
      window.addEventListener("offline", updateConnectionStatus);

      return () => {
        window.removeEventListener("online", updateConnectionStatus);
        window.removeEventListener("offline", updateConnectionStatus);
      };
    }
  }, []);

  return null;
}
