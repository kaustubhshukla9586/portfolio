import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/*
 * Preloader - SWAPPABLE.
 * Covers the real ~2.6s asset-loading buffer (fonts + portraits) driven from
 * App.jsx. A determinate 0→100 counter + fill bar reads as genuine loading
 * rather than a decorative spinner. Swap `<PreloaderVisual/>` internals if a
 * custom loader is ever ready; the fade-out wiring in App.jsx stays untouched.
 */

function PreloaderVisual({ done }) {
  const reduce = useReducedMotion();
  const [pct, setPct] = useState(reduce ? 100 : 0);

  // Ease a percentage toward 100 while loading; snap to 100 the moment the
  // real load finishes so the number never lies about being "done".
  useEffect(() => {
    if (reduce) return;
    if (done) {
      setPct(100);
      return;
    }
    const start = performance.now();
    const DUR = 2400;
    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / DUR, 1);
      // easeOutCubic, capped at 96% until the real "done" arrives.
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.min(96, Math.round(eased * 100)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [done, reduce]);

  return (
    <div className="flex w-56 flex-col items-center gap-6">
      <span className="font-display text-6xl font-bold tracking-tight text-bone">
        K<span className="text-amber">S</span>
      </span>
      <div className="h-px w-full overflow-hidden bg-white/10">
        <div
          className="h-full bg-amber transition-[width] duration-200 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex w-full items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-bone-dim">
        <span>loading</span>
        <span className="tabular-nums text-bone/70">
          {String(pct).padStart(3, "0")}
        </span>
      </div>
    </div>
  );
}

export default function Preloader({ done }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: done ? "none" : "auto" }}
      aria-hidden={done}
    >
      <PreloaderVisual done={done} />
    </motion.div>
  );
}
