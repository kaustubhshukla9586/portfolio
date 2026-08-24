import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import WordReveal from "../components/WordReveal.jsx";
import Reveal from "../components/Reveal.jsx";

/*
 * ABOUT — Majd-inspired layout, our real content.
 *   • Marcus Aurelius quote opens the section (mono, muted).
 *   • A bold "Hey!" greeting, large + left-aligned, word-blur reveal on scroll.
 *   • The grayscale→color portrait, large and centered, saturating on scroll.
 *   • Bio flanks the portrait: the short tagline blurb bottom-left, the full
 *     locked bio to the right of the image.
 * Layout pattern is Majd's; every word is ours, verbatim.
 */

// The full bio, verbatim — split only into its existing paragraphs.
const BIO = [
  "There was a version of me who drifted — a backbencher, losing ground year after year, until I let myself down enough to stop lying about it. I didn't fail an exam. I failed myself. That was the last time.",
  "Everything since has been rebuilt, deliberately, on my own terms.",
  "I question everything. Not to be difficult — vague answers and unproven claims just don't sit right with me, whoever they're coming from. I'd rather be right than be liked.",
  "Give me a real problem and the right direction, and I'll find the way through — sometimes in a minute, sometimes over days I refuse to let go of. What I love most isn't the finish line. It's the architecture before it — the planning, the plotting, the quiet moment before anything exists yet.",
  "I don't perform for attention, and I won't beg anyone to believe in what I build. I'll just build it — well, honestly, and on terms I can respect.",
];

function PortraitSwap() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "center 0.4"],
  });
  // Grayscale layer sits on top and fades out to reveal the colour layer.
  const bwOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-md border border-white/10 bg-ink-800 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
    >
      <img
        src="/assets/portrait-color.webp"
        alt="Portrait of Kaustubh Shukla"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <motion.img
        src="/assets/portrait-bw.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        style={{ opacity: reduce ? 0 : bwOpacity }}
        className="absolute inset-0 h-full w-full object-cover"
      />
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

      {/* Marcus Aurelius quote — opener */}
      <Reveal className="mt-6 max-w-3xl">
        <p className="font-display text-2xl leading-snug text-bone/80 md:text-3xl">
          "You have power over your mind, not outside events. Realize this, and
          you will find strength."
          <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.25em] text-amber">
            — Marcus Aurelius
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

      {/* Portrait flanked by blurb (bottom-left) and full bio (right) */}
      <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:gap-8">
        {/* Short intro blurb — bottom-left */}
        <div className="flex lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:items-end">
          <Reveal>
            <p className="max-w-xs font-body text-lg leading-relaxed text-bone md:text-xl">
              Give me the right direction, and there's no problem I won't solve —
              sometimes in a minute, sometimes in a day, but always.
            </p>
          </Reveal>
        </div>

        {/* Portrait — centered */}
        <div className="lg:col-span-4 lg:col-start-4 lg:row-start-1 lg:self-center">
          <PortraitSwap />
        </div>

        {/* Full bio — right */}
        <div className="space-y-5 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:self-start">
          {BIO.map((para, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <p className="max-w-prose font-body text-base leading-relaxed text-bone/85 md:text-[17px]">
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
