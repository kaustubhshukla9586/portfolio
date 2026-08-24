import WordReveal from "../components/WordReveal.jsx";
import Reveal from "../components/Reveal.jsx";

/*
 * Skeleton sections - anchor targets for the nav. Locked copy placed per brief.
 * Patent section does not exist yet - flag to client when that phase begins.
 */

function SectionLabel({ children }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone-dim">
      {children}
    </span>
  );
}

function Skeleton({ id, index, title, intro, children }) {
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
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-bone/70 md:text-lg">
            {intro}
          </p>
        </Reveal>
      )}
      {children}
    </section>
  );
}

export function Work() {
  return (
    <Skeleton
      id="work"
      index="02 / work"
      title="Work"
      intro="Every job taught me to stop cutting corners."
    />
  );
}

export function Projects() {
  return (
    <Skeleton
      id="projects"
      index="03 / projects"
      title="Projects"
      intro="Ideas that survived contact with reality."
    />
  );
}

export function Contact() {
  return (
    <Skeleton
      id="contact"
      index="04 / contact"
      title="Contact"
      intro="No pitch. Just say what you need."
    />
  );
}
