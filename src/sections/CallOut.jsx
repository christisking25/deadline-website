import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  CountUp,
  Eyebrow,
  Glow,
  Reveal,
  Stagger,
  StaggerItem,
  EASE,
} from "../components/primitives";

/**
 * Styled like a street interview. Two questions land one after the other,
 * the second answer in red. The gap between them is the pitch.
 */
function Exchange({ question, answer, caption, tone = "gold", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -22% 0px" });
  const reduce = useReducedMotion();
  const danger = tone === "danger";

  const show = reduce ? true : inView;

  return (
    <div ref={ref} className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
      <motion.p
        initial={reduce ? false : { opacity: 0, x: -18 }}
        animate={show ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE, delay }}
        className="flex-1 text-[20px] font-medium leading-snug text-ink sm:text-[26px] lg:text-[30px]"
        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
      >
        <span className="mr-3 text-muted">&ldquo;</span>
        {question}
        <span className="ml-1 text-muted">&rdquo;</span>
      </motion.p>

      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.7 }}
        animate={show ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: 0.6,
          ease: EASE,
          delay: delay + (reduce ? 0 : 0.35),
        }}
        className="flex shrink-0 items-baseline gap-3 sm:w-[190px] sm:justify-end"
      >
        <span
          className={`numeral text-[72px] leading-none sm:text-[92px] ${
            danger ? "text-red" : "text-amber"
          }`}
          style={
            danger
              ? { textShadow: "0 0 50px rgba(255,69,58,0.45)" }
              : { textShadow: "0 0 50px rgba(251,174,60,0.35)" }
          }
        >
          {answer}
        </span>
        <span className="label-d pb-2 text-muted">{caption}</span>
      </motion.div>
    </div>
  );
}

const STATS = [
  {
    value: 4,
    decimals: 0,
    render: (
      <>
        <CountUp to={4} />h <CountUp to={37} />m
      </>
    ),
    label: "Average daily screen time",
    note: "General estimate across adult smartphone users.",
  },
  {
    render: (
      <>
        <CountUp to={87} />%
      </>
    ),
    label: "Of students procrastinate",
    note: "General estimate from academic self-report studies.",
  },
  {
    render: <>1 in 2</>,
    label: "Quit gym plans in month one",
    note: "General estimate across new gym memberships.",
  },
];

export default function CallOut() {
  return (
    <section className="section-pad relative overflow-hidden">
      <Glow
        style={{ top: "10%", left: "50%", width: 760, height: 520, transform: "translateX(-50%)", opacity: 0.55 }}
      />

      <div className="container-d relative">
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <Eyebrow>The gap</Eyebrow>
          <h2 className="max-w-[18ch] text-[32px] sm:text-[42px] lg:text-[52px]">
            Let&rsquo;s do the math on last week.
          </h2>
        </Reveal>

        <div className="mx-auto mt-16 flex max-w-[880px] flex-col gap-12 sm:gap-10">
          <Exchange
            question="How many times did you plan to go to the gym this week?"
            answer="5"
            caption="Planned"
          />
          <div className="hairline" aria-hidden="true" />
          <Exchange
            question="How many times did you actually go?"
            answer="1"
            caption="Actual"
            tone="danger"
            delay={0.1}
          />
        </div>

        <Reveal
          delay={0.15}
          className="mx-auto mt-16 max-w-[640px] text-center"
        >
          <p
            className="text-[26px] leading-tight sm:text-[36px] lg:text-[42px]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            That gap is the problem.{" "}
            <span className="text-amber">Deadline closes it.</span>
          </p>
        </Reveal>

        <Stagger className="mt-20 grid gap-4 sm:grid-cols-3">
          {STATS.map((s) => (
            <StaggerItem key={s.label}>
              <div className="card-d card-hover h-full p-7">
                <p className="numeral mb-4 text-[40px] text-amber sm:text-[46px]">
                  {s.render}
                </p>
                <p className="mb-2 text-[16px] font-semibold text-ink">
                  {s.label}
                </p>
                <p className="text-[13px] leading-relaxed text-muted">{s.note}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-[62ch] text-center text-[12px] text-muted">
            General estimates, for illustration. Not measurements from
            Deadline users.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
