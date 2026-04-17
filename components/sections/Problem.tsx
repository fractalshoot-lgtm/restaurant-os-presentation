"use client";

import { motion } from "framer-motion";
import { problem } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Problem() {
  return (
    <section id="problem" className="py-28 md:py-40 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <SectionTitle eyebrow="The problem" title={problem.title} sub={problem.intro} />

        <div className="mt-16 md:mt-20 grid md:grid-cols-3 gap-6">
          {problem.points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-2xl border"
              style={{
                background: "#FFFFFF",
                borderColor: "#E2E8F0",
                boxShadow: "0 2px 14px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-xl mb-6"
                style={{ background: "#F1F5F9", fontSize: 24 }}
              >
                {p.icon}
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#0F172A" }}>
                {p.title}
              </h3>
              <p style={{ color: "#64748B", lineHeight: 1.55 }}>{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
