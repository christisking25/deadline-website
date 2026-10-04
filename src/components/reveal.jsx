import { useEffect, useRef } from "react";

/**
 * Scroll reveals, rebuilt to be safe.
 *
 * The old version animated with Framer `whileInView`, which meant every
 * section's resting state was `opacity: 0` and the only thing that ever made
 * it visible was an IntersectionObserver callback. A tab that is backgrounded,
 * occluded, or throttled never runs those callbacks, so the entire page
 * rendered blank. That is a content bug wearing an animation costume.
 *
 * Now: content is visible by default in CSS. JS *opts in* to hiding it by
 * putting `js-reveal` on <html>, and a watchdog force-reveals everything if
 * the observer has not done its job. Worst case the animation is skipped and
 * the page is simply readable, which is the correct failure mode.
 *
 * Reveals are CSS transitions rather than springs on purpose: nothing here is
 * grabbable, so there is no velocity to inherit and no interruption to honour.
 * Springs are reserved for the scroll-linked and interactive motion where
 * apple-design actually calls for them.
 */

const ARMED = "js-reveal";
const IN = "is-in";

let observer = null;
let watchdog = null;
const pending = new Set();

function revealAll() {
  for (const el of pending) el.classList.add(IN);
  pending.clear();
}

function ensureObserver() {
  if (observer || typeof window === "undefined") return observer;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return null;

  document.documentElement.classList.add(ARMED);

  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add(IN);
        pending.delete(e.target);
        observer.unobserve(e.target);
      }
    },
    // Fire a little before the element is fully on screen so the motion has
    // finished by the time it reaches comfortable reading position.
    { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
  );

  // Safety net. If anything stops the observer from running (throttled tab,
  // occluded window, a bug), show everything rather than show nothing.
  watchdog = setTimeout(revealAll, 2600);
  window.addEventListener("pagehide", revealAll, { once: true });

  return observer;
}

function useRevealRef(delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = ensureObserver();
    if (!io) {
      el.classList.add(IN); // reduced motion, or no observer: just be visible
      return;
    }

    if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);

    // Register with the watchdog first, always. Anything that reveals by
    // another route just removes itself from the set.
    pending.add(el);

    // Already on screen at mount (above the fold, or a hash jump): reveal on a
    // timer rather than rAF. rAF does not run in a throttled or occluded tab,
    // which would strand the hero invisible; timers still fire.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      const t = setTimeout(() => {
        el.classList.add(IN);
        pending.delete(el);
      }, 16);
      return () => {
        clearTimeout(t);
        pending.delete(el);
      };
    }

    io.observe(el);
    return () => {
      pending.delete(el);
      io.unobserve(el);
    };
  }, [delay]);

  return ref;
}

/** Fade and lift. Visible by default; the hidden state only exists under JS. */
export function Reveal({ children, delay = 0, className = "", as: Tag = "div", ...rest }) {
  const ref = useRevealRef(delay);
  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Staggered group. The stagger is pure CSS (`--reveal-delay` per child), so
 * there is no JS orchestration to fall out of sync or stall mid-sequence.
 */
export function Stagger({ children, className = "", step = 70, ...rest }) {
  const ref = useRevealRef(0);
  return (
    <div
      ref={ref}
      className={`reveal reveal-group ${className}`}
      style={{ "--reveal-step": `${step}ms` }}
      {...rest}
    >
      {children}
    </div>
  );
}

/** A child of Stagger. Index drives its delay via nth-child in CSS. */
export function StaggerItem({ children, className = "", ...rest }) {
  return (
    <div className={`reveal-item ${className}`} {...rest}>
      {children}
    </div>
  );
}
