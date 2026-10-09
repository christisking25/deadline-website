import {
  Glow,
  Reveal,
  SectionHeading,
  Stagger,
  StaggerItem,
} from "../components/primitives";
import { Phone } from "../components/Phone";
import { TapLatchCard, TapLatchScreen } from "../components/screens";

/* Pillar two. TapLatch is the hardware half: a card you keep somewhere
   deliberate, and a tap is the whole interaction. No proof to submit, no
   location to reach. You have to physically go and get the card. */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const POINTS = [
  {
    id: "tap",
    title: "One tap, both ways",
    body: "Hold the card to the top of your phone and your apps lock. Hold it there again and they open. That is the entire interface.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <rect x="2.5" y="6" width="12.5" height="12" rx="2.6" />
        <path d="M18 8.6a5 5 0 0 1 0 6.8" />
        <path d="M20.8 6a8.4 8.4 0 0 1 0 12" />
      </svg>
    ),
  },
  {
    id: "friction",
    title: "Distance you can feel",
    body: "Leave the card in a drawer, in the kitchen, at your desk. Getting your apps back means standing up and walking over, which is long enough to ask yourself whether you meant to.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M4 20 20 4" />
        <path d="M14 4h6v6" />
        <circle cx="6.5" cy="17.5" r="2.4" />
      </svg>
    ),
  },
  {
    id: "nothing",
    title: "No battery, no app to open",
    body: "The card has no power and nothing to charge. It is a passive chip that your phone reads when the two touch, and it works the same on day one and in three years.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <rect x="2.5" y="8" width="16" height="9" rx="2.4" />
        <path d="M21.5 11.5v2.4" />
        <path d="M6.5 12.5h5" />
      </svg>
    ),
  },
  {
    id: "yours",
    title: "Paired to your phone only",
    body: "Your card is matched on your device when you set it up. Nobody else’s card opens your apps, and yours is not registered anywhere outside your phone.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <rect x="4" y="10" width="16" height="10.5" rx="2.6" />
        <path d="M8 10V7.6a4 4 0 0 1 8 0V10" />
        <circle cx="12" cy="15.4" r="1.5" />
      </svg>
    ),
  },
];

export default function TapLatch() {
  return (
    <section id="taplatch" className="section-pad relative" style={{ overflowX: "clip" }}>
      <Glow style={{ top: "6%", left: "-14%", width: 620, height: 620, opacity: 0.45 }} />

      <div className="container-d relative">
        <SectionHeading
          eyebrow="TapLatch"
          title="A card you tap. Nothing to argue with."
          lede="Some people do not want to prove anything to their phone. TapLatch is a physical card: hold it to your phone to lock your apps, hold it there again to let them back in. The unlock is a thing you do with your hands, in one place, on purpose."
        />

        <div className="mt-[var(--s8)] grid items-center gap-[var(--s7)] lg:mt-[var(--s9)] lg:grid-cols-[1fr_320px] lg:gap-[var(--s9)]">
          {/* Card, then the points it explains. */}
          <div>
            <Reveal className="mx-auto max-w-[420px] lg:mx-0">
              <TapLatchCard />
            </Reveal>

            <Stagger className="mt-[var(--s7)] grid gap-[var(--s3)] sm:grid-cols-2" step={60}>
              {POINTS.map((p) => (
                <StaggerItem key={p.id} className="h-full">
                  <div className="card-d card-hover h-full p-[var(--s5)] sm:p-[var(--s6)]">
                    <span className="mb-[var(--s4)] grid h-11 w-11 place-items-center rounded-xl border border-hairline bg-surface-2 text-amber">
                      <span className="block [&>svg]:h-[21px] [&>svg]:w-[21px]">
                        {p.icon}
                      </span>
                    </span>
                    <h3 className="mb-[var(--s2)] text-[19px] leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-muted">
                      {p.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal delay={0.1} className="mx-auto w-full max-w-[300px] lg:max-w-none">
            <Phone width={310} time="7:22">
              <TapLatchScreen />
            </Phone>
            <p className="mt-6 text-center text-[13px] text-muted">
              The card is read on your phone. The tap never touches a network.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
