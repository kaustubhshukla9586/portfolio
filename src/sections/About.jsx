import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import WordReveal from "../components/WordReveal.jsx";
import Reveal from "../components/Reveal.jsx";

/*
 * ABOUT - Majd-inspired layout.
 * Bio em dashes replaced with commas/periods per sitewide rule.
 * Left blurb removed (was a duplicate of the scroll-statement tagline).
 * Portrait: single BW image (color flip dropped in Phase 2.4). Rounded
 * "soft card" corners + a low-opacity dark drop shadow, plus a small,
 * restrained scroll-driven parallax/scale so the page reads as alive
 * without being a signature effect. Disabled under reduced-motion.
 */

const BIO = [
  "There was a version of me who drifted, a backbencher, losing ground year after year, until I let myself down enough to stop lying about it. I didn't fail an exam. I failed myself. That was the last time.",
  "Everything since has been rebuilt, deliberately, on my own terms.",
  "I question everything. Not to be difficult. Vague answers and unproven claims just don't sit right with me, whoever they're coming from. I'd rather be right than be liked.",
  "Give me a real problem and the right direction, and I'll find the way through, sometimes in a minute, sometimes over days I refuse to let go of. What I love most isn't the finish line. It's the architecture before it: the planning, the plotting, the quiet moment before anything exists yet.",
  "I don't perform for attention, and I won't beg anyone to believe in what I build. I'll just build it, well, honestly, and on terms I can respect.",
];

function PortraitSwap() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // Scroll range scoped to the portrait: begins as it rises into view, resolves
  // as it clears the middle of the viewport. Motion tracks scroll position.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth the raw scroll value so the movement glides rather than tracking
  // the wheel 1:1 (matches the site's bounce-free character).
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  // Small, restrained parallax + entrance scale. A gentle upward drift over the
  // full pass and a subtle 0.97→1 scale as it enters. Deliberately easy to miss.
  const y = useTransform(smooth, [0, 1], reduce ? [0, 0] : [28, -28]);
  const scale = useTransform(smooth, [0, 0.45], reduce ? [1, 1] : [0.97, 1]);

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <motion.div
        ref={ref}
        style={reduce ? undefined : { y, scale }}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] border border-white/10 bg-ink-800 shadow-[0_24px_70px_-15px_rgba(0,0,0,0.65)]"
      >
        <img
          src="/assets/portrait-bw.jpg"
          alt="Portrait of Kaustubh Shukla"
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone-dim">
        01 / about
      </div>

      {/* Marcus Aurelius quote */}
      <Reveal className="mt-6 max-w-3xl">
        <p className="font-display text-2xl leading-snug text-bone/80 md:text-3xl">
          "You have power over your mind, not outside events. Realize this, and
          you will find strength."
          <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.25em] text-amber">
            - Marcus Aurelius
          </span>
        </p>
      </Reveal>

      {/* Greeting */}
      <WordReveal
        as="h2"
        text="Hey!"
        trigger="inView"
        className="mt-16 block font-display text-[24vw] font-bold uppercase leading-[0.85] tracking-tight text-amber md:mt-20 md:text-[12rem]"
      />

      {/* Portrait + bio. Left blurb removed (was duplicate of scroll statement).
          Portrait occupies the first half, bio the second. */}
      <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-2 lg:gap-12">
        <div className="lg:self-center">
          <PortraitSwap />
        </div>

        <div className="space-y-5 lg:self-start lg:pt-4">
          {BIO.map((para, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <p className="max-w-prose font-body text-base leading-relaxed text-bone/85 md:text-[17px]">
                {para}
              </p>
            </Reveal>
          ))}
          {/* Closing line - new locked copy, fills the gap under the bio so the
              column reads as complete alongside the taller portrait. */}
          <Reveal delay={BIO.length * 0.04}>
            <p className="max-w-prose pt-2 font-display text-xl leading-snug text-amber md:text-2xl">
              Most of what I've built started as a way to check if I was right.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
