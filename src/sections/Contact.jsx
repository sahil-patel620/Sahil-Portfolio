import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Phone, Copy, CheckCircle2, Loader2 } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useState, useRef } from 'react';
import { personalInfo } from '../data/portfolioData';
import { cn } from '../utils/cn';

/**
 * Contact Card Component
 */
const ContactCard = ({ icon: Icon, title, value, href, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : '_self'}
      rel="noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex items-center gap-4 p-5 rounded-2xl glass border border-surface-hover hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] dark:hover:shadow-[0_0_30px_rgba(74,222,128,0.1)] overflow-hidden"
    >
      {/* Background Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
        <Icon className="w-6 h-6" />
      </div>
      
      <div className="relative z-10 flex-1 overflow-hidden">
        <p className="text-sm text-foreground/60 font-medium mb-0.5">{title}</p>
        <p className="text-foreground font-semibold truncate group-hover:text-primary transition-colors">{value}</p>
      </div>

      <button
        onClick={handleCopy}
        className="relative z-10 p-2 rounded-lg text-foreground/40 hover:text-foreground hover:bg-surface transition-colors"
        title="Copy to clipboard"
      >
        {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
      </button>
    </motion.a>
  );
};

/**
 * Contact Section Component
 * -------------------------
 * Futuristic contact section featuring interactive contact cards,
 * social links, and a fully functional EmailJS integrated form.
 */
export default function Contact() {
  const formRef = useRef();
  const [formState, setFormState] = useState('idle'); // idle | submitting | success | error
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToastMsg({ msg, type });
    setTimeout(() => setToastMsg(null), 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');

    const formData = new FormData(formRef.current);

    fetch("https://formsubmit.co/ajax/9d4ddf70e4df3aa24a13b9553d86942e", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setFormState('success');
          showToast("Message sent successfully 🚀", 'success');
          e.target.reset();
        } else {
          throw new Error('Submission failed');
        }
      })
      .catch(error => {
        setFormState('error');
        showToast("Failed to send message. Please try again.", 'error');
      })
      .finally(() => {
        setTimeout(() => setFormState('idle'), 3000);
      });
  };

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen" />

      {/* Floating Success/Error Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={cn(
              "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full glass border shadow-2xl flex items-center gap-3 backdrop-blur-xl",
              toastMsg.type === 'success' ? "border-green-500/30 text-green-600 dark:text-green-400" : "border-red-500/30 text-red-600 dark:text-red-400"
            )}
          >
            {toastMsg.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : null}
            <span className="font-medium text-sm">{toastMsg.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-primary text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for Opportunities
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Let's build something <span className="text-gradient">epic</span>.
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Whether you have a question, a project idea, or just want to connect, my inbox is always open. Let's make it happen!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Get In Touch <span className="animate-wave inline-block origin-bottom-right">👋</span>
              </h3>
              
              <ContactCard
                icon={Mail}
                title="Email Address"
                value={personalInfo.email}
                href={`mailto:${personalInfo.email}`}
                onCopy={() => showToast("Email copied to clipboard!")}
              />
              
              <ContactCard
                icon={Phone}
                title="Phone Number"
                value={personalInfo.phone}
                href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                onCopy={() => showToast("Phone number copied to clipboard!")}
              />
            </div>

            <div className="pt-4">
              <h4 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4">Connect on Socials</h4>
              <div className="flex gap-4">
                {[
                  { icon: FaGithub, href: `https://github.com/${personalInfo.githubUsername}`, color: "hover:bg-foreground hover:text-background dark:hover:bg-primary dark:hover:text-white dark:hover:border-primary border-surface-hover" },
                  { icon: FaLinkedin, href: personalInfo.linkedinUrl, color: "hover:bg-[#0A66C2] dark:hover:bg-blue-500 hover:text-white hover:border-[#0A66C2] dark:hover:border-blue-500 border-surface-hover" },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "p-4 rounded-xl glass border transition-all duration-300 text-foreground/80",
                      social.color
                    )}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 relative group"
          >
            {/* Form Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-terminal/30 rounded-[2rem] blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
            
            <form 
              ref={formRef}
              onSubmit={handleSubmit} 
              className="relative glass p-8 md:p-10 rounded-[2rem] space-y-6 border border-white/10 dark:border-white/5 backdrop-blur-2xl bg-white/40 dark:bg-black/40"
            >
              {/* FormSubmit Configuration Fields */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_subject" value="New Portfolio Contact Submission!" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 group/input relative">
                  <label htmlFor="user_name" className="text-xs font-semibold text-foreground/60 uppercase tracking-wider ml-1">Full Name</label>
                  <input
                    type="text"
                    id="user_name"
                    name="name"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-background/50 dark:bg-black/50 border border-surface-hover focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-foreground/30 focus:shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                    placeholder="Sahil Patel"
                  />
                </div>
                
                <div className="space-y-2 group/input relative">
                  <label htmlFor="user_email" className="text-xs font-semibold text-foreground/60 uppercase tracking-wider ml-1">Email Address</label>
                  <input
                    type="email"
                    id="user_email"
                    name="email"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-background/50 dark:bg-black/50 border border-surface-hover focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-foreground/30 focus:shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                    placeholder="sahil@gmail.com"
                  />
                </div>
              </div>

              <div className="space-y-2 group/input relative">
                <label htmlFor="subject" className="text-xs font-semibold text-foreground/60 uppercase tracking-wider ml-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-5 py-4 rounded-xl bg-background/50 dark:bg-black/50 border border-surface-hover focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-foreground/30 focus:shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                  placeholder="How can I help you?"
                />
              </div>

              <div className="space-y-2 group/input relative">
                <label htmlFor="message" className="text-xs font-semibold text-foreground/60 uppercase tracking-wider ml-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-5 py-4 rounded-xl bg-background/50 dark:bg-black/50 border border-surface-hover focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-foreground/30 resize-none focus:shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={formState === 'submitting' || formState === 'success'}
                whileHover={{ scale: formState === 'idle' ? 1.01 : 1 }}
                whileTap={{ scale: formState === 'idle' ? 0.98 : 1 }}
                className={cn(
                  "w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group/btn shadow-lg",
                  formState === 'success' 
                    ? "bg-green-500 text-white shadow-green-500/25" 
                    : formState === 'error'
                    ? "bg-red-500 text-white shadow-red-500/25"
                    : "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-primary/30"
                )}
              >
                {formState === 'idle' && (
                  <>
                    <span className="relative z-10 tracking-wide">Send Message</span>
                    <Send className="w-4 h-4 relative z-10 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
                {formState === 'submitting' && (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="relative z-10 tracking-wide">Sending...</span>
                  </>
                )}
                {formState === 'success' && (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="relative z-10 tracking-wide">Sent Successfully</span>
                  </>
                )}
                {formState === 'error' && (
                  <>
                    <span className="relative z-10 tracking-wide">Error Sending</span>
                  </>
                )}
                
                {/* Button shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:animate-[shimmer_1.5s_infinite] pointer-events-none" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
