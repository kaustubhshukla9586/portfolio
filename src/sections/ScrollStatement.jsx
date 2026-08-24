import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/*
 * SCROLL STATEMENT — a full-viewport interlude between About and Work.
 * The statement is pinned centre-screen while the section scrolls past; each
 * word fills from muted gray to full bone as scroll progresses (Majd-style
 * scrub reveal). Deliberately breaks the rhythm. Our real tagline, shortened.
 * Under reduced motion it renders fully lit and static.
 */

const STATEMENT =
  "Give me the right direction, and there's no problem I won't solve.";

function Word({ word, range, progress }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {word}
    </motion.span>
  );
}

export default function ScrollStatement() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const words = STATEMENT.split(" ");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    // Under reduced motion there's no scrub, so we collapse the tall scroll
    // track to a normal centred block instead of ~2 viewports of dead space.
    <section
      ref={ref}
      className={`relative ${reduce ? "min-h-[60vh]" : "h-[220vh]"}`}
      aria-label="Statement"
    >
      <div
        className={`flex items-center justify-center overflow-hidden px-5 md:px-10 ${
          reduce ? "min-h-[60vh]" : "sticky top-0 h-screen"
        }`}
      >
        <p className="mx-auto max-w-[16ch] text-center font-display text-[13vw] font-bold uppercase leading-[0.95] tracking-tight text-bone md:max-w-[20ch] md:text-[6vw]">
          {reduce
            ? STATEMENT
            : words.map((word, i) => {
                // Each word owns a slice of the scroll; slices overlap slightly
                // so the fill reads as a continuous sweep, not discrete steps.
                const start = (i / words.length) * 0.85;
                const end = start + 1.2 / words.length;
                return (
                  <Word
                    key={`${word}-${i}`}
                    word={word}
                    range={[start, Math.min(end, 1)]}
                    progress={scrollYProgress}
                  />
                );
              })}
        </p>
      </div>
    </section>
  );
}
