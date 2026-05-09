import { motion } from 'framer-motion';
import { Code2, Server, Database } from 'lucide-react';
import { personalInfo, aboutStats } from '../data/portfolioData';

/**
 * About Section Component
 * -----------------------
 * Displays the developer's bio, statistical highlights, and core competency cards.
 * Data is dynamically pulled from the central portfolioData configuration.
 */
export default function About() {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">
              Initialize
            </span>{' '}
            About
          </h2>
          <div className="w-24 h-1 bg-primary/30 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-lg text-foreground/80 leading-relaxed">
              {personalInfo.bioParagraph1}
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              {personalInfo.bioParagraph2}
            </p>
            
            {/* Statistical Counters */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {aboutStats.map((stat, i) => (
                <div key={i} className="glass p-4 rounded-2xl hover:border-primary/30 transition-colors">
                  <h4 className="text-3xl font-bold text-gradient mb-1">{stat.value}</h4>
                  <p className="text-sm text-foreground/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual competency cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid gap-4"
          >
            {/* Frontend Card */}
            <div className="glass p-6 rounded-2xl hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
              <Code2 className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Frontend Engineering</h3>
              <p className="text-foreground/70">Crafting responsive, accessible, and performant user interfaces using React, Tailwind, and modern web standards.</p>
            </div>
            
            {/* Backend Card */}
            <div className="glass p-6 rounded-2xl hover:border-secondary/50 transition-all duration-300 group hover:-translate-y-1 shadow-[0_0_15px_rgba(6,182,212,0.1)] ml-0 lg:ml-12">
              <Server className="w-8 h-8 text-secondary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Backend Architecture</h3>
              <p className="text-foreground/70">Building robust APIs and microservices with Java, Spring Boot, ensuring scalable and secure systems.</p>
            </div>
            
            {/* Database Card */}
            <div className="glass p-6 rounded-2xl hover:border-terminal/50 transition-all duration-300 group hover:-translate-y-1 shadow-[0_0_15px_rgba(74,222,128,0.1)]">
              <Database className="w-8 h-8 text-terminal mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Database Management</h3>
              <p className="text-foreground/70">Designing efficient schemas and optimizing queries with PostgreSQL and MySQL for high-performance applications.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
