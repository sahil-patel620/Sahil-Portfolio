import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { certificationsData } from '../data/portfolioData';

/**
 * Certifications Section Component
 * --------------------------------
 * Displays a grid of technical certifications earned by the developer.
 * Uses tilt-inspired hover animations similar to the Projects section.
 */
export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-4 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-10 h-10 text-primary" />
            <h2 className="text-3xl md:text-5xl font-bold">
              Professional <span className="text-gradient">Certifications</span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-primary/30 mx-auto rounded-full" />
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificationsData.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative glass rounded-2xl p-6 transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] hover:border-primary/40 dark:hover:border-primary/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Header: Icon & Date */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-foreground/60">{cert.date}</span>
                  </div>
                </div>

                {/* Title & Organization */}
                <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                  {cert.title}
                </h3>
                
                <p className="text-foreground/70 mb-4 font-medium">
                  {cert.organization}
                </p>

                {/* Credential ID */}
                <div className="mb-6 flex items-center gap-2">
                  <span className="text-xs text-foreground/50 font-mono">ID: {cert.credentialId}</span>
                </div>

                {/* Footer: Tags & Link */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200/50 dark:border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {cert.tech.map((t, i) => (
                      <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-slate-100 dark:bg-white/5 text-secondary">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300"
                  >
                    View <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
