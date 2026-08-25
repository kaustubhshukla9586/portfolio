import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/*
 * WordReveal - Majd-style smooth reveal for SHORT display text ONLY
 * (hero title + section headings). NEVER use on body paragraphs/bio.
 *
 * Per word: opacity 0.001→1, filter blur(10px)→0, y:10→0, staggered per word.
 * Spring: bounce 0, duration ~1.6s (critically damped, no overshoot).
 * Under reduced motion it renders instantly with no blur/stagger.
 */
function WordReveal({
  text,
  as: Tag = "span",
  className = "",
  wordClassName = "",
  baseDelay = 0,
  stagger = 0.08,
  trigger = "mount", // "mount" (hero, on load) | "inView" (section headings)
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion.create(Tag);

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  const shown = { opacity: 1, filter: "blur(0px)", y: 0 };
  const anim =
    trigger === "inView"
      ? { whileInView: shown, viewport: { once: true, amount: 0.6 } }
      : { animate: shown };

  return (
    <MotionTag className={className} aria-label={text}>
      {words.map((word, i) => (
        // Wrapper clips the y-travel; inner span carries blur+fade.
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden="true"
        >
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ opacity: 0.001, filter: "blur(10px)", y: 10 }}
            {...anim}
            transition={{
              type: "spring",
              bounce: 0,
              duration: 1.6,
              delay: baseDelay + i * stagger,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

export default React.memo(WordReveal);
