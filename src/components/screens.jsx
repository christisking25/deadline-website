import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { AppIcon } from "./primitives";
import { compact } from "../lib/duration";
import {
  APP,
  AppCard,
  AppNavBar,
  AppTabBar,
  CommitmentRow,
  DetailRow,
  Icon,
  SectionHeader,
  TagPill,
} from "./appUI";

/* Real Deadline screens, rebuilt in HTML and CSS from the SwiftUI source.
   Every string here is the app's own copy. Screens are illustration, so
   nothing inside them is focusable. */

const rounded = "var(--font-display)";
const text = "var(--font-text)";

function Shell({ children, style }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        background: APP.bg,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** DurationText.compact, close enough for a marketing screen. */
function useTicker(startSeconds, enabled = true) {
  const reduce = useReducedMotion();
  const [s, setS] = useState(startSeconds);
  useEffect(() => {
    if (reduce || !enabled) return;
    const id = setInterval(() => setS((v) => (v <= 1 ? startSeconds : v - 1)), 1000);
    return () => clearInterval(id);
  }, [reduce, enabled, startSeconds]);
  return s;
}

/** Counts a distance up and holds at the target, for the walk proof screen. */
function useDistance(from, to, enabled = true) {
  const reduce = useReducedMotion();
  const [m, setM] = useState(reduce ? to : from);
  useEffect(() => {
    if (reduce || !enabled) return;
    const id = setInterval(
      () => setM((v) => (v >= to ? from : Math.min(to, v + 4))),
      420,
    );
    return () => clearInterval(id);
  }, [reduce, enabled, from, to]);
  return m;
}

/* =================================================================
   1. The Screen Time shield.
   Copy and layout from ShieldPresentation.swift and
   ShieldConfigurationExtension.swift: the app's own hourglass mark,
   title in the accent colour, muted subtitle, and an OK button in
   black on the accent. The title is always "Locked in."
   ================================================================= */
export function ShieldScreen({
  subtitle = "Walk 500 m to unlock.\n180 m to go.",
  urgent = false,
  live = false,
}) {
  const accent = urgent ? APP.red : APP.amber;
  const secs = useTicker(72 * 60 + 9, live);

  // DurationText.compact over a live clock, so this reads "1h 12m" the way
  // the real shield does for a running session.
  const body = live
    ? `Deep work: thesis chapter.\nApps unlock in ${compact(secs)}.`
    : subtitle;

  return (
    <Shell
      style={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 26px 30px",
      }}
    >
      <div style={{ position: "relative", marginBottom: 26 }}>
        <div
          aria-hidden="true"
          className={`glow ${urgent ? "glow-red animate-pulse-glow" : ""}`}
          style={{ inset: -64, filter: "blur(38px)" }}
        />
        {/* ShieldConfigurationExtension loads "ShieldHourglass", the app's own
            artwork, and returns it untinted: "it is artwork rather than a
            glyph, and tinting it would flatten the logo to a single colour."
            So this is the real file, not a recolour. */}
        <AppIcon size={76} style={{ position: "relative" }} />
      </div>

      <div
        style={{
          fontFamily: rounded,
          fontWeight: 800,
          fontSize: 27,
          letterSpacing: "-0.02em",
          color: accent,
          marginBottom: 14,
        }}
      >
        Locked in.
      </div>

      <p
        style={{
          fontFamily: text,
          fontSize: 13,
          lineHeight: 1.5,
          color: "#B8B8B8",
          whiteSpace: "pre-line",
          maxWidth: 250,
          marginBottom: 30,
        }}
      >
        {body}
      </p>

      <div
        style={{
          width: "100%",
          maxWidth: 230,
          height: 44,
          display: "grid",
          placeItems: "center",
          borderRadius: 999,
          background: accent,
          color: APP.bg,
          fontFamily: rounded,
          fontWeight: 800,
          fontSize: 15,
        }}
      >
        OK
      </div>
    </Shell>
  );
}

/* Hero uses the live-ticking variant. */
export function HeroLockScreen() {
  return <ShieldScreen live />;
}

/* =================================================================
   2. Commit it: the New commitment sheet.
   A grouped iOS form: what you are committing to, how it releases,
   and which apps go dark while it runs.
   ================================================================= */
