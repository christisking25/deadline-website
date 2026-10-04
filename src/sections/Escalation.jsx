import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { Glow, SectionHeading, Reveal } from "../components/primitives";
import { Phone } from "../components/Phone";
import { StageScreen } from "../components/screens";

/* The centerpiece. Scroll drives both the beam and the phone screen,
   and the accent shifts from gold to red as the deadline closes in. */

const STAGES = [
  {
    id: "d4",
    shieldSubtitle: "MATH 235 · Problem Set 6 is due Friday.\nNothing is locked yet.",
    kind: "notify",
    when: "4 days before",
    days: "4 days out",
    title: "A reminder.",
    lockLabel: "0h",
    headline: "Still open.",
    body: "Nothing is locked. This is the easy part, and it is the only easy part.",
    copy: "A notification, nothing more. Your apps stay open. Deadline tells you the clock started and then gets out of your way.",
    progress: 0,
    tone: "gold",
    accent: "#FBAE3C",
  },
  {
    id: "d3",
    shieldSubtitle: "Submit your assignment to unlock.\nMATH 235 · Problem Set 6 · Due in 3d",
    kind: "lock",
    when: "3 days before",
    days: "3 days out",
    title: "4 hour lock.",
    lockLabel: "4h",
    headline: "Four hours.",
    body: "Your chosen apps are gone for a block of the day. Pick the block or let Deadline pick it.",
    copy: "The first real block. Four hours without the apps you reach for by reflex. Short enough to survive, long enough to notice.",
    progress: 17,
    tone: "gold",
    accent: "#FBAE3C",
  },
  {
    id: "d2",
    shieldSubtitle: "Submit your assignment to unlock.\nMATH 235 · Problem Set 6 · Due in 2d",
    kind: "lock",
    when: "2 days before",
    days: "2 days out",
    title: "12 hour lock.",
    lockLabel: "12h",
    headline: "Half your day.",
    body: "Twelve hours dark. You have had two days. Deadline noticed what you did with them.",
    copy: "Half the day is gone. At this point the app is no longer suggesting. You are working inside a window it decided for you.",
    progress: 50,
    tone: "gold",
    accent: "#FBAE3C",
  },
  {
    id: "d1",
    shieldSubtitle: "Submit your assignment to unlock.\nMATH 235 · Problem Set 6 · Due in 23h 41m",
    kind: "lock",
    when: "1 day before",
    days: "Tomorrow",
    title: "24 hour lock.",
    lockLabel: "24h",
    headline: "All day.",
    body: "One day left. There is nothing on your phone for you now except the work.",
    copy: "A full day. No scrolling, no checking, no five minute breaks that turn into ninety. Just the thing you have been avoiding.",
    progress: 82,
    tone: "gold",
    accent: "#FF8A3D",
  },
  {
    id: "d0",
    shieldSubtitle: "Submit your assignment to unlock.\nMATH 235 · Problem Set 6 · Due in 2h 8m",
    kind: "lock",
    when: "Due date",
    days: "Due today",
    title: "Full lockdown.",
    lockLabel: "Locked",
    headline: "Full lockdown.",
    body: "Everything you chose is shut until the work is done and proven. This is what you asked for.",
    copy: "Total shutdown on Strict and No Excuses. The apps come back when you submit proof, and not one minute earlier.",
    progress: 100,
    tone: "danger",
    accent: "#FF453A",
  },
];

