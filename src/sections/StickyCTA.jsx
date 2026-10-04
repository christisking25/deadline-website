import { useEffect, useRef, useState } from "react";
import { AppIcon } from "../components/primitives";

/**
 * Sticky download bar for phones.
 *
 * The page is tall, and between the hero and the final CTA there was no way to
 * act on the pitch. This keeps the one action permanently one thumb away
 * without covering the hero, where the full-size button already lives.
 *
 * Desktop hides it in CSS: the navbar's Download button is always visible
 * there, so a second persistent bar would be noise.
 */
export default function StickyCTA() {
  const [shown, setShown] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const footerCta = document.getElementById("download");

    const update = () => {
      ticking.current = false;
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 600;
      // Hide again once the real CTA is on screen, so the two never compete.
      const ctaTop = footerCta
        ? footerCta.getBoundingClientRect().top
        : Infinity;
      setShown(heroBottom < 0 && ctaTop > window.innerHeight * 0.9);
    };

    // Deliberately not rAF-throttled. rAF does not run in a throttled or
    // occluded tab, which would leave this bar stuck off screen; the work here
    // is two getBoundingClientRect reads, so a plain passive listener is both
    // cheaper to reason about and more reliable.
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      update();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="sticky-cta"
      data-shown={shown}
      // Hidden from assistive tech while off screen so it is not a stray stop
      // in the tab order; the footer CTA covers the same intent.
      aria-hidden={!shown}
      {...(!shown ? { inert: "" } : {})}
    >
      <div className="flex items-center gap-3">
        <AppIcon size={38} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-bold text-ink">Deadline</p>
          {/* Deliberately not a pricing claim: the model is still a TODO in
              the FAQ, so this says only what is already true. */}
          <p className="truncate text-[12px] text-muted">
            iPhone. No account.
          </p>
        </div>
        <a href="#" className="btn-amber h-[42px] shrink-0 px-5 text-[14px]">
          Get it
        </a>
      </div>
    </div>
  );
}
