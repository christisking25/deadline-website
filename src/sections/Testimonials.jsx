import { useReducedMotion } from "framer-motion";
import { SectionHeading, Glow } from "../components/primitives";

/* ============================================================================
   ILLUSTRATIVE REVIEWS, NOT REAL ONES.

   The names, courses and quotes below are written examples. They are shaped
   like real App Store reviews so the layout is final, but nobody said them.

   DO NOT remove the "Illustrative" label above this section until these are
   replaced with real reviews. Attributing invented quotes to named students
   and presenting them as credible is deceptive to visitors, and for App Store
   marketing it is a takedown and FTC risk. Swapping in real reviews is a
   one-line change: replace this array and delete the `isIllustrative` flag
   passed to the heading below.
   ========================================================================= */
const REVIEWS = [
  {
    quote:
      "I had a 4,000 word chapter and three weeks of nothing. The 24 hour lock the day before was the only reason it got written.",
    name: "Sarah Chen",
    course: "HIST 2400",
  },
  {
    quote:
      "No Excuses mode is brutal and that is exactly why it works. I could not talk my way out of it at 6 AM, so I went.",
    name: "Marcus W.",
    course: "CS 101",
  },
  {
    quote:
      "Every other screen time app I tried, I disabled within two days. This one does not let you, which is the entire point I was missing.",
    name: "Priya Raman",
    course: "MATH 235",
  },
  {
    quote:
      "The gym geofence changed it for me. My apps stay dead until I am actually inside the building. No more deciding in the parking lot.",
    name: "Diego Alvarez",
    course: "KIN 1270",
  },
];

/** Initials circle. Amber fill, white letters, same mark on every card. */
function Avatar({ name }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
      style={{
        background: "var(--color-amber)",
        color: "#FFFFFF",
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: 14,
        letterSpacing: "0.01em",
      }}
    >
      {initials}
    </span>
  );
}

function QuoteCard({ q }) {
  return (
    <figure className="card-d card-hover flex w-[300px] shrink-0 flex-col p-6 sm:w-[380px] sm:p-7">
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="#FBAE3C"
        className="mb-5 opacity-60"
        aria-hidden="true"
      >
        <path d="M9.5 5C6.4 6.4 4.5 9.3 4.5 13v6h7v-7H7.8c.2-2.3 1.3-3.9 3.2-4.8L9.5 5Zm9 0c-3.1 1.4-5 4.3-5 8v6h7v-7h-3.7c.2-2.3 1.3-3.9 3.2-4.8L18.5 5Z" />
      </svg>

      <blockquote className="mb-6 flex-1 text-[16px] leading-relaxed text-ink/90">
        {q.quote}
      </blockquote>

      <figcaption className="flex items-center gap-3">
        <Avatar name={q.name} />
        <span className="min-w-0">
          <span className="block truncate text-[14px] font-semibold text-ink">
            {q.name}
          </span>
          <span className="block truncate text-[13px] text-muted">
            {q.course}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Seamless marquee row. Duplicated track, translated -50%, wraps cleanly. */
function Row({ items, duration, reverse = false }) {
  const reduce = useReducedMotion();

  if (reduce) {
    // Static, horizontally scrollable fallback. No animation, still reachable.
    return (
      <div className="flex gap-5 overflow-x-auto pb-2">
        {items.map((q, i) => (
          <QuoteCard key={i} q={q} />
        ))}
      </div>
    );
  }

  // Duration and direction ride in as custom properties so the inline style
  // never clobbers animation-play-state, which is what drives hover-to-pause.
  return (
    <div
      className="marquee-row flex gap-5"
      style={{
        "--marquee-duration": `${duration}s`,
        "--marquee-direction": reverse ? "reverse" : "normal",
      }}
    >
      {[...items, ...items].map((q, i) => (
        <QuoteCard key={i} q={q} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="section-pad relative overflow-hidden">
      <Glow style={{ top: "12%", left: "40%", width: 560, height: 420, opacity: 0.4 }} />

      <div className="container-d relative">
        <SectionHeading
          eyebrow="Illustrative"
          title="What people say."
          lede="Written examples, shown to set the layout. Real App Store reviews replace them at launch."
        />
      </div>

      <div
        className="relative mt-14 flex flex-col gap-5 lg:mt-16"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)",
        }}
      >
        <Row items={REVIEWS} duration={52} />
        <Row items={[...REVIEWS].reverse()} duration={64} reverse />
      </div>

      <div className="container-d">
        <p className="mx-auto mt-10 max-w-[52ch] text-center text-[13px] text-muted">
          Illustrative only. These are not real reviews yet.
        </p>
      </div>
    </section>
  );
}
