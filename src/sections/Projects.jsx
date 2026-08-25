import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { projects } from "../data/content.js";
import WordReveal from "../components/WordReveal.jsx";

// ─────────────────────────────────────────────────────────────────────────
// EDITABLE MOCKUP POSITIONS & SCALE
// Nudge and scale any project's device mockup without touching the layout logic.
//   x → horizontal offset in vw  (positive = moves RIGHT, negative = LEFT)
//   y → vertical offset in vh     (positive = moves DOWN,  negative = UP)
//   scale → sizing multiplier     (1 = 100%, 0.8 = 80%, 1.2 = 120%)
// Units are viewport-relative (vw/vh) so offsets scale sensibly across
// mobile / tablet / desktop instead of breaking at a single screen size.
// Keyed by project.id (see content.js). Tweak these freely.
// ─────────────────────────────────────────────────────────────────────────
const MOCKUP_POSITIONS = {
  "katana-vault": { x: 0, y: 0, scale: 1 },
  "pathified": { x: 0, y: 0, scale: 1 },
  // scaled down to 0.75 so the top clears the nav pill, positioned down slightly to maintain text clearance
  "lpu-wifi": { x: 0, y: 5, scale: 0.75 }, 
  "ironforge": { x: -3, y: -4, scale: 1 }, // gentle up + left; paired with edge fade-mask
  "studylpu": { x: -6, y: -8, scale: 1 }, // moved up + left (diagonal), moderate
};

