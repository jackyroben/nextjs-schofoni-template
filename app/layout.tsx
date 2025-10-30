import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Schofoni - Transform Your Learning Experience",
  description:
    "Transform your learning experience with our innovative educational platform. Connect, learn, and grow with a community dedicated to excellence.",
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
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
      "Transform your learning experience with our innovative educational platform. Connect, learn, and grow with a community dedicated to excellence.",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 512,
        height: 512,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Schofoni - Transform Your Learning Experience",
    description:
      "Transform your learning experience with our innovative educational platform. Connect, learn, and grow with a community dedicated to excellence.",
    images: ["/icons/icon-512x512.png"],
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js', { scope: '/' })
                    .then(function(registration) {
                      console.log('SW registered successfully with scope: ', registration.scope);
                      console.log('SW registration: ', registration);

                      // Check if the service worker is activated
                      if (registration.active) {
                        console.log('SW is active');
                      } else if (registration.installing) {
                        console.log('SW is installing');
                        registration.installing.addEventListener('statechange', function() {
                          if (this.state === 'activated') {
                            console.log('SW activated successfully');
                          }
                        });
                      }
                    })
                    .catch(function(registrationError) {
                      console.error('SW registration failed: ', registrationError);
                    });
                });
              } else {
                console.log('Service Worker is not supported in this browser');
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
