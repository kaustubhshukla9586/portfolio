import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import WordReveal from "../components/WordReveal.jsx";
import { useIsDesktop } from "../hooks/useMediaQuery.js";

/*
 * HERO — cropped, bleeding oversized name (Barlow Condensed), one dense block.
 * Word-blur reveal on the name; status line + tagline fade up in a load cascade
 * (~1.4s → ~1.6s → ~2s). Parallax on desktop only; disabled under reduced motion
 * and on touch. The overflow-hidden section + body guard means the intentional
 * horizontal crop NEVER produces a horizontal scrollbar.
 */
export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const parallax = isDesktop && !reduce;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Layers drift at different speeds; no-op when parallax is off.
  const nameY = useTransform(scrollYProgress, [0, 1], [0, parallax ? -70 : 0]);
  const tagY = useTransform(scrollYProgress, [0, 1], [0, parallax ? -140 : 0]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, parallax ? 0 : 1]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden"
    >
      <div className="w-full px-2 sm:px-3">
        {/* Status line */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 font-mono text-[11px] uppercase tracking-[0.35em] text-amber md:text-xs"
        >
          open to opportunities
        </motion.p>
      </div>

      {/* MASSIVE cropped name block — Derek-Cole scale. The type IS the hero:
          it fills the full viewport width and letters intentionally clip at the
          frame edges (guarded by overflow-hidden on the section + body). No
          max-width and near-zero side padding so it bleeds true edge-to-edge. */}
      <motion.div style={{ y: nameY }} className="w-full px-1 sm:px-2">
        <WordReveal
          as="h1"
          text="KAUSTUBH"
          baseDelay={1.6}
          className="block font-display font-bold uppercase leading-[0.8] tracking-[-0.02em] text-bone"
          wordClassName="text-[29vw] leading-[0.8]"
        />
        <WordReveal
          as="h1"
          text="SHUKLA"
          baseDelay={1.75}
          className="-mt-[0.05em] block whitespace-nowrap font-display font-bold uppercase leading-[0.8] tracking-[-0.02em] text-amber"
          wordClassName="text-[40vw] leading-[0.8]"
        />
      </motion.div>

      {/* Tagline — longer text, plain fade-up (never blur reveal). */}
      <motion.div
        style={{ y: tagY, opacity: fade }}
        className="mt-8 w-full px-2 sm:px-3 md:mt-10"
      >
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.9, delay: 2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl font-body text-base leading-relaxed text-bone/80 md:text-lg"
        >
          Give me the right direction, and there's no problem I won't solve.
          Sometimes in a minute, sometimes in a day, but always.
        </motion.p>
      </motion.div>
    </section>
  );
}
