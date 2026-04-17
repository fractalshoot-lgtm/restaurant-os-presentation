"use client";

import { motion } from "framer-motion";
import { cta } from "@/lib/content";

export function CTA() {
  return (
    <section
      className="py-20 md:py-32 px-5 md:px-10 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #1A0D2E 0%, #0A0A18 80%)",
      }}
    >
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-25"
        style={{ background: "radial-gradient(circle, #22C55E 0%, transparent 70%)" }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-bold tracking-tight"
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(40px, 6vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: -1.5,
          }}
        >
          {cta.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-xl"
          style={{ color: "#94A3B8", lineHeight: 1.55 }}
        >
          {cta.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <button
            type="button"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-lg font-bold"
            style={{
              background: "#22C55E",
              color: "#0A0A18",
              boxShadow: "0 15px 50px -10px rgba(34,197,94,0.5)",
            }}
          >
            {cta.button}
            <span>→</span>
          </button>
        </motion.div>

        <div className="mt-24 text-sm" style={{ color: "#64748B" }}>
          {cta.footer}
        </div>
      </div>
    </section>
  );
}
