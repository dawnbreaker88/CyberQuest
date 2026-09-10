import React, { useRef, useEffect } from 'react';
import { Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import { initSectionReveal } from '../../animations/landingAnimations';

export default function FinalCTA({ onStartQuest }) {
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
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#0D1119] border-t border-[#1F2937] text-center relative overflow-hidden bg-cq-grid font-sans"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#39C6E8]/5 rounded-full blur-3xl pointer-events-none" />

      <div
        ref={contentRef}
        className="max-w-3xl mx-auto flex flex-col items-center space-y-6 relative z-10"
      >
        {/* Brand System Tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#273347] bg-[#131925] px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-[#39C6E8] uppercase shadow-sm">
          <Shield className="w-3.5 h-3.5 text-[#39C6E8]" />
          <span>CYBERQUEST // START CHALLENGE</span>
        </div>

        {/* Large Heading */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F4F6F8] leading-[1.05] uppercase">
            READY TO BE <br />
            <span className="text-[#39C6E8]">HARDER TO FOOL?</span>
          </h2>
        </div>

        {/* Supporting Copy */}
        <p className="text-sm sm:text-base text-[#AAB3C0] max-w-lg mx-auto font-normal leading-relaxed">
          Put your digital instincts to the test. Experience real scenarios, level up your Security IQ, and master modern cyber defenses.
        </p>

        {/* Key Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#6F7B8A]">
          <span className="flex items-center gap-1.5 text-[#73D6B1]">
            <CheckCircle2 className="w-3.5 h-3.5" /> No credit card required
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-[#FFB84D]">
            <CheckCircle2 className="w-3.5 h-3.5" /> 5 Threat Categories
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-[#39C6E8]">
            <CheckCircle2 className="w-3.5 h-3.5" /> Instant Assessment
          </span>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            onClick={onStartQuest}
            className="btn-cq-primary inline-flex items-center gap-3 px-8 py-4 text-sm font-mono font-bold tracking-wider uppercase shadow-xl shadow-cyan-500/10 cursor-pointer"
          >
            <span>ENTER CYBERQUEST</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
