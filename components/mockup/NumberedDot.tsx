"use client";

import { motion } from "framer-motion";

const DESIGN_W = 430;

type Props = {
  /** Top-left of target in design space — used to position the badge vertically */
  x: number;
  y: number;
  /** Target size in design space — badge aligns to the vertical center of the target */
  w: number;
  h: number;
  phoneWidth: number;
  number: number;
  side?: "left" | "right";
  delay?: number;
  onClick?: () => void;
  label?: string;
};

/**
 * Mobile marker: clickable numbered badge sitting in the margin next to the
 * phone. Tapping it opens the enlarge modal focused on the corresponding
 * target inside the phone.
 */
export function NumberedDot({
  x,
  y,
  w,
  h,
  phoneWidth,
  number,
  side,
  delay = 0,
  onClick,
  label,
}: Props) {
  const scale = phoneWidth / DESIGN_W;
  const actualY = (y + h / 2) * scale;
  const centerX = x + w / 2;
  const isRight = (side ?? (centerX >= DESIGN_W / 2 ? "right" : "left")) === "right";

  const BADGE_W = 26;
  const OFFSET = 12;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label ? `Show ${label}` : `Show detail ${number}`}
      className="absolute rounded-full flex items-center justify-center font-bold"
      style={{
        left: isRight ? phoneWidth + OFFSET : -OFFSET - BADGE_W,
        top: actualY - BADGE_W / 2,
        width: BADGE_W,
        height: BADGE_W,
        background: "#22C55E",
        color: "#FFFFFF",
        fontSize: 13,
        boxShadow:
          "0 0 0 3px rgba(255,255,255,0.9), 0 4px 14px rgba(34,197,94,0.45)",
        zIndex: 30,
        border: "none",
        cursor: "pointer",
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.9 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.45,
        delay: 1.8 + delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {number}
    </motion.button>
  );
}
