import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () => {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Animate Profile Page Entrance
 */
export const initProfileEntrance = ({
  header,
  xpBar,
  securityIQ,
  insights,
  categories,
  categoryBars,
  categoryScores,
  badges,
  stats,
}) => {
  if (prefersReducedMotion()) {
    gsap.set([header, securityIQ, insights, categories, badges, stats], {
      opacity: 1,
      y: 0,
    });
    if (xpBar) xpBar.style.width = '20%';
    if (categoryBars && categoryScores) {
      categoryBars.forEach((bar, idx) => {
        if (bar) bar.style.width = `${categoryScores[idx]}%`;
      });
    }
    return null;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. Profile Header
  if (header) {
    tl.fromTo(header, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7 });
  }

  // 2. XP Bar
  if (xpBar) {
    tl.fromTo(xpBar, { width: '0%' }, { width: '20%', duration: 1, ease: 'power2.out' }, '-=0.4');
  }

  // 3. Security IQ Card & Insights
  if (securityIQ) {
    tl.fromTo(securityIQ, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
  }

  if (insights) {
    tl.fromTo(insights, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
  }

  // 4. Category Mastery
  if (categories) {
    tl.fromTo(categories, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
  }

  // 5. Category Bars Fill
  if (categoryBars && categoryScores && categoryBars.length > 0) {
    categoryBars.forEach((bar, idx) => {
      if (bar) {
        tl.fromTo(
          bar,
          { width: '0%' },
          { width: `${categoryScores[idx]}%`, duration: 0.8, ease: 'power2.out' },
          idx === 0 ? '-=0.3' : '-=0.6'
        );
      }
    });
  }

  // 6. Badges Grid
  if (badges && badges.length > 0) {
    tl.fromTo(
      badges,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 },
      '-=0.4'
    );
  }

  // 7. Stats
  if (stats) {
    tl.fromTo(stats, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
  }

  return tl;
};
