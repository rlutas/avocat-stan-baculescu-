"use client";
import React from "react";
import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// SpotlightBeam — a single atmospheric light beam originating from one corner.
//
// origin controls which corner the beam is anchored to and which direction it
// fans out:
//   "top-left"     → anchored top-left,  rotates -45deg (down-right)
//   "top-right"    → anchored top-right, rotates +45deg (down-left)
//   "bottom-left"  → anchored bottom-left,  rotates +45deg (up-right)
//   "bottom-right" → anchored bottom-right, rotates -45deg (up-left)
//
// Gradient design: three overlapping radial shapes that share a common axis.
// All stops extend well past 90 % before hitting transparent so there is no
// visible hard edge — the falloff is always gradual.
// ---------------------------------------------------------------------------

type BeamOrigin = "top-left" | "top-right" | "bottom-left" | "bottom-right";

type SpotlightBeamProps = {
  origin?: BeamOrigin;
  // Primary wide cone — occupies most of the beam volume
  gradientFirst?: string;
  // Narrow bright core running down the center
  gradientSecond?: string;
  // Soft halo that bleeds outward from the near side of the core
  gradientThird?: string;
  // How far (px) the beam drifts side-to-side on each cycle
  xOffset?: number;
  // Width of the primary cone in px
  width?: number;
  // Height (length) of the beam in px — should exceed viewport height
  height?: number;
  // Width of the two narrower accent shapes
  smallWidth?: number;
  // Animation cycle duration in seconds
  duration?: number;
  // Vertical push applied to the primary cone so the wide end sits off-screen
  // Positive = push further away from the anchor corner (default varies per origin)
  translateOffset?: number;
};

// Return value shape used internally
type OriginConfig = {
  // Tailwind classes that position the motion wrapper
  anchorClass: string;
  // CSS rotation for the primary cone (the wide fan shape)
  coneRotation: number;
  // Animation x direction: +1 drifts right first, -1 drifts left first
  driftDir: 1 | -1;
};

function resolveOrigin(origin: BeamOrigin): OriginConfig {
  switch (origin) {
    case "top-left":
      return {
        anchorClass: "absolute top-0 left-0 w-screen h-screen",
        coneRotation: -45,
        driftDir: 1,
      };
    case "top-right":
      return {
        anchorClass: "absolute top-0 right-0 w-screen h-screen",
        coneRotation: 45,
        driftDir: -1,
      };
    case "bottom-left":
      return {
        anchorClass: "absolute bottom-0 left-0 w-screen h-screen",
        coneRotation: 45,
        driftDir: 1,
      };
    case "bottom-right":
      return {
        anchorClass: "absolute bottom-0 right-0 w-screen h-screen",
        coneRotation: -45,
        driftDir: -1,
      };
  }
}

// Which CSS corner property to use when positioning the cone element itself
// (the div that holds the radial gradient).
function coneCornerStyle(origin: BeamOrigin): React.CSSProperties {
  switch (origin) {
    case "top-left":
      return { top: 0, left: 0 };
    case "top-right":
      return { top: 0, right: 0 };
    case "bottom-left":
      return { bottom: 0, left: 0 };
    case "bottom-right":
      return { bottom: 0, right: 0 };
  }
}

// Default translateOffset per origin — pushes the wide end of the cone further
// out so only the tapered near-field of the beam is visible inside the viewport.
function defaultTranslateOffset(origin: BeamOrigin): number {
  // top origins: push beam upward (negative Y in screen space)
  // bottom origins: push beam downward (positive Y, which for a rotated element
  // means the tip starts below the fold)
  switch (origin) {
    case "top-left":
    case "top-right":
      return -280;
    case "bottom-left":
    case "bottom-right":
      return -280;
  }
}

