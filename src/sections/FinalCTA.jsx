import { motion, useReducedMotion } from "framer-motion";
import {
  AppIcon,
  Glow,
  Reveal,
  EASE,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
} from "../components/primitives";

/** The real app icon, large, over a soft amber bloom. */
function IconMark() {
  return (
    <div className="relative mb-10 grid place-items-center">
      <div
        aria-hidden="true"
        className="glow animate-pulse-glow"
        style={{
          width: 420,
          height: 420,
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          filter: "blur(70px)",
        }}
      />
      <AppIcon
        size={128}
        className="relative"
        style={{
          boxShadow: "0 24px 70px -18px rgba(251,174,60,0.45)",
          borderRadius: 30,
        }}
      />
    </div>
  );
}

export default function FinalCTA() {
  const reduce = useReducedMotion();

  return (
    <section
      id="download"
      className="relative overflow-hidden px-5 pb-28 pt-20 sm:pb-32 sm:pt-24 lg:pb-36 lg:pt-28"
    >
      {/* This used to be sealed top and bottom with hairlines, which fenced it
          off as a slab sitting in the middle of nothing. Instead the page
          surface ramps up into a raised plate and hands over to the footer's
          border, so the CTA reads as the floor of the page rather than an
          island on it.

          The ramp resolves early, by 16%, on purpose: the air above the icon
          has to already be *inside* this section, or it reads as the same raw
          page void that made the section look like it was floating. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.022) 16%, rgba(255,255,255,0.03) 58%, rgba(255,255,255,0.038) 100%)",
        }}
      />

      {/* Lower half of the thread that starts in the FAQ's bottom padding, so
          the two sections are stitched across the seam instead of stacked.
          Lands in the icon's bloom. Same motif as the hero / CallOut seam. */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-20 w-px -translate-x-1/2 sm:h-24 lg:h-28"
        style={{
          background:
            "linear-gradient(180deg, rgba(251,174,60,0.3) 0%, rgba(251,174,60,0.5) 100%)",
        }}
      />

      <Glow
        className="animate-pulse-glow"
        style={{
          top: "50%",
          left: "50%",
          width: 900,
          height: 620,
          transform: "translate(-50%,-50%)",
        }}
      />

      <div className="container-d relative flex flex-col items-center text-center">
        <IconMark />

        <div>
          <h2
            className="text-[42px] leading-[0.92] sm:text-[72px] lg:text-[104px]"
            style={{ fontWeight: 900, letterSpacing: "-0.045em" }}
          >
            Stop lying
            <br />
            to yourself.
          </h2>
        </div>

        <div>
          <p className="mt-8 max-w-[44ch] text-[18px] leading-relaxed text-muted sm:text-[22px]">
            Download Deadline.{" "}
            <span className="text-ink">Your future self is waiting.</span>
          </p>
        </div>

        <div>
          <motion.a
            href="#"
            className="btn-amber mt-12 h-[60px] px-9 text-[17px]"
            animate={
              reduce
                ? {}
                : {
                    boxShadow: [
                      "0 0 0px rgba(251,174,60,0)",
                      "0 0 48px rgba(251,174,60,0.55)",
                      "0 0 0px rgba(251,174,60,0)",
                    ],
                  }
            }
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <AppIcon size={28} />
            Download on the App Store
          </motion.a>
        </div>

        <div>
          <p className="mt-7 text-[14px] text-muted">
            iPhone. No account. Nothing leaves your device.
          </p>
        </div>

        <div>
          <p className="mt-[var(--s4)] text-[15px] text-muted">
            Follow the movement{" "}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-amber underline-offset-4 transition-all duration-200 hover:underline focus-visible:underline"
            >
              {INSTAGRAM_HANDLE}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
