"use client";

import { motion, type MotionProps } from "framer-motion";
import { ReactNode } from "react";

const FRAME_W = 430;
const FRAME_H = 932;

type Props = {
  children: ReactNode;
  tilt?: boolean;
  /** Rendered width in px. Height is derived from 430/932. */
  width?: number;
  className?: string;
} & MotionProps;

/**
 * iPhone 16 Pro Max (430x932 design space). Renders at an explicit pixel
 * width; internal content is scaled via a single CSS transform. The outer
 * box is sized to the final rendered dimensions, so nothing leaks into
 * adjacent sections.
 *
 * Markers (ZoomMarker) are rendered OUTSIDE this component so that labels
 * remain at real pixel size (readable on mobile and desktop alike).
 */
export function IphoneFrame({
  children,
  tilt = false,
  width = 320,
  className = "",
  ...motionProps
}: Props) {
  const scale = width / FRAME_W;
  const height = FRAME_H * scale;

  return (
    <motion.div
      className={`mx-auto ${className}`}
      style={{
        width,
        height,
        position: "relative",
        perspective: 1400,
      }}
      {...motionProps}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: FRAME_W,
          height: FRAME_H,
          transformOrigin: "top left",
          transform: tilt
            ? `scale(${scale}) rotateY(-5deg) rotateX(3deg)`
            : `scale(${scale})`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute inset-0 rounded-[64px]"
          style={{
            background:
              "linear-gradient(145deg, #1c1c24 0%, #2b2b34 40%, #0d0d12 100%)",
            boxShadow:
              "0 40px 80px -20px rgba(15,23,42,0.55), 0 0 0 2px rgba(255,255,255,0.04) inset",
            padding: 12,
          }}
        >
          <div
            className="absolute inset-[10px] rounded-[54px]"
            style={{
              background: "linear-gradient(135deg, #3a3a42, #17171c)",
            }}
          />
          <div
            className="absolute inset-[14px] rounded-[50px] overflow-hidden"
            style={{ background: "#F8FAFC" }}
          >
            {children}
            <div
              className="absolute left-1/2 -translate-x-1/2 rounded-full"
              style={{
                top: 14,
                width: 124,
                height: 37,
                background: "#0d0d12",
                zIndex: 50,
              }}
            />
          </div>
          <div
            className="absolute"
            style={{ left: -3, top: 180, width: 4, height: 34, background: "#1f1f26", borderRadius: "2px 0 0 2px" }}
          />
          <div
            className="absolute"
            style={{ left: -3, top: 240, width: 4, height: 60, background: "#1f1f26", borderRadius: "2px 0 0 2px" }}
          />
          <div
            className="absolute"
            style={{ left: -3, top: 310, width: 4, height: 60, background: "#1f1f26", borderRadius: "2px 0 0 2px" }}
          />
          <div
            className="absolute"
            style={{ right: -3, top: 220, width: 4, height: 90, background: "#1f1f26", borderRadius: "0 2px 2px 0" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
