import React, { useRef, useEffect } from 'react';
import { initSectionReveal } from '../../animations/landingAnimations';

export default function IntroSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const tween1 = initSectionReveal(headlineRef.current, { y: 35, duration: 0.9 });
    const tween2 = initSectionReveal(bodyRef.current, { y: 20, duration: 0.8 });

    return () => {
      if (tween1) tween1.kill();
      if (tween2) tween2.kill();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 sm:py-48 px-4 sm:px-6 lg:px-8 bg-[#0B0C0E] border-t border-[#24272C]/40 relative"
    >
      <div className="max-w-4xl mx-auto text-left space-y-12">
        
        {/* Section Label */}
        <div className="text-[10px] font-mono tracking-widest text-[#696D74] uppercase">
          [ 01 // INTRODUCTION ]
        </div>

        {/* Large Typographic Statement */}
        <div ref={headlineRef}>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F1EF] leading-[1.12]">
            Cybersecurity <br />
            <span className="text-[#969AA1]">shouldn't feel</span> <br />
            like studying.
          </h2>
        </div>

        {/* Smaller Explanation */}
        <div ref={bodyRef} className="pt-4 border-t border-[#24272C]/50 max-w-xl">
          <p className="text-base sm:text-lg text-[#969AA1] leading-relaxed font-normal">
            CyberQuest turns everyday digital safety into something you can actually practice.
          </p>
        </div>

      </div>
    </section>
  );
}
