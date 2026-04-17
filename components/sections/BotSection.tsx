"use client";

import { motion } from "framer-motion";
import { bot } from "@/lib/content";
import { botTranscript } from "@/lib/demo-data";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function BotSection() {
  return (
    <section
      className="py-20 md:py-32 px-5 md:px-10"
      style={{
        background: "linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-10 md:gap-14 items-center">
        {/* Chat mockup */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "#17212B",
            boxShadow: "0 30px 80px -20px rgba(15,23,42,0.35)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            className="flex items-center gap-3 px-5 py-4"
            style={{
              background: "#242F3D",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ background: "#22C55E", color: "#fff" }}
            >
              🤖
            </div>
            <div>
              <div className="font-semibold" style={{ color: "#fff" }}>
                Prep Tracker Bot
              </div>
              <div className="text-xs" style={{ color: "#7A8B9E" }}>
                online · typing response
              </div>
            </div>
          </div>

          <div className="p-4 md:p-5 space-y-3" style={{ minHeight: 480 }}>
            {botTranscript.map((m, i) => {
              const isUser = m.from === "user";
              const isAlert = m.from === "alert";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.18, ease: "easeOut" }}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[85%] rounded-2xl px-4 py-3"
                    style={{
                      background: isUser ? "#2B5278" : isAlert ? "#3B2D1E" : "#182533",
                      color: "#E9EDF0",
                      border: isAlert ? "1px solid #F59E0B" : "none",
                      fontSize: 13,
                      lineHeight: 1.5,
                    }}
                  >
                    <pre
                      className="whitespace-pre-wrap font-sans"
                      style={{ margin: 0 }}
                    >
                      {m.text}
                    </pre>
                    {isAlert && "buttons" in m && m.buttons && (
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {m.buttons.map((b) => (
                          <div
                            key={b}
                            className="text-center py-2 rounded-lg text-xs font-semibold"
                            style={{
                              background: b.startsWith("✅") ? "#22C55E" : "#475569",
                              color: "#fff",
                            }}
                          >
                            {b}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Features */}
        <div>
          <SectionTitle eyebrow="The bot" title={bot.title} sub={bot.sub} />
          <ul className="mt-10 space-y-5">
            {bot.features.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{ background: "#DCFCE7", color: "#16A34A" }}
                >
                  ✓
                </div>
                <div className="text-lg" style={{ color: "#334155", lineHeight: 1.55 }}>
                  {f}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
