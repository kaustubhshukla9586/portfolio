import WordReveal from "../components/WordReveal.jsx";

/*
 * Skeleton sections — anchor targets for the nav. About and Footer now have
 * dedicated components; Work / Projects / Contact remain minimal placeholders
 * pending their later phases. Kept minimal on purpose.
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

export function Work() {
  return <Skeleton id="work" index="02 / work" title="Work" />;
}

export function Projects() {
  return <Skeleton id="projects" index="03 / projects" title="Projects" />;
}

export function Contact() {
  return <Skeleton id="contact" index="04 / contact" title="Contact" />;
}
