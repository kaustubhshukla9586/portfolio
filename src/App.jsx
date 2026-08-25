import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import Preloader from "./components/Preloader.jsx";
import Cursor from "./components/Cursor.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import ScrollStatement from "./sections/ScrollStatement.jsx";
import Footer from "./sections/Footer.jsx";
import { Contact, Patent } from "./sections/Sections.jsx";
import Work from "./sections/Work.jsx";
import Projects from "./sections/Projects.jsx";

const PRELOAD_IMAGES = [
  "/assets/portrait-bw.jpg",
];

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = src;
    // decode() gives us a fully-rasterised image before we resolve.
    if (img.decode) img.decode().then(resolve).catch(() => resolve());
  });
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  // The preloader is a REAL asset-loading buffer, not just cosmetic. We hold it
  // until (a) fonts are ready, (b) the portraits are decoded, AND (c) a minimum
  // ~2.6s has elapsed so the loader is comfortably visible and nothing that
  // depends on those assets lags in after it disappears.
  useEffect(() => {
    let cancelled = false;
    const MIN_VISIBLE = 2600;

    const fonts = document.fonts?.ready ?? Promise.resolve();
    const images = Promise.all(PRELOAD_IMAGES.map(preloadImage));
    const minTime = new Promise((r) => setTimeout(r, MIN_VISIBLE));

    // Hard ceiling: a stalled font/image never traps the page past ~5s.
    const ceiling = new Promise((r) => setTimeout(r, 5000));

    Promise.race([
      Promise.all([fonts, images, minTime]),
      ceiling,
    ]).then(() => {
      if (!cancelled) setLoaded(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    // reducedMotion="user" makes every framer-motion animation honor the OS
    // setting globally - wired once here.
    <MotionConfig reducedMotion="user">
      <Preloader done={loaded} />
      <Cursor />
      <div className="grain-overlay" aria-hidden="true" />

      <Nav />
      <main>
        <Hero />
        <div className="hazard-seam" aria-hidden="true" />
        <About />
        <ScrollStatement />
        <Work />
        <Projects />
        <Patent />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
