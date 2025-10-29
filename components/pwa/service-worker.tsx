"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox;

      // Add an event listener to detect when the registered
      // service worker has installed but is waiting to activate.
      wb.addEventListener("waiting", (event) => {
        wb.addEventListener("message", (event) => {
          if (event.data === "skipWaiting") {
            wb.messageSW({ type: "SKIP_WAITING" });
          }
        });

        // Show a prompt to the user asking them to refresh the page
        if (confirm("A new version is available. Refresh to update?")) {
          wb.messageSW({ type: "SKIP_WAITING" });
        }
      });

      // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
      wb.addEventListener("externalactivated", () => {
        console.log("Service worker has been activated!");
      });

      // Add an offline listener
      wb.addEventListener("offline", () => {
        console.log("App is now offline");
      });

      wb.addEventListener("online", () => {
        console.log("App is now online");
      });

      // Register the service worker
      wb.register();
    }
  }, []);

  return null;
}

// Type declarations for workbox
declare global {
  interface Window {
    workbox: any;
  }
}
