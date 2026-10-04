import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Scrolled past this, the button is offered. */
const SHOW_AT = 300;

/**
 * Floating back-to-top button, bottom-right, on every breakpoint.
 *
 * Styling lives in index.css as `.to-top`, next to the other chrome, so the
 * z-index stack and the safe-area insets are all readable in one place.
 */
export default function BackToTop() {
  const [shown, setShown] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      /* Deliberate hysteresis: it appears at 300, but does not leave again
         until the page is actually back at the top. A single threshold would
         flicker the button on and off for anyone reading around the 300px
         mark, and would also yank it out from under the cursor part-way
         through its own scroll home. `<= 0` rather than `=== 0` because
         scrollY is fractional and goes negative on rubber-band overscroll;
         an equality test would leave the button stranded. */
      if (y >= SHOW_AT) setShown(true);
      else if (y <= 0) setShown(false);
    };

    /* Deliberately not rAF-throttled. rAF does not run in a throttled or
       occluded tab, which would strand the button in whatever state it was
       last left in; the work here is a single scrollY read, and React bails
       out of the re-render when the value has not changed. */
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <button
      type="button"
      className="to-top"
      data-shown={shown}
      aria-label="Back to top"
      /* Hidden from assistive tech and lifted out of the tab order while it is
         faded out, so it is never a stop on the way to the footer. */
      aria-hidden={!shown}
      {...(!shown ? { inert: "" } : {})}
      onClick={() =>
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
      }
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}
