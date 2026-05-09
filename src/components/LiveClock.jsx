import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { cn } from '../utils/cn';

export default function LiveClock() {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatTimeMobile = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // const shortTimeZone = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
  //   .formatToParts(new Date())
  //   .find(part => part.type === 'timeZoneName')?.value || '';

  // Prevent hydration mismatch by returning empty structure if not mounted
  if (!mounted) return (
    <div className="h-8 w-32 md:w-48 bg-transparent" />
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3.5 py-1.5 md:py-2 rounded-xl font-mono text-[10px] md:text-xs font-medium border transition-all duration-300 group cursor-default relative overflow-hidden",
        theme === 'dark' 
          ? "bg-black/50 border-terminal/30 text-slate-300 hover:border-terminal/60 hover:shadow-[0_0_20px_rgba(74,222,128,0.2)]" 
          : "bg-white/80 border-primary/20 text-slate-600 hover:border-primary/50 hover:shadow-[0_8px_20px_rgba(139,92,246,0.15)] backdrop-blur-md"
      )}
    >
      {/* Background glow pulse on hover */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500",
        theme === 'dark' ? "bg-gradient-to-r from-terminal/0 via-terminal to-terminal/0" : "bg-gradient-to-r from-primary/0 via-primary to-primary/0"
      )} />

      <div className="flex items-center gap-1.5 md:gap-2 relative z-10">
        <motion.div 
          animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className={cn(
            "w-2 h-2 rounded-full",
            theme === 'dark' ? "bg-terminal shadow-[0_0_8px_rgba(74,222,128,0.8)]" : "bg-primary shadow-[0_0_8px_rgba(139,92,246,0.6)]"
          )}
        />
        <div className="hidden sm:flex items-center gap-1">
          <span className={cn(
            "font-semibold tracking-wide",
            theme === 'dark' ? "text-terminal" : "text-primary"
          )}>
            Coding
          </span>
          <motion.span 
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className={cn(
              "w-1 h-3 inline-block -mb-0.5",
              theme === 'dark' ? "bg-terminal" : "bg-primary"
            )}
          />
        </div>
      </div>
      
      <span className={cn("hidden sm:inline-block opacity-40 relative z-10", theme === 'dark' ? "text-gray-300" : "text-gray-400")}>@</span>
      
      <div className="flex items-center relative z-10">
        <span className={cn("opacity-60 mr-1", theme === 'dark' ? "text-terminal" : "text-primary")}>&lt;</span>
        {/* Desktop time */}
        <span className={cn(
          "hidden sm:inline-block tracking-widest font-semibold drop-shadow-sm w-[64px] text-center",
          theme === 'dark' ? "text-white" : "text-slate-800"
        )}>
          {formatTime(time)}
        </span>
        {/* Mobile time */}
        <span className={cn(
          "sm:hidden tracking-wider font-semibold drop-shadow-sm w-[40px] text-center",
          theme === 'dark' ? "text-white" : "text-slate-800"
        )}>
          {formatTimeMobile(time)}
        </span>
        <span className={cn("opacity-60 ml-1", theme === 'dark' ? "text-terminal" : "text-primary")}>/&gt;</span>
      </div>
      
      {/* <span className={cn(
        "hidden md:inline-block text-[10px] opacity-60 relative z-10 ml-0.5",
        theme === 'dark' ? "text-slate-400" : "text-slate-500"
      )}>
        {shortTimeZone}
      </span> */}
    </motion.div>
  );
}
