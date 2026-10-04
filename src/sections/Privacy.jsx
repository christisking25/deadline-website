import { Glow, SectionHeading, Stagger, StaggerItem, Reveal } from "../components/primitives";

const FACTS = [
  { k: "No accounts", v: "There is nothing to sign up for. No email, no password, no profile." },
  { k: "No tracking", v: "No analytics SDK, no event pipeline, no behavioural logging." },
  { k: "No ads", v: "Nobody is bidding on your attention here. That would be the joke of the century." },
  { k: "No third-party SDKs", v: "Nothing from an ad network, a data broker, or an attribution vendor." },
];

/** Big lock mark with a slow gold sweep across the shackle. */
function LockVisual() {
  return (
    <div className="relative grid place-items-center py-6">
      <div
        aria-hidden="true"
        className="glow animate-pulse-glow"
        style={{ inset: "-18%", filter: "blur(70px)" }}
      />
      <svg
        viewBox="0 0 200 220"
        className="relative w-[180px] sm:w-[220px]"
        role="img"
        aria-label="A closed padlock, representing on-device data"
      >
        <defs>
          <linearGradient id="lockGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD089" />
            <stop offset="100%" stopColor="#FBAE3C" />
          </linearGradient>
        </defs>

        {/* shackle */}
        <path
          d="M62 96V66a38 38 0 0 1 76 0v30"
          fill="none"
          stroke="url(#lockGrad)"
          strokeWidth="13"
          strokeLinecap="round"
        />
        {/* body */}
        <rect
          x="40"
          y="94"
          width="120"
          height="104"
          rx="20"
          fill="url(#lockGrad)"
        />
        {/* keyhole */}
        <circle cx="100" cy="136" r="12" fill="#0B0B0C" />
        <rect x="94" y="142" width="12" height="28" rx="6" fill="#0B0B0C" />
      </svg>
    </div>
  );
}

export default function Privacy() {
  return (
    <section id="privacy" className="section-pad relative overflow-hidden">
      <Glow style={{ top: "14%", left: "46%", width: 620, height: 500, opacity: 0.45, transform: "translateX(-50%)" }} />

      <div className="container-d relative">
        <SectionHeading
          title="Your data never leaves your phone."
          lede="Deadline works because it watches what you do. That is also exactly why none of it is ours to keep. Everything stays on device."
        />

        <div className="mt-16 grid items-center gap-12 lg:mt-20 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <div>
            <LockVisual />
          </div>

          <div>
            <Stagger className="flex flex-col gap-3">
              {FACTS.map((f) => (
                <StaggerItem key={f.k}>
                  <div className="card-d card-hover flex items-start gap-4 p-6">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[rgba(251,174,60,0.3)] bg-surface-2 text-amber"
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m4 12.5 5 5L20 6.5" />
                      </svg>
                    </span>
                    <div>
                      <h3 className="mb-1.5 text-[19px] leading-tight">{f.k}</h3>
                      <p className="text-[15px] leading-relaxed text-muted">
                        {f.v}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <div>
              <a
                href="https://privacy.hitdeadline.com"
                className="mt-[var(--s5)] inline-flex min-h-[44px] items-center gap-2 text-[16px] font-semibold text-amber transition-opacity duration-200 hover:opacity-80"
              >
                Read the privacy policy
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h13M12 5.5 18.5 12 12 18.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
