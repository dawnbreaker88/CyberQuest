import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Zap, ShieldCheck, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TrustStatement() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const metricsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 35,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from(metricsRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-16 sm:py-24 border-y border-white/5 bg-[#0A0F1D]/80 backdrop-blur-md overflow-hidden"
    >
      {/* Subtle light accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Core Philosophy Tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-950/30 px-3.5 py-1 text-xs mb-6 font-mono text-cyan-300">
          <Target className="h-3.5 w-3.5 text-cyan-400" />
          <span>CYBER DEFENSE REIMAGINED</span>
        </div>

        {/* High-Impact Statement */}
        <div ref={textRef} className="space-y-3 mb-12">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-slate-400 leading-tight">
            Cybersecurity shouldn't feel like <span className="text-slate-300 line-through decoration-rose-500/70">studying</span>.
          </h2>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white leading-tight">
            It should feel like <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 underline decoration-cyan-400/40 underline-offset-8">surviving</span>.
          </h2>
        </div>

        {/* Supporting Metric Badges */}
        <div ref={metricsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4">
          <div className="rounded-xl border border-white/5 bg-slate-900/50 p-4 text-center hover:border-cyan-500/30 transition-all">
            <span className="font-mono text-2xl sm:text-3xl font-black text-rose-400">0%</span>
            <p className="text-xs font-semibold text-slate-200 mt-1">Boring PPT Slides</p>
            <p className="text-[11px] text-slate-500 mt-0.5">No theoretical snoozefests</p>
          </div>

          <div className="rounded-xl border border-white/5 bg-slate-900/50 p-4 text-center hover:border-cyan-500/30 transition-all">
            <span className="font-mono text-2xl sm:text-3xl font-black text-cyan-400">100%</span>
            <p className="text-xs font-semibold text-slate-200 mt-1">Real Threat Scenarios</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Actual attacks you face daily</p>
          </div>

          <div className="rounded-xl border border-white/5 bg-slate-900/50 p-4 text-center hover:border-cyan-500/30 transition-all">
            <span className="font-mono text-2xl sm:text-3xl font-black text-emerald-400">5+</span>
            <p className="text-xs font-semibold text-slate-200 mt-1">Interactive Game Worlds</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Leading to the Escape Room</p>
          </div>
        </div>

      </div>
    </section>
  );
}
