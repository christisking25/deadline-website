import {
  Glow,
  Reveal,
  SectionHeading,
  Stagger,
  StaggerItem,
} from "../components/primitives";

/* Written for someone who wants to know how the enforcement actually works,
   not someone who wants to be reassured that it does. Every framework named
   here is the one the app really uses, and every claim about what leaves the
   device is held to the privacy policy. If the policy changes, change this
   section in the same commit. */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const MECHANISMS = [
  {
    id: "geofencing",
    kicker: "Core Location",
    title: "Live geofencing, solved on the device",
    body: [
      "Position comes from the phone's own location stack: GPS, with Wi-Fi and cellular trilateration filling in where satellites are weak. Deadline subscribes to the update stream and does the geometry itself. For a walk, it holds the coordinate you started from and computes great-circle distance to each new fix as it arrives, then compares that number against the distance you committed to. For an arrival lock, it watches for a boundary crossing against a circular region centred on the place you saved.",
      "The arithmetic is the only thing that happens to a coordinate. It is read, measured against your target, and dropped. No route is assembled, no trail is written, and no position is kept after the comparison that needed it. The places you save are stored on your phone so the app knows what to watch for; where you are right now is not.",
    ],
    specs: [
      ["Source", "On-device GPS, Wi-Fi and cell trilateration"],
      ["Evaluated", "Per location update, in real time"],
      ["Retained", "Nothing. Measured, then discarded"],
    ],
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <circle cx="12" cy="12" r="2.4" />
        <circle cx="12" cy="12" r="6.4" opacity="0.65" />
        <circle cx="12" cy="12" r="10.2" opacity="0.35" />
        <path d="M12 1.8v2.4M12 19.8v2.4M1.8 12h2.4M19.8 12h2.4" />
      </svg>
    ),
  },
  {
    id: "familycontrols",
    kicker: "Family Controls · Screen Time",
    title: "Enforcement the operating system owns",
    body: [
      "Deadline does not block apps by watching what you open and getting in the way. It holds an authorization under Apple's Family Controls framework and writes your lock into the system's own managed settings, the same mechanism Screen Time uses. From that point the restriction belongs to iOS. The app you tapped never launches, and the screen you get instead is a shield that Deadline supplies to the system rather than a window it has to draw in time.",
      "This is why the obvious escapes do not work. Force quitting Deadline changes nothing, because Deadline is not the thing standing in the way. Neither does killing your connection: the lock lives in system settings on the device, so airplane mode and dead Wi-Fi are irrelevant to it. Scheduled windows are handed to the system's activity scheduler in advance, so they open and close whether the app is awake or not.",
      "Which apps you chose is never something Deadline can read. The system picker hands back opaque tokens rather than names or bundle identifiers, so the app can shield your selection without knowing what is in it.",
    ],
    specs: [
      ["Authorization", "Family Controls, granted by you"],
      ["Applied by", "iOS managed settings, not the app"],
      ["App selection", "Opaque system tokens, never names"],
    ],
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <rect x="4" y="10" width="16" height="10.5" rx="2.6" />
        <path d="M8 10V7.6a4 4 0 0 1 8 0V10" />
        <path d="M12 14.2v2.6" />
      </svg>
    ),
  },
  {
    id: "nfc",
    kicker: "Core NFC",
    title: "Physical authentication over NFC",
    body: [
      "A TapLatch card is a passive NFC tag: no battery, no radio of its own, no firmware to update. Your phone's reader energises the chip through the field it emits when the two are close, reads the identifier the chip returns, and that is the extent of the exchange. Range is a couple of centimetres by physics, not by policy, so a tap is unambiguous: either the card was touching your phone or it was not.",
      "When you set a card up, Deadline records that identifier on your phone as the one that controls your locks. Every later tap is matched against it locally, and a match is what flips the managed settings from shielded to open or back again. There is no key exchange with a server, nothing to provision, and no registry of cards anywhere. A card that is not yours reads as a card that is not yours, and a card that is yours is useless to anyone who does not also have your phone.",
    ],
    specs: [
      ["Card", "Passive NFC tag. No battery, no pairing"],
      ["Read", "On-device reader session, centimetre range"],
      ["Matched", "Against the identifier stored on your phone"],
    ],
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <rect x="2.5" y="6" width="12.5" height="12" rx="2.6" />
        <path d="M18 8.6a5 5 0 0 1 0 6.8" />
        <path d="M20.8 6a8.4 8.4 0 0 1 0 12" />
      </svg>
    ),
  },
];

/* The data sovereignty claim, itemised. Every line here has to be matched by
   the privacy policy at privacy.hitdeadline.com. Do not add a fourth without
   adding it there first. */
