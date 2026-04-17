"use client";

import { motion, type MotionProps } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  tilt?: boolean;
  className?: string;
} & MotionProps;

/**
 * iPhone 16 Pro Max physical dimensions (scaled): 430 x 932 display, ~460 x 950 with bezel.
 * We render the frame as a div with real pixel-ish values, then scale with CSS transform on parent.
 */
export function IphoneFrame({ children, tilt = false, className = "", ...motionProps }: Props) {
  return (
    <motion.div
      className={`relative mx-auto ${className}`}
      style={{
        width: 430,
        height: 932,
        perspective: 1400,
      }}
      {...motionProps}
    >
      <div
        className="relative"
        style={{
          width: "100%",
          height: "100%",
          transform: tilt ? "rotateY(-6deg) rotateX(4deg)" : undefined,
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
            style={{
              background: "#F8FAFC",
            }}
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
      </div>
    </motion.div>
  );
}
