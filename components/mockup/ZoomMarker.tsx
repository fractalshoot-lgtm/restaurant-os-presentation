"use client";

import { motion } from "framer-motion";

type Props = {
  /** Position inside the iPhone frame (0-430 x, 0-932 y) */
  x: number;
  y: number;
  /** Label that appears in the callout card */
  label: string;
  /** Direction the callout card extends from the circle */
  side?: "left" | "right";
  /** Delay in seconds */
  delay?: number;
};

/**
 * Pulsing circle + dashed connector + label card.
 * Positioned absolutely inside the iPhone frame wrapper.
 */
export function ZoomMarker({ x, y, label, side = "right", delay = 0 }: Props) {
  const isRight = side === "right";
  const lineLength = 90;
  const cardOffset = lineLength + 18;

  return (
    <motion.div
      className="absolute pointer-events-none hidden md:block"
      style={{ left: x, top: y, zIndex: 30 }}
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Pulsing circle */}
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
          animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 16,
            height: 16,
            left: -8,
            top: -8,
            background: "#22C55E",
            boxShadow: "0 0 0 4px rgba(34,197,94,0.2)",
          }}
        />
      </div>

      {/* Dashed connector */}
      <svg
        className="absolute"
        style={{
          left: isRight ? 8 : -lineLength - 8,
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

      {/* Label card */}
      <motion.div
        className="absolute whitespace-nowrap rounded-lg"
        style={{
          left: isRight ? cardOffset : undefined,
          right: isRight ? undefined : cardOffset,
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
