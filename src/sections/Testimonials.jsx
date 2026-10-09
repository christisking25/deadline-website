import { Glow, Reveal, SectionHeading } from "../components/primitives";

/* ============================================================================
   EMPTY ON PURPOSE.

   This section used to hold four written-from-scratch quotes attributed to
   named students. Nobody said them, so they are gone. Attributing invented
   quotes to named people and presenting them as credible is deceptive to
   visitors, and for App Store marketing it is a takedown and FTC risk.

   To fill this in: replace the empty state below with real App Store reviews,
   quoted as written and attributed to the reviewer's real App Store name. Do
   not reintroduce placeholder quotes, not even temporarily, and not even with
   an "illustrative" label on them.
   ========================================================================= */

export default function Testimonials() {
  return (
    <section className="section-pad relative overflow-hidden">
      <Glow style={{ top: "12%", left: "40%", width: 560, height: 420, opacity: 0.4 }} />

      <div className="container-d relative">
        <SectionHeading
          title="What people say."
          lede="Deadline is not out yet, so there is nothing here. Real App Store reviews go in this space once people have actually used it."
        />

        <Reveal delay={0.08}>
          <div
            className="mx-auto mt-14 flex max-w-[640px] flex-col items-center gap-[var(--s4)] rounded-2xl px-[var(--s6)] py-[var(--s8)] text-center lg:mt-16"
            style={{
              border: "1px dashed rgba(255,255,255,0.14)",
              background: "rgba(20,20,22,0.4)",
            }}
          >
            <span
              aria-hidden="true"
              className="grid h-12 w-12 place-items-center rounded-full border border-hairline text-muted"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.3 9.3 0 0 1-2.8-.4L4 21l1.6-4a8.2 8.2 0 0 1-1.6-5 8.4 8.4 0 0 1 8.5-8.4A8.4 8.4 0 0 1 21 11.5Z" />
              </svg>
            </span>

            <p className="text-[19px] font-semibold text-ink">No reviews yet.</p>
            <p className="max-w-[46ch] text-[15px] leading-relaxed text-muted">
              We would rather show you an empty box than quotes we wrote
              ourselves.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
