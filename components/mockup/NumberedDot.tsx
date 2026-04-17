"use client";

import { motion } from "framer-motion";

const DESIGN_W = 430;

type Props = {
  /** Target's position inside the 430x932 design space (used for vertical alignment) */
  x: number;
  y: number;
  /** Actual rendered width of the phone (px) */
  phoneWidth: number;
  number: number;
  /** Override which side of the phone the badge sits on */
  side?: "left" | "right";
  delay?: number;
};

/**
 * Mobile zoom marker: a numbered badge that lives OUTSIDE the phone frame
 * (so taps on it don't bubble up to the enlarge button). The badge's vertical
 * position matches the target row, so the eye can line it up with the UI
 * element inside the phone.
 *
 * Positioned absolutely relative to a wrapper of width = phoneWidth.
 * Badge offset is 14px past the phone edge; total horizontal footprint per
 * side is ~34px. The numbered legend below the phone carries the label.
 */
export function NumberedDot({
  x,
  y,
  phoneWidth,
  number,
  side,
  delay = 0,
}: Props) {
  const scale = phoneWidth / DESIGN_W;
  const actualY = y * scale;
  const isRight = (side ?? (x >= DESIGN_W / 2 ? "right" : "left")) === "right";

  const BADGE_W = 24;
  const OFFSET = 12;

  return (
    <motion.div
      className="absolute rounded-full flex items-center justify-center font-bold"
      style={{
        left: isRight ? phoneWidth + OFFSET : -OFFSET - BADGE_W,
        top: actualY - BADGE_W / 2,
        width: BADGE_W,
        height: BADGE_W,
        background: "#22C55E",
        color: "#FFFFFF",
        fontSize: 12,
        boxShadow:
          "0 0 0 3px rgba(255,255,255,0.9), 0 4px 12px rgba(34,197,94,0.4)",
        zIndex: 30,
        pointerEvents: "none",
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.45,
        delay: 1.8 + delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {number}
    </motion.div>
  );
}
