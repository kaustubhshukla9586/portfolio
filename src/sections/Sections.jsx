import Reveal from "../components/Reveal.jsx";
import WordReveal from "../components/WordReveal.jsx";

/*
 * Phase 1 skeletons only. Each section is an anchor target for the nav.
 * Real content lands in later phases (Hero=2, About=3, Work/Patent=4,
 * Projects=5, Contact/Footer/EasterEgg=6). Kept minimal on purpose.
 */

function SectionLabel({ children }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone-dim">
      {children}
    </span>
  );
}

function Skeleton({ id, index, title, children }) {
  return (
    <section
      id={id}
      className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col justify-center px-5 py-24 md:px-10"
    >
      <SectionLabel>{index}</SectionLabel>
      <WordReveal
        as="h2"
        text={title}
        trigger="inView"
        className="mt-3 font-display text-5xl font-bold uppercase leading-none tracking-tight text-bone md:text-7xl"
      />
      {children}
    </section>
  );
}

export function About() {
  return (
    <Skeleton id="about" index="01 / about" title="About">
      {/* Test scroll-reveal fires here in Phase 1. */}
      <Reveal className="mt-6">
        <p className="max-w-xl font-body text-base text-bone-dim">
          Scroll-reveal test element. If this fades and springs up on scroll, the
          Derek-Cole reveal is wired correctly.
        </p>
      </Reveal>
    </Skeleton>
  );
}

export function Work() {
  return <Skeleton id="work" index="02 / work" title="Work" />;
}

export function Projects() {
  return <Skeleton id="projects" index="03 / projects" title="Projects" />;
}

export function Contact() {
  return <Skeleton id="contact" index="04 / contact" title="Contact" />;
}
