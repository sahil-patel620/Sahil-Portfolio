import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

/**
 * Experience Section Component
 * ----------------------------
 * Renders a vertical timeline of the developer's professional experience,
 * including roles, companies, and the technology stack utilized.
 */
export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-primary/30 mx-auto rounded-full" />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Center Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-transparent" />

          {/* Timeline Events */}
          {experienceData.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className={`relative flex items-center justify-between md:justify-normal w-full mb-12 ${
                idx % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute left-[-8px] md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-background border-4 border-primary z-10" />

              {/* Experience Card */}
              <div className="w-full pl-8 md:pl-0 md:w-5/12">
                <div className="glass p-6 rounded-2xl hover:border-primary/40 transition-colors shadow-lg">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Briefcase className="w-5 h-5" />
                    <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period} | {exp.company}</span>
                  </div>

                  <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t, i) => (
                      <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-slate-100 dark:bg-white/5 text-secondary">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
