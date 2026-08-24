import { motion } from "framer-motion";

const LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

/*
 * Nav — a floating, pill-shaped bar. Centered horizontally, fixed on scroll,
 * frosted-glass (backdrop-blur) dark background, rounded-full. It hovers over
 * the content rather than sitting on a header bar. Entrance per brief:
 * spring bounce 0, 1.6s, delay 1.4s, y:-20 → 0 fading in from above.
 *
 * The four labels stay tight together inside the pill and remain compact
 * enough to hold their shape down to 375px (no hamburger needed) — tracking
 * and gaps tighten on small screens.
 */
export default function Nav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", bounce: 0, duration: 1.6, delay: 1.4 }}
      className="fixed inset-x-0 top-4 z-[80] flex justify-center px-4 md:top-6"
      aria-label="Primary"
    >
      <ul
        className="flex items-center gap-3 rounded-full border border-white/10 bg-ink/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-dim shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md sm:gap-6 sm:px-6 sm:py-2.5 sm:text-[11px] sm:tracking-[0.22em]"
      >
        {LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="inline-block py-0.5 transition-colors duration-300 hover:text-amber"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
