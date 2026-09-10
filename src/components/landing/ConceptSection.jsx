import React, { useRef, useEffect } from 'react';
import { initSectionReveal } from '../../animations/landingAnimations';

export default function ConceptSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const listRef = useRef(null);

  const disciplines = [
    { num: '01', title: 'PHISHING', desc: 'Deceptive links, spoofed senders, and fake domains.' },
    { num: '02', title: 'PASSWORDS', desc: 'Credential hygiene, entropy, and authentication traps.' },
    { num: '03', title: 'QR SAFETY', desc: 'Malicious redirects and physical terminal tampering.' },
    { num: '04', title: 'SCAMS', desc: 'High-pressure SMS, urgent notifications, and prize lures.' },
    { num: '05', title: 'SOCIAL ENGINEERING', desc: 'Authority impersonation and psychological manipulation.' },
  ];

  useEffect(() => {
    const tween1 = initSectionReveal(headerRef.current, { y: 30, duration: 0.8 });
    const tween2 = initSectionReveal(listRef.current, { y: 25, duration: 0.8 });

    return () => {
      if (tween1) tween1.kill();
      if (tween2) tween2.kill();
    };
  }, []);

  return (
    <section
      id="concept"
      ref={sectionRef}
      className="py-32 sm:py-44 px-4 sm:px-6 lg:px-8 bg-[#0B0C0E] border-t border-[#24272C]/40"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div ref={headerRef} className="space-y-4">
          <div className="text-[10px] font-mono tracking-widest text-[#696D74] uppercase">
            [ 02 // DISCIPLINES ]
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F1F1EF]">
            Learn by doing.
          </h2>

          <p className="text-sm sm:text-base text-[#969AA1] max-w-xl font-normal leading-relaxed">
            CyberQuest helps you build the instincts you need to navigate the digital world with confidence.
          </p>
        </div>

        {/* Minimal Typographic List */}
        <div ref={listRef} className="divide-y divide-[#24272C]/50 border-y border-[#24272C]/50">
          {disciplines.map((item) => (
            <div
              key={item.num}
              className="group py-6 sm:py-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-8 transition-colors hover:bg-[#111316]/50 px-2 sm:px-4 rounded-lg -mx-2 sm:-mx-4"
            >
              <div className="flex items-baseline gap-4 sm:gap-6">
                <span className="text-xs font-mono text-[#696D74] group-hover:text-[#969AA1] transition-colors">
                  {item.num}
                </span>
                <span className="text-lg sm:text-2xl font-bold tracking-tight text-[#F1F1EF] group-hover:text-[#C7CDD4] transition-colors">
                  {item.title}
                </span>
              </div>

              <span className="text-xs text-[#969AA1] sm:text-right max-w-xs font-normal">
                {item.desc}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
