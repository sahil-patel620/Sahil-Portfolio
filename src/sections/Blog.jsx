import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Clock, Calendar, AlertTriangle, TrendingUp } from 'lucide-react';
import { cn } from '../utils/cn';

/**
 * Trending Marquee Component
 * --------------------------
 * Infinite scrolling marquee with futuristic neon styling.
 */
const TrendingMarquee = () => {
  const topics = [
    "AI Agents", "GPT-5", "React", "Spring Boot", 
    "Full Stack Development", "JavaScript", "Open Source", 
    "Software Engineering", "Web3", "Developer Tools",
    "Cloud Native", "DevOps", "Machine Learning", "Tailwind CSS"
  ];

  return (
    <div className="w-full overflow-hidden bg-black/20 backdrop-blur-sm py-4 border-y border-white/10 mb-20 relative">
      {/* Edge Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />
      
      <motion.div
        animate={{ x: [0, -1500] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
        className="flex whitespace-nowrap items-center gap-12 w-max"
      >
        {[...topics, ...topics, ...topics].map((topic, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-secondary animate-pulse" />
            <span className="text-sm font-bold text-foreground/90 tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
              {topic}
            </span>
            <span className="text-primary/30 mx-6 text-xl">/</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/**
 * Skeleton Loader Component
 */
const BlogSkeleton = () => (
  <div className="glass rounded-2xl overflow-hidden border border-white/5 bg-surface/50 h-[480px] animate-pulse">
    {/* Image Skeleton */}
    <div className="h-48 bg-white/5" />
    
    <div className="p-6 space-y-4">
      {/* Tags Skeleton */}
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-white/5 rounded-full" />
        <div className="h-6 w-20 bg-white/5 rounded-full" />
      </div>
      
      {/* Title Skeleton */}
      <div className="h-6 w-full bg-white/5 rounded-md" />
      <div className="h-6 w-3/4 bg-white/5 rounded-md" />
      
      {/* Description Skeleton */}
      <div className="space-y-2 pt-2">
        <div className="h-4 w-full bg-white/5 rounded-md" />
        <div className="h-4 w-5/6 bg-white/5 rounded-md" />
        <div className="h-4 w-4/6 bg-white/5 rounded-md" />
      </div>
      
      {/* Footer Skeleton */}
      <div className="flex items-center gap-3 pt-6 mt-auto border-t border-white/5">
        <div className="w-8 h-8 rounded-full bg-white/5" />
        <div className="space-y-1">
          <div className="h-3 w-24 bg-white/5 rounded-md" />
          <div className="h-2 w-16 bg-white/5 rounded-md" />
        </div>
      </div>
    </div>
  </div>
);

/**
 * Main Blog Section Component
 * ---------------------------
 * Fetches real-time articles from DEV.to API.
 */
export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://dev.to/api/articles?tag=programming&top=7&per_page=12"
        );
        
        if (!response.ok) throw new Error("Failed to fetch");
        
        const data = await response.json();
        
        // Dynamic client-side filtering for specific user-requested tags
        const techTags = ["ai", "react", "javascript", "webdev", "programming", "softwareengineering", "backend", "frontend", "java", "springboot"];
        const filtered = data.filter(a => 
          a.tag_list.some(tag => techTags.includes(tag.toLowerCase()))
        ).slice(0, 6);
        
        setArticles(filtered.length > 0 ? filtered : data.slice(0, 6));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section id="blog" className="py-24 relative overflow-hidden">
      {/* Futuristic Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen" />

      {/* Animated Trending Marquee */}
      <TrendingMarquee />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-primary text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Live Tech Feed
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Latest Tech & <span className="text-gradient">AI Updates</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Real-time updates from trusted developer platforms and tech communities.
          </p>
        </motion.div>

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20 text-center glass rounded-3xl border border-red-500/20">
            <AlertTriangle className="w-12 h-12 text-red-500 mb-4 opacity-80" />
            <h3 className="text-xl font-bold text-foreground mb-2">Unable to fetch latest updates</h3>
            <p className="text-foreground/60">Please try refreshing the page later.</p>
          </div>
        )}

        {/* Blog Grid */}
        {!error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <BlogSkeleton key={i} />)
            ) : (
              articles.map((article, idx) => (
                <BlogCard key={article.id} article={article} idx={idx} />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Premium Blog Card with Mouse Spotlight Effect
 */
const BlogCard = ({ article, idx }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.a
      ref={cardRef}
      onMouseMove={handleMouseMove}
      href={article.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="group flex flex-col glass rounded-2xl overflow-hidden border border-white/5 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] dark:hover:shadow-[0_0_40px_rgba(74,222,128,0.1)] relative"
    >
      {/* Spotlight Effect */}
      <div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
        }}
      />

      {/* Thumbnail Container */}
      <div className="relative h-48 overflow-hidden bg-surface-hover z-10">
        <img
          src={article.cover_image || article.social_image || `https://placehold.co/600x400/1a1a1a/8b5cf6?text=${article.tag_list[0] || 'Tech'}`}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Source Platform Badge */}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white tracking-widest uppercase border border-white/10 shadow-lg">
          DEV.to
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow z-10 bg-gradient-to-b from-transparent to-background/50">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tag_list.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] font-mono px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20 uppercase tracking-tighter">
              #{tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
          {article.title}
        </h3>
        
        <p className="text-foreground/70 mb-6 text-sm line-clamp-3 flex-grow leading-relaxed">
          {article.description}
        </p>

        {/* Meta Footer */}
        <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={article.user.profile_image_90} 
              alt={article.user.name} 
              className="w-8 h-8 rounded-full border border-white/10 shadow-sm"
              loading="lazy"
            />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-foreground leading-none mb-1">{article.user.name}</span>
              <div className="flex items-center gap-2 text-[10px] text-foreground/50">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.readable_publish_date}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.reading_time_minutes} min read</span>
              </div>
            </div>
          </div>
          
          <div className="w-9 h-9 rounded-full bg-surface-hover flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 border border-white/5 shadow-inner">
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.a>
  );
};
