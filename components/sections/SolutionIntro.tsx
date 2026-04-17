"use client";

import { motion } from "framer-motion";
import { solution } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function SolutionIntro() {
  const nodeIcons = ["📱", "🗄️", "⚙️", "💬"];

  return (
    <section
      className="py-20 md:py-32 px-5 md:px-10 relative overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="The solution"
          title={solution.title}
          sub={solution.sub}
          center
        />

        <div className="mt-14 md:mt-24 relative">
          {/* Connecting line (SVG) */}
          <svg
            className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 hidden md:block pointer-events-none"
            viewBox="0 0 1000 2"
            preserveAspectRatio="none"
            style={{ height: 2 }}
          >
            <motion.line
              x1={0}
              y1={1}
              x2={1000}
              y2={1}
              stroke="#22C55E"
              strokeWidth={1.5}
              strokeDasharray="6 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </svg>

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
            {solution.nodes.map((n, i) => (
              <motion.div
                key={n.label}
                initial={{ opacity: 0, y: 20, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center"
              >
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-4 md:mb-5"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 12px 32px rgba(15,23,42,0.08)",
                    fontSize: 26,
                  }}
                >
                  {nodeIcons[i]}
                </div>
                <div className="font-bold text-lg" style={{ color: "#0F172A" }}>
                  {n.label}
                </div>
                <div
                  className="text-sm mt-2 max-w-[180px]"
                  style={{ color: "#64748B", lineHeight: 1.45 }}
                >
                  {n.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 md:mt-20 text-center text-base md:text-lg font-semibold"
          style={{ color: "#0F172A" }}
        >
          Runs on any phone. <span style={{ color: "#22C55E" }}>No app store.</span>{" "}
          <span style={{ color: "#22C55E" }}>No install friction.</span>
        </motion.p>
      </div>
    </section>
  );
}
