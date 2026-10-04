import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Glow, Reveal, SectionHeading } from "../components/primitives";
import { Phone } from "../components/Phone";
import {
  SubmittedScreen,
  DeadlinesTabScreen,
  ProofScreen,
} from "../components/screens";

const STEPS = [
  {
    n: "01",
    title: "Set it.",
    body: "Pick a deadline, a gym goal, or a study session. Choose which apps go dark. Takes about forty seconds. This is what it looks like when it has worked.",
    detail: "Works with any app on your phone. Pick one. Pick thirty.",
    screen: <SubmittedScreen />,
    time: "9:41",
  },
  {
    n: "02",
    title: "Feel it.",
    body: "Apps lock for longer as the date gets closer. Four days out it is a nudge. The day before, it is most of your day.",
    detail: "The pressure is the product. It arrives whether you are ready or not.",
    screen: <DeadlinesTabScreen />,
    time: "10:08",
  },
  {
    n: "03",
    title: "Prove it.",
    body: "Submit proof to unlock. A photo, your location, or a finished session. Deadline checks it, then gives your apps back.",
    detail: "Nothing opens on your word alone. That was the whole problem.",
    screen: <ProofScreen />,
    time: "6:14",
  },
];

/** Gold connector that draws itself as the section scrolls past. */
function DrawLine({ containerRef }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 72%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  if (reduce) {
    return (
      <div
        aria-hidden="true"
        className="absolute left-[27px] top-0 hidden h-full w-px bg-[rgba(251,174,60,0.35)] lg:block"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="absolute left-[27px] top-0 hidden h-full w-px lg:block"
      style={{ background: "rgba(255,255,255,0.07)" }}
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-full origin-top rounded-full"
        style={{
          scaleY,
          background:
            "linear-gradient(180deg, rgba(251,174,60,0.9) 0%, rgba(251,174,60,0.5) 70%, rgba(251,174,60,0) 100%)",
          boxShadow: "0 0 14px rgba(251,174,60,0.5)",
        }}
      />
    </div>
  );
}

export default function HowItWorks() {
  const containerRef = useRef(null);

  return (
    <section id="how" className="section-pad relative overflow-hidden">
      <Glow style={{ top: "4%", right: "-18%", width: 640, height: 640, opacity: 0.5 }} />

      <div className="container-d relative">
        <SectionHeading
          title="Three steps. No negotiation."
          lede="Deadline is not a tracker. It does not show you a pie chart of your wasted hours and leave you to feel bad about it. It takes the apps away."
        />

        <div ref={containerRef} className="relative mt-[var(--s8)] lg:mt-[var(--s9)]">
          <DrawLine containerRef={containerRef} />

          {/* Text always left, phone always right. Alternating sides would
              pull the numbered nodes off the connector. */}
          <div className="flex flex-col gap-[var(--s8)] lg:gap-[var(--s9)]">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="grid items-start gap-[var(--s6)] lg:grid-cols-[1fr_290px] lg:gap-[var(--s8)]"
              >
                <div className="relative lg:pl-24 lg:pt-[var(--s5)]">
                  {/* Node on the connector */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1 hidden h-14 w-14 place-items-center rounded-full border border-[rgba(251,174,60,0.35)] bg-bg lg:grid"
                    style={{ marginLeft: 0 }}
                  >
                    <span className="numeral text-[15px] text-amber">{s.n}</span>
                  </span>

                  <span className="numeral mb-4 block text-[13px] text-amber lg:hidden">
                    Step {s.n}
                  </span>

                  <h3 className="t-h2 mb-[var(--s4)]">
                    {s.title}
                  </h3>
                  <p className="t-lede mb-[var(--s4)] max-w-[44ch]">
                    {s.body}
                  </p>
                  <p className="max-w-[46ch] border-l-2 border-[rgba(251,174,60,0.4)] pl-4 text-[15px] leading-relaxed text-ink/75">
                    {s.detail}
                  </p>
                </div>

                <div className="flex justify-center">
                  <Phone width={282} time={s.time}>
                    {s.screen}
                  </Phone>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[var(--s7)] lg:pl-24">
            <p
              className="max-w-[58ch] text-[14px] italic leading-relaxed"
              style={{ color: "#808080" }}
            >
              Your step count does not count as proof. Deadline uses
              radius-based location verification instead of steps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
