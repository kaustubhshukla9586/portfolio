import { useEffect, useState } from "react";

/* Small SSR-safe matchMedia hook. Returns false until mounted. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/* Desktop = fine pointer (mouse) AND a wide enough viewport.
   Used to gate the blob cursor and heavy motion off touch devices. */
export function useIsDesktop() {
  return useMediaQuery("(pointer: fine) and (min-width: 768px)");
}
