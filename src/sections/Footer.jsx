import { InstagramLink, Logo } from "../components/primitives";

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
      </div>
    </footer>
  );
}
