import { motion } from "framer-motion";
import { research } from "../data/content.js";

export default function Research() {
  const patent = research[0];

  return (
    <section id="research" className="w-full bg-ink pt-24 pb-12 md:pt-32 md:pb-16 px-5 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
          
          {/* First 4 columns: Meta & Title */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <h2 className="font-mono text-base md:text-lg uppercase tracking-widest text-bone-dim mb-4">
              RESEARCH / PATENT
            </h2>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-base md:text-lg uppercase tracking-widest text-amber">
                {patent.type} · {patent.role}
              </span>
              <span className="font-display text-2xl md:text-4xl font-bold uppercase tracking-tight text-bone leading-tight">
                {patent.title}
              </span>
              <span className="font-mono text-base md:text-lg uppercase tracking-widest text-bone/40 mt-2">
                {patent.area}
              </span>
            </div>
          </div>

          {/* Remaining 6 columns: Description */}
          <div className="md:col-span-6 md:pt-14 overflow-hidden">
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.2 }}
              className="font-body text-sm md:text-base leading-relaxed text-bone/80 max-w-2xl"
            >
              {patent.description}
            </motion.p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
