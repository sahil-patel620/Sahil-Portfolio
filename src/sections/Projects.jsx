import { motion } from 'framer-motion';
import { ExternalLink, Folder } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projectsData } from '../data/portfolioData';

/**
 * Projects Section Component
 * --------------------------
 * Displays a grid of featured projects built by the developer.
 * Uses tilt-inspired hover animations and glassmorphism styling.
 */
export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto rounded-full" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative glass rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 overflow-hidden"
            >
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Icons & Links */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform duration-300">
                    <Folder className="w-8 h-8" />
                  </div>
                  <div className="flex gap-4">
                    <a href={project.github} target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-primary transition-colors">
                      <FaGithub className="w-6 h-6" />
                    </a>
                    <a href={project.live} target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-secondary transition-colors">
                      <ExternalLink className="w-6 h-6" />
                    </a>
                  </div>
                </div>

                {/* Project Details */}
                <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-foreground/70 mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-200/50 dark:border-white/5">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-[10px] md:text-xs font-mono text-secondary border border-secondary/30 px-2 py-1 rounded-md bg-secondary/5 group-hover:border-secondary/60 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
