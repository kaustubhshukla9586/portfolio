"use client";

/*
 * BlobCursor — the real React Bits component (reactbits.dev).
 * Two intentional adaptations for full-page overlay use, both documented:
 *   1. Movement is driven by a global `pointermove` listener on `window`
 *      (instead of the container's onMouseMove) so the blob tracks across the
 *      whole page, and the overlay uses pointer-events:none so it never
 *      intercepts clicks on the content beneath it.
 *   2. fillColor defaults to the amber accent (#ffb77d), never the original
 *      React Bits purple (#5227FF) — hard anti-slop rule for this project.
 * Mounting is gated to desktop/fine-pointer devices by CursorLayer.jsx.
 */

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import "./BlobCursor.css";

export default function BlobCursor({
  blobType = "circle",
  fillColor = "#ffb77d",
  trailCount = 3,
  sizes = [60, 125, 75],
  innerSizes = [20, 35, 25],
  innerColor = "rgba(255,255,255,0.8)",
  opacities = [0.6, 0.6, 0.6],
  shadowColor = "rgba(0,0,0,0.75)",
  shadowBlur = 5,
  shadowOffsetX = 10,
  shadowOffsetY = 10,
  filterId = "blob",
  filterStdDeviation = 30,
  filterColorMatrixValues = "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10",
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  fastEase = "power3.out",
  slowEase = "power1.out",
  zIndex = 100,
  // Anti-slop readability rule: the blob composites with `mix-blend-mode` so
  // it NEVER hides text beneath it. `difference` inverts wherever it overlaps
  // bone-coloured type, keeping nav labels / body copy / links legible.
  blendMode = "difference",
}) {
  const containerRef = useRef(null);
  const blobsRef = useRef([]);

  const updateOffset = useCallback(() => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }, []);

  const handleMove = useCallback(
    (e) => {
      const { left, top } = updateOffset();
      const x = "clientX" in e ? e.clientX : e.touches[0].clientX;
      const y = "clientY" in e ? e.clientY : e.touches[0].clientY;

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x: x - left,
          y: y - top,
          duration: isLead ? fastDuration : slowDuration,
          ease: isLead ? fastEase : slowEase,
        });
      });
    },
    [updateOffset, fastDuration, slowDuration, fastEase, slowEase]
  );

  // Adaptation #1: global tracking + resize sync.
  useEffect(() => {
    const onResize = () => updateOffset();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", handleMove);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", handleMove);
    };
  }, [updateOffset, handleMove]);

  return (
    <div
      ref={containerRef}
      className="blob-container"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex }}
    >
      {useFilter && (
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <filter id={filterId}>
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation={filterStdDeviation}
            />
            <feColorMatrix in="blur" values={filterColorMatrixValues} />
          </filter>
        </svg>
      )}

      <div
        className="blob-main"
        style={{
          filter: useFilter ? `url(#${filterId})` : undefined,
          mixBlendMode: blendMode,
        }}
      >
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              blobsRef.current[i] = el;
            }}
            className="blob"
            style={{
              width: sizes[i],
              height: sizes[i],
              borderRadius: blobType === "circle" ? "50%" : "0%",
              backgroundColor: fillColor,
              opacity: opacities[i],
              boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 0 ${shadowColor}`,
            }}
          >
            <div
              className="inner-dot"
              style={{
                width: innerSizes[i],
                height: innerSizes[i],
                top: (sizes[i] - innerSizes[i]) / 2,
                left: (sizes[i] - innerSizes[i]) / 2,
                backgroundColor: innerColor,
                borderRadius: blobType === "circle" ? "50%" : "0%",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
