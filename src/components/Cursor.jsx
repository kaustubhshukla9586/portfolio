import { useEffect, useRef } from "react";
import { useIsDesktop } from "../hooks/useMediaQuery.js";

/*
 * Cursor - a soft, organic amber BLOB that trails the pointer with a slow,
 * gentle lag. The gooey shape comes from an animated irregular border-radius
 * plus a light blur (see .cursor-blob in index.css); it is never a plain circle.
 *
 * Constraints (from the brief):
 *   - Filled blob, #ffb77d at low opacity so text underneath stays legible
 *     (no blend-mode inversion tricks - just low alpha).
 *   - SLOW follow: gentle rAF lerp (small factor) so position visibly lags the
 *     pointer, and a long transition on the hover scale so it swells gradually,
 *     never snaps.
 *   - Hover on links/buttons/nav items -> scales up smoothly.
 *   - Desktop / fine-pointer only (gated by useIsDesktop). No 3D transforms.
 *   - Reduced motion: no lag (tracks 1:1), no morph.
 */
export default function Cursor() {
  const isDesktop = useIsDesktop();
  const dotRef = useRef(null);

  useEffect(() => {
    if (!isDesktop) return;
    const el = dotRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let scale = 1; // eased scale (position AND scale both lag smoothly)
    let raf = 0;
    let hovering = false;

    const render = () => {
      // Small lerp factor = pronounced, smooth lag. reduce -> 1 (no lag).
      const k = reduce ? 1 : 0.09;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      // Scale eases toward its target even more slowly, so the swell is gradual.
      const targetScale = hovering ? 2.2 : 1;
      scale += (targetScale - scale) * (reduce ? 1 : 0.08);
      el.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    const interactiveSel =
      'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]';
    const onOver = (e) => {
      if (e.target.closest?.(interactiveSel)) {
        hovering = true;
        el.dataset.hover = "true";
      }
    };
    const onOut = (e) => {
      if (e.target.closest?.(interactiveSel)) {
        hovering = false;
        el.dataset.hover = "false";
      }
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      data-hover="false"
      className="cursor-blob"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 26,
        height: 26,
        pointerEvents: "none",
        zIndex: 100,
        opacity: 0,
        willChange: "transform",
        // Slow, gradual swell on hover + gentle fade in/out (no snap).
        transition: "opacity 0.4s ease, background-color 0.5s ease",
      }}
    />
  );
}
