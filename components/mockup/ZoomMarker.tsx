"use client";

import { motion } from "framer-motion";

const FRAME_W = 430;
const EXTERNAL_OFFSET = 24; // how far past the frame edge the line extends
const LABEL_GAP = 10; // gap between line end and label card

type Props = {
  /** Position of the target button inside the frame (0-430 x, 0-932 y) */
  x: number;
  y: number;
  /** Label shown at the end of the line, outside the frame */
  label: string;
  /** Override auto-detected exit side. By default exits through the nearest edge. */
  side?: "left" | "right";
  /** Delay in seconds */
  delay?: number;
};

/**
 * Pulsing circle sits on the target button inside the iPhone.
 * Dashed line exits through the NEAREST frame edge (shortest path inside the phone)
 * and the label lives entirely in the margin outside.
 * Auto-detects exit side based on x; pass `side` to override.
 */
export function ZoomMarker({ x, y, label, side, delay = 0 }: Props) {
  const isRight = (side ?? (x >= FRAME_W / 2 ? "right" : "left")) === "right";

  // Line: from circle edge to EXTERNAL_OFFSET past the nearest frame edge
  const lineLength = isRight
    ? FRAME_W - x - 8 + EXTERNAL_OFFSET
    : x - 8 + EXTERNAL_OFFSET;

  const lineLeft = isRight ? 8 : -lineLength - 8;
  const labelLeft = isRight ? lineLength + 8 + LABEL_GAP : undefined;
  const labelRight = isRight ? undefined : lineLength + 8 + LABEL_GAP;

  return (
    <motion.div
      className="absolute pointer-events-none hidden md:block"
      style={{ left: x, top: y, zIndex: 30 }}
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Pulsing circle on target */}
      <div className="relative">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 28,
            height: 28,
            left: -14,
            top: -14,
            border: "2px solid #22C55E",
          }}
          animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 14,
            height: 14,
            left: -7,
            top: -7,
            background: "#22C55E",
            boxShadow: "0 0 0 3px rgba(34,197,94,0.25)",
          }}
        />
      </div>

      {/* Dashed line exiting the frame */}
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
          strokeWidth={1.5}
          strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: delay + 0.2, ease: "easeOut" }}
        />
      </svg>

      {/* Label card — sits entirely outside the iPhone frame */}
      <motion.div
        className="absolute whitespace-nowrap rounded-lg"
        style={{
          left: labelLeft,
          right: labelRight,
          top: -18,
          background: "#0F172A",
          color: "#FFFFFF",
          padding: "7px 12px",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 0.2,
          boxShadow: "0 8px 24px rgba(15,23,42,0.18)",
        }}
        initial={{ opacity: 0, x: isRight ? -8 : 8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, delay: delay + 0.5, ease: "easeOut" }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
