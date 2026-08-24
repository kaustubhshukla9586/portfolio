import BlobCursor from "./BlobCursor.jsx";
import { useIsDesktop } from "../hooks/useMediaQuery.js";

/*
 * Mounts the BlobCursor on desktop / fine-pointer devices only.
 * On touch devices and narrow viewports it renders nothing — cursors are
 * meaningless on mobile and the goo filter is a performance cost.
 */
export default function CursorLayer() {
  const isDesktop = useIsDesktop();
  if (!isDesktop) return null;

  return (
    <BlobCursor
      trailCount={3}
      // Sizes reduced 15% from the original [60,125,75] / [20,35,25] per the
      // Phase 2 fix — the blob read too large. mix-blend-mode keeps text legible.
      sizes={[51, 106, 64]}
      innerSizes={[17, 30, 21]}
      fillColor="#ffb77d"
      innerColor="rgba(255,255,255,0.85)"
      blendMode="difference"
      zIndex={100}
    />
  );
}
