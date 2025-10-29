import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { PWAInstallPrompt } from "@/components/pwa/install-prompt";
import { ServiceWorkerRegistration } from "@/components/pwa/service-worker";
import { PWAStatusIndicator } from "@/components/pwa/status-indicator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Schofoni - Transform Your Learning Experience",
  description:
    "Join Schofoni to accelerate your learning journey with innovative educational platform, expert instructors, and a supportive community.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Schofoni",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Schofoni",
    title: "Schofoni - Transform Your Learning Experience",
    description:
      "Join Schofoni to accelerate your learning journey with innovative educational platform, expert instructors, and a supportive community.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Schofoni - Transform Your Learning Experience",
    description:
      "Join Schofoni to accelerate your learning journey with innovative educational platform, expert instructors, and a supportive community.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Schofoni" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ServiceWorkerRegistration />
          {children}
          <PWAInstallPrompt />
          <PWAStatusIndicator />
        </AuthProvider>
      </body>
    </html>
  );
}
