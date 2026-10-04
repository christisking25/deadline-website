import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "./reveal";

/* Reveals now live in ./reveal.jsx: CSS-driven, visible by default, so a
   throttled or occluded tab can never render the page blank. Re-exported here
   so every existing import site keeps working. */
export { Reveal, Stagger, StaggerItem };

/* Spring presets, from apple-design's quick reference.
   Default UI motion is critically damped (no overshoot); bounce is reserved
   for motion that follows real momentum. */
export const SPRING = { type: "spring", bounce: 0, duration: 0.42 };
export const SPRING_SOFT = { type: "spring", bounce: 0, duration: 0.6 };
export const SPRING_MOMENTUM = { type: "spring", bounce: 0.22, duration: 0.45 };

export const EASE = [0.16, 1, 0.3, 1];

/**
 * Count-up numeral. Runs once on entry.
 * Under reduced motion it prints the final value with no animation.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1800,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : from);

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setValue(to);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    /* Safety net. requestAnimationFrame is paused outright in a background or
       occluded tab, which would strand the counter on its start value and
       show the reader "0h 0m". setTimeout still fires (throttled, but it
       fires), so the real number always lands. */
    const settle = setTimeout(() => setValue(to), duration + 400);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
    };
  }, [inView, reduce, to, from, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Decorative ambient glow. Never announced to assistive tech. */
export function Glow({ className = "", red = false, style }) {
  return (
    <div
      aria-hidden="true"
      className={`glow ${red ? "glow-red" : ""} ${className}`}
      style={style}
    />
  );
}

/** The Deadline mark. Hourglass, gold on dark. Mirrors the iOS app icon. */
export function Hourglass({ size = 24, className = "", title, style }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      style={style}
      role={title ? "img" : "presentation"}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : "true"}
      fill="none"
    >
      <rect x="6.5" y="4" width="19" height="3" rx="1.5" fill="currentColor" />
      <rect x="6.5" y="25" width="19" height="3" rx="1.5" fill="currentColor" />
      <path d="M9.5 9 L22.5 9 L16 15.3 Z" fill="currentColor" />
      <path d="M16 16.7 L22.5 23 L9.5 23 Z" fill="currentColor" />
      <path
        d="M10 7.2 C10 12 16 13.6 16 16 C16 18.4 10 20 10 24.8 M22 7.2 C22 12 16 13.6 16 16 C16 18.4 22 20 22 24.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

/**
 * The real app icon, served at roughly 2x the display size so it stays crisp
 * on retina. The PNGs already carry rounded-corner alpha, so no CSS radius is
 * applied: double-rounding would nibble the artwork's own edge.
 */
export function AppIcon({ size = 32, className = "", priority = false, style }) {
  // Roughly 2x the display size, and no further. The CTA mark was pulling the
  // 229 kB 512px file to render at 132px.
  const src =
    size <= 32
      ? "/assets/logo-64.png"
      : size <= 64
        ? "/assets/logo-128.png"
        : size <= 96
          ? "/assets/icon-192.png"
          : size <= 128
            ? "/assets/icon-256.png"
            : "/assets/icon-512.png";

  return (
    <img
      src={src}
      width={size}
      height={size}
      alt="Deadline app icon"
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      className={className}
      style={{ width: size, height: size, display: "block", ...style }}
    />
  );
}

export const INSTAGRAM_URL = "https://www.instagram.com/hitdeadline/";
export const INSTAGRAM_HANDLE = "@hitdeadline";

/** The Instagram glyph. Inherits colour, so hover states live on the link. */
export function InstagramIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Instagram link. Muted by default, amber on hover and on focus.
 *
 * `rel="noopener noreferrer"` on every instance: `target="_blank"` otherwise
 * hands the opened page a reference to this one through `window.opener`.
 */
export function InstagramLink({
  showHandle = false,
  size = 20,
  className = "",
  label = "Deadline on Instagram",
}) {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={showHandle ? undefined : label}
      className={`group inline-flex min-h-[44px] items-center gap-2.5 text-muted transition-colors duration-200 hover:text-amber focus-visible:text-amber ${className}`}
    >
      <InstagramIcon size={size} />
      {showHandle ? (
        <span className="text-[15px] font-medium">{INSTAGRAM_HANDLE}</span>
      ) : null}
    </a>
  );
}

/** Wordmark lockup used in the navbar and footer. */
export function Logo({ size = 22, iconSize = 32, priority = false }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <AppIcon size={iconSize} priority={priority} />
      <span
        className="font-display font-extrabold tracking-tight text-ink"
        style={{ fontSize: size, letterSpacing: "-0.03em" }}
      >
        Deadline
      </span>
    </span>
  );
}

/**
 * Eyebrow tag, built as the app's TagPill: 10px bold rounded, 0.6 tracking,
 * fill at 15% and stroke at 45% of the accent, capsule.
 */
export function Eyebrow({ children, tone = "amber" }) {
  const color =
    tone === "danger" ? "#FF453A" : tone === "blue" ? "#5AA0FF" : "#FBAE3C";
  return (
    <span
      className="inline-flex items-center rounded-full"
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 10,
        letterSpacing: "0.6px",
        lineHeight: 1,
        textTransform: "uppercase",
        padding: "6px 11px",
        color,
        background: `color-mix(in srgb, ${color} 15%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 45%, transparent)`,
      }}
    >
      {children}
    </span>
  );
}

/** Section heading block: eyebrow, h2, optional lede. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "center",
  tone = "amber",
}) {
  const alignCls =
    align === "left" ? "items-start text-left" : "items-center text-center";
  return (
    <div className={`flex flex-col gap-[var(--s4)] ${alignCls}`}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2 className="t-h2 max-w-[20ch]">{title}</h2>
      {lede ? <p className="t-lede max-w-[58ch]">{lede}</p> : null}
    </div>
  );
}
