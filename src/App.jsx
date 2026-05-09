import MainLayout from './layouts/MainLayout';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import TerminalSection from './sections/Terminal';
import Marquee from './components/Marquee';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import GithubDashboard from './sections/GithubDashboard';
import Experience from './sections/Experience';
import Achievements from './sections/Achievements';
import Certifications from './sections/Certifications';
import Blog from './sections/Blog';
import Contact from './sections/Contact';
import Footer from './components/Footer';

// Import central data
import { marqueePhrases } from './data/portfolioData';

/**
 * Main Application Component
 * --------------------------
 * Orchestrates the overall layout and sections of the portfolio.
 */
export default function App() {
  return (
    <MainLayout>
      <Navbar />
      <Hero />
      {/* First Marquee */}
      <Marquee items={marqueePhrases} direction="left" />
      <TerminalSection />
      <About />
      <Skills />
      {/* Second Marquee with different static text (can also be moved to data if needed) */}
      <Marquee items={['Building Scalable Apps', 'Frontend Engineering', 'Backend Architecture']} direction="right" speed={50} />
      <Projects />
      <GithubDashboard />
      <Experience />
      <Achievements />
      <Certifications />
      <Blog />
      <Contact />
      <Footer />
    </MainLayout>
  );
}
