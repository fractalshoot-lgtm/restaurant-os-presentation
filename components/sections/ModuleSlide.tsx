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

// Choreographed reveal (single timeline triggered on scroll into view):
//   0.0 – 0.6s  Text fades in, large & slightly offset toward page center
//   0.6 – 1.4s  (Text holds big, alone)
//   1.4 – 2.2s  Text shrinks + settles into its column. Phone fades in on the opposite side
//   2.2 – 3.3s  Zoom markers cascade in, one by one, on the phone
// A tidy 3-act beat. User feels: read the headline → UI reveal → detail callouts.
const sectionVariants: Variants = { hidden: {}, visible: {} };

const textVariants: Variants = {
  hidden: { opacity: 0, scale: 1.14, y: 28 },
  visible: {
    opacity: [0, 1, 1, 1, 1],
    y: [28, 0, 0, 0, 0],
    scale: [1.14, 1.14, 1.14, 1, 1],
    transition: {
      duration: 2.6,
      times: [0, 0.2, 0.5, 0.82, 1],
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

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

export function ModuleSlide({
  index,
  eyebrow,
  headline,
  bullets,
  screen,
  zooms,
  flip,
}: Props) {
  // Subtle horizontal offset in phase 1 so the text feels more "centered on the page",
  // not confined to its column. Reverses for flipped slides.
  const phase1Offset = flip ? "-8%" : "8%";

  const textAnimate: Variants["visible"] = {
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
    <section className="py-14 md:py-24 px-5 md:px-10 overflow-x-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={sectionVariants}
        className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-20 items-center ${
          flip ? "lg:[&>div:first-child]:order-2" : ""
        }`}
      >
        {/* Text block — phase 1 */}
        <motion.div
          variants={{
            hidden: textVariants.hidden,
            visible: textAnimate,
          }}
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
              fontSize: "clamp(28px, 4.5vw, 52px)",
              lineHeight: 1.08,
              letterSpacing: -1,
            }}
          >
            {headline}
          </h3>

          <ul className="mt-6 md:mt-8 space-y-3.5 md:space-y-4">
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
                <span
                  className="text-base md:text-lg"
                  style={{ color: "#475569", lineHeight: 1.55 }}
                >
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Phone block — phase 2 + 3 */}
        <motion.div
          variants={phoneVariants}
          className="relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-[280px] lg:max-w-[320px] mx-auto"
        >
          <IphoneFrame
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
