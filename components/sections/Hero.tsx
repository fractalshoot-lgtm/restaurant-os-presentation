"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { hero } from "@/lib/content";
import { IphoneFrame } from "@/components/mockup/IphoneFrame";
import { DashboardScreen } from "@/components/mockup/screens/DashboardScreen";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const iphoneY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const iphoneRotate = useTransform(scrollYProgress, [0, 1], [-6, -2]);
  const iphoneOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.6]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{
        background:
          "linear-gradient(160deg, #1A0D2E 0%, #0A0A18 60%, #0A0A18 100%)",
      }}
    >
      {/* Ambient gradient blobs */}
      <div
        aria-hidden
        className="absolute top-10 -left-40 w-[520px] h-[520px] rounded-full blur-[110px] opacity-40"
        style={{ background: "radial-gradient(circle, #22C55E 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-25"
        style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-10 py-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        {/* Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-[0.2em] uppercase"
            style={{
              background: "rgba(34,197,94,0.1)",
              borderColor: "rgba(34,197,94,0.3)",
              color: "#22C55E",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22C55E" }} />
            {hero.eyebrow}
          </motion.div>

          <h1
            className="mt-8 font-bold tracking-tight"
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(44px, 7vw, 86px)",
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            {hero.title.map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="block"
                style={i === hero.title.length - 1 ? { color: "#22C55E" } : undefined}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            className="mt-8 text-lg md:text-xl max-w-xl"
            style={{ color: "#94A3B8", lineHeight: 1.55 }}
          >
            {hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
            className="mt-10 flex items-center gap-4"
          >
            <a
              href="#problem"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold"
              style={{
                background: "#22C55E",
                color: "#0A0A18",
                boxShadow: "0 10px 30px -8px rgba(34,197,94,0.45)",
              }}
            >
              {hero.cta}
              <span>↓</span>
            </a>
            <div className="text-sm" style={{ color: "#64748B" }}>
              6-minute read
            </div>
          </motion.div>
        </div>

        {/* iPhone */}
        <motion.div
          style={{
            y: iphoneY,
            rotate: iphoneRotate,
            opacity: iphoneOpacity,
            scale: 0.72,
            transformOrigin: "center top",
          }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block relative"
        >
          <IphoneFrame tilt>
            <DashboardScreen />
          </IphoneFrame>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold tracking-[0.2em] uppercase"
        style={{ color: "#64748B" }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          Scroll
          <span style={{ fontSize: 16 }}>↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
