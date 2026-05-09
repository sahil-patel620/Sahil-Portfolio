import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';

/**
 * Footer Component
 * ----------------
 * Bottom navigation and copyright information.
 * Uses central data for social links.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-200/50 dark:border-white/10 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-black tracking-tighter mb-2">
              <span className="text-gradient">&lt;{personalInfo.name.split(' ')[0]} /&gt;</span>
            </h2>
            <p className="text-sm text-foreground/50">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href={`https://github.com/${personalInfo.githubUsername}`} target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-primary transition-colors">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href={personalInfo.linkedinUrl} target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-blue-500 transition-colors">
              <FaLinkedin className="w-5 h-5" />
            </a>
            {/* <a href={personalInfo.twitterUrl} target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-sky-500 transition-colors">
              <FaTwitter className="w-5 h-5" />
            </a> */}
          </div>
          
        </div>
        
        <div className="mt-8 text-center text-xs text-foreground/40 flex items-center justify-center gap-1">
          Designed & Built with <FaHeart className="text-red-500 w-3 h-3 mx-1 animate-pulse" /> using React & Tailwind
        </div>
      </div>
    </footer>
  );
}
