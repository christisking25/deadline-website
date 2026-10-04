import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { AppIcon } from "./primitives";
import { compact } from "../lib/duration";
import {
  APP,
  AppCard,
  AppNavBar,
  AppTabBar,
  AssignmentRow,
  DetailRow,
  Icon,
  SectionHeader,
  TagPill,
  TIER,
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

/* =================================================================
   1. The Screen Time shield.
   Copy and layout from ShieldPresentation.swift and
   ShieldConfigurationExtension.swift: the app's own hourglass mark,
   title in the accent colour, muted subtitle, and an OK button in
   black on the accent. The title is always "Locked in."
   ================================================================= */
export function ShieldScreen({
  subtitle = "Submit your assignment to unlock.\nMATH 235 · Problem Set 6 · Due in 2d 23h",
  urgent = false,
  live = false,
}) {
  const accent = urgent ? APP.red : APP.amber;
  const secs = useTicker(4 * 3600 + 17 * 60 + 9, live);

  // DurationText.relativeToDue over a live clock. compact() collapses to at
  // most two adjacent units, so this reads "Due in 1d 4h" like the real shield.
  const body = live
    ? `Submit your assignment to unlock.\nMATH 235 · Problem Set 6 · Due in ${compact(
        86400 + secs,
      )}`
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
   2. Set it: the New deadline sheet (AssignmentEditorView).
   A grouped iOS form: Title, Course, Due date, Enforcement tier.
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

export function SetScreen() {
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
          New deadline
        </div>
      </div>

      <div style={{ overflow: "hidden", flex: 1 }}>
        <FormGroup header="Assignment">
          <FormRow label="Title" value="Problem Set 6" />
          <FormRow label="Course" value="MATH 235" />
          <FormRow label="Due" value="Fri 14 Oct, 11:59 PM" valueColor={APP.amber} last />
        </FormGroup>

        <FormGroup
          header="Enforcement tier"
          footer="Apps lock for longer as the date gets closer. You can override, but you have to write out why."
        >
          <div style={{ padding: "11px 13px", display: "flex", gap: 7 }}>
            <TagPill text="GENTLE" color={APP.blue} />
            <TagPill text="STRICT" color={APP.amber} />
            <TagPill text="NO EXCUSES" color={APP.red} />
          </div>
          <div
            style={{
              borderTop: `1px solid ${APP.hairline}`,
              padding: "10px 13px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Icon name="check" size={13} color={APP.amber} />
            <span style={{ fontFamily: text, fontSize: 12, color: APP.ink }}>
              Strict selected
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
   3. Feel it: the Deadlines tab (DeadlineListView).
   ================================================================= */
export function DeadlinesTabScreen() {
  return (
    <Shell>
      <AppNavBar title="Deadline" />

      {/* The list scrolls under the floating tab bar, so the last row fades
          out rather than being cut off square. */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          padding: "0 18px",
          display: "flex",
          flexDirection: "column",
          gap: 9,
          maskImage: "linear-gradient(180deg,#000 86%,transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg,#000 86%,transparent 100%)",
        }}
      >
        <AssignmentRow
          title="Problem Set 6"
          course="MATH 235"
          tier="STRICT"
          countdown="Due in 2d 23h"
          date="Fri 14 Oct"
          delay={0}
        />
        <AssignmentRow
          title="Lab report: titration"
          course="CHEM 1040"
          tier="NO EXCUSES"
          countdown="Due in 19h"
          date="Thu 12 Oct"
          delay={70}
        />
        <AssignmentRow
          title="Reading response 4"
          course="PHIL 2070"
          tier="GENTLE"
          countdown="Due in 6d"
          date="Mon 17 Oct"
          delay={140}
        />

        <SectionHeader style={{ marginTop: 2 }}>SUBMITTED</SectionHeader>
        <AssignmentRow
          title="Quiz 3 corrections"
          course="MATH 235"
          tier="STRICT"
          extraPill={{ text: "DONE", color: APP.green }}
          countdown="Submitted"
          accent={APP.green}
          dim={0.45}
          delay={210}
        />
      </div>

      <AppTabBar active="Deadlines" />
    </Shell>
  );
}

/* =================================================================
   4. Prove it: ProofSubmissionView.
   ================================================================= */
export function ProofScreen() {
  return (
    <Shell style={{ padding: "0 16px 16px" }}>
      <div style={{ padding: "4px 2px 12px" }}>
        <div
          style={{
            fontFamily: rounded,
            fontWeight: 800,
            fontSize: 19,
            color: APP.ink,
            letterSpacing: "-0.02em",
          }}
        >
          Proof of submission
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div
          style={{
            fontFamily: text,
            fontSize: 18,
            fontWeight: 700,
            color: APP.ink,
            marginBottom: 3,
          }}
        >
          Problem Set 6
        </div>
        <div style={{ fontFamily: text, fontSize: 13, color: APP.muted }}>
          MATH 235
        </div>
      </div>

      {/* Import dropzone: 34pt light glyph, then the two copy lines. */}
      <div
        style={{
          background: APP.surface,
          border: `1px dashed ${APP.hairline}`,
          borderRadius: 16,
          padding: "20px 16px",
          textAlign: "center",
          marginBottom: 14,
        }}
      >
        <div style={{ display: "grid", placeItems: "center", marginBottom: 9 }}>
          <Icon name="camera" size={30} color={APP.muted} weight={1.3} />
        </div>
        <div
          style={{
            fontFamily: text,
            fontSize: 13,
            fontWeight: 500,
            color: APP.ink,
            marginBottom: 5,
          }}
        >
          Import your submission screenshot
        </div>
        <div
          style={{
            fontFamily: text,
            fontSize: 11,
            lineHeight: 1.45,
            color: APP.muted,
          }}
        >
          A screenshot of the upload receipt. Optional, you can confirm manually
          instead.
        </div>
      </div>

      <div
        style={{
          fontFamily: text,
          fontSize: 10.5,
          fontWeight: 500,
          color: APP.muted,
          textAlign: "center",
          marginBottom: 12,
        }}
      >
        or confirm manually
      </div>

      <div
        style={{
          height: 46,
          display: "grid",
          placeItems: "center",
          borderRadius: 999,
          background: APP.amber,
          color: APP.bg,
          fontFamily: rounded,
          fontWeight: 800,
          fontSize: 15,
          marginBottom: 10,
        }}
      >
        Unlock everything
      </div>

      <p
        style={{
          fontFamily: text,
          fontSize: 11,
          color: APP.muted,
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        Nothing is checked. Deadline takes you at your word.
      </p>
      <p
        style={{
          fontFamily: text,
          fontSize: 10,
          lineHeight: 1.45,
          color: APP.muted,
          textAlign: "center",
        }}
      >
        Submitting lifts every lock for this assignment and silences its alarm
        immediately.
      </p>
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
    <AppCard accent={APP.blue} tint={APP.blue} delay={delay}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: text,
              fontSize: 15,
              fontWeight: 600,
              color: APP.ink,
              marginBottom: 5,
            }}
          >
            Morning lift
          </div>
          <div style={{ fontFamily: text, fontSize: 12.5, color: APP.muted, marginBottom: 8 }}>
            Arrive by 6:30 AM · Mon, Wed, Fri
          </div>
          <TagPill text="GENTLE" color={APP.blue} />
        </div>
        <div
          style={{
            fontFamily: rounded,
            fontWeight: 600,
            fontSize: 11.5,
            color: APP.blue,
            textAlign: "right",
            maxWidth: 108,
            lineHeight: 1.35,
            flexShrink: 0,
          }}
        >
          Locks when you arrive at University of Guelph
        </div>
      </div>
    </AppCard>
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
   7. Escalation stages: the shield at each rung, plus the
      notification banner for the 4-days-out stage.
   ================================================================= */
export function StageScreen({ stage }) {
  if (stage.kind === "notify") {
    return (
      <Shell style={{ padding: "10px 16px 16px" }}>
        <SectionHeader style={{ marginBottom: 12 }}>NOTIFICATIONS</SectionHeader>

        {/* iOS notification banner */}
        <div
          style={{
            background: "rgba(28,28,31,0.95)",
            border: `1px solid ${APP.hairline}`,
            borderRadius: 18,
            padding: 13,
            backdropFilter: "blur(14px)",
            marginBottom: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
            {/* A real iOS banner shows the app's own icon and display name. */}
            <AppIcon size={22} style={{ flexShrink: 0 }} />
            <span
              style={{
                fontFamily: rounded,
                fontWeight: 700,
                fontSize: 10.5,
                color: APP.ink,
                letterSpacing: "0.3px",
              }}
            >
              DEADLINE
            </span>
            <span style={{ marginLeft: "auto", fontFamily: text, fontSize: 10, color: APP.muted }}>
              now
            </span>
          </div>
          <div
            style={{
              fontFamily: text,
              fontSize: 12.5,
              fontWeight: 600,
              color: APP.ink,
              marginBottom: 3,
            }}
          >
            4 days out.
          </div>
          <div style={{ fontFamily: text, fontSize: 11.5, lineHeight: 1.45, color: APP.muted }}>
            MATH 235 · Problem Set 6 is due Friday. Nothing is locked yet. That
            changes tomorrow.
          </div>
        </div>

        <div
          style={{
            background: "rgba(28,28,31,0.7)",
            border: `1px solid ${APP.hairline}`,
            borderRadius: 18,
            padding: 13,
            opacity: 0.6,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
            <AppIcon size={22} style={{ flexShrink: 0 }} />
            <span style={{ fontFamily: rounded, fontWeight: 700, fontSize: 10.5, color: APP.ink }}>
              DEADLINE
            </span>
            <span style={{ marginLeft: "auto", fontFamily: text, fontSize: 10, color: APP.muted }}>
              8h ago
            </span>
          </div>
          <div style={{ fontFamily: text, fontSize: 11.5, color: APP.muted }}>
            Your apps are still open. Use the time.
          </div>
        </div>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
          <AssignmentRow
            title="Problem Set 6"
            course="MATH 235"
            tier="STRICT"
            countdown="Due in 4d"
            date="Fri 14 Oct"
          />
        </div>
      </Shell>
    );
  }

  return <ShieldScreen subtitle={stage.shieldSubtitle} urgent={stage.tone === "danger"} />;
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
   The Deadlines tab with the work already done.
   Same list as DeadlinesTabScreen, but led by a submitted assignment:
   green accent bar and a DONE pill, exactly as AssignmentRow renders a
   resolved deadline (Palette.green, TagPill "DONE").
   ================================================================= */
export function SubmittedScreen() {
  return (
    <Shell>
      <AppNavBar title="Deadline" />

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          padding: "0 18px",
          display: "flex",
          flexDirection: "column",
          gap: 9,
          maskImage: "linear-gradient(180deg,#000 88%,transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg,#000 88%,transparent 100%)",
        }}
      >
        <SectionHeader>SUBMITTED</SectionHeader>
        <AssignmentRow
          title="Essay draft"
          course="HIST 1250"
          tier="STRICT"
          extraPill={{ text: "DONE", color: APP.green }}
          countdown="Submitted"
          date="Sat 15 Oct"
          accent={APP.green}
          delay={0}
        />
        <AssignmentRow
          title="Problem Set 6"
          course="MATH 235"
          tier="NO EXCUSES"
          extraPill={{ text: "DONE", color: APP.green }}
          countdown="Submitted"
          date="Fri 14 Oct"
          accent={APP.green}
          dim={0.25}
          delay={70}
        />

        <SectionHeader style={{ marginTop: 2 }}>ACTIVE</SectionHeader>
        <AssignmentRow
          title="Reading response 4"
          course="PHIL 2070"
          tier="GENTLE"
          countdown="Due in 6d"
          date="Mon 17 Oct"
          delay={140}
        />
      </div>

      <AppTabBar active="Deadlines" />
    </Shell>
  );
}

/* Kept for the How It Works "Feel it" step. */
export { DeadlinesTabScreen as FeelScreen };