const SOVEREIGNTY = [
  {
    k: "Location data",
    v: "Read to measure distance and detect arrival, in the moment, on your phone. Never transmitted. No route or position history is kept.",
  },
  {
    k: "NFC card data",
    v: "Your card is read by your phone and matched on your phone. The identifier is never transmitted or stored anywhere else.",
  },
  {
    k: "Screen Time data",
    v: "Used only to apply your locks and release them. It stays in the system on your device and is never sent anywhere.",
  },
];

export default function Technology() {
  return (
    <section id="technology" className="section-pad relative overflow-hidden">
      <Glow style={{ top: "2%", left: "-14%", width: 600, height: 600, opacity: 0.45 }} />
      <Glow style={{ bottom: "6%", right: "-12%", width: 560, height: 560, opacity: 0.4 }} />

      <div className="container-d relative">
        <SectionHeading
          eyebrow="Technology"
          title="How the lock actually holds."
          lede="Three mechanisms do the work: real-time position computed on the device, enforcement handed to Apple's own restriction system, and a physical tap read over NFC. None of them needs a server, and none of them has one."
        />

        <div className="mt-[var(--s8)] flex flex-col gap-[var(--s3)] lg:mt-[var(--s9)]">
          {MECHANISMS.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.06}>
              <article className="card-d p-[var(--s6)] sm:p-[var(--s7)] lg:p-[var(--s8)]">
                <div className="grid gap-[var(--s6)] lg:grid-cols-[1fr_300px] lg:gap-[var(--s8)]">
                  <div>
                    <div className="mb-[var(--s5)] flex items-center gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[rgba(251,174,60,0.3)] bg-surface-2 text-amber">
                        <span className="block [&>svg]:h-[21px] [&>svg]:w-[21px]">
                          {m.icon}
                        </span>
                      </span>
                      <span className="label-d text-amber/80">{m.kicker}</span>
                    </div>

                    <h3 className="t-h3 mb-[var(--s4)] max-w-[28ch]">{m.title}</h3>

                    <div className="flex flex-col gap-[var(--s4)]">
                      {m.body.map((p, j) => (
                        <p
                          key={j}
                          className="max-w-[66ch] text-[16px] leading-relaxed text-muted"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Spec table. Reads as the summary of the prose beside it,
                      not as extra claims. */}
                  <dl
                    className="flex flex-col self-start rounded-xl border border-hairline bg-surface-2/60"
                    style={{ overflow: "hidden" }}
                  >
                    {m.specs.map(([k, v], j) => (
                      <div
                        key={k}
                        className="flex flex-col gap-1.5 p-[var(--s4)]"
                        style={{
                          borderTop:
                            j === 0 ? "none" : "1px solid var(--color-hairline)",
                        }}
                      >
                        <dt className="label-d text-muted">{k}</dt>
                        <dd className="text-[14px] leading-relaxed text-ink/85">
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* ---------------------------------------------- data sovereignty */}
        <div className="mt-[var(--s8)] lg:mt-[var(--s9)]">
          <Reveal className="flex flex-col items-center gap-[var(--s4)] text-center">
            <h3 className="t-h2 max-w-[22ch]">
              There is no server to send it to.
            </h3>
            <p className="t-lede max-w-[62ch]">
              All of it stays on your phone. Your location data, your NFC card
              data, and your Screen Time data are never transmitted. There is no
              account, no sign-up, and no cloud sync, so there is nothing to
              hold on our side and no way for us to reach any of it. Deadline
              ships with no third-party SDKs: no analytics, no attribution, no
              ad network.
            </p>
          </Reveal>

          <Stagger className="mt-[var(--s7)] grid gap-[var(--s3)] lg:grid-cols-3">
            {SOVEREIGNTY.map((s) => (
              <StaggerItem key={s.k} className="h-full">
                <div className="card-d h-full p-[var(--s6)]">
                  <div className="mb-[var(--s4)] flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[rgba(48,209,88,0.3)] text-green"
                      style={{ background: "rgba(48,209,88,0.08)" }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m4 12.5 5 5L20 6.5" />
                      </svg>
                    </span>
                    <h4 className="text-[17px] font-semibold leading-tight text-ink">
                      {s.k}
                    </h4>
                  </div>
                  <p className="text-[15px] leading-relaxed text-muted">{s.v}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-[var(--s6)] max-w-[60ch] text-center text-[14px] leading-relaxed text-muted">
              Deadline works offline for the same reason it is private: there
              was never anything on the other end of a connection.{" "}
              <a
                href="https://privacy.hitdeadline.com"
                className="font-semibold text-amber underline-offset-4 transition-all duration-200 hover:underline focus-visible:underline"
              >
                Read the privacy policy
              </a>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
