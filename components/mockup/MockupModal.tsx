"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { IphoneFrame } from "./IphoneFrame";

const DESIGN_W = 430;
const FRAME_ASPECT = 932 / DESIGN_W;

type Highlight = {
  x: number;
  y: number;
  label: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  highlight?: Highlight | null;
};

function computeWidth() {
  if (typeof window === "undefined") return 320;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const byWidth = w * 0.9;
  const byHeight = (h * 0.78) / FRAME_ASPECT;
  return Math.floor(Math.min(430, byWidth, byHeight));
}

export function MockupModal({
  open,
  onClose,
  children,
  title,
  highlight,
}: Props) {
  const [phoneWidth, setPhoneWidth] = useState<number>(320);

  useEffect(() => {
    const update = () => setPhoneWidth(computeWidth());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const scale = phoneWidth / DESIGN_W;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(10,10,24,0.88)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          />

          {/* Close button */}
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 rounded-full w-11 h-11 flex items-center justify-center text-white z-10"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.14)",
              fontSize: 20,
              lineHeight: 1,
            }}
          >
            ✕
          </button>

          {title && !highlight && (
            <div
              className="absolute top-5 left-4 md:left-8 text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#22C55E" }}
            >
              {title}
            </div>
          )}

          {/* Phone + optional highlight */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative"
            initial={{ scale: 0.8, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            <IphoneFrame width={phoneWidth}>{children}</IphoneFrame>

            {highlight && (
              <>
                {/* Glowing halo on the target */}
                <motion.div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: highlight.x * scale - 36,
                    top: highlight.y * scale - 36,
                    width: 72,
                    height: 72,
                    border: "3px solid #22C55E",
                    boxShadow:
                      "0 0 24px rgba(34,197,94,0.7), 0 0 70px rgba(34,197,94,0.3), inset 0 0 20px rgba(34,197,94,0.25)",
                    zIndex: 60,
                  }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{
                    opacity: [0, 1, 0.9, 1, 0.9, 1],
                    scale: [0.6, 1.1, 1, 1.05, 1, 1],
                  }}
                  transition={{
                    duration: 1.8,
                    times: [0, 0.25, 0.45, 0.65, 0.85, 1],
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 0.2,
                  }}
                />

                {/* Label pill */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 rounded-full px-4 py-2 whitespace-nowrap"
                  style={{
                    bottom: -54,
                    background: "#22C55E",
                    color: "#0A0A18",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: 0.2,
                    boxShadow: "0 10px 30px rgba(34,197,94,0.4)",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                >
                  {highlight.label}
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
