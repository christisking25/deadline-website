import {
  Glow,
  Reveal,
  SectionHeading,
  Stagger,
  StaggerItem,
} from "../components/primitives";
import { SectionHeader } from "../components/appUI";
import { ActiveSessionCard, GymCard, WalkCard } from "../components/screens";

/* Pillar one. Focus is the software half: you name something real you are
   going to do, your distracting apps go dark, and they come back when the
   phone can tell you did it.

   Icons are inline SVG in the Lucide idiom: 24px grid, 1.5 stroke,
   currentColor. No emoji, anywhere. */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const COMMITMENTS = [
  {
    id: "gym",
    lead: true,
    name: "Go to the gym",
    body: "Your apps stay locked until you are actually inside the building. No deciding in the parking lot, no talking yourself out of it on the drive over.",
    example: "Unlocks when you arrive",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M4 9v6M7 7.5v9M17 7.5v9M20 9v6" />
        <path d="M7 12h10" />
      </svg>
    ),
  },
  {
    id: "walk",
    name: "Take a walk",
    body: "Get yourself out of the chair. Your phone measures how far you have gone from where you started, and hands the apps back when you have covered the distance.",
    example: "500 m from where you started",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M13.5 3.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Z" />
        <path d="M11 20.5l1.2-4.3-2.6-2.4.9-4.6 3.1 1.4 2.4 2.1" />
        <path d="M7.4 14.2 6 20.5M10.4 9.2 7.2 10.6l-1 2.9" />
      </svg>
    ),
  },
  {
    id: "study",
    name: "Sit down and study",
    body: "Start the session and the door closes behind you. The apps you reach for by reflex are gone until the time you committed to is up.",
    example: "90 minute block",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4H11v16H5.5A2.5 2.5 0 0 1 3 17.5Z" />
        <path d="M21 6.5A2.5 2.5 0 0 0 18.5 4H13v16h5.5a2.5 2.5 0 0 0 2.5-2.5Z" />
      </svg>
    ),
  },
  {
    id: "offline",
    name: "Stay off social",
    body: "Pick a stretch of the day and hand the apps over for it. Mornings, evenings, the two hours you keep losing without noticing.",
    example: "No social until noon",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <rect x="4" y="10" width="16" height="10.5" rx="2.6" />
        <path d="M8 10V7.6a4 4 0 0 1 8 0V10" />
        <path d="M12 14v3" />
      </svg>
    ),
  },
  {
    id: "place",
    name: "Lock by place",
    body: "Name a building and let it do the discipline. Walk into the library and the apps go. Walk out and they come back.",
    example: "Locked while you are at the library",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="2.6" />
      </svg>
    ),
  },
  {
    id: "custom",
    name: "Build your own",
    body: "Pick what counts as showing up, choose which apps go dark, and decide what it takes to get them back.",
    example: "Your conditions, your consequences",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
        <circle cx="16" cy="7" r="2.3" />
        <circle cx="10" cy="17" r="2.3" />
      </svg>
    ),
  },
];

export default function Focus() {
  return (
    <section id="focus" className="section-pad relative overflow-hidden">
      <Glow style={{ top: "0%", right: "4%", width: 600, height: 600, opacity: 0.5 }} />

      <div className="container-d relative">
        <SectionHeading
          eyebrow="Focus"
          title="Your apps come back when you earn them."
          lede="Name something you are actually going to do. Deadline takes your distracting apps away while you do it, and gives them back when your phone can tell you followed through. Not when you say you did."
        />

        {/* The real Focus tab components, lifted straight out of the app.
            These are the same ActiveDowntimeCard, GymRow and walk row the
            product renders, so the section shows the thing rather than
            describing it. */}
        <div className="mx-auto mt-14 max-w-[560px] lg:mt-16">
          <SectionHeader style={{ marginBottom: 12, marginLeft: 4 }}>
            ACTIVE
          </SectionHeader>
          <div className="flex flex-col gap-3">
            <ActiveSessionCard />
            <GymCard delay={90} />
            <WalkCard delay={180} />
          </div>
          <p className="mx-auto mt-[var(--s4)] max-w-[48ch] text-center text-[13px] text-muted">
            This is the Focus tab, running.
          </p>
        </div>

        <Stagger
          className="mt-[var(--s8)] grid gap-[var(--s3)] sm:grid-cols-2 lg:mt-[var(--s9)] lg:grid-cols-3"
          step={60}
        >
          {COMMITMENTS.map((m) => (
            <StaggerItem
              key={m.id}
              className={`h-full ${m.lead ? "sm:col-span-2" : ""}`}
            >
              <article
                className={`card-d card-hover group relative h-full overflow-hidden ${
                  m.lead ? "p-[var(--s6)] lg:p-[var(--s7)]" : "p-[var(--s6)]"
                }`}
              >
                {/* Gold wash that blooms on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(420px circle at 50% 0%, rgba(251,174,60,0.1), transparent 70%)",
                  }}
                />

                <div className="relative">
                  <span className="mb-6 grid h-12 w-12 place-items-center rounded-xl border border-hairline bg-surface-2 text-amber transition-transform duration-300 group-hover:scale-110 group-hover:border-[rgba(251,174,60,0.4)]">
                    <span className="block [&>svg]:h-[23px] [&>svg]:w-[23px]">
                      {m.icon}
                    </span>
                  </span>

                  <h3 className={`mb-[var(--s2)] ${m.lead ? "t-h2" : "t-h3"}`}>
                    {m.name}
                  </h3>
                  <p
                    className={`mb-[var(--s4)] leading-relaxed text-muted ${
                      m.lead ? "max-w-[46ch] text-[16px]" : "text-[15px]"
                    }`}
                  >
                    {m.body}
                  </p>

                  <p className="label-d text-amber/70">{m.example}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-[var(--s6)] max-w-[62ch] text-center text-[14px] leading-relaxed text-muted">
            Locks are applied through Apple&rsquo;s own Screen Time controls, so
            closing Deadline, killing it from the app switcher, or turning off
            your signal does not lift them.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