function FormRow({ label, value, valueColor = APP.ink, last = false }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        padding: "11px 13px",
        borderBottom: last ? "none" : `1px solid ${APP.hairline}`,
      }}
    >
      <span style={{ fontFamily: text, fontSize: 13.5, color: APP.muted }}>
        {label}
      </span>
      <span
        style={{
          fontFamily: text,
          fontSize: 13.5,
          fontWeight: 500,
          color: valueColor,
          textAlign: "right",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function FormGroup({ header, children, footer }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {header ? (
        <SectionHeader style={{ margin: "0 4px 7px" }}>{header}</SectionHeader>
      ) : null}
      <div
        style={{
          background: APP.surface,
          border: `1px solid color-mix(in srgb, ${APP.hairline} 60%, transparent)`,
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
      {footer ? (
        <p
          style={{
            fontFamily: text,
            fontSize: 10.5,
            lineHeight: 1.4,
            color: APP.muted,
            margin: "7px 4px 0",
          }}
        >
          {footer}
        </p>
      ) : null}
    </div>
  );
}

export function CommitmentScreen() {
  return (
    <Shell style={{ padding: "0 16px 16px" }}>
      <div style={{ padding: "4px 2px 14px" }}>
        <div
          style={{
            fontFamily: rounded,
            fontWeight: 800,
            fontSize: 21,
            color: APP.ink,
            letterSpacing: "-0.02em",
          }}
        >
          New commitment
        </div>
      </div>

      <div style={{ overflow: "hidden", flex: 1 }}>
        <FormGroup header="Commitment">
          <div style={{ padding: "11px 13px", display: "flex", gap: 7, flexWrap: "wrap" }}>
            <TagPill text="GYM" color={APP.blue} />
            <TagPill text="WALK" color={APP.amber} />
            <TagPill text="STUDY" color={APP.green} />
          </div>
          <FormRow label="Goal" value="Walk 500 m" valueColor={APP.amber} />
          <FormRow label="Starts" value="Now" last />
        </FormGroup>

        <FormGroup
          header="How it releases"
          footer="Your phone measures the distance itself. Nothing is sent anywhere, and nothing is stored."
        >
          <FormRow label="Proof" value="Live location" />
          <div
            style={{
              padding: "10px 13px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Icon name="check" size={13} color={APP.amber} />
            <span style={{ fontFamily: text, fontSize: 12, color: APP.ink }}>
              Apps return when you get there
            </span>
          </div>
        </FormGroup>

        <FormGroup header="Apps to lock">
          <FormRow label="Social" value="3 apps" />
          <FormRow label="Entertainment" value="2 apps" last />
        </FormGroup>
      </div>
    </Shell>
  );
}

/* =================================================================
   3. Prove it: the live walk measurement.
   The distance is read from Core Location on the device and compared
   against the goal in the moment. Nothing is written down.
   ================================================================= */
function ProgressRing({ value, total, label, sub }) {
  const pct = Math.min(1, value / total);
  const r = 58;
  const c = 2 * Math.PI * r;

  return (
    <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
      <svg width="148" height="148" viewBox="0 0 148 148" aria-hidden="true">
        <circle
          cx="74"
          cy="74"
          r={r}
          fill="none"
          stroke={APP.hairline}
          strokeWidth="9"
        />
        <circle
          cx="74"
          cy="74"
          r={r}
          fill="none"
          stroke={APP.amber}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          transform="rotate(-90 74 74)"
          style={{ transition: "stroke-dashoffset 400ms linear" }}
        />
      </svg>
      <div style={{ position: "absolute", textAlign: "center" }}>
        <div
          style={{
            fontFamily: rounded,
            fontWeight: 800,
            fontSize: 30,
            color: APP.ink,
            fontVariantNumeric: "tabular-nums",
            lineHeight: 1,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: text,
            fontSize: 11.5,
            color: APP.muted,
            marginTop: 5,
          }}
        >
          {sub}
        </div>
      </div>
    </div>
  );
}

export function WalkProofScreen({ live = true }) {
  const metres = useDistance(312, 500, live);

  return (
    /* The nav bar carries the app's own 18px gutter, so the padding here is
       bottom only. Stacking both would inset the content twice. */
    <Shell style={{ padding: "0 18px 16px" }}>
      <div style={{ margin: "0 -18px" }}>
        <AppNavBar title="Walk" showAdd={false} />
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
        }}
      >
        <ProgressRing
          value={metres}
          total={500}
          label={`${metres} m`}
          sub="of 500 m"
        />

        <div style={{ textAlign: "center", padding: "0 10px" }}>
          <div
            style={{
              fontFamily: text,
              fontSize: 13.5,
              fontWeight: 600,
              color: APP.ink,
              marginBottom: 5,
            }}
          >
            {500 - metres} m to go
          </div>
          <p
            style={{
              fontFamily: text,
              fontSize: 11,
              lineHeight: 1.5,
              color: APP.muted,
              maxWidth: 210,
              margin: "0 auto",
            }}
          >
            Measured from where you started, live, on this phone. No route is
            recorded.
          </p>
        </div>
      </div>

      <div
        style={{
          height: 44,
          display: "grid",
          placeItems: "center",
          borderRadius: 999,
          border: `1px solid ${APP.hairline}`,
          color: APP.muted,
          fontFamily: rounded,
          fontWeight: 700,
          fontSize: 14,
          flexShrink: 0,
        }}
      >
        Apps locked until you arrive
      </div>
    </Shell>
  );
}

/* =================================================================
   4. TapLatch: the card read.
   Core NFC opens a reader session, the tag is matched against the
   card you paired, and the locks flip. All of it on the device.
   ================================================================= */
export function TapLatchScreen({ unlocked = false }) {
  const accent = unlocked ? APP.green : APP.amber;

  return (
    <Shell style={{ padding: "0 18px 16px" }}>
      <div style={{ margin: "0 -18px" }}>
        <AppNavBar title="TapLatch" showAdd={false} />
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {/* Reader target. The two arcs are the field, the slab is the card. */}
        <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
          <div
            aria-hidden="true"
            className="glow animate-pulse-glow"
            style={{ inset: -52, filter: "blur(40px)" }}
          />
          <svg
            width="128"
            height="128"
            viewBox="0 0 128 128"
            fill="none"
            aria-hidden="true"
            style={{ position: "relative" }}
          >
            <rect
              x="16"
              y="40"
              width="62"
              height="48"
              rx="9"
              fill={APP.surfaceRaised}
              stroke={`color-mix(in srgb, ${accent} 55%, transparent)`}
              strokeWidth="1.6"
            />
            <rect x="27" y="52" width="26" height="4" rx="2" fill={accent} opacity="0.85" />
            <rect x="27" y="62" width="17" height="3.4" rx="1.7" fill={APP.muted} />
            <g stroke={accent} strokeWidth="3.4" strokeLinecap="round" fill="none">
              <path d="M90 50a22 22 0 0 1 0 28" opacity="0.9" />
              <path d="M102 40a36 36 0 0 1 0 48" opacity="0.55" />
              <path d="M114 31a50 50 0 0 1 0 66" opacity="0.28" />
            </g>
          </svg>
        </div>

        <div style={{ textAlign: "center", padding: "0 8px" }}>
          <div
            style={{
              fontFamily: rounded,
              fontWeight: 800,
              fontSize: 19,
              letterSpacing: "-0.02em",
              color: accent,
              marginBottom: 8,
            }}
          >
            {unlocked ? "Unlocked." : "Hold your card to the top."}
          </div>
          <p
            style={{
              fontFamily: text,
              fontSize: 12,
              lineHeight: 1.5,
              color: APP.muted,
              maxWidth: 215,
              margin: "0 auto",
            }}
          >
            {unlocked
              ? "Tap the card again to lock everything back down."
              : "One tap and your apps come back. One more and they go away again."}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 9, flexShrink: 0 }}>
        <SectionHeader style={{ marginLeft: 4 }}>YOUR CARD</SectionHeader>
        <DetailRow
          icon="nfc"
          iconColor={accent}
          title="Desk card"
          subtitle={unlocked ? "Open. 5 apps available." : "Latched. 5 apps locked."}
          subtitleColor={accent}
          tint={accent}
        />
      </div>
    </Shell>
  );
}

/* =================================================================
   5. The Focus tab (FocusListView): IN SESSION card, gym row,
      and the ALWAYS ON standing section.
   ================================================================= */
export function ActiveSessionCard({ delay = 0, live = true }) {
  const secs = useTicker(14 * 60 + 3, live);

  return (
    <AppCard tint={APP.amber} delay={delay} style={{ flexDirection: "column" }}>
      <div style={{ marginBottom: 12 }}>
        <TagPill text="IN SESSION" color={APP.amber} />
      </div>

      <div
        style={{
          fontFamily: text,
          fontSize: 18,
          fontWeight: 700,
          color: APP.ink,
          marginBottom: 12,
        }}
      >
        Deep work: thesis chapter
      </div>

      <div
        style={{
          fontFamily: rounded,
          fontWeight: 800,
          fontSize: 32,
          color: APP.ink,
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1,
          marginBottom: 5,
        }}
      >
        {compact(secs)}
      </div>
      <div style={{ fontFamily: text, fontSize: 12.5, color: APP.muted, marginBottom: 12 }}>
        Apps unlock when the timer runs out.
      </div>

      <div style={{ fontFamily: text, fontSize: 12.5, fontWeight: 500, color: APP.muted }}>
        End session early
      </div>
    </AppCard>
  );
}

/** GymRow: blue accent, right-aligned 12 semibold rounded status text. */
export function GymCard({ delay = 0 }) {
  return (
    <CommitmentRow
      title="Morning lift"
      detail="Arrive by 6:30 AM · Mon, Wed, Fri"
      release="Unlocks when you arrive at University of Guelph"
      accent={APP.blue}
      delay={delay}
    />
  );
}

/** WalkRow: the other half of the ACTIVE list, released by distance. */
export function WalkCard({ delay = 0 }) {
  return (
    <CommitmentRow
      title="Morning walk"
      detail="500 m from where you started"
      release="312 m measured so far"
      accent={APP.amber}
      delay={delay}
    />
  );
}

export function FocusTabScreen() {
  return (
    <Shell>
      <AppNavBar title="Focus" />
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          padding: "0 18px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <SectionHeader>ACTIVE</SectionHeader>
        <ActiveSessionCard delay={0} />
        <GymCard delay={90} />

        <SectionHeader style={{ marginTop: 4 }}>ALWAYS ON</SectionHeader>
        <DetailRow
          icon="location-fill"
          iconColor={APP.green}
          title="Location Lock"
          subtitle="Locked now, you're at Central Library."
          subtitleColor={APP.green}
          tint={APP.green}
          delay={180}
        />
      </div>
      <AppTabBar active="Focus" />
    </Shell>
  );
}

/* =================================================================
   6. Location: the real ALWAYS ON rows over the map.
   ================================================================= */
export function LocationScreen() {
  return (
    <Shell>
      <div style={{ position: "relative", flex: 1, minHeight: 0, overflow: "hidden" }}>
        <StylizedMap />
        <div
          style={{
            position: "absolute",
            left: 14,
            right: 14,
            bottom: 18,
            display: "flex",
            flexDirection: "column",
            gap: 9,
          }}
        >
          <SectionHeader style={{ marginLeft: 4, marginBottom: 1 }}>
            ALWAYS ON
          </SectionHeader>
          <DetailRow
            icon="location-fill"
            iconColor={APP.green}
            title="Location Lock"
            subtitle="Locked now, you're at Central Library."
            subtitleColor={APP.green}
            tint={APP.green}
          />
          <DetailRow
            icon="mappin"
            iconColor={APP.blue}
            title="Your gyms"
            subtitle="2 gyms · most visits at University of Guelph"
            delay={90}
          />
        </div>
      </div>
    </Shell>
  );
}

/* =================================================================
   Stylized dark map. Hand-drawn SVG, no tiles, no network request.
   ================================================================= */
export function StylizedMap({ className = "", pinLabel }) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 320 560"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        <rect width="320" height="560" fill="#0d0d0e" />
        <g fill="#161618">
          {[
            [12, 40, 110, 90], [140, 30, 90, 110], [246, 60, 90, 80],
            [8, 160, 86, 120], [112, 170, 110, 70], [240, 165, 96, 110],
            [16, 300, 100, 96], [136, 262, 84, 134], [238, 296, 98, 92],
            [10, 416, 120, 110], [150, 416, 80, 120], [250, 420, 90, 100],
          ].map((r, i) => (
            <rect key={i} x={r[0]} y={r[1]} width={r[2]} height={r[3]} rx="4" />
          ))}
        </g>
        <g stroke="#1f1f22" strokeWidth="7" strokeLinecap="round">
          <path d="M0 150h320M0 288h320M0 404h320" />
          <path d="M128 0v560M232 0v560" />
        </g>
        <g stroke="#262629" strokeWidth="2">
          <path d="M0 96h320M0 352h320M64 0v560" />
        </g>
        <path
          d="M30 520 L30 404 L128 404 L128 288 L180 288"
          fill="none"
          stroke={APP.amber}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.5"
          strokeDasharray="6 7"
        />
      </svg>

      {/* Pulsing geofence. Green, because an in-force Location Lock is green
          in the app (LocationLockCard). */}
      <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative grid place-items-center">
          <span
            aria-hidden="true"
            className="absolute h-[180px] w-[180px] animate-pulse-glow rounded-full"
            style={{
              border: "1px solid rgba(48,209,88,0.45)",
              background: "rgba(48,209,88,0.07)",
            }}
          />
          <span
            aria-hidden="true"
            className="absolute h-[110px] w-[110px] rounded-full"
            style={{
              border: "1px solid rgba(48,209,88,0.3)",
              background: "rgba(48,209,88,0.06)",
            }}
          />
          <span
            className="relative grid h-11 w-11 place-items-center rounded-full"
            style={{
              background: APP.green,
              boxShadow: "0 0 28px rgba(48,209,88,0.55)",
            }}
          >
            <Icon name="location-fill" size={20} color={APP.bg} />
          </span>
        </div>
      </div>

      {pinLabel ? (
        <span
          className="absolute left-1/2 top-[38%] mt-[116px] -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-semibold backdrop-blur"
          style={{
            background: "rgba(20,20,22,0.92)",
            border: `1px solid ${APP.hairline}`,
            color: APP.ink,
            fontFamily: text,
          }}
        >
          {pinLabel}
        </span>
      ) : null}
    </div>
  );
}

