import { ReactNode } from "react";

/**
 * Full iPhone screen surface (430x904 usable after dynamic island).
 * Keeps all content inside a mobile-first flex column with safe-area-ish padding.
 */
export function Screen({ children, topPad = 56 }: { children: ReactNode; topPad?: number }) {
  return (
    <div
      className="w-full h-full flex flex-col"
      style={{
        paddingTop: topPad,
        background: "#F8FAFC",
        color: "#0F172A",
      }}
    >
      {children}
    </div>
  );
}
