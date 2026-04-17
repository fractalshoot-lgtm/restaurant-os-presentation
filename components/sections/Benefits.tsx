"use client";

import { motion } from "framer-motion";
import { benefits } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Stat } from "@/components/ui/Stat";

export function Benefits() {
  return (
    <section
      className="py-20 md:py-32 px-5 md:px-10"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="The business case"
          title={benefits.title}
          sub={benefits.sub}
          center
        />

        <div className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {benefits.stats.map((s, i) => (
            <Stat key={s.label} index={i} {...s} />
          ))}
        </div>

        <div className="mt-14 md:mt-24 grid md:grid-cols-2 gap-5 md:gap-6">
          {benefits.narrative.map((n, i) => (
            <motion.div
              key={n.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 md:p-8 rounded-2xl"
              style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
            >
              <h4 className="text-xl font-bold mb-3" style={{ color: "#0F172A" }}>
                {n.title}
              </h4>
              <p className="text-base" style={{ color: "#475569", lineHeight: 1.55 }}>
                {n.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
