"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { IphoneFrame } from "./IphoneFrame";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

const FRAME_ASPECT = 932 / 430;

function computeWidth() {
  if (typeof window === "undefined") return 320;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const byWidth = w * 0.9;
  const byHeight = (h * 0.82) / FRAME_ASPECT;
  return Math.floor(Math.min(430, byWidth, byHeight));
}

export function MockupModal({ open, onClose, children, title }: Props) {
  const [phoneWidth, setPhoneWidth] = useState<number>(320);

  // Compute width on mount + resize
  useEffect(() => {
    const update = () => setPhoneWidth(computeWidth());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape key to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

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
            className="absolute top-4 right-4 md:top-6 md:right-6 rounded-full w-11 h-11 flex items-center justify-center text-white"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.14)",
              fontSize: 20,
              lineHeight: 1,
            }}
          >
            ✕
          </button>

          {title && (
            <div
              className="absolute top-5 left-4 md:left-8 text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#22C55E" }}
            >
              {title}
            </div>
          )}

          {/* Phone */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative"
            initial={{ scale: 0.8, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            <IphoneFrame width={phoneWidth}>{children}</IphoneFrame>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
