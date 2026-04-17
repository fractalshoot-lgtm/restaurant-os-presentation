"use client";

import { motion } from "framer-motion";

const DESIGN_W = 430;

type Props = {
  x: number;
  y: number;
  phoneWidth: number;
  number: number;
  delay?: number;
};

/** Mobile zoom marker: pulsing numbered circle sitting on the target button. */
export function NumberedDot({ x, y, phoneWidth, number, delay = 0 }: Props) {
  const scale = phoneWidth / DESIGN_W;
  const actualX = x * scale;
  const actualY = y * scale;

  return (
    <motion.div
      className="absolute"
      style={{
        left: actualX - 14,
        top: actualY - 14,
        width: 28,
        height: 28,
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
      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ border: "2px solid #22C55E" }}
        animate={{ scale: [1, 1.7, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Number badge */}
      <div
        className="absolute inset-0 rounded-full flex items-center justify-center font-bold"
        style={{
          background: "#22C55E",
          color: "#FFFFFF",
          fontSize: 12,
          boxShadow: "0 0 0 3px rgba(255,255,255,0.85), 0 3px 10px rgba(34,197,94,0.4)",
        }}
      >
        {number}
      </div>
    </motion.div>
  );
}
