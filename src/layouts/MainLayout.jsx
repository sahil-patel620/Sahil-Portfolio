import { useEffect, useRef } from 'react';
import SplashCursor from '../components/SplashCursor';

/**
 * Main Layout Component
 * ---------------------
 * Wraps the entire application. It sets up the noise texture background,
 * splash fluid effect, and the underlying theme layout structure.
 * The layout renders immediately so the Hero section is visible on page load.
 */
export default function MainLayout({ children }) {
  const didScrollReset = useRef(false);

  // Scroll to top on every fresh page load so Hero is always the first thing visible
  useEffect(() => {
    if (!didScrollReset.current) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      didScrollReset.current = true;
    }
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-300 relative selection:bg-primary/30">
      <SplashCursor />
      <div className="noise-bg" />
      <main className="relative z-10">{children}</main>
    </div>
  );
}
