"use client";

import { motion } from "framer-motion";

type Props = {
  eyebrow?: string;
  title: string;
  sub?: string;
  center?: boolean;
  light?: boolean;
};

export function SectionTitle({ eyebrow, title, sub, center, light }: Props) {
  return (
    <div className={center ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          style={{ color: light ? "#22C55E" : "#16A34A" }}
        >
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="font-bold tracking-tight"
        style={{
          color: light ? "#FFFFFF" : "#0F172A",
          lineHeight: 1.08,
          fontSize: "clamp(30px, 6vw, 60px)",
          letterSpacing: "-0.5px",
        }}
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 md:mt-5 text-base md:text-xl"
          style={{ color: light ? "#94A3B8" : "#64748B", lineHeight: 1.5 }}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
