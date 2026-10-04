import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppIcon, InstagramLink, Logo, EASE } from "../components/primitives";

const LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#modes", label: "Modes" },
  { href: "#tiers", label: "Tiers" },
  { href: "#privacy", label: "Privacy" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll and close on Escape while the mobile sheet is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    /* Sticky, not fixed. Fixed took the header out of flow, so the page began
       underneath it and every section slid behind an opaque bar that belonged
       to nothing. Sticky keeps it in flow: the document genuinely starts below
       the header, and it only pins itself once you scroll past it.

       The top safe-area inset is padding on the header rather than a margin on
       the nav, so the notch strip is filled by the header's own background
       once it is pinned. */
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${scrolled ? "nav-glass" : ""}`}
      style={{
        paddingTop: "env(safe-area-inset-top, 0px)",
        borderBottom: `1px solid ${scrolled ? "var(--color-hairline)" : "transparent"}`,
      }}
    >
      <nav
        className="container-d flex h-[var(--nav-h)] items-center justify-between"
        aria-label="Primary"
      >
        <a href="#top" className="shrink-0 rounded-md" aria-label="Deadline, home">
          <Logo size={20} iconSize={32} priority />
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="nav-link"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <span className="hidden md:block">
            <InstagramLink size={21} />
          </span>

          <a
            href="#download"
            className="btn-amber hidden h-[42px] px-5 text-[15px] md:inline-flex"
          >
            Download
          </a>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-hairline text-ink md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M3 7h18" />
                  <path d="M3 17h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="sheet"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="md:hidden"
            /* Fully opaque. A translucent sheet lets the hero headline read
               straight through the menu items. */
            style={{
              background: "#0B0B0C",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <ul className="container-d flex flex-col gap-1 py-5">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-2 py-3.5 text-[19px] font-semibold tracking-tight text-ink"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <InstagramLink
                  showHandle
                  className="px-2 py-1.5 text-[19px]"
                  size={22}
                />
              </li>
              <li className="mt-3">
                <a
                  href="#download"
                  onClick={() => setOpen(false)}
                  className="btn-amber w-full"
                >
                  <AppIcon size={26} />
                  Download on the App Store
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
