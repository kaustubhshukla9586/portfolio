import Reveal from "../components/Reveal.jsx";

/*
 * FOOTER - Majd-style. Oversized name sinks into the page floor.
 * Clip height 0.72em shows ~85% of the letterforms (8.5/10 scale).
 * Closing line placed above socials per locked copy.
 */

const QUICK_LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

const SOCIALS = [
  { label: "INSTA", href: "https://www.instagram.com/kaustubhhshuklaa" },
  { label: "LNKDN", href: "https://www.linkedin.com/in/kaustubhshukla9586" },
  { label: "X", href: "https://x.com/Kshukla183" },
  { label: "GITHUB", href: "https://github.com/kaustubhshukla9586" },
  { label: "YOUTUBE", href: "https://www.youtube.com/@bennythebonker" },
];

const EMAIL = "kaustubhshukla9586@gmail.com";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-24 md:pt-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <div className="grid gap-12 md:grid-cols-3">
            {/* Quick links */}
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone-dim">
                Menu
              </h3>
              <ul className="mt-4 space-y-2 font-display text-2xl font-bold uppercase tracking-tight text-bone">
                {QUICK_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="transition-colors duration-300 hover:text-amber"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact email */}
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone-dim">
                Contact
              </h3>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-4 inline-block break-all font-body text-lg text-bone transition-colors duration-300 hover:text-amber md:text-xl"
              >
                {EMAIL}
              </a>
            </div>

            {/* Socials */}
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone-dim">
                Elsewhere
              </h3>
              <ul className="mt-4 space-y-2 font-mono text-sm uppercase tracking-[0.15em] text-bone-dim">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                      className="group inline-flex items-center gap-2 transition-colors duration-300 hover:text-bone"
                    >
                      {s.label}
                      <span className="text-amber transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Closing line - locked copy, above socials row / copyright. */}
        <p className="mt-16 font-body text-base italic text-bone/60">
          Still questioning everything. Including this site.
        </p>

        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim">
          {new Date().getFullYear()} Kaustubh Shukla
        </p>
      </div>

      {/* Oversized name clipped to ~85% visible (0.72em of the line box). */}
      <div
        className="mt-10 overflow-hidden text-center leading-[0.8] md:mt-16"
        style={{ height: "0.72em", fontSize: "min(26vw, 20rem)" }}
        aria-hidden="true"
      >
        <span className="block whitespace-nowrap font-display font-bold uppercase tracking-tight text-bone/[0.06]">
          KAUSTUBH
        </span>
      </div>
    </footer>
  );
}
