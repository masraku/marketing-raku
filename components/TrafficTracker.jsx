"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function TrafficTracker() {
  const pathname = usePathname();
  const lastTracked = useRef("");

  useEffect(() => {
    // Jangan track halaman admin
    if (pathname.startsWith("/admin")) return;

    // Jangan track halaman yang sama berulang
    if (pathname === lastTracked.current) return;
    lastTracked.current = pathname;

    // Kirim page view ke API
    fetch("/api/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer || null,
      }),
    }).catch(() => {
      // Silently fail — tracking tidak boleh ganggu UX
    });
  }, [pathname]);

  return null; // Komponen ini invisible
}
