import React, { useRef, useEffect } from 'react';
import { initSectionReveal, initProgressionAnimation } from '../../animations/landingAnimations';

export default function ProgressionSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const trackRef = useRef(null);
  const lineRef = useRef(null);
  const stepsRef = useRef([]);

  const stages = [
    { num: '01', label: 'NOTICE', desc: 'Sense anomalies in routine requests.' },
    { num: '02', label: 'QUESTION', desc: 'Pause before complying with urgency.' },
    { num: '03', label: 'VERIFY', desc: 'Inspect channels and authentic sources.' },
    { num: '04', label: 'DECIDE', desc: 'Take calculated, confident action.' },
    { num: '05', label: 'MASTER', desc: 'Intuitive defense in complex environments.' },
  ];

  useEffect(() => {
    const tweenHeader = initSectionReveal(headerRef.current, { y: 30, duration: 0.8 });
    const tlProgression = initProgressionAnimation(
      trackRef.current,
      lineRef.current,
      stepsRef.current
    );

    return () => {
      if (tweenHeader) tweenHeader.kill();
      if (tlProgression) tlProgression.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 sm:py-48 px-4 sm:px-6 lg:px-8 bg-[#0B0C0E] border-t border-[#24272C]/40"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div ref={headerRef} className="space-y-4">
          <div className="text-[10px] font-mono tracking-widest text-[#696D74] uppercase">
            [ 04 // PROGRESSION ]
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F1F1EF] leading-[1.15]">
            Start somewhere. <br />
            <span className="text-[#969AA1]">Go further.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#969AA1] max-w-md font-normal leading-relaxed">
            Instinct develops incrementally through repeated exposure to subtle cues.
          </p>
        </div>

        {/* Minimal Abstract Progression Track */}
        <div ref={trackRef} className="relative pt-6 pb-2">
          
          {/* Subtle Horizontal Connecting Line */}
          <div
            ref={lineRef}
            aria-hidden="true"
            className="hidden lg:block absolute top-[42px] left-0 right-0 h-[1px] bg-[#24272C]"
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {stages.map((stage, idx) => (
              <div
                key={stage.num}
                ref={(el) => (stepsRef.current[idx] = el)}
                className="flex flex-col space-y-3"
              >
                {/* Node Pill */}
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#24272C] bg-[#111316] text-xs font-mono font-bold text-[#F1F1EF]">
                    {stage.num}
                  </span>
                  <div className="h-[1px] flex-1 bg-[#24272C] lg:hidden" />
                </div>

                {/* Stage Label */}
                <span className="text-xs font-bold tracking-wider text-[#F1F1EF] uppercase font-mono">
                  {stage.label}
                </span>

                {/* Stage Detail */}
                <p className="text-xs text-[#969AA1] leading-normal font-normal">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
