"use client";

import { motion, type MotionProps } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Decorative children (e.g. ZoomMarkers) positioned absolutely in the scaled coord system. */
  overlay?: ReactNode;
  tilt?: boolean;
  /** Max display width in px. Frame scales down on narrower containers via container queries. */
  maxWidth?: number;
  className?: string;
} & MotionProps;

/**
 * iPhone 16 Pro Max — display 430x932, bezel ~460x950.
 * Uses container queries to scale the whole frame to fit its parent,
 * so the same component works from 320px to 460px+ without layout shift.
 */
export function IphoneFrame({
  children,
  overlay,
  tilt = false,
  maxWidth = 430,
  className = "",
  ...motionProps
}: Props) {
  return (
    <motion.div
      className={`iphone-container mx-auto ${className}`}
      style={{
        width: "100%",
        maxWidth,
        maxHeight: "72vh",
        aspectRatio: "430 / 932",
        position: "relative",
        containerType: "inline-size",
        perspective: 1400,
      }}
      {...motionProps}
    >
      {/* Scaled inner: fixed 430x932 coord system, transform maps it to container width */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 430,
          height: 932,
          transformOrigin: "top left",
          transform: tilt
            ? "scale(calc(100cqw / 430)) rotateY(-5deg) rotateX(3deg)"
            : "scale(calc(100cqw / 430))",
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

        {/* Overlay (e.g. zoom markers) — share the scaled coordinate system */}
        {overlay}
      </div>
    </motion.div>
  );
}
