"use client";

import { motion } from "framer-motion";

const DESIGN_W = 430;

type Props = {
  /** Top-left of the target in 430x932 design space */
  x: number;
  y: number;
  /** Size of the target (design space px) — marker adopts this shape */
  w: number;
  h: number;
  /** Border radius to match the target's shape */
  radius?: number;
  /** Actual rendered width of the phone (px) — drives scale + line length */
  phoneWidth: number;
  label: string;
  side?: "left" | "right";
  delay?: number;
};

/**
 * Marker draws a rounded rectangle that matches the target card/button's shape.
 * Rendered OUTSIDE the iPhone's scale transform so stroke width and label stay
 * legible at any phone size. Connector line exits from the nearest vertical edge.
 */
export function ZoomMarker({
  x,
  y,
  w,
  h,
  radius = 14,
  phoneWidth,
  label,
  side,
  delay = 0,
}: Props) {
  const scale = phoneWidth / DESIGN_W;
  const actualX = x * scale;
  const actualY = y * scale;
  const actualW = w * scale;
  const actualH = h * scale;
  const actualR = radius * scale;
  const centerX = x + w / 2;
  const isRight = (side ?? (centerX >= DESIGN_W / 2 ? "right" : "left")) === "right";

  const EXTERNAL_OFFSET = 18;
  const LABEL_GAP = 8;

  // Line exits from the rect's right or left edge (mid-height)
  const lineStartX = isRight ? actualW : 0;
  const lineLength = isRight
    ? phoneWidth - actualX - actualW + EXTERNAL_OFFSET
    : actualX + EXTERNAL_OFFSET;

  const lineLeft = isRight ? lineStartX : -lineLength;
  const labelLeft = isRight ? lineStartX + lineLength + LABEL_GAP : undefined;
  const labelRight = isRight ? undefined : lineLength + LABEL_GAP;

  const baseDelay = 2.3 + delay;

  return (
    <motion.div
      className="absolute"
      style={{
        left: actualX,
        top: actualY,
        width: actualW,
        height: actualH,
        zIndex: 30,
        pointerEvents: "none",
      }}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: baseDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Rect that traces the target's shape */}
      <motion.div
        className="absolute inset-0"
        style={{
          borderRadius: actualR,
          border: "2px solid #22C55E",
          boxShadow: "0 0 0 3px rgba(34,197,94,0.18)",
        }}
        animate={{
          boxShadow: [
            "0 0 0 3px rgba(34,197,94,0.18), 0 0 0 rgba(34,197,94,0)",
            "0 0 0 6px rgba(34,197,94,0.05), 0 0 22px rgba(34,197,94,0.45)",
            "0 0 0 3px rgba(34,197,94,0.18), 0 0 0 rgba(34,197,94,0)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dashed connector line — mid-height of the rect */}
      <svg
        className="absolute"
        style={{
          left: lineLeft,
          top: actualH / 2 - 1,
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
          top: actualH / 2 - 14,
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
