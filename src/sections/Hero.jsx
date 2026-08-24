import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useIsDesktop } from "../hooks/useMediaQuery.js";

// Layout budget constants (px / unitless)
const LEADING   = 0.72;   // line-height applied to both name lines
const NEG_GAP   = 0.1;    // em: SHUKLA pulls up by 0.1em to tighten the pair
const NAV_CLEAR = 80;     // minimum clearance above/below content when centered
const SUBLINE   = 82;     // reserved height for mt-8 gap + subline text
const SIDE_PAD  = 8;      // total horizontal padding of the name block (pl-1 pr-1)

/*
 * Measures "KAUSTUBH" at 100 px via a hidden probe element, then derives a
 * font-size that (a) fills the viewport width, and (b) keeps the centered
 * content block clear of the fixed nav pill at any viewport size.
 *
 * Both lines share the same font-size; SHUKLA is shorter so it won't overflow.
 * Applied exclusively via inline style — no Tailwind arbitrary-value classes,
 * no CSS min(), no media-query caps.
 */
function useFitFontSize(probeRef) {
  const [fontSize, setFontSize] = useState(150);

  const compute = useCallback(() => {
    const probe = probeRef.current;
    if (!probe) return;

    // Measure rendered width of KAUSTUBH at the test size
    probe.style.fontSize = "100px";
    const measured = probe.getBoundingClientRect().width;
    if (measured < 1) return; // font not loaded yet — fonts.ready will retry

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Step 1: size to fill viewport width
    let fs = ((vw - SIDE_PAD) / measured) * 100;

    // Step 2: scale down if the centered block would overlap the fixed nav.
    // With justify-center the top clearance = (vh − contentH) / 2.
    // We require that clearance ≥ NAV_CLEAR, so:
    //   contentH ≤ vh − 2 × NAV_CLEAR
    // contentH = linesH + SUBLINE  where  linesH = (2×LEADING − NEG_GAP) × fs
    const linesCoeff = 2 * LEADING - NEG_GAP; // 1.34
    const maxLines   = vh - 2 * NAV_CLEAR - SUBLINE;
    if (linesCoeff * fs > maxLines) {
      fs = maxLines / linesCoeff;
    }

    setFontSize(Math.max(24, Math.floor(fs)));
  }, [probeRef]);

  useEffect(() => {
    compute();
    // Re-run once fonts are confirmed ready in case this component mounted
    // before document.fonts resolved (probe would have returned 0).
    document.fonts?.ready.then(compute);

    let timer;
    const onResize = () => { clearTimeout(timer); timer = setTimeout(compute, 60); };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(timer); };
  }, [compute]);

  return fontSize;
}

const lineReveal = (reduce, delay) =>
  reduce
    ? { initial: false, animate: { opacity: 1, filter: "blur(0px)", y: 0 } }
    : {
        initial:    { opacity: 0.001, filter: "blur(12px)", y: 14 },
        animate:    { opacity: 1,     filter: "blur(0px)",  y: 0  },
        transition: { type: "spring", bounce: 0, duration: 1.6, delay },
      };

export default function Hero() {
  const ref      = useRef(null);
  const probeRef = useRef(null);
  const reduce   = useReducedMotion();
  const isDesktop = useIsDesktop();
  const parallax  = isDesktop && !reduce;

  const fontSize = useFitFontSize(probeRef);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, parallax ? -70  : 0]);
  const tagY  = useTransform(scrollYProgress, [0, 1], [0, parallax ? -140 : 0]);
  const fade  = useTransform(scrollYProgress, [0, 0.85], [1, parallax ? 0 : 1]);

  const nameSz  = { fontSize: `${fontSize}px` };
  const negGap  = { marginTop: `${-(NEG_GAP * fontSize)}px` };

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden"
    >
      {/* Off-screen probe: same font properties as the name, used only for width measurement */}
      <span
        ref={probeRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           "-9999px",
          left:          "-9999px",
          visibility:    "hidden",
          pointerEvents: "none",
          fontFamily:    "var(--font-display)",
          fontWeight:    700,
          textTransform: "uppercase",
          letterSpacing: "-0.03em",
          whiteSpace:    "nowrap",
          lineHeight:    1,
        }}
      >
        KAUSTUBH
      </span>

      {/* Status line — left edge, top offset tuned to share a visual axis with the nav pill */}
      <motion.p
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          reduce
            ? { duration: 0 }
            : { duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }
        }
        className="absolute left-2 top-[27px] font-mono text-[11px] uppercase leading-none tracking-[0.35em] text-amber sm:left-3 md:top-[38px] md:text-xs"
      >
        open to opportunities
      </motion.p>

      {/* Name block — JS-sized, both lines the same font-size, left-aligned */}
      <motion.div style={{ y: nameY }} className="w-full pl-1 pr-1">
        <motion.h1
          {...lineReveal(reduce, 1.6)}
          style={nameSz}
          className="block whitespace-nowrap text-left font-display font-bold uppercase leading-[0.72] tracking-[-0.03em] text-bone"
        >
          KAUSTUBH
        </motion.h1>
        <motion.h1
          {...lineReveal(reduce, 1.75)}
          style={{ ...nameSz, ...negGap }}
          className="block whitespace-nowrap text-left font-display font-bold uppercase leading-[0.72] tracking-[-0.03em] text-amber"
        >
          SHUKLA
        </motion.h1>
      </motion.div>

      {/* Subline — centered, fixed gap below the name, clearly legible */}
      <motion.div
        style={{ y: tagY, opacity: fade }}
        className="mt-8 w-full px-4 text-center md:mt-10"
      >
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 0.9, delay: 2, ease: [0.16, 1, 0.3, 1] }
          }
          className="mx-auto max-w-3xl font-body text-xl leading-snug text-bone sm:text-2xl md:text-3xl lg:text-4xl"
        >
          Certainty isn't a substitute for evidence.
        </motion.p>
      </motion.div>
    </section>
  );
}
