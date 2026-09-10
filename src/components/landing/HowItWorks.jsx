import React, { useRef, useEffect } from 'react';
import { initSectionReveal, initHowItWorksLoop } from '../../animations/landingAnimations';
import { Eye, HelpCircle, CheckSquare, Sparkles, Trophy, Play } from 'lucide-react';

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const loopContainerRef = useRef(null);
  const lineRef = useRef(null);
  const stagesRef = useRef([]);

  const stages = [
    { num: '01', title: 'SPOT', color: '#39C6E8', icon: Eye, desc: 'Encounter incoming lures, fake domains, or urgent requests.' },
    { num: '02', title: 'THINK', color: '#73D6B1', icon: HelpCircle, desc: 'Examine header typos, entropy, and psychological panic triggers.' },
    { num: '03', title: 'DECIDE', color: '#FFB84D', icon: CheckSquare, desc: 'Inspect, verify, report, or quarantine the payload.' },
    { num: '04', title: 'LEARN', color: '#FF7468', icon: Sparkles, desc: 'Immediate breakdown on why the vector was deceptive.' },
    { num: '05', title: 'LEVEL UP', color: '#9D91E8', icon: Trophy, desc: 'Earn XP, collect medals, and sharpen your instinct score.' },
  ];

  useEffect(() => {
    const tweenHeader = initSectionReveal(headerRef.current, { y: 25, duration: 0.8 });
    const tlLoop = initHowItWorksLoop(
      loopContainerRef.current,
      lineRef.current,
      stagesRef.current
    );

    return () => {
      if (tweenHeader) tweenHeader.kill();
      if (tlLoop) tlLoop.kill();
    };
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#080B12] border-t border-[#1C2433] font-mono"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 bg-[#73D6B1]/10 text-[#73D6B1] px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
            <Play className="w-3 h-3" />
            GAMEPLAY LOOP // DECISION CYCLE
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#F4F6F8] uppercase leading-tight">
            SPOT. THINK. DECIDE. LEARN.
          </h2>

          <p className="text-xs sm:text-sm text-[#AAB3C0] max-w-lg font-normal leading-relaxed">
            You don't just read about cybersecurity. You practice making decisions in live simulations.
          </p>
        </div>

        {/* 5-Stage Progression Loop */}
        <div ref={loopContainerRef} className="relative pt-2 pb-2">
          
          {/* Connecting Line on Desktop */}
          <div
            ref={lineRef}
            aria-hidden="true"
            className="hidden lg:block absolute top-[28px] left-0 right-0 h-[1px] bg-[#273347]"
          />

          {/* Stages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 relative z-10 text-left">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.num}
                  ref={(el) => (stagesRef.current[idx] = el)}
                  className="cq-card rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-md"
                  style={{ borderTop: `2px solid ${stage.color}` }}
                >
                  <div className="space-y-2">
                    {/* Node Pill */}
                    <div className="flex items-center justify-between">
                      <span 
                        className="flex h-7 w-7 items-center justify-center rounded-lg border text-xs font-bold"
                        style={{ 
                          color: stage.color, 
                          borderColor: `${stage.color}40`,
                          backgroundColor: `${stage.color}15` 
                        }}
                      >
                        {stage.num}
                      </span>
                      <Icon className="w-4 h-4" style={{ color: stage.color }} />
                    </div>

                    {/* Stage Title */}
                    <span className="text-xs font-bold tracking-wider text-[#F4F6F8] uppercase block">
                      {stage.title}
                    </span>

                    {/* Stage Description */}
                    <p className="text-[11px] text-[#AAB3C0] leading-relaxed font-normal">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

