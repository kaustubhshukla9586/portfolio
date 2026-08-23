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
      sizes={[60, 125, 75]}
      innerSizes={[20, 35, 25]}
      fillColor="#ffb77d"
      innerColor="rgba(255,255,255,0.8)"
      zIndex={100}
    />
  );
}
