import { motion } from "framer-motion";

/*
 * Preloader — SWAPPABLE.
 * The `<PreloaderVisual/>` below is the only thing to replace when a custom
 * loader element is ready: swap its inner JSX, keep the same props, and the
 * fade-out wiring in App.jsx stays untouched. Nothing else references the
 * visual internals.
 */

function PreloaderVisual() {
  // Clean placeholder: monogram + a thin indeterminate bar.
  return (
    <div className="flex flex-col items-center gap-6">
      <span className="font-display text-6xl font-bold tracking-tight text-bone">
        K<span className="text-amber">S</span>
      </span>
      <div className="h-px w-40 overflow-hidden bg-white/10">
        <motion.div
          className="h-full w-1/3 bg-amber"
          animate={{ x: ["-120%", "360%"] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone-dim">
        loading
      </span>
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
      <PreloaderVisual />
    </motion.div>
  );
}
