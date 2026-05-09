import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Maximize2, Minus, X } from 'lucide-react';
import { terminalCommands } from '../data/portfolioData';

/**
 * Terminal Section Component
 * --------------------------
 * Simulates a realistic developer terminal. Users can type commands
 * to interact with the portfolio data.
 */
export default function TerminalSection() {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Welcome to SahilOS v1.0.0' },
    { type: 'system', content: 'Type "help" for a list of available commands.' }
  ]);
  const [input, setInput] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom whenever history updates (internal scroll only)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history]);

  // Handle user command submission
  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: 'user', content: cmd }];

    if (cmd === 'clear') {
      setHistory([]);
    } else if (terminalCommands[cmd]) {
      newHistory.push({ type: 'system', content: terminalCommands[cmd] });
      setHistory(newHistory);
    } else {
      newHistory.push({ type: 'error', content: `Command not found: ${cmd}` });
      setHistory(newHistory);
    }

    setInput('');
  };

  return (
    <section id="terminal" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-xl overflow-hidden shadow-[0_0_50px_rgba(74,222,128,0.1)] bg-[#0a0a0a]"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-slate-200 dark:border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="text-xs text-white/50 font-mono flex items-center gap-2">
              <TerminalIcon className="w-3 h-3" />
              sahil@dev-machine:~
            </div>
            <div className="flex gap-3 text-white/40">
              <Minus className="w-4 h-4 cursor-pointer hover:text-white/80" />
              <Maximize2 className="w-4 h-4 cursor-pointer hover:text-white/80" />
              <X className="w-4 h-4 cursor-pointer hover:text-white/80" />
            </div>
          </div>

          {/* Terminal Body */}
          <div 
            ref={containerRef}
            className="p-6 h-[400px] overflow-y-auto terminal-font text-sm sm:text-base custom-scrollbar bg-[#0a0a0a]"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line, i) => (
              <div key={i} className="mb-2">
                {line.type === 'user' ? (
                  <div className="flex gap-2 text-white/80">
                    <span className="text-terminal">➜</span>
                    <span className="text-secondary">~</span>
                    <span>{line.content}</span>
                  </div>
                ) : (
                  <div className={line.type === 'error' ? 'text-red-400' : 'text-white/70 terminal-glow'}>
                    {line.content}
                  </div>
                )}
              </div>
            ))}
            
            {/* Terminal Input Form */}
            <form onSubmit={handleCommand} className="flex gap-2 mt-2">
              <span className="text-terminal">➜</span>
              <span className="text-secondary">~</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white/90 caret-terminal"
                autoFocus
                spellCheck="false"
                autoComplete="off"
              />
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
