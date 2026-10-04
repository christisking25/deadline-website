import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Custom-built iPhone chassis. Pure CSS and SVG, no stock imagery.
 * Screen content is passed as children and rendered inside the bezel.
 */

function StatusBar({ time = "9:41", tone = "white" }) {
  const color = tone === "danger" ? "#FF453A" : "#FFFFFF";
  return (
    <div
      className="relative z-20 flex h-[44px] shrink-0 items-center justify-between px-6 pt-1"
      style={{ color }}
    >
      <span
        className="text-[14px] font-semibold"
        style={{ fontFamily: "var(--font-label)", fontVariantNumeric: "tabular-nums" }}
      >
        {time}
      </span>
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {/* cellular */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill={color}>
          <rect x="0" y="7.5" width="3" height="3.5" rx="1" opacity=".55" />
          <rect x="4.5" y="5.5" width="3" height="5.5" rx="1" opacity=".75" />
          <rect x="9" y="3" width="3" height="8" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        {/* wifi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round">
          <path d="M1 3.6a10 10 0 0 1 14 0" />
          <path d="M3.6 6.3a6.2 6.2 0 0 1 8.8 0" />
          <path d="M6.2 8.9a2.6 2.6 0 0 1 3.6 0" />
        </svg>
        {/* battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.2" stroke={color} opacity=".4" />
          <rect x="2" y="2" width="15" height="8" rx="2" fill={color} />
          <path d="M23 4.2v3.6a2 2 0 0 0 0-3.6Z" fill={color} opacity=".4" />
        </svg>
      </div>
    </div>
  );
}

/**
 * @param {boolean} tilt  3D tilt that follows the pointer. Desktop only.
 * @param {boolean} glow  Gold ambient glow behind the device.
 */
export function Phone({
  children,
  className = "",
  width = 320,
  tilt = false,
  glow = true,
  glowTone = "gold",
  statusTone = "white",
  time = "9:41",
  label,
  float = false,
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });

  const canTilt =
    tilt &&
    !reduce &&
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 1024px) and (hover: hover)").matches;

  const onMove = (e) => {
    if (!canTilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    // Kept small. A big tilt reads as a gimmick and hurts legibility.
    setRot({ x: -py * 8, y: px * 10 });
  };

  const reset = () => setRot({ x: 0, y: 0 });

  const height = Math.round(width * (19.5 / 9));

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: 1400 }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {glow ? (
        <div
          aria-hidden="true"
          className="glow animate-drift"
          style={{
            inset: "-14% -22%",
            filter: "blur(80px)",
            background:
              glowTone === "danger"
                ? "radial-gradient(circle, rgba(255,69,58,0.3) 0%, rgba(255,69,58,0.08) 48%, transparent 70%)"
                : "radial-gradient(circle, rgba(251,174,60,0.28) 0%, rgba(251,174,60,0.08) 48%, transparent 70%)",
          }}
        />
      ) : null}

      <motion.div
        ref={ref}
        animate={{
          rotateX: rot.x,
          rotateY: rot.y,
          // A slow, shallow rise and fall. Well under the 0.2Hz band that
          // triggers motion discomfort, and switched off for reduced motion.
          y: float && !reduce ? [0, -9, 0] : 0,
        }}
        transition={{
          rotateX: { type: "spring", stiffness: 140, damping: 20, mass: 0.7 },
          rotateY: { type: "spring", stiffness: 140, damping: 20, mass: 0.7 },
          y: { duration: 7.5, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{ transformStyle: "preserve-3d", width, maxWidth: "100%" }}
        className="relative mx-auto"
      >
        {/* Outer titanium rail */}
        <div
          className="relative overflow-hidden"
          style={{
            width: "100%",
            aspectRatio: `${width} / ${height}`,
            borderRadius: width * 0.145,
            padding: Math.max(8, width * 0.028),
            background:
              "linear-gradient(150deg, #3a3a3a 0%, #1c1c1c 18%, #121212 50%, #1c1c1c 82%, #333 100%)",
            boxShadow:
              "0 60px 110px -34px rgba(0,0,0,0.92), 0 18px 44px -24px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 1px rgba(255,255,255,0.16)",
          }}
        >
          {/* Screen */}
          <div
            className="relative flex h-full w-full flex-col overflow-hidden bg-bg"
            style={{ borderRadius: width * 0.118 }}
          >
            <StatusBar time={time} tone={statusTone} />

            {/* Dynamic Island */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 z-30 -translate-x-1/2 rounded-full bg-black"
              style={{
                top: Math.round(width * 0.035),
                width: Math.round(width * 0.29),
                height: Math.round(width * 0.098),
              }}
            />

            <div className="relative z-10 flex min-h-0 flex-1 flex-col">
              {children}
            </div>

            {/* Home indicator */}
            <div
              aria-hidden="true"
              className="absolute bottom-[8px] left-1/2 h-[4px] -translate-x-1/2 rounded-full bg-white/35"
              style={{ width: Math.round(width * 0.33) }}
            />
          </div>

          {/* Specular top edge. The one piece of 'liquid card-d' lensing we kept. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: width * 0.145,
              background:
                "linear-gradient(170deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 22%)",
            }}
          />
        </div>
      </motion.div>

      {label ? (
        <p className="mt-5 text-center text-[13px] text-muted">{label}</p>
      ) : null}
    </div>
  );
}

/** Thin app row used inside several screens. */
export function AppRow({ name, color, locked = false, children }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-surface-2 px-3 py-2.5">
      <div
        className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] text-[11px] font-bold text-ink"
        style={{ background: color }}
        aria-hidden="true"
      >
        {name.slice(0, 1)}
      </div>
      <span className="flex-1 truncate text-[13px] font-medium text-ink">
        {name}
      </span>
      {children ??
        (locked ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FBAE3C" strokeWidth="2.2" aria-hidden="true">
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
        ) : null)}
    </div>
  );
}
