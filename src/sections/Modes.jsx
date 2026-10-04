import {
  Glow,
  Reveal,
  SectionHeading,
  Stagger,
  StaggerItem,
} from "../components/primitives";
import { SectionHeader } from "../components/appUI";
import { ActiveSessionCard, GymCard } from "../components/screens";

/* Icons are inline SVG in the Lucide idiom: 24px grid, 1.5 stroke,
   currentColor. No emoji, anywhere. */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const MODES = [
  {
    id: "deadlines",
    lead: true,
    name: "Deadlines",
    body: "Assignments, projects, exams. Set the due date and let the locks tighten on their own schedule.",
    example: "History essay, due Friday 11:59 PM",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2.5" />
        <path d="M3 10h18M8 3v4M16 3v4" />
        <path d="M12 14v3.2l2.2 1.3" />
      </svg>
    ),
  },
  {
    id: "gym",
    name: "Gym",
    body: "Apps stay locked until you show up. Deadline checks your location, not your intentions.",
    example: "Unlocks at Iron Works Gym",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M4 9v6M7 7.5v9M17 7.5v9M20 9v6" />
        <path d="M7 12h10" />
      </svg>
    ),
  },
  {
    id: "study",
    name: "Study",
    body: "Deep focus with no escape hatch. Start the session and the door closes behind you.",
    example: "90 minute block, no override",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4H11v16H5.5A2.5 2.5 0 0 1 3 17.5Z" />
        <path d="M21 6.5A2.5 2.5 0 0 0 18.5 4H13v16h5.5a2.5 2.5 0 0 0 2.5-2.5Z" />
      </svg>
    ),
  },
  {
    id: "walk",
    name: "Walk",
    body: "Unlock by walking far enough from where you started, or by reaching the place you said you would. Distance, not step count.",
    example: "Walk 500m from where you started",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M13.5 3.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Z" />
        <path d="M11 20.5l1.2-4.3-2.6-2.4.9-4.6 3.1 1.4 2.4 2.1" />
        <path d="M7.4 14.2 6 20.5M10.4 9.2 7.2 10.6l-1 2.9" />
      </svg>
    ),
  },
  {
    id: "custom",
    name: "Custom",
    body: "Build your own rules. Pick the trigger, the apps, the window, and how hard it is to get out.",
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

export default function Modes() {
  return (
    <section id="modes" className="section-pad relative overflow-hidden">
      <Glow style={{ top: "0%", right: "4%", width: 600, height: 600, opacity: 0.5 }} />

      <div className="container-d relative">
        <SectionHeading
          title="It is not just assignments."
          lede="Every promise you keep breaking has the same shape. Pick which one you are done breaking."
        />

        {/* The real Focus tab components, lifted straight out of the app.
            These are the same ActiveDowntimeCard and GymRow the product
            renders, so the section shows the thing rather than describing it. */}
        <div className="mx-auto mt-14 max-w-[560px] lg:mt-16">
          <SectionHeader style={{ marginBottom: 12, marginLeft: 4 }}>
            ACTIVE
          </SectionHeader>
          <div className="flex flex-col gap-3">
            <ActiveSessionCard />
            <GymCard delay={90} />
          </div>
          <p className="mx-auto mt-[var(--s4)] max-w-[48ch] text-center text-[13px] text-muted">
            This is the Focus tab, running.
          </p>
        </div>

        <Stagger
          className="mt-[var(--s8)] grid gap-[var(--s3)] sm:grid-cols-2 lg:mt-[var(--s9)] lg:grid-cols-3"
          step={60}
        >
          {MODES.map((m) => (
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
      </div>
    </section>
  );
}
