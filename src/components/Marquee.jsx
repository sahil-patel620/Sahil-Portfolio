import { motion } from 'framer-motion';

export default function Marquee({ items, direction = 'left', speed = 40 }) {
  const marqueeContent = [...items, ...items, ...items, ...items]; // Duplicate for infinite scroll

  return (
    <div className="relative w-full overflow-hidden bg-primary/5 py-4 border-y border-primary/20 backdrop-blur-sm">
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none bg-gradient-to-r from-background via-transparent to-background" />
      
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
      >
        {marqueeContent.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-8 mx-8"
          >
            <span className="text-xl md:text-3xl font-black uppercase tracking-widest text-transparent stroke-text"
                  style={{ WebkitTextStroke: '1px var(--color-foreground)', opacity: 0.8 }}>
              {item}
            </span>
            <span className="text-primary/50 text-2xl">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