/* =================================================================
   The TapLatch card itself, drawn rather than photographed.
   Lives outside the phone chassis, in the TapLatch section.
   ================================================================= */
export function TapLatchCard({ className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="glow animate-pulse-glow"
        style={{ inset: "-26%", filter: "blur(64px)" }}
      />
      <div
        className="relative flex w-full flex-col justify-between overflow-hidden p-6 sm:p-7"
        style={{
          /* Inline rather than aspect-[1.586/1]: the slash in an arbitrary
             Tailwind value reads as a modifier, so the ratio never lands. */
          aspectRatio: "1.586 / 1",
          borderRadius: 20,
          background:
            "linear-gradient(145deg, #1C1C1F 0%, #141416 55%, #0F0F11 100%)",
          border: "1px solid rgba(251,174,60,0.28)",
          boxShadow:
            "0 30px 70px -28px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.07)",
        }}
      >
        {/* Specular sweep across the top edge, the one lensing effect the
            design system still allows. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(118deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 42%)",
          }}
        />

        <div className="relative flex items-start justify-between">
          <span className="inline-flex items-center gap-2.5">
            <AppIcon size={34} />
            <span
              className="font-display font-extrabold text-ink"
              style={{ fontSize: 17, letterSpacing: "-0.03em" }}
            >
              Deadline
            </span>
          </span>
          <span style={{ color: APP.amber }}>
            <Icon name="nfc" size={26} color={APP.amber} weight={1.6} />
          </span>
        </div>

        <div className="relative">
          <div
            style={{
              fontFamily: rounded,
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: "-0.02em",
              color: APP.ink,
              marginBottom: 5,
            }}
          >
            TapLatch
          </div>
          <div
            style={{
              fontFamily: rounded,
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: "1px",
              color: APP.muted,
            }}
          >
            TAP TO LOCK · TAP TO UNLOCK
          </div>
        </div>
      </div>
    </div>
  );
}
