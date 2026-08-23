import { motion } from "framer-motion";

const LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

export default function Nav() {
  return (
    <motion.header
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      // Nav entrance per brief: bounce 0, ~1.6s, delayed into the load cascade.
      transition={{ type: "spring", bounce: 0, duration: 1.6, delay: 1.4 }}
      className="fixed inset-x-0 top-0 z-[80]"
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
        <a
          href="#top"
          className="font-display text-2xl font-bold leading-none tracking-tight text-bone"
        >
          K<span className="text-amber">S</span>
        </a>
        <ul className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim sm:gap-8">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors duration-300 hover:text-bone"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
