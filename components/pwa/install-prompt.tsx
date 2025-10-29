"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Download, Smartphone } from "lucide-react";

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    // Check if app is already installed
    const isInstalled = window.matchMedia("(display-mode: standalone)").matches;
    if (!isInstalled) {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      const result = await deferredPrompt.prompt();
      console.log(`Install prompt was: ${result}`);
      const { outcome } = result;

      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }

      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error("Error during install:", error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem("pwa-install-dismissed", "true");
  };

  const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (!showPrompt || sessionStorage.getItem("pwa-install-dismissed")) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <Card className="shadow-lg border-primary/20 bg-gradient-to-r from-primary/5 to-blue-500/5">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Install Schofoni</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription className="text-sm">
            Install our app for a better mobile experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isIOSDevice ? (
            <div className="space-y-3">
              <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                  To install on iOS:
                </p>
                <ol className="text-xs space-y-1 text-blue-800 dark:text-blue-200">
                  <li>1. Tap the Share button <span className="inline-block">⎋</span></li>
                  <li>2. Scroll down and tap "Add to Home Screen"</li>
                  <li>3. Tap "Add" to confirm</li>
                </ol>
              </div>
              <Button
                onClick={handleDismiss}
                variant="outline"
                className="w-full text-sm"
              >
                Got it!
              </Button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Button
                onClick={handleInstall}
                className="flex-1 text-sm"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Install App
              </Button>
              <Button
                onClick={handleDismiss}
                variant="outline"
                size="sm"
              >
                Later
              </Button>
            </div>
          )}
          <div className="text-xs text-zinc-600 dark:text-zinc-400">
            <p>✓ Works offline</p>
            <p>✓ Faster loading</p>
            <p>✓ Native app experience</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
