import { motion } from "framer-motion";
import WordReveal from "../components/WordReveal.jsx";
import Reveal from "../components/Reveal.jsx";
import { research } from "../data/content.js";

function SectionLabel({ children }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone-dim">
      {children}
    </span>
  );
}

export function Patent() {
  const patent = research[0];

  return (
    <section
      id="research"
      className="mx-auto w-full max-w-[1400px] px-5 py-20 md:px-10 md:py-24"
    >
      <Reveal>
        <SectionLabel>04 / research</SectionLabel>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-10 border-t border-bone/10 pt-8 md:pt-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber">
                {patent.type} · {patent.role}
              </span>
              <h3 className="font-display text-3xl font-bold uppercase leading-none tracking-tight text-bone md:text-4xl">
                {patent.title}
              </h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim">
                {patent.collaborators?.length > 0 ? `With ${patent.collaborators.join(" · ")}` : ""}
              </p>
            </div>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40 md:mt-1">
              {patent.area}
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col justify-center px-5 py-24 md:px-10"
    >
      <SectionLabel>05 / contact</SectionLabel>
      <WordReveal
        as="h2"
        text="Contact"
        trigger="inView"
        className="mt-3 font-display text-5xl font-bold uppercase leading-none tracking-tight text-bone md:text-7xl"
      />
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-bone/70 md:text-lg">
          No pitch. Just say what you need.
        </p>
      </Reveal>
    </section>
  );
}
