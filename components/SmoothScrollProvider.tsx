"use client";

import { useEffect } from "react";

/**
 * Thin wrapper around the page tree:
 *  - Disables the browser's scroll-restoration so every refresh/deploy lands on the hero.
 *  - Scrolls to top on mount.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return <>{children}</>;
}
