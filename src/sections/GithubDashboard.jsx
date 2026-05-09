import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, GitFork, BookOpen } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';

/**
 * GitHub Dashboard Component
 * --------------------------
 * Fetches and displays real-time GitHub data for the user.
 * Includes profile stats, recent repositories, and a contribution chart.
 */
export default function GithubDashboard() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const username = personalInfo.githubUsername;

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`)
        ]);

        if (profileRes.ok && reposRes.ok) {
          const profileData = await profileRes.json();
          const reposData = await reposRes.json();
          setProfile(profileData);
          setRepos(reposData);
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, [username]);

  if (loading) return null; // In a production app, use a skeleton loader here.

  return (
    <section id="github" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaGithub className="w-10 h-10 text-primary" />
            <h2 className="text-3xl md:text-5xl font-bold">
              GitHub <span className="text-gradient">Activity</span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-primary/30 mx-auto rounded-full" />
        </motion.div>

        {profile && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-1 glass p-8 rounded-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-32 bg-primary/10 rounded-full blur-[80px] -z-10 group-hover:bg-primary/20 transition-colors duration-500" />
                
                <div className="flex flex-col items-center text-center">
                  <img 
                    src={profile.avatar_url} 
                    alt={profile.login} 
                    className="w-32 h-32 rounded-full border-4 border-primary/30 mb-4 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                  />
                  <h3 className="text-2xl font-bold text-foreground mb-1">{profile.name || profile.login}</h3>
                  <p className="text-primary font-mono mb-4">@{profile.login}</p>
                  <p className="text-foreground/70 mb-6 text-sm">{profile.bio || 'Full Stack Developer building awesome things.'}</p>
                  
                  <div className="grid grid-cols-3 gap-4 w-full">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{profile.public_repos}</p>
                      <p className="text-xs text-foreground/50 uppercase tracking-wider">Repos</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{profile.followers}</p>
                      <p className="text-xs text-foreground/50 uppercase tracking-wider">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{profile.following}</p>
                      <p className="text-xs text-foreground/50 uppercase tracking-wider">Following</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Repositories */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {repos.map((repo, idx) => (
                  <motion.a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={repo.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass p-6 rounded-2xl hover:border-primary/40 transition-all duration-300 group flex flex-col h-full"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors truncate">
                        {repo.name}
                      </h4>
                    </div>
                    <p className="text-sm text-foreground/60 mb-6 flex-grow line-clamp-2">
                      {repo.description || 'No description available for this repository.'}
                    </p>
                    <div className="flex items-center justify-between text-xs font-mono text-foreground/50">
                      <div className="flex items-center gap-4">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5" />
                          {repo.forks_count}
                        </span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* GitHub Contributions Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl overflow-hidden w-full relative group"
            >
              <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-[100px] -z-10 group-hover:bg-primary/10 transition-colors duration-700" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">GitHub Heatmap</h3>
                  <p className="text-sm text-foreground/50 font-mono">Contributions of @{username}</p>
                </div>
                
                <div className="flex items-center gap-3 text-xs font-mono text-foreground/60">
                  <span>Less</span>
                  <div className="flex gap-1.5">
                    {['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'].map(level => (
                      <div 
                        key={level} 
                        className="w-3.5 h-3.5 rounded-sm" 
                        style={{ backgroundColor: getContributionColor(level) }}
                      />
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </div>
              
              <div className="overflow-x-auto pb-4 custom-scrollbar">
                <ContributionGraph username={username} />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Enhanced Contribution Graph Component
 */
function ContributionGraph({ username }) {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [weeks, setWeeks] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://github-contributions-api.deno.dev/${username}.json?ts=${Date.now()}`
      );

      const data = await response.json();

      setWeeks(data.contributions);
      setTotalContributions(data.totalContributions);
    } catch (error) {
      console.error('Error fetching contributions:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();

  // Auto refresh every 5 minutes
  const interval = setInterval(fetchData, 5 * 60 * 1000);

  return () => clearInterval(interval);
}, [username]);

  // Handle clicking outside to close tooltip
  useEffect(() => {
    const handleOutsideClick = () => setSelectedDay(null);
    if (selectedDay) {
      window.addEventListener('click', handleOutsideClick);
    }
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [selectedDay]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-sm font-mono text-foreground/50">Fetching your activity...</p>
      </div>
    );
  }

  return (
    <div className="relative inline-block select-none" onClick={(e) => e.stopPropagation()}>
      <div className="mb-4 flex items-center justify-between px-2">
        <span className="text-sm font-bold text-foreground">
          {totalContributions} contributions in the last year
        </span>
      </div>

      {/* Month Labels */}
      <div className="flex mb-3 ml-10 text-[10px] font-mono text-foreground/40 uppercase tracking-tighter h-4 relative">
        {weeks.map((week, index) => {
          const firstDay = new Date(week[0].date);
          const isFirstDayOfMonth = firstDay.getDate() <= 7 && index > 0 && firstDay.getMonth() !== new Date(weeks[index-1][0].date).getMonth();
          if (index === 0 || isFirstDayOfMonth) {
            return (
              <div key={index} className="absolute" style={{ left: `${index * 18}px` }}>
                {firstDay.toLocaleString('en-US', { month: 'short' })}
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="flex gap-2">
        {/* Weekday Labels */}
        <div className="flex flex-col gap-[6px] mt-[1px] text-[9px] font-mono text-foreground/30 uppercase w-8">
          <div className="h-3"></div>
          <div className="h-3 flex items-center">Mon</div>
          <div className="h-3"></div>
          <div className="h-3 flex items-center">Wed</div>
          <div className="h-3"></div>
          <div className="h-3 flex items-center">Fri</div>
          <div className="h-3"></div>
        </div>

        {/* The Grid */}
        <div className="flex gap-[6px]">
          {weeks.map((week, wIndex) => (
            <div key={wIndex} className="flex flex-col gap-[6px]">
              {week.map((day, dIndex) => {
                const isActive = hoveredDay === day || selectedDay === day;
                const isHigh = day.contributionLevel === 'FOURTH_QUARTILE' || day.contributionLevel === 'THIRD_QUARTILE';
                const formattedDate = new Date(day.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                
                return (
                  <div key={dIndex} className="relative">
                    <motion.div
                      whileHover={{ scale: 1.3, zIndex: 20 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className={`w-3 h-3 rounded-[2px] cursor-pointer relative ${isHigh ? 'shadow-[0_0_15px_rgba(57,211,83,0.2)]' : ''}`}
                      style={{ 
                        backgroundColor: getContributionColor(day.contributionLevel),
                      }}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDay(selectedDay === day ? null : day);
                      }}
                    >
                      {/* High contribution pulse effect */}
                      {isHigh && (
                        <div className="absolute inset-0 rounded-[2px] animate-pulse bg-white/10 blur-[2px]" />
                      )}
                    </motion.div>

                    {/* Tooltip */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.95 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 pointer-events-none"
                        >
                          <div className="glass px-4 py-2.5 rounded-xl text-xs whitespace-nowrap border-primary/20 shadow-2xl backdrop-blur-xl bg-background/80 min-w-[150px]">
                            <div className="font-bold text-foreground mb-0.5 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getContributionColor(day.contributionLevel) }} />
                              {day.contributionCount} {day.contributionCount === 1 ? 'contribution' : 'contributions'}
                            </div>
                            <div className="text-foreground/50 font-mono text-[10px] pl-4">
                              on {formattedDate}
                            </div>
                            {/* Pointer arrow with glass effect */}
                            <div className="absolute top-[calc(100%-1px)] left-1/2 -translate-x-1/2 w-3 h-3 bg-inherit border-b border-r border-primary/20 rotate-45" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Color Logic for Contributions (GitHub Classic Green Theme)
 */
const getContributionColor = (level) => {
  switch (level) {
    case 'FIRST_QUARTILE': return '#0e4429';
    case 'SECOND_QUARTILE': return '#006d32';
    case 'THIRD_QUARTILE': return '#26a641';
    case 'FOURTH_QUARTILE': return '#39d353';
    case 'NONE':
    default:
      return 'var(--surface)'; // Maps to #161b22 in dark mode via CSS variables
  }
};
