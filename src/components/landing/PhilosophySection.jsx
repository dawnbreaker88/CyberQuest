import React, { useRef, useEffect } from 'react';
import { initSectionReveal } from '../../animations/landingAnimations';

export default function PhilosophySection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tween = initSectionReveal(contentRef.current, { y: 25, duration: 0.8 });
    return () => {
      if (tween) tween.kill();
    };
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0D1119] border-t border-[#1F2937] relative"
    >
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto text-left space-y-8"
      >
        {/* Section Label */}
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#131925] border border-[#273347] text-[10px] font-mono tracking-widest text-[#73D6B1] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#73D6B1]" />
          <span>[ 06 // CORE PHILOSOPHY ]</span>
        </div>

        {/* Large Statement */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#F4F6F8] leading-[1.1] uppercase">
            KNOWLEDGE HELPS. <br />
            <span className="text-[#39C6E8]">INSTINCT PROTECTS.</span>
          </h2>
        </div>

        {/* Explanation */}
        <div className="pt-6 border-t border-[#1F2937] max-w-xl space-y-2.5">
          <p className="text-base sm:text-lg text-[#F4F6F8] font-semibold leading-relaxed">
            The goal isn't to memorize every possible scam on the internet.
          </p>
          <p className="text-sm text-[#AAB3C0] font-normal leading-relaxed">
            It's to recognize the psychological patterns, urgent pressures, and hidden traps behind them through experiential trial and survival.
          </p>
        </div>

      </div>
    </section>
  );
}

