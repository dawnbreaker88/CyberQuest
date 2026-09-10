import React, { useRef, useEffect } from 'react';
import { initSectionReveal } from '../../animations/landingAnimations';
import { Shield, Key, QrCode, AlertTriangle, UserCheck, Compass, ArrowRight } from 'lucide-react';

export default function QuestCategories() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const listRef = useRef(null);

  const quests = [
    {
      num: '01',
      title: 'PHISHING',
      tagline: 'Spot the trap.',
      color: '#39C6E8',
      icon: Shield,
      desc: 'Learn to identify deceptive sender domains, forged security alerts, and credential harvesting forms.',
    },
    {
      num: '02',
      title: 'PASSWORDS',
      tagline: 'Build something attackers cannot easily crack.',
      color: '#73D6B1',
      icon: Key,
      desc: 'Understand entropy, credential reuse patterns, and why passphrases outperform short complex passwords.',
    },
    {
      num: '03',
      title: 'QR SAFETY',
      tagline: 'Know where that innocent-looking code leads.',
      color: '#FFB84D',
      icon: QrCode,
      desc: 'Deconstruct quishing attacks, physical sticker overlays on payment kiosks, and disguised redirect URLs.',
    },
    {
      num: '04',
      title: 'SCAMS',
      tagline: 'Recognize manipulation before urgency takes over.',
      color: '#FF7468',
      icon: AlertTriangle,
      desc: 'Navigate package delivery smishing, urgent wire requests, and prize notification bots.',
    },
    {
      num: '05',
      title: 'SOCIAL ENGINEERING',
      tagline: 'Sometimes the attack is a person.',
      color: '#9D91E8',
      icon: UserCheck,
      desc: 'Spot authority impersonation, voice clone pretexting, and psychological pressure levers.',
    },
  ];

  useEffect(() => {
    const tween1 = initSectionReveal(headerRef.current, { y: 25, duration: 0.8 });
    const tween2 = initSectionReveal(listRef.current, { y: 20, duration: 0.8 });

    return () => {
      if (tween1) tween1.kill();
      if (tween2) tween2.kill();
    };
  }, []);

  return (
    <section
      id="threats"
      ref={sectionRef}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#080B12] border-t border-[#1C2433] font-mono"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 bg-[#FFB84D]/10 text-[#FFB84D] px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
            <Compass className="w-3 h-3" />
            QUEST DESTINATIONS // THREAT TRACKS
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#F4F6F8] uppercase leading-tight">
            FIVE THREATS. ONE SHARPER YOU.
          </h2>

          <p className="text-xs sm:text-sm text-[#AAB3C0] max-w-lg font-normal leading-relaxed">
            Five core challenge tracks designed to train your reflex for spotting deceptive digital signals.
          </p>
        </div>

        {/* Quest Destinations List */}
        <div ref={listRef} className="space-y-3 text-left">
          {quests.map((quest) => {
            const Icon = quest.icon;
            return (
              <div
                key={quest.num}
                className="cq-card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:scale-[1.01] cursor-pointer group"
                style={{ borderLeft: `3px solid ${quest.color}` }}
              >
                {/* Left Title & Number */}
                <div className="flex items-start sm:items-center gap-3.5">
                  <div 
                    className="flex h-9 w-9 items-center justify-center rounded-xl border text-xs font-bold shrink-0"
                    style={{ 
                      color: quest.color, 
                      borderColor: `${quest.color}40`,
                      backgroundColor: `${quest.color}15`
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#6F7B8A]">
                        TRACK {quest.num}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#F4F6F8] group-hover:text-[#39C6E8] transition-colors uppercase">
                        {quest.title}
                      </h3>
                    </div>

                    <p className="text-xs font-semibold" style={{ color: quest.color }}>
                      {quest.tagline}
                    </p>
                    <p className="text-[11px] text-[#AAB3C0] max-w-md font-normal leading-snug">
                      {quest.desc}
                    </p>
                  </div>
                </div>

                {/* Right Arrow */}
                <div className="flex items-center gap-1 text-xs font-bold self-end sm:self-center shrink-0" style={{ color: quest.color }}>
                  <span>ENTER TRACK</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
