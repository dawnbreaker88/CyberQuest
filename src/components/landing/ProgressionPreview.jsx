import React, { useState, useRef, useEffect } from 'react';
import { initSectionReveal, initProgressionPreview } from '../../animations/landingAnimations';
import { Trophy, ShieldCheck, Target, QrCode, Lock, Compass } from 'lucide-react';

export default function ProgressionPreview() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const profileCardRef = useRef(null);
  const progressBarRef = useRef(null);
  const levelRef = useRef(null);
  const badgesRef = useRef([]);

  const [lockedHovered, setLockedHovered] = useState(false);

  const badges = [
    { id: 'first', title: 'FIRST CATCH', color: '#39C6E8', icon: ShieldCheck, desc: 'Identified your first spoofed domain.' },
    { id: 'phish', title: 'PHISH HUNTER', color: '#73D6B1', icon: Target, desc: 'Neutralized 10 phishing attempts.' },
    { id: 'qr', title: 'QR SKEPTIC', color: '#FFB84D', icon: QrCode, desc: 'Dissected 5 deceptive QR codes.' },
    { id: 'locked', title: 'SENTINEL', color: '#6F7B8A', icon: Lock, desc: 'Reach Level 05 to unlock Sentinel medal.' },
  ];

  useEffect(() => {
    const tweenHeader = initSectionReveal(headerRef.current, { y: 25, duration: 0.8 });
    const tlProgression = initProgressionPreview(
      profileCardRef.current,
      progressBarRef.current,
      levelRef.current,
      badgesRef.current
    );

    return () => {
      if (tweenHeader) tweenHeader.kill();
      if (tlProgression) tlProgression.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#080B12] border-t border-[#1C2433] font-sans"
    >
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 bg-[#73D6B1]/10 text-[#73D6B1] border border-[#73D6B1]/30 px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wider uppercase">
            <Trophy className="w-3.5 h-3.5 text-[#73D6B1]" />
            <span>PROGRESSION // RANK & REWARDS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#F4F6F8] uppercase leading-tight">
            YOUR DIGITAL INSTINCTS <span className="text-[#73D6B1]">LEVEL UP.</span>
          </h2>

          <p className="text-sm text-[#AAB3C0] max-w-lg font-normal leading-relaxed">
            Every scenario completed strengthens your Security IQ, unlocks authentic cryptographic medals, and advances your standing across the roadmap.
          </p>
        </div>

        {/* 2-Column Progression Grid: Path Artwork + Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Campaign Roadmap Visual Artwork (path.jpg) */}
          <div className="lg:col-span-5 cq-card rounded-2xl overflow-hidden border border-[#273347] bg-[#131925] shadow-2xl flex flex-col justify-between group">
            <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#080B12]">
              <img
                src="/path.jpg"
                alt="CyberQuest Progression Roadmap"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131925] via-transparent to-transparent" />
              <div className="absolute top-3 left-3 bg-[#080B12]/80 border border-[#273347] px-2.5 py-1 rounded font-mono text-[10px] font-bold text-[#73D6B1] flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-[#73D6B1]" />
                <span>CAMPAIGN TRACK</span>
              </div>
            </div>
            
            <div className="p-5 text-left space-y-2 border-t border-[#273347]/60">
              <span className="text-xs font-mono font-bold text-[#F4F6F8] uppercase block">
                5 SPECIALIZED THREAT DOMAINS
              </span>
              <p className="text-xs text-[#AAB3C0] leading-relaxed">
                From basic phishing detection to multi-stage social engineering and the final Escape Room.
              </p>
            </div>
          </div>

          {/* Right: Mock Profile & Medals Interface */}
          <div
            ref={profileCardRef}
            className="lg:col-span-7 cq-card rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5 text-left border border-[#273347] bg-[#131925]"
          >
            {/* Card Top Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#273347] pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#39C6E8] uppercase font-bold tracking-wider block mb-0.5">
                  ACTIVE OPERATIVE SHEET
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#F4F6F8] uppercase">
                  AGENT DEFENDER
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#0D1119] border border-[#273347] px-3 py-1.5 rounded-xl">
                  <span className="text-[9px] font-mono text-[#6F7B8A] uppercase font-bold block">
                    SECURITY IQ
                  </span>
                  <span className="text-base sm:text-lg font-black text-[#39C6E8] font-mono">
                    74 <span className="text-xs text-[#6F7B8A] font-normal">/ 100</span>
                  </span>
                </div>

                <div ref={levelRef} className="bg-[#0D1119] border border-[#273347] px-3 py-1.5 rounded-xl text-right">
                  <span className="text-[9px] font-mono text-[#6F7B8A] uppercase font-bold block">
                    TIER
                  </span>
                  <span className="text-base sm:text-lg font-black text-[#73D6B1] font-mono">
                    LEVEL 04
                  </span>
                </div>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#AAB3C0] text-[11px]">XP TO NEXT TIER</span>
                <span className="text-[#FFB84D] font-bold text-xs">780 / 1000 XP</span>
              </div>
              
              <div className="w-full h-2 rounded-full bg-[#0D1119] border border-[#273347] overflow-hidden p-0.5">
                <div
                  ref={progressBarRef}
                  className="h-full rounded-full bg-[#39C6E8] transition-all duration-500 shadow-sm shadow-[#39C6E8]/30"
                  style={{ width: '78%' }}
                />
              </div>
            </div>

            {/* Badges Collection */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-[#F4F6F8] uppercase tracking-wider">
                  COLLECTED MEDALS
                </span>
                <span className="text-[9px] font-mono text-[#6F7B8A] font-bold uppercase">
                  3 UNLOCKED • 1 LOCKED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {badges.map((badge, idx) => {
                  const isLocked = badge.id === 'locked';
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.id}
                      ref={(el) => (badgesRef.current[idx] = el)}
                      onMouseEnter={() => isLocked && setLockedHovered(true)}
                      onMouseLeave={() => isLocked && setLockedHovered(false)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isLocked
                          ? 'border-[#1C2433] bg-[#0D1119] text-[#6F7B8A]'
                          : 'border-[#273347] bg-[#192131] text-[#F4F6F8] hover:border-[#39C6E8]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5" style={{ color: badge.color }} />
                          <span className="text-xs font-mono font-bold uppercase">
                            {isLocked && lockedHovered ? 'LOCKED' : badge.title}
                          </span>
                        </div>
                        <span className={`h-1.5 w-1.5 rounded-full ${isLocked ? 'bg-[#273347]' : 'bg-[#39C6E8]'}`} />
                      </div>
                      <p className="text-[10px] text-[#AAB3C0] leading-snug">
                        {badge.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
