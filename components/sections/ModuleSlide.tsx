"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode, useState } from "react";
import { IphoneFrame } from "@/components/mockup/IphoneFrame";
import { ZoomMarker } from "@/components/mockup/ZoomMarker";
import { NumberedDot } from "@/components/mockup/NumberedDot";
import { MockupModal } from "@/components/mockup/MockupModal";

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
// Mobile — stacked, with markers + tap to enlarge
// ─────────────────────────────────────────────────────────────

function ModuleSlideMobile({
  index,
  eyebrow,
  headline,
  bullets,
  screen,
  zooms,
}: Props) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState<{ x: number; y: number; label: string } | null>(null);
  const phoneWidth = 170;

  const openWithHighlight = (z: Zoom) => {
    setHighlight({ x: z.x, y: z.y, label: z.label });
    setOpen(true);
  };

  const openFull = () => {
    setHighlight(null);
    setOpen(true);
  };

  return (
    <section className="py-10 px-5">
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8"
      >
        <div
          className="relative mx-auto"
          style={{ width: phoneWidth }}
        >
          <button
            type="button"
            onClick={openFull}
            aria-label="Enlarge mockup"
            className="cursor-zoom-in block"
            style={{
              border: "none",
              background: "none",
              padding: 0,
              width: phoneWidth,
            }}
          >
            <IphoneFrame width={phoneWidth}>{screen}</IphoneFrame>
          </button>

          {/* Numbered dots on the side — tap one to open modal with highlight */}
          {zooms.map((z, i) => (
            <NumberedDot
              key={i}
              x={z.x}
              y={z.y}
              phoneWidth={phoneWidth}
              number={i + 1}
              label={z.label}
              delay={i * 0.15}
              onClick={() => openWithHighlight(z)}
            />
          ))}
        </div>

        <div
          className="mt-6 text-center text-[11px] font-semibold"
          style={{ color: "#22C55E", letterSpacing: 0.3 }}
        >
          Tap a number or the phone to enlarge ↗
        </div>
      </motion.div>

      <MockupModal
        open={open}
        onClose={() => setOpen(false)}
        title={`0${index} · ${eyebrow}`}
        highlight={highlight}
      >
        {screen}
      </MockupModal>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Desktop — full choreography (text → transform → phone → zooms)
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

function ModuleSlideDesktop({
  index,
  eyebrow,
  headline,
  bullets,
  screen,
  zooms,
  flip,
}: Props) {
  const [open, setOpen] = useState(false);
  const phoneWidth = 320;

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

        <motion.div variants={phoneVariants} className="relative mx-auto">
          <div className="relative mx-auto" style={{ width: phoneWidth }}>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Enlarge mockup"
              className="cursor-zoom-in block"
              style={{
                border: "none",
                background: "none",
                padding: 0,
                width: phoneWidth,
              }}
            >
              <IphoneFrame width={phoneWidth}>{screen}</IphoneFrame>
            </button>

            {zooms.map((z, i) => (
              <ZoomMarker
                key={i}
                {...z}
                phoneWidth={phoneWidth}
                delay={i * 0.18}
              />
            ))}

            <div
              className="absolute left-1/2 -translate-x-1/2 text-xs font-semibold"
              style={{
                bottom: -32,
                color: "#22C55E",
                letterSpacing: 0.3,
              }}
            >
              Click to enlarge ↗
            </div>
          </div>
        </motion.div>
      </motion.div>

      <MockupModal
        open={open}
        onClose={() => setOpen(false)}
        title={`0${index} · ${eyebrow}`}
      >
        {screen}
      </MockupModal>
    </section>
  );
}
