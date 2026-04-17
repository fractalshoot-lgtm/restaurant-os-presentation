"use client";

import { motion, type Variants } from "framer-motion";
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

/**
 * Render both mobile and desktop variants; CSS picks one per breakpoint.
 * Keeping them as separate components lets each version have its own pace
 * and composition without responsive hacks.
 */
export function ModuleSlide(props: Props) {
  return (
    <>
      <div className="md:hidden">
        <ModuleSlideMobile {...props} />
      </div>
      <div className="hidden md:block">
        <ModuleSlideDesktop {...props} />
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile — compact, stacked, no choreography
// ─────────────────────────────────────────────────────────────

function ModuleSlideMobile({
  index,
  eyebrow,
  headline,
  bullets,
  screen,
}: Props) {
  return (
    <section className="py-10 px-5">
      {/* Text — simple fade-in */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="flex items-center justify-center rounded-full text-xs font-bold"
            style={{
              width: 28,
              height: 28,
              background: "#22C55E",
              color: "#FFFFFF",
            }}
          >
            0{index}
          </div>
          <div
            className="text-[11px] font-semibold tracking-[0.2em] uppercase"
            style={{ color: "#16A34A" }}
          >
            {eyebrow}
          </div>
        </div>

        <h3
          className="font-bold tracking-tight"
          style={{
            color: "#0F172A",
            fontSize: 26,
            lineHeight: 1.12,
            letterSpacing: -0.5,
          }}
        >
          {headline}
        </h3>

        <ul className="mt-4 space-y-2.5">
          {bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span
                className="flex-shrink-0 mt-[7px]"
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#22C55E",
                }}
              />
              <span
                className="text-[14px]"
                style={{ color: "#475569", lineHeight: 1.5 }}
              >
                {b}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Phone — fixed pixel width so nothing leaks into neighbouring sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6"
      >
        <IphoneFrame width={160}>{screen}</IphoneFrame>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Desktop — full choreography (text alone → transforms → phone → zooms)
// ─────────────────────────────────────────────────────────────

const sectionVariants: Variants = { hidden: {}, visible: {} };

const textHidden = { opacity: 0, scale: 1.14, y: 28 };

const phoneVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.95,
      delay: 1.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const markersContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 2.3,
      staggerChildren: 0.18,
    },
  },
};

function ModuleSlideDesktop({
  index,
  eyebrow,
  headline,
  bullets,
  screen,
  zooms,
  flip,
}: Props) {
  const phase1Offset = flip ? "-8%" : "8%";

  const textVisible = {
    opacity: [0, 1, 1, 1, 1],
    y: [28, 0, 0, 0, 0],
    x: [phase1Offset, phase1Offset, phase1Offset, "0%", "0%"],
    scale: [1.14, 1.14, 1.14, 1, 1],
    transition: {
      duration: 2.6,
      times: [0, 0.2, 0.5, 0.82, 1],
      ease: [0.16, 1, 0.3, 1],
    },
  };

  return (
    <section className="py-20 px-10 overflow-x-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={sectionVariants}
        className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-center ${
          flip ? "lg:[&>div:first-child]:order-2" : ""
        }`}
      >
        {/* Text */}
        <motion.div
          variants={{ hidden: textHidden, visible: textVisible }}
          className="relative z-10"
          style={{ transformOrigin: flip ? "right center" : "left center" }}
        >
          <div className="flex items-center gap-3 mb-5">
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
          </div>

          <h3
            className="font-bold tracking-tight"
            style={{
              color: "#0F172A",
              fontSize: "clamp(36px, 4.5vw, 52px)",
              lineHeight: 1.08,
              letterSpacing: -1,
            }}
          >
            {headline}
          </h3>

          <ul className="mt-8 space-y-4">
            {bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span
                  className="flex-shrink-0 mt-[7px]"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#22C55E",
                  }}
                />
                <span className="text-lg" style={{ color: "#475569", lineHeight: 1.55 }}>
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Phone + markers */}
        <motion.div variants={phoneVariants} className="relative mx-auto">
          <IphoneFrame
            width={320}
            overlay={
              <motion.div
                variants={markersContainerVariants}
                className="absolute inset-0"
                style={{ pointerEvents: "none" }}
              >
                {zooms.map((z, i) => (
                  <ZoomMarker key={i} {...z} delay={i * 0.1} />
                ))}
              </motion.div>
            }
          >
            {screen}
          </IphoneFrame>
        </motion.div>
      </motion.div>
    </section>
  );
}
