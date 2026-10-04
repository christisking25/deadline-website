import { Suspense, lazy, useEffect } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import CallOut from "./sections/CallOut";
import StickyCTA from "./sections/StickyCTA";

/* Navbar, Hero and CallOut ship in the main bundle: they are the first
   screenful and the section right under it. Everything below the fold is
   code-split and streamed in as the visitor scrolls. */
const HowItWorks = lazy(() => import("./sections/HowItWorks"));
const Escalation = lazy(() => import("./sections/Escalation"));
const Tiers = lazy(() => import("./sections/Tiers"));
const Modes = lazy(() => import("./sections/Modes"));
const LocationLock = lazy(() => import("./sections/LocationLock"));
const Testimonials = lazy(() => import("./sections/Testimonials"));
const Privacy = lazy(() => import("./sections/Privacy"));
const FAQ = lazy(() => import("./sections/FAQ"));
const FinalCTA = lazy(() => import("./sections/FinalCTA"));
const Footer = lazy(() => import("./sections/Footer"));

/* Reserves vertical space while a chunk loads so the scrollbar does not
   jump around. Not announced to assistive tech. */
function Placeholder({ h = 600 }) {
  return <div aria-hidden="true" style={{ minHeight: h }} />;
}

/* The lazy imports keep the first paint small. Once the browser is idle we
   pull the rest in anyway, so a fast scroller never lands on a placeholder
   and the page stops reflowing underneath them. */
const PREFETCH = [
  () => import("./sections/HowItWorks"),
  () => import("./sections/Escalation"),
  () => import("./sections/Tiers"),
  () => import("./sections/Modes"),
  () => import("./sections/LocationLock"),
  () => import("./sections/Testimonials"),
  () => import("./sections/Privacy"),
  () => import("./sections/FAQ"),
  () => import("./sections/FinalCTA"),
  () => import("./sections/Footer"),
];

function usePrefetchSections() {
  useEffect(() => {
    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      // All ten chunks together are well under 50 kB, so fetch them in
      // parallel. Serialising them just delays the last section's mount.
      PREFETCH.forEach((load) => load().catch(() => {}));
    };
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(run, { timeout: 2500 })
      : window.setTimeout(run, 1200);
    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, []);
}

export default function App() {
  usePrefetchSections();

  return (
    <div className="grain relative min-h-screen bg-bg">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <CallOut />

        <Suspense fallback={<Placeholder h={900} />}>
          <HowItWorks />
        </Suspense>

        <Suspense fallback={<Placeholder h={900} />}>
          <Escalation />
        </Suspense>

        <Suspense fallback={<Placeholder h={700} />}>
          <Tiers />
        </Suspense>

        <Suspense fallback={<Placeholder h={700} />}>
          <Modes />
        </Suspense>

        <Suspense fallback={<Placeholder h={700} />}>
          <LocationLock />
        </Suspense>

        <Suspense fallback={<Placeholder h={600} />}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<Placeholder h={700} />}>
          <Privacy />
        </Suspense>

        <Suspense fallback={<Placeholder h={700} />}>
          <FAQ />
        </Suspense>

        <Suspense fallback={<Placeholder h={600} />}>
          <FinalCTA />
        </Suspense>
      </main>

      <Suspense fallback={<Placeholder h={400} />}>
        <Footer />
      </Suspense>

      <StickyCTA />
    </div>
  );
}