// Soft gradient mask that fades an image's top + left edges into the section
// background (#0a0a0a) so a cropped mockup blends smoothly instead of showing
// a hard boundary line. The bottom/right edges bleed off-screen, so only the
// two on-screen edges are feathered (intersect keeps the rest fully opaque).
const EDGE_FADE = "linear-gradient(to bottom, transparent 0%, #000 12%), linear-gradient(to right, transparent 0%, #000 12%)";
const edgeFadeStyle = {
  WebkitMaskImage: EDGE_FADE,
  maskImage: EDGE_FADE,
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

// Build the CSS transform for a mockup image from its offset config.
// `extra` lets a layout add its own transform (e.g. vertical centering)
// that must be preserved alongside the editable offset.
const mockupTransform = (id, extra = "") => {
  const { x = 0, y = 0, scale = 1 } = MOCKUP_POSITIONS[id] || {};
  return `${extra} translate(${x}vw, ${y}vh) scale(${scale})`.trim();
};

// 1. Label Corner-Position Sequence
const ProjectLabel = ({ project, index, progress, input, outputY }) => {
  // Label moves upward by 30px as it fades out at the edges of the project's scroll boundary
  const y = useTransform(progress, input, outputY);

  // Corner Map by POSITION (not project identity). Sequence cycles:
  //   pos 1 → top-left, 2 → top-right, 3 → bottom-right, 4 → bottom-left, 5 → top-left
  // With the current order that lands as:
  //   1 Katana (top-left) · 2 Pathified (top-right) · 3 LPU WiFi (bottom-right)
  //   4 IronForge (bottom-left) · 5 StudyLPU (top-left)
  const getCornerClass = () => {
    // ONE-OFF EXCEPTION: LPU WiFi Extension always gets top-left
    if (project.id === "lpu-wifi") {
      return "top-6 left-6 md:top-12 md:left-12";
    }

    switch (index) {
      case 0: return "top-6 left-6 md:top-12 md:left-12";
      case 1: return "top-6 right-6 md:top-12 md:right-12 text-right";
      case 2: return "bottom-6 right-6 md:bottom-12 md:right-12 text-right flex flex-col-reverse";
      case 3: return "bottom-6 left-6 md:bottom-12 md:left-12 flex flex-col-reverse";
      case 4: return "top-6 left-6 md:top-12 md:left-12";
      default: return "top-6 left-6";
    }
  };

  return (
    <motion.div 
      style={{ y }} 
      className={`absolute ${getCornerClass()} z-50 pointer-events-none mix-blend-difference`}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone-dim">
        03 / projects
      </span>
      <WordReveal
        as="h2"
        text="Projects"
        trigger="inView"
        className="mt-2 font-display text-4xl md:text-5xl font-bold uppercase leading-none tracking-tight text-bone"
      />
    </motion.div>
  );
};

const ProjectContent = ({ project }) => {
  const Links = () => (
    <div className="flex flex-wrap gap-6 font-mono text-xs md:text-sm uppercase tracking-widest text-amber shrink-0 mt-8 pointer-events-auto">
      {Object.entries(project.links).map(([key, url], i) => (
        <a key={i} href={url} target="_blank" rel="noreferrer" className="hover:text-bone transition-colors cursor-pointer border-b border-amber/30 hover:border-bone pb-1 relative z-50">
          {key === "github" ? "GITHUB" : "VISIT SITE"}
        </a>
      ))}
      {Object.keys(project.links).length === 0 && (
        <span className="text-bone-dim border-b border-transparent pb-1">PRIVATE / INTERNAL</span>
      )}
    </div>
  );

  const Title = ({ className = "" }) => (
    <h3 className={`font-display font-bold uppercase text-bone leading-none ${className}`}>
      {project.name}
    </h3>
  );

  const Desc = ({ className = "" }) => (
    <p className={`font-body text-bone/70 leading-relaxed ${className}`}>
      {project.description}
    </p>
  );

  // Layouts are keyed by project.id (identity), NOT list position — so the
  // display order can change in content.js without shuffling these layouts.

  // Katana Vault — mockup bleeds bottom-right, text in bottom-left safe area.
  // Mobile stacks cleanly (text above image) to avoid the overlap that the
  // full-bleed absolute layout causes at ≤767px.
  if (project.id === "katana-vault") {
    return (
      <>
        {/* Mobile: clean vertical stack, no overlap */}
        <div className="md:hidden w-full h-full flex flex-col justify-center gap-8 px-6">
          <div>
            <Title className="text-6xl tracking-tighter" />
            <Desc className="text-base mt-4 font-light text-bone/90" />
            <Links />
          </div>
          <img src={project.image} alt={project.name} className="w-full max-w-[380px] object-contain" />
        </div>
        {/* Desktop: unchanged full-bleed layout */}
        <div className="hidden md:block w-full h-full relative overflow-hidden">
           <img src={project.image} alt={project.name} style={{ transform: mockupTransform(project.id) }} className="absolute -bottom-[20vh] -right-[15vw] md:-bottom-[45vh] md:-right-[10vw] w-[140vw] md:w-[75vw] max-w-[1400px] object-contain opacity-90" />
           <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 w-full max-w-[700px] z-10 flex flex-col justify-end">
              <Title className="text-7xl md:text-[9rem] tracking-tighter" />
              <Desc className="text-lg md:text-2xl mt-6 font-light max-w-lg text-bone/90" />
              <Links />
           </div>
        </div>
      </>
    );
  }

  // Pathified — laptop left, text right (mockup keeps its vertical centering).
  // Mobile stacks cleanly (text above image) to avoid overlap at ≤767px.
  if (project.id === "pathified") {
    return (
      <>
        {/* Mobile: clean vertical stack, no overlap */}
        <div className="md:hidden w-full h-full flex flex-col justify-center gap-8 px-6">
          <div>
            <Title className="text-6xl" />
            <Desc className="text-base mt-4 text-bone/90" />
            <Links />
          </div>
          <img src={project.image} alt={project.name} className="w-full max-w-[420px] object-contain drop-shadow-[0_0_100px_rgba(0,0,0,0.5)]" />
        </div>
        {/* Desktop: unchanged laptop-left / text-right layout */}
        <div className="hidden md:flex w-full h-full relative items-center overflow-hidden">
           <img src={project.image} alt={project.name} style={{ transform: mockupTransform(project.id, "translateY(-50%)") }} className="absolute top-1/2 left-[-10vw] md:left-[5vw] w-[95vw] md:w-[45vw] max-w-[900px] object-contain drop-shadow-[0_0_100px_rgba(0,0,0,0.5)]" />
           <div className="absolute top-[20vh] right-6 md:top-[25vh] md:right-[15vw] z-10 max-w-[500px]">
              <Title className="text-6xl md:text-[7rem] md:text-right" />
              <Desc className="text-base md:text-xl mt-6 text-bone/90 md:text-right md:ml-auto" />
              <div className="flex md:justify-end"><Links /></div>
           </div>
        </div>
      </>
    );
  }

  // LPU WiFi — close-up mockup pushed right, text pinned to the dark
  // bottom-left safe area (md:left-12) so it never sits over the light panel.
  if (project.id === "lpu-wifi") {
    return (
      <div className="w-full h-full relative overflow-hidden">
         <img src={project.image} alt={project.name} style={{ transform: mockupTransform(project.id) }} className="absolute -top-[8vh] right-0 md:-top-[14vh] md:-right-[10vw] w-[130vw] md:w-[64vw] max-w-[1200px] object-contain opacity-60 md:opacity-100" />
         <div className="absolute bottom-6 left-6 md:bottom-[15vh] md:left-12 max-w-[480px] z-10">
            <Title className="text-6xl md:text-[8rem] leading-none" />
            <Desc className="text-lg md:text-2xl mt-8 text-bone/90" />
            <Links />
         </div>
      </div>
    );
  }

  // IronForge & Study LPU — standardized left-text / right-device layout
  if (project.id === "ironforge" || project.id === "studylpu") {
    return (
      <div className="w-full h-full relative overflow-hidden">
         <img src={project.image} alt={project.name} style={{ transform: mockupTransform(project.id), ...edgeFadeStyle }} className="absolute -bottom-[5vh] -right-[10vw] md:-bottom-[15vh] md:-right-[5vw] w-[140vw] md:w-[75vw] max-w-[1300px] object-contain" />
         <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-[12vw] z-10 max-w-[550px] flex flex-col justify-center">
            <Title className="text-6xl md:text-[8rem]" />
            <Desc className="text-lg md:text-2xl mt-6 text-bone/90" />
            <Links />
         </div>
      </div>
    );
  }

  return null;
};

const ProjectStage = ({ project, index, progress }) => {
  // outputX drives the shared left-to-right entrance: each stage slides in
  // from the left (negative x → 0) as it becomes active. Index 0 is already
  // on-screen at load, so it holds x=0 instead of sliding.
  let input, outputO, outputS, outputY, outputX;
  if (index === 0) {
    input = [0, 0.15, 0.2];
    outputO = [1, 1, 0];
    outputS = [1, 1, 0.95];
    outputY = [0, 0, -30];
    outputX = [0, 0, 0];
  } else if (index === 4) {
    input = [0.75, 0.8, 1];
    outputO = [0, 1, 1];
    outputS = [1.05, 1, 1];
    outputY = [-30, 0, 0];
    outputX = [-80, 0, 0];
  } else {
    input = [(index * 0.2) - 0.05, index * 0.2, (index * 0.2) + 0.15, (index + 1) * 0.2];
    outputO = [0, 1, 1, 0];
    outputS = [1.05, 1, 1, 0.95];
    outputY = [-30, 0, 0, -30];
    outputX = [-80, 0, 0, 0];
  }

  const opacity = useTransform(progress, input, outputO);
  const scale = useTransform(progress, input, outputS);
  const x = useTransform(progress, input, outputX);
  const visibility = useTransform(opacity, (v) => (v > 0 ? "visible" : "hidden"));

  return (
    <motion.div
      style={{ opacity, scale, x, visibility }}
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      <ProjectLabel project={project} index={index} progress={progress} input={input} outputY={outputY} />
      <ProjectContent project={project} index={index} />
    </motion.div>
  );
};

export default function Projects() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (reduce) {
    return (
      <section id="projects" className="relative w-full bg-ink flex flex-col gap-[20vh] py-[20vh]">
        {projects.map((project, idx) => (
          <div key={idx} className="w-full h-screen relative">
             <ProjectContent project={project} index={idx} />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={ref} id="projects" className="relative h-[600vh] bg-ink">
      <div className="sticky top-0 h-screen w-full overflow-x-clip overflow-y-hidden">
        {projects.map((project, idx) => (
          <ProjectStage key={idx} project={project} index={idx} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
