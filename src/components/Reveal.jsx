import { motion, useReducedMotion } from "framer-motion";

/*
 * Reveal — the general scroll-reveal used for cards / list items.
 * Derek-Cole snappy spring: opacity 0→1, y:20→0,
 * spring { stiffness: 130, damping: 30, mass: 0.1 }.
 * Collapses to instant/static under prefers-reduced-motion.
 */
export default function Reveal({ children, delay = 0, className }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={
        reduce
          ? { duration: 0 }
          : { type: "spring", stiffness: 130, damping: 30, mass: 0.1, delay }
      }
    >
      {children}
    </motion.div>
  );
}