function StageCard({ stage, active, index, onActivate }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && onActivate(index),
      // Narrow band across the middle of the viewport, so exactly one
      // stage owns the phone at a time.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index, onActivate]);

  const danger = stage.tone === "danger";

  return (
    <div ref={ref} className="relative py-[var(--s6)] lg:py-[var(--s8)]">
      {/* Node */}
      <span
        aria-hidden="true"
        className="absolute left-[-39px] top-[52px] hidden h-[18px] w-[18px] rounded-full border-2 transition-all duration-500 lg:block"
        style={{
          borderColor: active ? stage.accent : "rgba(255,255,255,0.18)",
          background: active ? stage.accent : "#0B0B0C",
          boxShadow: active ? `0 0 22px ${stage.accent}` : "none",
          transform: active ? "scale(1.15)" : "scale(1)",
        }}
      />

      {/* The card chrome is mobile-only: on desktop the stage sits directly on
          the page beside the sticky phone. Backgrounds go through classes, not
          inline style, so the lg: resets can actually win. */}
      <div
        className={`rounded-2xl border p-6 transition-all duration-500 sm:p-8 lg:border-0 lg:bg-transparent lg:p-0 ${
          active
            ? "border-[rgba(251,174,60,0.3)] bg-[rgba(20,20,20,0.6)]"
            : "border-[rgba(255,255,255,0.08)] bg-[rgba(20,20,20,0.3)]"
        }`}
      >
        <span
          className="label-d mb-4 block transition-colors duration-500"
          style={{ color: active ? stage.accent : "#8A8A8A" }}
        >
          {stage.when}
        </span>

        <h3
          className="t-h2 mb-[var(--s3)] transition-colors duration-500"
          style={{ color: active ? (danger ? stage.accent : "#FFFFFF") : "rgba(255,255,255,0.55)" }}
        >
          {stage.title}
        </h3>

        <p className="t-lede max-w-[42ch]">
          {stage.copy}
        </p>

        {/* Inline visual. On mobile this is the section's visual, since the
            sticky phone is desktop only. */}
        <div className="mt-6 max-w-[380px] rounded-xl border border-hairline bg-surface p-4 lg:hidden">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="label-d text-muted">Apps locked for</span>
            <span className="numeral text-[13px]" style={{ color: stage.accent }}>
              {stage.lockLabel}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.max(stage.progress, 3)}%`,
                background: stage.accent,
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Escalation() {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 55%", "end 65%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  });

  const stage = STAGES[active];

  // Hue ramp for the ambient light. Tracks the same scroll progress as the
  // beam, so the colour of the room and the colour of the timeline agree.
  const dreadProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 24,
    restDelta: 0.001,
  });
  const dreadR = useTransform(dreadProgress, [0, 0.55, 1], [251, 255, 255]);
  const dreadG = useTransform(dreadProgress, [0, 0.55, 1], [174, 138, 69]);
  const dreadB = useTransform(dreadProgress, [0, 0.55, 1], [60, 61, 58]);
  const dreadOpacity = useTransform(dreadProgress, [0, 0.6, 1], [0.55, 0.8, 1]);
  const dread = useMotionTemplate`radial-gradient(920px 640px at 72% 42%, rgba(${dreadR}, ${dreadG}, ${dreadB}, 0.16), transparent 70%)`;

  return (
    /* overflow-x: clip rather than overflow: hidden. `hidden` turns this
       section into a scroll container, which silently disables the sticky
       phone below; `clip` contains the glows without that side effect. */
    <section
      id="escalation"
      className="section-pad relative"
      style={{ overflowX: "clip" }}
    >
      {/* Cinematic pass: one ambient light for the whole section whose hue and
          intensity are driven by scroll position, so the room itself goes from
          warm to alarmed as the deadline closes in. Decorative, and frozen at
          the amber end under reduced motion. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={
          reduce
            ? {
                background:
                  "radial-gradient(900px 620px at 72% 42%, rgba(251,174,60,0.13), transparent 70%)",
              }
            : { background: dread, opacity: dreadOpacity }
        }
      />
      <Glow style={{ top: "2%", left: "-16%", width: 560, height: 560, opacity: 0.4 }} />

      <div className="container-d relative">
        <SectionHeading
          title="It gets stricter every day you wait."
          lede="Deadline does not hold a steady line. It tightens. The longer you put the work off, the less phone you get, until the day it takes all of it."
        />

        <div className="mt-[var(--s8)] grid gap-[var(--s6)] lg:mt-[var(--s9)] lg:grid-cols-[1fr_350px] lg:gap-[var(--s9)]">
          {/* Stage track */}
          <div ref={trackRef} className="relative lg:pl-12">
            {/* Beam rail */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 hidden h-full w-[2px] overflow-hidden rounded-full lg:block"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              {reduce ? (
                <div
                  className="h-full w-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(180deg,#FBAE3C 0%,#FF8A3D 60%,#FF453A 100%)",
                  }}
                />
              ) : (
                <motion.div
                  className="h-full w-full origin-top rounded-full"
                  style={{
                    scaleY,
                    background:
                      "linear-gradient(180deg,#FBAE3C 0%,#FBAE3C 42%,#FF8A3D 72%,#FF453A 100%)",
                    boxShadow: "0 0 16px rgba(251,174,60,0.45)",
                  }}
                />
              )}
            </div>

            {STAGES.map((s, i) => (
              <StageCard
                key={s.id}
                stage={s}
                index={i}
                active={active === i}
                onActivate={setActive}
              />
            ))}
          </div>

          {/* Sticky phone. Desktop only: MASTER.md forbids pinning on mobile. */}
          <div className="hidden lg:block">
            <div className="sticky top-[120px]">
              <Phone
                width={340}
                glowTone={stage.tone === "danger" ? "danger" : "gold"}
                statusTone={stage.tone === "danger" ? "danger" : "white"}
                time="8:03"
              >
                {/* key forces a crossfade when the stage changes */}
                <motion.div
                  key={stage.id}
                  initial={reduce ? false : { y: 8 }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.42 }}
                  className="flex min-h-0 flex-1 flex-col"
                >
                  <StageScreen stage={stage} />
                </motion.div>
              </Phone>

              <Reveal>
                <p className="mt-6 text-center text-[13px] text-muted">
                  Stage {active + 1} of {STAGES.length}. Scroll to advance.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
