"use client";

import { motion, type MotionProps } from "framer-motion";
import { ReactNode } from "react";

const FRAME_W = 430;
const FRAME_H = 932;

type Props = {
  children: ReactNode;
  /** Decorative children (e.g. ZoomMarkers) positioned absolutely in the 430x932 coord system. */
  overlay?: ReactNode;
  tilt?: boolean;
  /** Rendered width in px. Height is derived from the 430/932 aspect. */
  width?: number;
  className?: string;
} & MotionProps;

/**
 * iPhone 16 Pro Max (430x932). Renders at an explicit pixel width — parent
 * passes the width per breakpoint. Internally we scale the 430x932 design via
 * a single CSS transform and let the frame box inherit the final scaled size,
 * so nothing leaks into adjacent sections.
 */
export function IphoneFrame({
  children,
  overlay,
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
        {/* Outer bezel */}
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
          {/* Inner titanium ring */}
          <div
            className="absolute inset-[10px] rounded-[54px]"
            style={{
              background: "linear-gradient(135deg, #3a3a42, #17171c)",
            }}
          />
          {/* Screen */}
          <div
            className="absolute inset-[14px] rounded-[50px] overflow-hidden"
            style={{ background: "#F8FAFC" }}
          >
            {children}
            {/* Dynamic island */}
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
          {/* Side buttons */}
          <div
            className="absolute"
            style={{
              left: -3,
              top: 180,
              width: 4,
              height: 34,
              background: "#1f1f26",
              borderRadius: "2px 0 0 2px",
            }}
          />
          <div
            className="absolute"
            style={{
              left: -3,
              top: 240,
              width: 4,
              height: 60,
              background: "#1f1f26",
              borderRadius: "2px 0 0 2px",
            }}
          />
          <div
            className="absolute"
            style={{
              left: -3,
              top: 310,
              width: 4,
              height: 60,
              background: "#1f1f26",
              borderRadius: "2px 0 0 2px",
            }}
          />
          <div
            className="absolute"
            style={{
              right: -3,
              top: 220,
              width: 4,
              height: 90,
              background: "#1f1f26",
              borderRadius: "0 2px 2px 0",
            }}
          />
        </div>

        {/* Overlay shares the scaled coord system (zoom markers) */}
        {overlay}
      </div>
    </motion.div>
  );
}
