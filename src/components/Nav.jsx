import { motion } from "framer-motion";

const LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

/*
 * Nav - floating pill, frosted-glass. The pill's own BORDER is neon amber
 * (#ffb77d), a clean thin line. No outward glow/bleed: the only box-shadow is a
 * neutral dark drop shadow for depth, never an amber halo beyond the edge.
 */
export default function Nav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.6, delay: 1.4 }}
      className="fixed inset-x-0 top-4 z-[80] flex justify-center px-4 md:top-6"
      aria-label="Primary"
    >
      <ul
        className="flex items-center gap-3 rounded-full border-[1.5px] border-amber bg-ink/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-dim backdrop-blur-md sm:gap-6 sm:px-6 sm:py-2.5 sm:text-[11px] sm:tracking-[0.22em]"
        style={{
          boxShadow: "0 8px 30px rgba(0,0,0,0.45)",
        }}
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
