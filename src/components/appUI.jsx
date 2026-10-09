/**
 * Primitives rebuilt from the iOS app's SwiftUI source so the marketing screens
 * are the real components, not an impression of them.
 *
 * Sources:
 *   Deadline/UI/Theme.swift          TagPill, CardBackground
 *   Deadline/UI/GymListView.swift        GymRow, LearnedGymsCard
 *   Deadline/UI/DowntimeListView.swift   ActiveDowntimeCard, LocationLockCard
 *   Deadline/UI/FocusListView.swift      FocusSectionHeader, section headers
 *   Deadline/UI/RootView.swift           tab bar
 */

export const APP = {
  bg: "#0B0B0C",
  surface: "#141416",
  surfaceRaised: "#1C1C1F",
  hairline: "#2A2A2E",
  muted: "#8A8A8E",
  ink: "#F4F4F5",
  amber: "#FBAE3C",
  red: "#FF453A",
  green: "#30D158",
  blue: "#5AA0FF",
  orange: "#FF8A3D",
};

const rounded = "var(--font-display)";
const text = "var(--font-text)";

/* ---------------------------------------------------------------- icons
   Drawn to match the SF Symbols the app actually names. */

export function Icon({ name, size = 18, color = "currentColor", weight = 1.8 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: weight,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  switch (name) {
    case "gearshape":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3.1" />
          <path d="M19.4 14.4a1.6 1.6 0 0 0 .33 1.78l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.6 1.6 0 0 0-1.78-.33 1.6 1.6 0 0 0-1 1.47V20a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 9 18.4a1.6 1.6 0 0 0-1.78.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.6 1.6 0 0 0 4.75 14a1.6 1.6 0 0 0-1.47-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.47-1 1.6 1.6 0 0 0-.33-1.78l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.6 1.6 0 0 0 9 3.75 1.6 1.6 0 0 0 10 2.28V2a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.47 1.6 1.6 0 0 0 1.78-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.6 1.6 0 0 0-.33 1.78V9a1.6 1.6 0 0 0 1.47 1H22a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.47 1Z" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common} strokeWidth="2.6">
          <path d="M12 5.5v13M5.5 12h13" />
        </svg>
      );
    case "nfc":
      /* A card held against the phone, with the two radio arcs the tap
         throws. Same 24px grid and 1.5ish stroke as the rest. */
      return (
        <svg {...common}>
          <rect x="2.5" y="6" width="12.5" height="12" rx="2.6" />
          <path d="M18 8.6a5 5 0 0 1 0 6.8" />
          <path d="M20.8 6a8.4 8.4 0 0 1 0 12" />
        </svg>
      );
    case "flame":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
          <path d="M12.8 2.1c.3 2.4-.7 4-1.9 5.4-1.3 1.5-2.6 2.9-2.6 5.2 0 1 .3 1.9.8 2.6-1.3-.4-2.3-1.6-2.6-3.1-.9 1.2-1.4 2.6-1.4 4.1 0 3.4 3.1 5.7 6.9 5.7s6.9-2.3 6.9-5.9c0-4.6-3.3-6.3-4.5-9.2-.4-1-.6-2.4-1.6-4.8Z" />
        </svg>
      );
    case "chart":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
          <rect x="3" y="12" width="4" height="9" rx="1.2" />
          <rect x="10" y="6" width="4" height="15" rx="1.2" />
          <rect x="17" y="9" width="4" height="12" rx="1.2" />
        </svg>
      );
    case "mappin":
      return (
        <svg {...common}>
          <path d="M12 2.8a5.2 5.2 0 0 1 5.2 5.2c0 3.6-5.2 8.4-5.2 8.4S6.8 11.6 6.8 8A5.2 5.2 0 0 1 12 2.8Z" />
          <circle cx="12" cy="8" r="1.9" />
          <ellipse cx="12" cy="19.4" rx="6.4" ry="2.1" />
        </svg>
      );
    case "location-fill":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
          <path d="M12 2.4c-3.6 0-6.5 2.9-6.5 6.5 0 4.7 6.5 12.4 6.5 12.4s6.5-7.7 6.5-12.4c0-3.6-2.9-6.5-6.5-6.5Zm0 9a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2Z" />
        </svg>
      );
    case "chevron-right":
      return (
        <svg {...common} strokeWidth="2.4">
          <path d="M9.5 5.5 16 12l-6.5 6.5" />
        </svg>
      );
    case "hourglass":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill={color} aria-hidden="true">
          <rect x="6.5" y="4" width="19" height="3" rx="1.5" />
          <rect x="6.5" y="25" width="19" height="3" rx="1.5" />
          <path d="M9.5 9 L22.5 9 L16 15.3 Z" />
          <path d="M16 16.7 L22.5 23 L9.5 23 Z" />
        </svg>
      );
    case "camera":
      return (
        <svg {...common} strokeWidth="1.5">
          <path d="M3 7.5h3.4L8.2 5h7.6l1.8 2.5H21V19H3V7.5Z" />
          <circle cx="12" cy="13" r="3.6" />
        </svg>
      );
    case "check":
      return (
        <svg {...common} strokeWidth="2.8">
          <path d="m4.5 12.5 5 5 10-11" />
        </svg>
      );
    default:
      return null;
  }
}

/* ---------------------------------------------------------------- pills
   TagPill: 10px bold rounded, tracking 0.6, fill 0.15, stroke 0.45. */

