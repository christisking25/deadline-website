import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Glow, SectionHeading, Reveal, EASE } from "../components/primitives";

const ITEMS = [
  {
    q: "Can I turn it off whenever I want?",
    a: "That depends entirely on the tier you picked. On Gentle, yes, instantly, because Gentle never locks anything. On Strict you can override, but you have to write out why you are quitting on yourself before the apps come back. On No Excuses there is no override at all. You chose that, and Deadline holds you to it.",
  },
  {
    q: "Which apps can it lock?",
    a: "Any app you choose. Pick one, pick thirty. Most people start with the obvious offenders, then quietly add the ones they were pretending were not a problem.",
  },
  {
    q: "Does it work offline?",
    a: "Yes. Deadline runs entirely on your device, so airplane mode, dead Wi-Fi, and no signal change nothing. Locks hold. Turning off the internet is not a loophole.",
  },
  {
    q: "Is my data shared?",
    a: "No. Everything stays on device. No accounts, no analytics, no third-party SDKs, no ad networks. Your schedules, your locations, and your proof submissions never leave your phone.",
  },
  {
    q: "What happens on the due date?",
    a: "On Strict and No Excuses, full lockdown. Every app you selected is shut until the work is done and proven. On Gentle you get a notification, because Gentle never locks anything. The due date is the point of the whole system, so this is where the tiers separate hardest.",
  },
  {
    // TODO: Pricing is not finalised. Replace this answer with the real model
    // (free / freemium / one-time / subscription) before launch, and update the
    // FAQPage JSON-LD in this file to match.
    q: "Is it free?",
    a: "Pricing is not finalised yet. This answer gets replaced before launch with the real model.",
    todo: true,
  },
];

function Row({ item, open, onToggle, id }) {
  const reduce = useReducedMotion();

  return (
    <div
      className="border-b transition-colors duration-200"
      style={{
        borderColor: open ? "rgba(251,174,60,0.25)" : "rgba(255,255,255,0.08)",
      }}
    >
      <h3>
        <button
          type="button"
          id={`faq-btn-${id}`}
          aria-expanded={open}
          aria-controls={`faq-panel-${id}`}
          onClick={onToggle}
          className="flex w-full items-center gap-5 py-6 text-left transition-colors duration-200 hover:text-amber"
        >
          <span
            className="flex-1 text-[18px] font-bold leading-snug text-ink sm:text-[21px]"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
          >
            {item.q}
          </span>
          <span
            aria-hidden="true"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300"
            style={{
              borderColor: open
                ? "rgba(251,174,60,0.45)"
                : "rgba(255,255,255,0.1)",
              color: open ? "#FBAE3C" : "#8A8A8A",
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="panel"
            id={`faq-panel-${id}`}
            role="region"
            aria-labelledby={`faq-btn-${id}`}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-[72ch] pb-7 pr-12 text-[16px] leading-relaxed text-muted">
              {item.a}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);
  const listRef = useRef(null);

  // Roving arrow-key navigation between the question triggers.
  const onKeyDown = (e) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
    const btns = Array.from(
      listRef.current?.querySelectorAll("button[aria-expanded]") ?? [],
    );
    const i = btns.indexOf(document.activeElement);
    if (i === -1) return;
    e.preventDefault();
    const next =
      e.key === "ArrowDown"
        ? (i + 1) % btns.length
        : e.key === "ArrowUp"
          ? (i - 1 + btns.length) % btns.length
          : e.key === "Home"
            ? 0
            : btns.length - 1;
    btns[next].focus();
  };

  return (
    <section id="faq" className="section-pad relative overflow-hidden">
      <Glow style={{ top: "8%", right: "-12%", width: 540, height: 540, opacity: 0.4 }} />

      <div className="container-d relative">
        <SectionHeading title="The questions you are already asking." />

        <Reveal delay={0.08}>
          <div
            ref={listRef}
            onKeyDown={onKeyDown}
            className="mx-auto mt-14 max-w-[860px] border-t"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            {ITEMS.map((item, i) => (
              <Row
                key={item.q}
                id={i}
                item={item}
                open={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>

      {/* Structured data. Keep in sync with ITEMS above, including pricing. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: ITEMS.filter((i) => !i.todo).map((i) => ({
              "@type": "Question",
              name: i.q,
              acceptedAnswer: { "@type": "Answer", text: i.a },
            })),
          }),
        }}
      />
    </section>
  );
}
