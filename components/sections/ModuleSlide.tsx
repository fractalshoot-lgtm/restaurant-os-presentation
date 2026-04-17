"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { IphoneFrame } from "@/components/mockup/IphoneFrame";
import { ZoomMarker } from "@/components/mockup/ZoomMarker";

export type Zoom = {
  x: number;
  y: number;
  label: string;
  side?: "left" | "right";
  delay?: number;
};

type Props = {
  index: number;
  eyebrow: string;
  headline: string;
  bullets: readonly string[];
  screen: ReactNode;
  zooms: Zoom[];
  flip?: boolean;
};

export function ModuleSlide({
  index,
  eyebrow,
  headline,
  bullets,
  screen,
  zooms,
  flip,
}: Props) {
  return (
    <section className="py-16 md:py-32 px-5 md:px-10">
      <div
        className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-20 items-center ${
          flip ? "lg:[&>div:first-child]:order-2" : ""
        }`}
      >
        {/* Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <div
              className="flex items-center justify-center rounded-full text-sm font-bold"
              style={{
                width: 36,
                height: 36,
                background: "#22C55E",
                color: "#FFFFFF",
              }}
            >
              0{index}
            </div>
            <div
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#16A34A" }}
            >
              {eyebrow}
            </div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold tracking-tight"
            style={{
              color: "#0F172A",
              fontSize: "clamp(28px, 4.5vw, 52px)",
              lineHeight: 1.08,
              letterSpacing: -1,
            }}
          >
            {headline}
          </motion.h3>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
            }}
            className="mt-6 md:mt-8 space-y-3.5 md:space-y-4"
          >
            {bullets.map((b) => (
              <motion.li
                key={b}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="flex gap-3"
              >
                <span
                  className="flex-shrink-0 mt-[7px]"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#22C55E",
                  }}
                />
                <span
                  className="text-base md:text-lg"
                  style={{ color: "#475569", lineHeight: 1.55 }}
                >
                  {b}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* iPhone + zoom markers — responsive via container queries */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[360px] mx-auto"
        >
          <IphoneFrame
            overlay={
              <>
                {zooms.map((z, i) => (
                  <ZoomMarker key={i} {...z} delay={z.delay ?? 0.4 + i * 0.25} />
                ))}
              </>
            }
          >
            {screen}
          </IphoneFrame>
        </motion.div>
      </div>
    </section>
  );
}