export function SpotlightBeam({
  origin = "top-left",
  gradientFirst,
  gradientSecond,
  gradientThird,
  xOffset = 30,
  width = 500,
  height = 1200,
  smallWidth = 180,
  duration = 14,
  translateOffset,
}: SpotlightBeamProps) {
  const { anchorClass, coneRotation, driftDir } = resolveOrigin(origin);
  const cornerStyle = coneCornerStyle(origin);
  const tY = translateOffset ?? defaultTranslateOffset(origin);

  // -------------------------------------------------------------------------
  // Gradient defaults — gold-toned atmospheric light for a law firm navy bg.
  //
  // Key technique for soft edges:
  //   • The outermost colour stop is always "transparent" at 100 %
  //   • The preceding stop is near-zero alpha (.01) placed at 90–95 %
  //   • This gives a long, gentle feather instead of a sharp cut line
  //   • Opacity values are deliberately low (.06 / .04 / .03) — atmospheric
  // -------------------------------------------------------------------------
  const defaultGradientFirst =
    // Wide cone: focal point pushed to upper-quarter so the bright tip is near
    // the anchor corner; falloff is very gradual past 60 %
    "radial-gradient(60% 55% at 50% 20%, hsla(43, 80%, 58%, .07) 0%, hsla(43, 75%, 50%, .04) 45%, hsla(43, 70%, 45%, .015) 72%, hsla(43, 65%, 40%, .005) 88%, transparent 100%)";

  const defaultGradientSecond =
    // Narrow bright core along the beam axis
    "radial-gradient(35% 60% at 50% 50%, hsla(43, 85%, 62%, .06) 0%, hsla(43, 80%, 55%, .03) 55%, hsla(43, 75%, 48%, .01) 80%, transparent 100%)";

  const defaultGradientThird =
    // Soft lateral halo — very wide, very faint
    "radial-gradient(70% 40% at 50% 50%, hsla(43, 75%, 55%, .04) 0%, hsla(43, 70%, 48%, .015) 60%, hsla(43, 65%, 42%, .005) 85%, transparent 100%)";

  const g1 = gradientFirst ?? defaultGradientFirst;
  const g2 = gradientSecond ?? defaultGradientSecond;
  const g3 = gradientThird ?? defaultGradientThird;

  // For bottom origins the translateOffset acts in the opposite screen direction
  const signedTY =
    origin === "bottom-left" || origin === "bottom-right" ? Math.abs(tY) : tY;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <motion.div
        animate={{ x: [0, driftDir * xOffset, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className={`z-40 pointer-events-none ${anchorClass}`}
      >
        {/* Primary cone — wide fan */}
        <div
          style={{
            ...cornerStyle,
            transform: `translateY(${signedTY}px) rotate(${coneRotation}deg)`,
            background: g1,
            width: `${width}px`,
            height: `${height}px`,
            position: "absolute",
          }}
        />

        {/* Narrow core accent */}
        <div
          style={{
            ...cornerStyle,
            transform:
              origin === "top-right" || origin === "bottom-left"
                ? `rotate(${coneRotation}deg) translate(-5%, -48%)`
                : `rotate(${coneRotation}deg) translate(5%, -48%)`,
            background: g2,
            width: `${smallWidth}px`,
            height: `${height}px`,
            transformOrigin:
              origin === "top-left"
                ? "top left"
                : origin === "top-right"
                ? "top right"
                : origin === "bottom-left"
                ? "bottom left"
                : "bottom right",
            position: "absolute",
          }}
        />

        {/* Wide lateral halo */}
        <div
          style={{
            ...cornerStyle,
            transform:
              origin === "top-right" || origin === "bottom-left"
                ? `rotate(${coneRotation}deg) translate(175%, -65%)`
                : `rotate(${coneRotation}deg) translate(-175%, -65%)`,
            background: g3,
            width: `${smallWidth}px`,
            height: `${height}px`,
            transformOrigin:
              origin === "top-left"
                ? "top left"
                : origin === "top-right"
                ? "top right"
                : origin === "bottom-left"
                ? "bottom left"
                : "bottom right",
            position: "absolute",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Spotlight — convenience wrapper that renders two SpotlightBeams.
// Kept for backwards compatibility. Accepts all SpotlightBeam props and
// renders a top-left beam + a top-right beam (original behaviour).
// For the cross-lighting hero pattern use two <SpotlightBeam> instances
// directly instead of this component.
// ---------------------------------------------------------------------------

type SpotlightProps = Omit<SpotlightBeamProps, "origin">;

export const Spotlight = ({
  gradientFirst,
  gradientSecond,
  gradientThird,
  translateOffset,
  width = 500,
  height = 1200,
  smallWidth = 180,
  duration = 14,
  xOffset = 30,
}: SpotlightProps = {}) => {
  const sharedProps = {
    gradientFirst,
    gradientSecond,
    gradientThird,
    translateOffset,
    width,
    height,
    smallWidth,
    duration,
    xOffset,
  };

  return (
    <>
      <SpotlightBeam origin="top-left" {...sharedProps} />
      <SpotlightBeam origin="top-right" {...sharedProps} />
    </>
  );
};