export function TagPill({ text: label, color = APP.amber }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: rounded,
        fontWeight: 700,
        fontSize: 10,
        letterSpacing: "0.6px",
        lineHeight: 1,
        color,
        background: `color-mix(in srgb, ${color} 15%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 45%, transparent)`,
        borderRadius: 999,
        padding: "4px 8px",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

/* FocusSectionHeader: 11px bold rounded, tracking 1.0, muted. */
export function SectionHeader({ children, style }) {
  return (
    <div
      style={{
        fontFamily: rounded,
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: "1px",
        color: APP.muted,
        lineHeight: 1,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* CardBackground: 16pt radius, surface fill, 1px tint stroke at 0.6. */
export function AppCard({ children, tint = APP.hairline, style, accent, delay = 0 }) {
  return (
    <div
      className="animate-row-in"
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: accent ? 14 : 0,
        background: APP.surface,
        border: `1px solid color-mix(in srgb, ${tint} 60%, transparent)`,
        borderRadius: 16,
        padding: 14,
        animationDelay: `${delay}ms`,
        ...style,
      }}
    >
      {accent ? (
        <span
          aria-hidden="true"
          style={{
            flex: "0 0 3px",
            width: 3,
            borderRadius: 2,
            background: accent,
            margin: "2px 0",
          }}
        />
      ) : null}
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
    </div>
  );
}

/* ------------------------------------------------- commitment row
   CommitmentRow: 3px accent bar, 15 semibold title, 12 muted detail line,
   right-aligned release condition in 11.5 semibold rounded. */

export function CommitmentRow({
  title,
  detail,
  pill,
  release,
  accent = APP.amber,
  dim = 0,
  delay = 0,
}) {
  return (
    <AppCard
      accent={accent}
      tint={accent}
      delay={delay}
      style={{ opacity: 1 - dim }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: text,
              fontSize: 14.5,
              fontWeight: 600,
              color: APP.ink,
              lineHeight: 1.25,
              marginBottom: 4,
              /* The app clamps the title to two lines. */
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: text,
              fontSize: 11.5,
              color: APP.muted,
              marginBottom: pill ? 7 : 0,
            }}
          >
            {detail}
          </div>
          {pill ? <TagPill text={pill.text} color={pill.color} /> : null}
        </div>

        {release ? (
          <div
            style={{
              fontFamily: rounded,
              fontWeight: 600,
              fontSize: 11.5,
              color: accent,
              textAlign: "right",
              maxWidth: 106,
              lineHeight: 1.35,
              flexShrink: 0,
            }}
          >
            {release}
          </div>
        ) : null}
      </div>
    </AppCard>
  );
}

/* ------------------------------------------------- nav + tab bar */

/** Large iOS title with the circular gear and plus buttons. */
export function AppNavBar({ title, showAdd = true }) {
  const circle = {
    width: 32,
    height: 32,
    borderRadius: 999,
    background: APP.surfaceRaised,
    border: `1px solid ${APP.hairline}`,
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
  };
  return (
    <div style={{ padding: "2px 18px 8px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <span style={circle}>
          <Icon name="gearshape" size={15} color={APP.ink} weight={1.6} />
        </span>
        {showAdd ? (
          <span style={circle}>
            <Icon name="plus" size={15} color={APP.amber} />
          </span>
        ) : (
          <span />
        )}
      </div>
      <h4
        style={{
          fontFamily: rounded,
          fontWeight: 800,
          fontSize: 27,
          letterSpacing: "-0.02em",
          color: APP.ink,
          lineHeight: 1.05,
        }}
      >
        {title}
      </h4>
    </div>
  );
}

/** Floating pill tab bar. Active tab is amber on a lighter pill. */
export function AppTabBar({ active = "Focus" }) {
  const tabs = [
    { label: "Focus", icon: "flame" },
    { label: "TapLatch", icon: "nfc" },
    { label: "History", icon: "chart" },
  ];
  return (
    <div style={{ padding: "0 14px 10px", flexShrink: 0 }}>
      <div
        style={{
          display: "flex",
          gap: 4,
          background: "rgba(28,28,31,0.92)",
          border: `1px solid ${APP.hairline}`,
          borderRadius: 999,
          padding: 5,
          backdropFilter: "blur(14px)",
        }}
      >
        {tabs.map((t) => {
          const on = t.label === active;
          return (
            <div
              key={t.label}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                padding: "6px 0 5px",
                borderRadius: 999,
                background: on ? "rgba(251,174,60,0.14)" : "transparent",
                transition: "background 300ms var(--ease-out-expo)",
              }}
            >
              <Icon
                name={t.icon}
                size={16}
                color={on ? APP.amber : APP.muted}
                weight={1.9}
              />
              <span
                style={{
                  fontFamily: rounded,
                  fontWeight: on ? 700 : 600,
                  fontSize: 9.5,
                  color: on ? APP.amber : APP.muted,
                }}
              >
                {t.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------- settings-style row
   LocationLockCard / LearnedGymsCard: 18pt icon, 15 semibold title,
   12 subtitle, chevron. */
export function DetailRow({
  icon = "mappin",
  iconColor = APP.muted,
  title,
  subtitle,
  subtitleColor = APP.muted,
  tint = APP.hairline,
  delay = 0,
}) {
  return (
    <AppCard tint={tint} delay={delay}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 13 }}>
        <span style={{ width: 24, flexShrink: 0, paddingTop: 1 }}>
          <Icon name={icon} size={18} color={iconColor} weight={1.9} />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: text,
              fontSize: 14.5,
              fontWeight: 600,
              color: APP.ink,
              marginBottom: 3,
            }}
          >
            {title}
          </div>
          <div style={{ fontFamily: text, fontSize: 11.5, color: subtitleColor }}>
            {subtitle}
          </div>
        </div>
        <span style={{ flexShrink: 0, paddingTop: 3 }}>
          <Icon name="chevron-right" size={13} color={APP.muted} />
        </span>
      </div>
    </AppCard>
  );
}
