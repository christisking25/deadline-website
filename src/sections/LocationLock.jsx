import { useState } from "react";
import { Glow, SectionHeading, Reveal } from "../components/primitives";
import { StylizedMap } from "../components/screens";
import { APP, DetailRow, SectionHeader } from "../components/appUI";

const OPTIONS = [
  {
    id: "here",
    title: "Lock while I'm here.",
    body: "Apps lock the moment you walk into the library or the gym. Leave, and they come back. The building does the discipline for you.",
    pin: "Central Library",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="2.6" />
      </svg>
    ),
  },
  {
    id: "until",
    title: "Lock until I get there.",
    body: "Apps stay locked until you arrive. No scrolling on the walk over, no sitting in the car for twenty minutes deciding whether today counts.",
    pin: "Iron Works Gym",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 20 20 4" />
        <path d="M14 4h6v6" />
        <circle cx="6.5" cy="17.5" r="2.4" />
      </svg>
    ),
  },
  {
    id: "bytime",
    title: "Be there by a set time.",
    body: "Apps lock at a time you choose and release when you show up. Miss the time, stay locked. The deal is simple and it does not bend.",
    pin: "6:00 AM, Iron Works Gym",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.2V12l3.2 1.9" />
      </svg>
    ),
  },
];

export default function LocationLock() {
  const [active, setActive] = useState(0);

  return (
    <section id="location" className="section-pad relative overflow-hidden">
      <Glow style={{ bottom: "0%", left: "-10%", width: 620, height: 620, opacity: 0.5 }} />

      <div className="container-d relative">
        <SectionHeading
          eyebrow="Focus · Location locks"
          title="Your phone knows where you should be."
          lede="Name a place and let the building do the discipline. Deadline reads your position on the device to decide when to lock and when to let go. The coordinates never leave your phone, and no route is kept."
        />

        <div className="mt-16 grid items-center gap-10 lg:mt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Map */}
          <div className="order-2 lg:order-1">
            <div className="card-d relative aspect-[4/3.4] overflow-hidden p-0 sm:aspect-[4/3]">
              <StylizedMap pinLabel={OPTIONS[active].pin} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-bg via-bg/85 to-transparent" />

              {/* The app's own ALWAYS ON rows, over the map. */}
              <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2.5">
                <SectionHeader style={{ marginLeft: 4 }}>ALWAYS ON</SectionHeader>
                <DetailRow
                  icon="location-fill"
                  iconColor={APP.green}
                  title="Location Lock"
                  subtitle={`Locked now, you're at ${OPTIONS[active].pin}.`}
                  subtitleColor={APP.green}
                  tint={APP.green}
                />
                <DetailRow
                  icon="mappin"
                  iconColor={APP.blue}
                  title="Your gyms"
                  subtitle="2 gyms · most visits at University of Guelph"
                />
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="order-1 flex flex-col gap-3 lg:order-2">
            {OPTIONS.map((o, i) => {
              const on = active === i;
              return (
                <div key={o.id}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className="card-d group w-full p-6 text-left transition-all duration-200 sm:p-7"
                    style={{
                      borderColor: on
                        ? "rgba(251,174,60,0.45)"
                        : "rgba(255,255,255,0.08)",
                      background: on
                        ? "rgba(251,174,60,0.05)"
                        : "rgba(20,20,20,0.6)",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-colors duration-200"
                        style={{
                          borderColor: on
                            ? "rgba(251,174,60,0.45)"
                            : "rgba(255,255,255,0.08)",
                          color: on ? "#FBAE3C" : "#8A8A8A",
                          background: "#1C1C1C",
                        }}
                      >
                        {o.icon}
                      </span>
                      <div>
                        <h3 className="mb-2 text-[20px] leading-tight sm:text-[23px]">
                          {o.title}
                        </h3>
                        <p className="text-[15px] leading-relaxed text-muted">
                          {o.body}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}

            <div>
              <p className="mt-[var(--s2)] pl-1 text-[13px] text-muted">
                Tap one to see where it puts you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
