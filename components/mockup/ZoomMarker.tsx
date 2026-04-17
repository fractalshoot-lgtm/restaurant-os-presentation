"use client";

import { motion } from "framer-motion";

const DESIGN_W = 430;

type Props = {
  /** Position inside the 430x932 design space */
  x: number;
  y: number;
  /** Actual rendered width of the phone (px) — drives marker position + line length */
  phoneWidth: number;
  label: string;
  side?: "left" | "right";
  delay?: number;
};

/**
 * Markers render OUTSIDE the iPhone's scale transform (in real pixel coords),
 * so circles, lines and labels stay at a fixed, readable size regardless of
 * phone size.
 * Place as a sibling to IphoneFrame inside a relative wrapper of width = phoneWidth.
 */
export function ZoomMarker({ x, y, phoneWidth, label, side, delay = 0 }: Props) {
  const scale = phoneWidth / DESIGN_W;
  const actualX = x * scale;
  const actualY = y * scale;
  const isRight = (side ?? (x >= DESIGN_W / 2 ? "right" : "left")) === "right";

  const EXTERNAL_OFFSET = 18;
  const LABEL_GAP = 8;

  // Line goes from the circle to just past the phone's real edge
  const lineLength = isRight
    ? phoneWidth - actualX - 6 + EXTERNAL_OFFSET
    : actualX - 6 + EXTERNAL_OFFSET;

  const lineLeft = isRight ? 6 : -lineLength - 6;
  const labelLeft = isRight ? lineLength + 6 + LABEL_GAP : undefined;
  const labelRight = isRight ? undefined : lineLength + 6 + LABEL_GAP;

  const baseDelay = 2.3 + delay;

  return (
    <motion.div
      className="absolute"
      style={{ left: actualX, top: actualY, zIndex: 30, pointerEvents: "none" }}
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: baseDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Pulsing target */}
      <div className="relative">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 22,
            height: 22,
            left: -11,
            top: -11,
            border: "2px solid #22C55E",
          }}
          animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 10,
            height: 10,
            left: -5,
            top: -5,
            background: "#22C55E",
            boxShadow: "0 0 0 3px rgba(34,197,94,0.25)",
          }}
        />
      </div>

      {/* Dashed connector line */}
      <svg
        className="absolute"
        style={{
          left: lineLeft,
          top: -1,
          width: lineLength,
          height: 2,
          overflow: "visible",
        }}
      >
        <motion.line
          x1={0}
          y1={1}
          x2={lineLength}
          y2={1}
          stroke="#22C55E"
          strokeWidth={1.3}
          strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: baseDelay + 0.1, ease: "easeOut" }}
        />
      </svg>

      {/* Label card — outside the phone frame, real pixel size */}
      <motion.div
        className="absolute whitespace-nowrap rounded-md"
        style={{
          left: labelLeft,
          right: labelRight,
          top: -14,
          background: "#0F172A",
          color: "#FFFFFF",
          padding: "5px 9px",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: 0.1,
          boxShadow: "0 6px 20px rgba(15,23,42,0.18)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.3, delay: baseDelay + 0.3, ease: "easeOut" }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
