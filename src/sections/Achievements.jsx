import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { achievementsData } from '../data/portfolioData';
import GlareHover from '../components/Animations/GlareHover';

/**
 * Animated Counter Component
 * --------------------------
 * A reusable component that smoothly animates a number from a starting value
 * to an ending value over a specified duration using requestAnimationFrame.
 */
const Counter = ({ from, to, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      // Easing function: easeOutQuart
      const easeOut = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(from + (to - from) * easeOut));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return <span>{count}{suffix}</span>;
};

/**
 * Achievements Section Component
 * ------------------------------
 * Highlights key developer milestones with animated numeric counters.
 */
export default function Achievements() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section id="achievements" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onViewportEnter={() => setIsVisible(true)}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-10 h-10 text-secondary" />
            <h2 className="text-3xl md:text-5xl font-bold">
              Milestones & <span className="text-gradient">Achievements</span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-secondary/30 mx-auto rounded-full" />
        </motion.div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievementsData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass rounded-2xl text-center group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              <GlareHover
                glareColor="#06b6d4"
                glareOpacity={0.2}
                glareSize={170}
                className="p-8 h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex flex-col items-center">
                  {/* Icon Container */}
                  <div className="p-4 bg-secondary/10 text-secondary rounded-full mb-6 group-hover:scale-110 group-hover:bg-secondary/20 transition-all duration-300 shadow-[0_0_15px_rgba(14,165,233,0.1)] dark:shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    {item.icon}
                  </div>
                  
                  {/* Animated Counter */}
                  <h3 className="text-4xl md:text-5xl font-black text-foreground mb-2 tracking-tight group-hover:text-secondary transition-colors duration-300">
                    {isVisible ? (
                      <Counter from={0} to={item.value} suffix={item.suffix} />
                    ) : (
                      '0'
                    )}
                  </h3>
                  
                  {/* Achievement Details */}
                  <p className="text-lg font-bold text-foreground/80 mb-1">{item.label}</p>
                  <p className="text-sm text-foreground/50">{item.description}</p>
                </div>
              </GlareHover>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
