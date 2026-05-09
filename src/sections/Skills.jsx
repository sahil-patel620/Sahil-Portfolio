import { motion } from 'framer-motion';
import {
  SiReact, SiJavascript, SiHtml5, 
  SiTailwindcss, SiFramer, SiSpringboot, SiHibernate,
  SiPostgresql, SiMysql, SiMongodb, SiRedis,
  SiGithub, SiPostman, SiDocker, 
  SiVercel, SiDbeaver, SiIntellijidea
} from 'react-icons/si';
import { VscVscode } from "react-icons/vsc";
// import { SiIntellijidea } from "react-icons/si";
import { FaJava, FaCss3Alt, FaAws } from "react-icons/fa";
import { TbBrandReactNative } from 'react-icons/tb';
import { FaServer, FaNetworkWired } from 'react-icons/fa';
import { skillsData } from '../data/portfolioData';
import GlareHover from '../components/Animations/GlareHover';

/**
 * Skills Section Component
 * ------------------------
 * Showcases the developer's technical stack grouped by categories.
 * Each skill badge now renders its official brand icon alongside the name.
 */

/* ── Icon registry: maps skill names → react-icons component ── */
const SKILL_ICONS = {
  'React':           { Icon: SiReact,           color: '#61DAFB' },
  'React Native':    { Icon: TbBrandReactNative, color: '#61DAFB' },
  'JavaScript':      { Icon: SiJavascript,       color: '#F7DF1E' },
  'HTML5':           { Icon: SiHtml5,            color: '#E34F26' },
  'CSS3':            { Icon: FaCss3Alt,             color: '#1572B6' },
  'Tailwind CSS':    { Icon: SiTailwindcss,      color: '#38BDF8' },
  'Framer Motion':   { Icon: SiFramer,           color: '#BB4B96' },
  'Java':            { Icon: FaJava,             color: '#ED8B00' },
  'Spring Boot':     { Icon: SiSpringboot,       color: '#6DB33F' },
  'Hibernate':       { Icon: SiHibernate,        color: '#BCAD7D' },
  'REST APIs':       { Icon: FaNetworkWired,     color: '#8b5cf6' },
  'Microservices':   { Icon: FaServer,           color: '#06b6d4' },
  'PostgreSQL':      { Icon: SiPostgresql,       color: '#4169E1' },
  'MySQL':           { Icon: SiMysql,            color: '#4479A1' },
  'MongoDB':         { Icon: SiMongodb,          color: '#47A248' },
  'Redis':           { Icon: SiRedis,            color: '#DC382D' },
  'GitHub':          { Icon: SiGithub,           color: '#ffffff' },
  'Postman':         { Icon: SiPostman,          color: '#FF6C37' },
  'DBeaver':         { Icon: SiDbeaver,          color: '#5B8CC4' },
  'Vercel':          { Icon: SiVercel,           color: '#e2e8f0' },
  'Docker':          { Icon: SiDocker,           color: '#2496ED' },
  'AWS':             { Icon: FaAws,           color: '#FF9900' },
  'VS Code':         { Icon: VscVscode, color: '#007ACC' },
  'IntelliJ IDEA':   { Icon: SiIntellijidea,    color: '#FE315D' },
};

/* ── Category accent colors ── */
const CATEGORY_COLORS = {
  Frontend: '#61DAFB',
  Backend:  '#6DB33F',
  Database: '#4169E1',
  Tools:    '#FF6C37',
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Tech Stack</span>
          </h2>
          <div className="w-24 h-1 bg-secondary/30 mx-auto rounded-full" />
        </motion.div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((skillGroup, idx) => {
            const accent = CATEGORY_COLORS[skillGroup.category] || '#8b5cf6';
            return (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="glass rounded-2xl hover:border-white/20 transition-colors group relative overflow-hidden"
              >
                <GlareHover
                  glareColor={accent}
                  glareOpacity={0.15}
                  glareSize={150}
                  className="p-6 h-full"
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Category title with accent underline */}
                  <div className="relative z-10 mb-5">
                    <h3 className="text-xl font-bold text-foreground/90 pb-2">
                      {skillGroup.category}
                    </h3>
                    <div
                      className="h-0.5 w-12 rounded-full opacity-60"
                      style={{ background: accent }}
                    />
                  </div>

                  {/* Skill badges with icons */}
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {skillGroup.items.map((item, i) => {
                      const entry = SKILL_ICONS[item];
                      const Icon = entry?.Icon;
                      const color = entry?.color;

                      return (
                        <motion.span
                          key={i}
                          whileHover={{ scale: 1.06 }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full
                            bg-surface-hover text-foreground/80
                            border border-slate-200 dark:border-white/5
                            hover:border-primary/50 hover:text-primary
                            transition-all duration-200 cursor-default"
                        >
                          {Icon && (
                            <Icon
                              className="w-3.5 h-3.5 shrink-0"
                              style={{ color }}
                            />
                          )}
                          {item}
                        </motion.span>
                      );
                    })}
                  </div>
                </GlareHover>
              </motion.div>
            );
          })}
        </div>

        {/* Infinite Tech Marquee */}
        <div className="mt-20 flex overflow-hidden mask-image-linear">
          <motion.div
            className="flex gap-8 whitespace-nowrap min-w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 20 }}
          >
            {[
              ...skillsData.flatMap(s => s.items),
              ...skillsData.flatMap(s => s.items),
            ].map((tech, i) => {
              const entry = SKILL_ICONS[tech];
              const Icon = entry?.Icon;
              const color = entry?.color;
              return (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 text-4xl md:text-6xl font-black text-surface-hover hover:text-primary/20 transition-colors"
                >
                  {Icon && (
                    <Icon
                      className="w-8 h-8 md:w-12 md:h-12 opacity-20"
                      style={{ color }}
                    />
                  )}
                  {tech}
                </span>
              );
            })}
          </motion.div>
        </div>
      </div>

      <style>{`
        .mask-image-linear {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
}
