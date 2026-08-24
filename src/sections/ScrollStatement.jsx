import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/*
 * SCROLL STATEMENT - the one and only instance of the original tagline.
 * The section is h-[300vh] with a sticky inner div, which means the page is
 * "pinned" for 200vh of scroll distance. Word ranges span 0→1 so the last
 * word finishes lighting exactly as the sticky pin releases and normal scroll
 * resumes into the next section. No dead scroll, no early release.
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

  // The wrapper is h-[250vh]: 150vh of scroll distance while the inner block is
  // pinned (sticky top-0 h-screen). scrollYProgress runs 0→1 across the wrapper.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // All words finish lighting by progress FILL_DONE (< 1), so the last ~20% of
  // the pin is a deliberate hold on the fully-lit statement before it releases.
  const FILL_DONE = 0.8;

  return (
    <section
      ref={ref}
      className={`relative ${reduce ? "min-h-[60vh]" : "h-[250vh]"}`}
      aria-label="Statement"
    >
      <div
        className={`flex items-center justify-center px-5 md:px-10 ${
          reduce ? "min-h-[60vh]" : "sticky top-0 h-screen"
        }`}
      >
        <p className="mx-auto max-w-[16ch] text-center font-display text-[13vw] font-bold uppercase leading-[0.95] tracking-tight text-bone md:max-w-[20ch] md:text-[6vw]">
          {reduce
            ? STATEMENT
            : words.map((word, i) => {
                // Each word owns an equal slice of the 0→FILL_DONE range.
                // Slices overlap (factor 1.5) so the fill reads as a continuous
                // sweep. The final word completes at FILL_DONE, leaving a hold.
                const start = (i / words.length) * FILL_DONE;
                const end = Math.min(
                  start + (1.5 / words.length) * FILL_DONE,
                  FILL_DONE
                );
                return (
                  <Word
                    key={`${word}-${i}`}
                    word={word}
                    range={[start, end]}
                    progress={scrollYProgress}
                  />
                );
              })}
        </p>
      </div>
    </section>
  );
}
