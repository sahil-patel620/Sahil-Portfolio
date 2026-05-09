import { motion } from 'framer-motion';
import { Terminal, Download, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../utils/cn';
import { personalInfo, heroPhrases } from '../data/portfolioData';

// Constants for typing animation speeds
const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const PAUSE_DURATION = 2000;

/**
 * Hero Section Component
 * ----------------------
 * The main landing section of the portfolio. Features a dynamic typing
 * animation, floating background elements, and primary call-to-action buttons.
 */
export default function Hero() {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Effect hook to handle the typing animation loop
  useEffect(() => {
    let timeout;
    const currentPhrase = heroPhrases[phraseIndex];
    
    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % heroPhrases.length);
        timeout = setTimeout(() => {}, 500);
      } else {
        timeout = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length - 1));
        }, DELETING_SPEED);
      }
    } else {
      if (text === currentPhrase) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, PAUSE_DURATION);
      } else {
        timeout = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length + 1));
        }, TYPING_SPEED);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Subtle geometric grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50 dark:opacity-20" />
      </div>

      <div className="text-center px-4 max-w-5xl mx-auto z-10">
        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-terminal animate-pulse"></span>
          <span className="text-sm font-medium tracking-wide text-foreground/80">
            {personalInfo.availableForHire ? 'Available for new opportunities' : 'Currently employed'}
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6"
        >
          Hi, I'm <span className="text-gradient">{personalInfo.name}</span>
        </motion.h1>

        {/* Animated Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-20 sm:h-12 mb-10"
        >
          <p className="text-xl md:text-2xl text-foreground/70 font-medium">
            {personalInfo.role} <br className="sm:hidden" />
            <span className="text-foreground inline-block min-w-[20px]">{text}</span>
            <span className="inline-block w-[3px] h-6 bg-primary ml-1 animate-pulse align-middle" />
          </p>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <a
            href="#projects"
            className="group relative flex items-center gap-2 px-8 py-4 bg-foreground text-background font-semibold rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)] w-full sm:w-auto justify-center"
          >
            <span className="relative z-10">View Projects</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a
            href="#contact"
            className="group flex items-center gap-2 px-8 py-4 glass text-foreground font-semibold rounded-full transition-all hover:scale-105 hover:bg-surface w-full sm:w-auto justify-center"
          >
            <Terminal className="w-5 h-5 text-terminal" />
            <span>Hire Me</span>
          </a>

          <a
            href={personalInfo.resumeUrl}
            download="Sahil_Patel_Resume.pdf"
            className="group flex items-center gap-2 px-8 py-4 border border-surface-hover text-foreground font-semibold rounded-full transition-all hover:scale-105 hover:border-primary/50 w-full sm:w-auto justify-center"
          >
            <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            <span>Resume</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-foreground/50">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-foreground/50 to-transparent" />
      </motion.div>
    </section>
  );
}
