"use client";

import { useState, useEffect } from "react";
import { Wifi, WifiOff, Smartphone, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PWAStatusIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [isStandalone, setIsStandalone] = useState(false);
  const [swUpdate, setSwUpdate] = useState(false);

  useEffect(() => {
    // Check online status
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Check if app is installed (standalone mode)
    setIsStandalone(
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes("android-app://")
    );

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isStandalone) {
    return (
      <div className="fixed top-4 right-4 z-40">
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
          <Smartphone className="h-3 w-3 mr-1" />
          Installed
        </Badge>
      </div>
    );
  }

  if (!isOnline) {
    return (
      <div className="fixed top-4 right-4 z-40">
        <Badge variant="destructive" className="animate-pulse">
          <WifiOff className="h-3 w-3 mr-1" />
          Offline
        </Badge>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-40">
      <Badge variant="outline" className="bg-white dark:bg-zinc-900">
        <Wifi className="h-3 w-3 mr-1" />
        Online
      </Badge>
    </div>
  );
}
