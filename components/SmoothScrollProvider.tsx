"use client";

/**
 * Native scroll is faster, smoother and more reliable on mobile than any JS scroll library.
 * This component is kept as a passthrough in case we want to layer in desktop-only polish later.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
