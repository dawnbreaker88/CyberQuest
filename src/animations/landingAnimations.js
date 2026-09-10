import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () => {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Animate the floating pill navbar on scroll
 */
export const initNavbarAnimation = (navElement) => {
  if (!navElement || prefersReducedMotion()) return null;

  return gsap.to(navElement, {
    scrollTrigger: {
      trigger: document.body,
      start: 'top -20',
      end: 'top -80',
      scrub: 0.5,
    },
    scale: 0.97,
    backgroundColor: 'rgba(17, 19, 22, 0.94)',
    borderColor: 'rgba(36, 39, 44, 0.9)',
    boxShadow: '0 12px 32px -8px rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(16px)',
    paddingTop: '8px',
    paddingBottom: '8px',
    ease: 'power2.out',
  });
};

/**
 * Hero entrance timeline sequence with floating game HUD fragments
 */
export const initHeroEntrance = ({
  navbar,
  tag,
  headlineLines,
  supportingCopy,
  ctas,
  gameFragments,
}) => {
  if (prefersReducedMotion()) {
    gsap.set([navbar, tag, headlineLines, supportingCopy, ctas, gameFragments], {
      opacity: 1,
      y: 0,
    });
    return null;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. Navbar
  if (navbar) {
    tl.fromTo(
      navbar,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    );
  }

  // 2. Tag Label
  if (tag) {
    tl.fromTo(
      tag,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    );
  }

  // 3. Headline line by line
  if (headlineLines && headlineLines.length > 0) {
    tl.fromTo(
      headlineLines,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8 },
      '-=0.3'
    );
  }

  // 4. Supporting copy
  if (supportingCopy) {
    tl.fromTo(
      supportingCopy,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    );
  }

  // 5. CTAs
  if (ctas) {
    tl.fromTo(
      ctas,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    );
  }

  // 6. Game HUD fragments (staggered subtle entrance)
  if (gameFragments && gameFragments.length > 0) {
    tl.fromTo(
      gameFragments,
      { opacity: 0, scale: 0.9, y: 10 },
      { opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'back.out(1.4)' },
      '-=0.4'
    );
  }

  return tl;
};

/**
 * Generic section reveal on scroll
 */
export const initSectionReveal = (element, options = {}) => {
  if (!element || prefersReducedMotion()) return null;

  return gsap.fromTo(
    element,
    { opacity: 0, y: options.y || 30 },
    {
      scrollTrigger: {
        trigger: element,
        start: options.start || 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: options.duration || 0.8,
      ease: 'power3.out',
    }
  );
};

/**
 * How It Works 5-stage loop sequential reveal
 */
export const initHowItWorksLoop = (container, line, stages) => {
  if (!container || prefersReducedMotion()) return null;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
  });

  if (line) {
    tl.fromTo(
      line,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }
    );
  }

  if (stages && stages.length > 0) {
    tl.fromTo(
      stages,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out' },
      '-=0.5'
    );
  }

  return tl;
};

/**
 * Progression XP & Profile preview animation
 */
export const initProgressionPreview = (container, progressBar, levelRef, badges) => {
  if (!container || prefersReducedMotion()) return null;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
  });

  if (levelRef) {
    tl.fromTo(
      levelRef,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );
  }

  if (progressBar) {
    tl.fromTo(
      progressBar,
      { width: '0%' },
      { width: '78%', duration: 1.2, ease: 'power2.out' },
      '-=0.3'
    );
  }

  if (badges && badges.length > 0) {
    tl.fromTo(
      badges,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' },
      '-=0.6'
    );
  }

  return tl;
};
