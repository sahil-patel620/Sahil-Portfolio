import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, TerminalSquare } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { cn } from '../utils/cn';
import { personalInfo } from '../data/portfolioData';
import LiveClock from './LiveClock';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

/**
 * Navbar Component
 * ----------------
 * Sticky top navigation bar. Includes theme toggle, resume download link,
 * and a responsive mobile menu.
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Handle scroll to apply background transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled ? 'py-4' : 'py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          'flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-300',
          isScrolled ? 'glass shadow-lg' : 'bg-transparent'
        )}>
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <TerminalSquare className="w-8 h-8 text-terminal group-hover:text-primary transition-colors" />
            <span className="font-bold text-xl tracking-tight text-gradient">
              {personalInfo.name.split(' ')[0]}.dev
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <LiveClock />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-surface transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-500" />
              )}
            </button>
            <a
              href={personalInfo.resumeUrl}
              download="Sahil_Patel_Resume.pdf"
              className="px-5 py-2 text-sm font-semibold rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/20 hover:border-primary transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <LiveClock />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-surface transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-500" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-4 px-4 md:hidden"
          >
            <div className="glass rounded-2xl p-6 flex flex-col gap-4 shadow-xl ">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors border-b border-surface pb-2"
                >
                  {link.name}
                </a>
              ))}
              <a
                href={personalInfo.resumeUrl}
                download="Sahil_Patel_Resume.pdf"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 text-center px-6 py-3 text-base font-semibold rounded-full bg-primary text-white shadow-lg"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
