import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import Preloader from "./components/Preloader.jsx";
import CursorLayer from "./components/CursorLayer.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./sections/Hero.jsx";
import { About, Work, Projects, Contact } from "./sections/Sections.jsx";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  // Hold the preloader until fonts are ready (prevents FOUT on the display type),
  // with a hard ceiling so a slow font never traps the page.
  useEffect(() => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setLoaded(true);
    };
    const fonts = document.fonts?.ready ?? Promise.resolve();
    fonts.then(finish);
    const ceiling = setTimeout(finish, 2000);
    return () => clearTimeout(ceiling);
  }, []);

  return (
    // reducedMotion="user" makes every framer-motion animation honor the OS
    // setting globally — wired once here.
    <MotionConfig reducedMotion="user">
      <Preloader done={loaded} />
      <CursorLayer />
      <div className="grain-overlay" aria-hidden="true" />

      <Nav />
      <main>
        <Hero />
        <div className="hazard-seam" aria-hidden="true" />
        <About />
        <Work />
        <Projects />
        <Contact />
      </main>
    </MotionConfig>
  );
}
