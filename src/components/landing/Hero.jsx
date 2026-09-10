import React, { useRef, useEffect } from 'react';
import { initHeroEntrance } from '../../animations/landingAnimations';
import { ArrowRight, ChevronRight, Shield, Zap, Sparkles } from 'lucide-react';

export default function Hero({ onStartQuest, onSeeHowItWorks }) {
  const heroRef = useRef(null);
  const tagRef = useRef(null);
  const headlineRef = useRef(null);
  const copyRef = useRef(null);
  const mascotRef = useRef(null);
  const ctasRef = useRef(null);

  useEffect(() => {
    const tl = initHeroEntrance({
      tag: tagRef.current,
      headlineLines: [headlineRef.current],
      supportingCopy: copyRef.current,
      ctas: ctasRef.current,
      gameFragments: [mascotRef.current],
    });

    return () => {
      if (tl) tl.kill();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 overflow-hidden bg-[#080B12] bg-cq-grid font-sans"
    >
      {/* Background Ambience Gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#39C6E8]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center space-y-6">
        
        {/* Brand System Tag */}
        <div
          ref={tagRef}
          className="inline-flex items-center gap-2 rounded-full border border-[#273347] bg-[#131925] px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-[#39C6E8] uppercase shadow-sm"
        >
          <Shield className="w-3.5 h-3.5 text-[#39C6E8]" />
          <span>CYBERQUEST // GAMIFIED CYBERSECURITY</span>
        </div>

        {/* Headline */}
        <div ref={headlineRef} className="space-y-1">
          <span className="block text-2xl sm:text-3xl font-mono font-bold text-[#AAB3C0] tracking-wider uppercase">
            THINK. CLICK. SURVIVE.
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#F4F6F8] leading-[1.0] uppercase">
            BE HARDER <span className="text-[#39C6E8]">TO FOOL.</span>
          </h1>
        </div>

        {/* Punchy Supporting Copy */}
        <p
          ref={copyRef}
          className="text-sm sm:text-base text-[#AAB3C0] max-w-lg mx-auto font-normal leading-relaxed"
        >
          Master cybersecurity through interactive threat simulations. Test your instincts against realistic scams, spoofed portals, and social traps.
        </p>

        {/* Clean Mascot Portrait Showcase (No overlays/badges on top) */}
        <div ref={mascotRef} className="pt-2 flex flex-col items-center">
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-[#273347] bg-[#131925] shadow-2xl shadow-black/80">
            <img 
              src="/mascot.jpg" 
              alt="CyberQuest Mascot" 
              className="w-full h-full object-cover object-top"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-[#6F7B8A] mt-3">
            <span className="text-[#39C6E8] font-bold">CYBER OPERATIVE</span>
            <span>•</span>
            <span className="text-[#F4F6F8]">FIELD READY</span>
            <span>•</span>
            <span className="text-[#73D6B1]">5 THREAT TRACKS</span>
          </div>
        </div>

        {/* Actions */}
        <div
          ref={ctasRef}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
        >
          <button
            onClick={onStartQuest}
            className="btn-cq-primary cursor-pointer text-xs font-bold font-mono tracking-wider uppercase px-6 py-3.5 flex items-center gap-2"
          >
            <span>START YOUR QUEST</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onSeeHowItWorks}
            className="btn-cq-secondary cursor-pointer text-xs font-mono text-[#AAB3C0] hover:text-[#F4F6F8] px-5 py-3.5 flex items-center gap-1.5"
          >
            <span>EXPLORE SIMULATIONS</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-gradient-to-r from-transparent via-[#273347] to-transparent" />
    </section>
  );
}
