"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  value: string;
  unit?: string;
  label: string;
  sub: string;
  index: number;
};

export function Stat({ value, unit, label, sub, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const count = useMotionValue(0);

  const numeric = /^\d+$/.test(value) ? parseInt(value, 10) : null;
  const rounded = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (inView && numeric !== null) {
      const controls = animate(count, numeric, {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      });
      return () => controls.stop();
    }
  }, [inView, numeric, count, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="p-7 rounded-2xl border flex flex-col"
      style={{
        background: "#FFFFFF",
        borderColor: "#E2E8F0",
        boxShadow: "0 2px 14px rgba(0,0,0,0.04)",
        minHeight: 200,
      }}
    >
      <div className="flex items-baseline gap-1 mb-1">
        {numeric !== null ? (
          <motion.span
            className="text-5xl md:text-6xl font-bold"
            style={{ color: "#0F172A" }}
          >
            {rounded}
          </motion.span>
        ) : (
          <span className="text-5xl md:text-6xl font-bold" style={{ color: "#0F172A" }}>
            {value}
          </span>
        )}
        {unit && (
          <span className="text-xl font-semibold" style={{ color: "#64748B" }}>
            {unit}
          </span>
        )}
      </div>
      <div className="text-sm font-semibold uppercase tracking-wider mt-2" style={{ color: "#22C55E" }}>
        {label}
      </div>
      <p className="mt-3 text-base" style={{ color: "#64748B", lineHeight: 1.5 }}>
        {sub}
      </p>
    </motion.div>
  );
}
