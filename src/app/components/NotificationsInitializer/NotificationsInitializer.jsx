// components/NotificationsInitializer.jsx
"use client";

import { useEffect } from "react";

export default function NotificationsInitializer() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("🔥 Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("❌ Service Worker registration failed:", error);
        });
    }
  }, []);

  return null; // no UI
}
