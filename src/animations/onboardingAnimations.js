import gsap from 'gsap';

export const prefersReducedMotion = () => {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Animate the scenario card transition (slide out previous, slide in next)
 */
export const animateScenarioTransition = (container, direction = 'next', onMidpoint) => {
  if (!container || prefersReducedMotion()) {
    if (onMidpoint) onMidpoint();
    return null;
  }

  const tl = gsap.timeline();
  const xOffset = direction === 'next' ? -25 : 25;
  const inOffset = direction === 'next' ? 25 : -25;

  tl.to(container, {
    opacity: 0,
    x: xOffset,
    duration: 0.22,
    ease: 'power2.in',
    onComplete: onMidpoint,
  }).fromTo(
    container,
    { opacity: 0, x: inOffset },
    { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
  );

  return tl;
};

/**
 * Animate Security IQ Counter (0 -> target score)
 */
export const animateSecurityIQCount = (element, targetScore, onComplete) => {
  if (!element) return null;

  if (prefersReducedMotion()) {
    element.textContent = targetScore;
    if (onComplete) onComplete();
    return null;
  }

  const obj = { val: 0 };
  return gsap.to(obj, {
    val: targetScore,
    duration: 1.8,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.floor(obj.val);
    },
    onComplete: onComplete,
  });
};

/**
 * Animate Category Mastery Bars in Result Screen
 */
export const animateCategoryBars = (barElements, scores) => {
  if (!barElements || barElements.length === 0) return null;

  if (prefersReducedMotion()) {
    barElements.forEach((bar, idx) => {
      if (bar) bar.style.width = `${scores[idx] || 50}%`;
    });
    return null;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  barElements.forEach((bar, idx) => {
    if (bar) {
      const targetWidth = `${scores[idx] || 50}%`;
      tl.fromTo(
        bar,
        { width: '0%' },
        { width: targetWidth, duration: 0.9 },
        idx === 0 ? 0 : '-=0.6'
      );
    }
  });

  return tl;
};

/**
 * Animate Assessment Result Screen Entrance
 */
export const animateResultEntrance = ({
  header,
  iqBlock,
  categoryBlock,
  insightsBlock,
  ctaBlock,
}) => {
  if (prefersReducedMotion()) {
    gsap.set([header, iqBlock, categoryBlock, insightsBlock, ctaBlock], {
      opacity: 1,
      y: 0,
    });
    return null;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (header) {
    tl.fromTo(header, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
  }

  if (iqBlock) {
    tl.fromTo(iqBlock, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.7 }, '-=0.3');
  }

  if (categoryBlock) {
    tl.fromTo(categoryBlock, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
  }

  if (insightsBlock) {
    tl.fromTo(insightsBlock, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
  }

  if (ctaBlock) {
    tl.fromTo(ctaBlock, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2');
  }

  return tl;
};
