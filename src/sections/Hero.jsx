import { useMemo, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { AppIcon, Eyebrow, Glow, Reveal, SPRING_SOFT } from "../components/primitives";
import { Phone } from "../components/Phone";
import { HeroLockScreen } from "../components/screens";

/** Slow falling sand. Decorative, and absent entirely under reduced motion. */
function SandField() {
  const reduce = useReducedMotion();

  // Deterministic positions so the field does not reshuffle on re-render.
  const motes = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r = seed / 233280;
        const r2 = ((i * 4591 + 7919) % 1000) / 1000;
        return {
          left: `${(r * 100).toFixed(2)}%`,
          size: 1.5 + r2 * 2,
          delay: (r2 * 16).toFixed(2),
          duration: 16 + r * 14,
          opacity: 0.14 + r2 * 0.3,
        };
      }),
    [],
  );

  if (reduce) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {motes.map((m, i) => (
        <span
          key={i}
          className="absolute top-[-6%] rounded-full bg-amber"
          style={{
            left: m.left,
            width: m.size,
            height: m.size,
            opacity: m.opacity,
            animation: `hero-fall ${m.duration}s linear ${m.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes hero-fall {
          0%   { transform: translate3d(0, 0, 0); opacity: 0; }
          8%   { opacity: var(--o, .35); }
          92%  { opacity: var(--o, .35); }
          100% { transform: translate3d(14px, 112vh, 0); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);

  // Gentle parallax: the phone drifts slower than the page it sits on, which
  // reads as depth without ever detaching from the layout. Spring-smoothed so
  // a flung scroll does not snap it.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const phoneY = useSpring(rawY, { stiffness: 120, damping: 26, mass: 0.5 });

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative pb-[var(--s8)] pt-[104px] lg:pb-[var(--s9)] lg:pt-[128px]"
      style={{ overflowX: "clip" }}
    >
      <Glow
        className="animate-drift"
        style={{ top: "-26%", left: "-12%", width: 640, height: 640 }}
      />
      <Glow style={{ top: "4%", right: "-18%", width: 580, height: 580, opacity: 0.55 }} />
      <SandField />

      <div className="container-d relative grid items-center gap-[var(--s7)] lg:grid-cols-[1.08fr_0.92fr] lg:gap-[var(--s6)]">
        <div className="flex flex-col items-start">
          <Reveal delay={0}>
            <Eyebrow>Screen time that fights back</Eyebrow>
          </Reveal>

          <Reveal as="h1" delay={70} className="t-display mt-[var(--s5)]">
            You&rsquo;re lying
            <br />
            to yourself.
          </Reveal>

          <Reveal as="p" delay={140} className="t-lede mt-[var(--s5)] max-w-[46ch]">
            You said you&rsquo;d study. You said you&rsquo;d hit the gym. You
            said you&rsquo;d start the assignment early.{" "}
            <span className="text-ink">
              Deadline locks your apps until you actually do it.
            </span>
          </Reveal>

          <Reveal
            delay={210}
            className="mt-[var(--s6)] flex w-full flex-col gap-[var(--s3)] sm:w-auto sm:flex-row sm:items-center"
          >
            <a href="#" className="btn-amber w-full sm:w-auto">
              <AppIcon size={26} priority />
              Download on the App Store
            </a>
            <a href="#how" className="btn-ghost w-full sm:w-auto">
              See how it works
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </a>
          </Reveal>

          <Reveal as="p" delay={280} className="mt-[var(--s4)] text-[13px] text-muted">
            iPhone. No account. Nothing leaves your device.
          </Reveal>
        </div>

        <Reveal
          delay={120}
          className="relative mx-auto w-full max-w-[300px] sm:max-w-[320px] lg:max-w-none"
        >
          <motion.div style={reduce ? undefined : { y: phoneY }}>
            <Phone width={312} tilt time="11:47" statusTone="white" float>
              <HeroLockScreen />
            </Phone>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
