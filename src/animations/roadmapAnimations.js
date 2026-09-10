import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () => {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * App Navbar Smart Hide on Scroll Down / Reveal on Scroll Up
 */
export const initAppNavbarScroll = (navElement) => {
  if (!navElement || prefersReducedMotion()) return null;

  let lastScrollY = window.scrollY;
  let isHidden = false;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    // If scrolled past threshold
    if (currentScrollY > 60) {
      if (currentScrollY > lastScrollY && !isHidden) {
        // Scrolling DOWN -> Hide navbar smoothly
        isHidden = true;
        gsap.to(navElement, {
          y: -80,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.out',
          pointerEvents: 'none',
        });
      } else if (currentScrollY < lastScrollY && isHidden) {
        // Scrolling UP -> Reveal navbar smoothly
        isHidden = false;
        gsap.to(navElement, {
          y: 0,
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out',
          pointerEvents: 'auto',
        });
      }
    } else if (currentScrollY <= 60 && isHidden) {
      // Top of page
      isHidden = false;
      gsap.to(navElement, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        pointerEvents: 'auto',
      });
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

/**
 * Initial Roadmap Page Entrance Timeline
 */
export const initRoadmapEntrance = ({
  greeting,
  stats,
  currentQuestPanel,
  mapHeading,
  questNodes,
}) => {
  if (prefersReducedMotion()) {
    gsap.set([greeting, stats, currentQuestPanel, mapHeading, questNodes], {
      opacity: 1,
      y: 0,
    });
    return null;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. Personalized Greeting
  if (greeting) {
    tl.fromTo(
      greeting,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    );
  }

  // 2. Level and XP stats
  if (stats) {
    tl.fromTo(
      stats,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.4'
    );
  }

  // 3. Current Quest Highlight Panel
  if (currentQuestPanel) {
    tl.fromTo(
      currentQuestPanel,
      { y: 30, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7 },
      '-=0.3'
    );
  }

  // 4. Map Header
  if (mapHeading) {
    tl.fromTo(
      mapHeading,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      '-=0.3'
    );
  }

  // 5. Staggered Quest Nodes
  if (questNodes && questNodes.length > 0) {
    tl.fromTo(
      questNodes,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 0.6 },
      '-=0.3'
    );
  }

  return tl;
};

/**
 * Animate SVG Path Drawing on Scroll
 */
export const initPathScrollAnimation = (pathElement, containerElement) => {
  if (!pathElement || !containerElement || prefersReducedMotion()) return null;

  try {
    const pathLength = pathElement.getTotalLength();
    
    // Set initial dasharray & dashoffset to full length
    gsap.set(pathElement, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const tween = gsap.to(pathElement, {
      scrollTrigger: {
        trigger: containerElement,
        start: 'top 70%',
        end: 'bottom 85%',
        scrub: 0.8,
      },
      strokeDashoffset: 0,
      ease: 'none',
    });

    return tween;
  } catch (e) {
    console.error('Error calculating path length:', e);
    return null;
  }
};
