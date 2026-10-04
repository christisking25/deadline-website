import { Glow, SectionHeading, Stagger, StaggerItem } from "../components/primitives";

const TIERS = [
  {
    id: "gentle",
    name: "Gentle",
    tagline: "For people who just need a nudge.",
    summary: "Notifications only.",
    points: [
      "Reminders as the date gets closer",
      "Nothing is ever locked",
      "Turn it off whenever you want",
    ],
    quote: "A tap on the shoulder. Nothing more.",
    accent: "#5AA0FF",
  },
  {
    id: "strict",
    name: "Strict",
    tagline: "For people who mean it, mostly.",
    summary: "Escalating locks, with a cost to quit.",
    points: [
      "Locks grow as the deadline approaches",
      "Override exists, but it is not a button",
      "You write out why you are quitting on yourself",
    ],
    quote: "You can leave. You just have to say it out loud, in writing, first.",
    accent: "#FBAE3C",
  },
  {
    id: "no-excuses",
    name: "No Excuses",
    tagline: "For people who are done negotiating.",
    summary: "Escalating locks. No override.",
    points: [
      "Locks grow until full lockdown on the due date",
      "No override, no early exit, no deleting your way out",
      "Shake-to-silence alarm, so you have to get up",
    ],
    quote: "No way out. That's the point.",
    accent: "#FF453A",
    badge: "Most effective",
    featured: true,
  },
];

function Check({ color }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-[3px] shrink-0"
      aria-hidden="true"
    >
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  );
}

export default function Tiers() {
  return (
    <section id="tiers" className="section-pad relative overflow-hidden">
      <Glow style={{ top: "6%", left: "8%", width: 520, height: 520, opacity: 0.45 }} />
      <Glow red style={{ bottom: "4%", right: "2%", width: 560, height: 560, opacity: 0.55 }} />

      <div className="container-d relative">
        <SectionHeading
          title="Choose how much you trust yourself."
          lede="Be honest about which one you actually need. Most people pick the gentle option, fail, and come back for the third one within a week."
        />

        <Stagger className="mt-[var(--s8)] grid gap-[var(--s3)] lg:mt-[var(--s9)] lg:grid-cols-3">
          {TIERS.map((t) => (
            <StaggerItem key={t.id} className="h-full">
              <article
                className="card-d card-hover relative flex h-full flex-col p-[var(--s6)] sm:p-[var(--s7)]"
                style={
                  t.featured
                    ? {
                        borderColor: "rgba(255,69,58,0.35)",
                        boxShadow:
                          "0 0 0 1px rgba(255,69,58,0.1), 0 30px 70px -30px rgba(255,69,58,0.4)",
                      }
                    : undefined
                }
              >
                {t.featured ? (
                  <div
                    aria-hidden="true"
                    className="glow glow-red animate-pulse-glow"
                    style={{ inset: "-30% -18% 40% -18%", filter: "blur(70px)" }}
                  />
                ) : null}

                {t.badge ? (
                  <span
                    className="label-d absolute -top-3 left-7 rounded-full px-3 py-1.5"
                    style={{
                      background: "#FF453A",
                      color: "#0B0B0C",
                    }}
                  >
                    {t.badge}
                  </span>
                ) : null}

                <div className="relative flex h-full flex-col">
                  <h3
                    className="t-h3 mb-[var(--s1)]"
                    style={{ color: t.featured ? t.accent : "#FFFFFF" }}
                  >
                    {t.name}
                  </h3>
                  <p className="mb-[var(--s5)] text-[14px] text-muted">{t.tagline}</p>

                  <p
                    className="mb-[var(--s5)] text-[17px] font-semibold"
                    style={{ color: t.accent, fontFamily: "var(--font-display)" }}
                  >
                    {t.summary}
                  </p>

                  <ul className="mb-[var(--s5)] flex flex-col gap-[var(--s3)]">
                    {t.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
                        <Check color={t.accent} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <p
                    className="mt-auto border-l-2 pl-[var(--s4)] text-[15px] italic leading-relaxed text-ink"
                    style={{ borderColor: t.accent }}
                  >
                    {t.quote}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
