import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WordReveal from "../components/WordReveal.jsx";
import { workExperience } from "../data/content.js";

function SectionLabel({ children }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone-dim">
      {children}
    </span>
  );
}

export default function Work() {
  const [activeIdx, setActiveIdx] = useState(0);

  const customEase = [0.16, 1, 0.3, 1];

  return (
    <section
      id="work"
      className="mx-auto flex min-h-[90vh] max-w-[1400px] flex-col px-5 py-24 md:px-10"
    >
      <div className="mb-16 md:mb-24">
        <SectionLabel>02 / work</SectionLabel>
        <WordReveal
          as="h2"
          text="Work"
          trigger="inView"
          className="mt-3 font-display text-5xl font-bold uppercase leading-none tracking-tight text-bone md:text-7xl"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
        {/* Left Side: Navigation List */}
        <div className="lg:w-5/12 flex flex-col lg:sticky lg:top-32 h-fit">
          <div className="flex flex-col border-t border-bone/10">
            {workExperience.map((job, idx) => {
              const isActive = activeIdx === idx;
              
              return (
                <div
                  key={idx}
                  className="group flex flex-col border-b border-bone/10 py-6 md:py-8 cursor-pointer"
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                >
                  <motion.h3 
                    className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-bone transition-colors group-hover:text-amber"
                    animate={{ opacity: isActive ? 1 : 0.3 }}
                    transition={{ ease: customEase, duration: 0.5 }}
                  >
                    {job.company}
                  </motion.h3>
                  <motion.span 
                    className="font-mono text-xs md:text-sm text-bone-dim uppercase tracking-wider mt-2"
                    animate={{ opacity: isActive ? 1 : 0.3 }}
                    transition={{ ease: customEase, duration: 0.5 }}
                  >
                    {job.role}
                  </motion.span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Details View */}
        <div className="lg:w-7/12 relative min-h-[400px] lg:pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ ease: customEase, duration: 0.5 }}
              className="flex flex-col"
            >
              <div className="font-mono text-sm md:text-base text-bone-dim tracking-widest uppercase mb-8 pb-6 border-b border-bone/10 flex justify-between">
                <span>{workExperience[activeIdx].date}</span>
                <span className="text-right">{workExperience[activeIdx].location}</span>
              </div>
              
              <ul className="flex flex-col gap-6 lg:gap-8">
                {workExperience[activeIdx].achievements.map((achievement, i) => {
                  const parts = achievement.split(": ");
                  return (
                    <li
                      key={i}
                      className="font-body text-bone/80 text-sm md:text-base lg:text-lg leading-relaxed pl-6 relative"
                    >
                      <span className="absolute left-0 top-2.5 lg:top-3 w-1.5 h-1.5 bg-amber-deep opacity-60 rounded-full" />
                      {parts.length > 1 ? (
                        <>
                          <span className="font-bold text-bone">{parts[0]}: </span>
                          {parts.slice(1).join(": ")}
                        </>
                      ) : (
                        achievement
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
