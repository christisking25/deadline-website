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
      className="relative overflow-hidden px-5 py-28 sm:py-36 lg:py-44"
    >
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
      {/* Hairlines top and bottom to seal the section */}
      <div className="hairline absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="hairline absolute inset-x-0 bottom-0" aria-hidden="true" />

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
