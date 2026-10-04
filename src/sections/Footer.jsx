import { InstagramLink, Logo } from "../components/primitives";

/**
 * Back to the top of the document.
 *
 * scrollTo with no `behavior` resolves to the element's computed
 * `scroll-behavior`, which is `smooth` normally and forced to `auto` inside
 * the reduced-motion block in index.css. So reduced motion is already handled
 * and this needs no media query of its own.
 *
 * A button rather than an `href="#top"` link: #top is the hero, which on
 * mobile leaves the header above it still off screen. 0 is the actual top.
 */
function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      className="group inline-flex min-h-[44px] items-center gap-3 text-[15px] text-ink/75 transition-colors duration-200 hover:text-amber focus-visible:text-amber"
    >
      <span
        aria-hidden="true"
        className="grid h-9 w-9 place-items-center rounded-full border border-hairline transition-all duration-200 group-hover:border-[rgba(251,174,60,0.45)] group-hover:-translate-y-0.5"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
      </span>
      Back to top
    </button>
  );
}

const NAV = [
  { href: "#how", label: "How it works" },
  { href: "#modes", label: "Modes" },
  { href: "#tiers", label: "Tiers" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-hairline bg-bg">
      <div className="container-d py-16 lg:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[34ch]">
            <Logo size={21} />
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              Screen time that fights back. Deadline locks your apps until you
              do what you said you would do.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:pt-1">
            <h2 className="label-d mb-5 text-muted">Explore</h2>
            <ul className="grid grid-cols-2 gap-x-10 sm:grid-cols-3 lg:grid-cols-2">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="inline-flex min-h-[44px] items-center text-[15px] text-ink/75 transition-colors duration-200 hover:text-amber"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:pt-1">
            <h2 className="label-d mb-5 text-muted">Contact</h2>
            <ul className="flex flex-col">
              <li>
                <a
                  href="https://privacy.hitdeadline.com"
                  className="inline-flex min-h-[44px] items-center text-[15px] text-ink/75 transition-colors duration-200 hover:text-amber"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <InstagramLink showHandle size={19} />
              </li>
              <li>
                <a
                  href="mailto:support@hitdeadline.com"
                  className="inline-flex min-h-[44px] items-center text-[15px] text-ink/75 transition-colors duration-200 hover:text-amber"
                >
                  support@hitdeadline.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline my-12" aria-hidden="true" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-muted">
            &copy; 2026 Deadline. All rights reserved.
          </p>
          <p className="text-[13px] text-muted">
            Built for people who are done negotiating with themselves.
          </p>
        </div>

        {/* The way back up now that nothing is pinned on phones. Its own row so
            the two lines above keep their layout; centred on mobile, where it
            is the only way back, and tucked right on desktop, where the header
            is still pinned and this is a convenience. */}
        <div className="mt-10 flex justify-center sm:justify-end">
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
