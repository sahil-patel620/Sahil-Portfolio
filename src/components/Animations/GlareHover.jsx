import { useRef } from 'react';

/**
 * GlareHover Component
 * -------------------
 * Adds a premium glass-glare reflection effect to its children on hover.
 * Adapted from React Bits for cinematic portfolio aesthetics.
 */
const GlareHover = ({
  children,
  glareColor = '#ffffff',
  glareOpacity = 0.4,
  glareAngle = -35,
  glareSize = 150,
  transitionDuration = 800,
  playOnce = false,
  className = '',
  style = {}
}) => {
  const overlayRef = useRef(null);

  // Parse hex to RGBA for smooth transparency control
  const hex = glareColor.replace('#', '');
  let rgba = glareColor;
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  const animateIn = () => {
    const el = overlayRef.current;
    if (!el) return;

    el.style.transition = 'none';
    el.style.backgroundPosition = '-100% -100%, 0 0';
    
    // Trigger reflow
    void el.offsetWidth;

    el.style.transition = `${transitionDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    el.style.backgroundPosition = '100% 100%, 0 0';
    
    // Soft glow enhancement that fades out
    el.parentElement.style.transition = `box-shadow ${transitionDuration}ms ease`;
    el.parentElement.style.boxShadow = `0 0 20px ${rgba.replace(/[\d.]+\)$/, '0.15)')}`;
    
    // Return to normal state after animation finishes
    setTimeout(() => {
      if (el.parentElement) {
        el.parentElement.style.boxShadow = 'none';
      }
    }, transitionDuration);
  };

  const animateOut = () => {
    const el = overlayRef.current;
    if (!el) return;

    // Reset position silently for next hover
    el.style.transition = 'none';
    el.style.backgroundPosition = '-100% -100%, 0 0';
    
    if (el.parentElement) {
      el.parentElement.style.boxShadow = 'none';
    }
  };

  const overlayStyle = {
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(${glareAngle}deg, hsla(0,0%,100%,0) 45%, ${rgba} 50%, hsla(0,0%,100%,0) 55%)`,
    backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '-100% -100%, 0 0',
    pointerEvents: 'none',
    zIndex: 20,
    mixBlendMode: 'plus-lighter', // Enhances the glare on dark backgrounds
  };

  return (
    <div
      className={`relative overflow-hidden w-full h-full ${className}`}
      style={{ ...style }}
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
    >
      <div ref={overlayRef} style={overlayStyle} />
      {children}
    </div>
  );
};

export default GlareHover;
