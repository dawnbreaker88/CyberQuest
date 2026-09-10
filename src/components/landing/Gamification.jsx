import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Award, Sparkles, Shield, CheckCircle2, Lock, ArrowRight, Zap, Target, Star } from 'lucide-react';
import LottiePlaceholder from './LottiePlaceholder';

gsap.registerPlugin(ScrollTrigger);

export default function Gamification() {
  const sectionRef = useRef(null);
  const xpNumberRef = useRef(null);
  const progressBarRef = useRef(null);
  const [displayedXp, setDisplayedXp] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { xp: 0 };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(obj, {
            xp: 2840,
            duration: 2.2,
            ease: 'power2.out',
            onUpdate: () => {
              setDisplayedXp(Math.floor(obj.xp));
            }
          });

          gsap.to(progressBarRef.current, {
            width: '78%',
            duration: 2.2,
            ease: 'power2.out'
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const badges = [
    {
      id: 'phishing',
      icon: '🕵️',
      name: 'Phishing Hunter',
      tier: 'Gold Tier',
      desc: '15/15 Spoofed domains neutralized without clicking.'
    },
    {
      id: 'passwords',
      icon: '🔐',
      name: 'Password Architect',
      tier: 'Platinum Tier',
      desc: 'Created unbreakable 48-bit entropy passphrases.'
    },
    {
      id: 'qr',
      icon: '📱',
      name: 'QR Detective',
      tier: 'Silver Tier',
      desc: 'Identified 8 physical quishing sticker tamper traps.'
    },
    {
      id: 'scam',
      icon: '🛡️',
      name: 'Scam Buster',
      tier: 'Special Ops',
      desc: 'Deflected CEO gift card and emergency SMS scams.'
    }
  ];

  const roadmap = [
    { name: 'Phishing Traps', status: 'completed', icon: CheckCircle2, label: 'COMPLETED' },
    { name: 'Password Lab', status: 'completed', icon: CheckCircle2, label: 'COMPLETED' },
    { name: 'QR Detective', status: 'active', icon: ArrowRight, label: 'IN PROGRESS' },
    { name: 'Scam Street', status: 'locked', icon: Lock, label: 'LOCKED' },
    { name: 'Social Engineering', status: 'locked', icon: Lock, label: 'LOCKED' },
    { name: 'Final Escape Room', status: 'locked', icon: Trophy, label: 'GRAND FINALE' }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-20 sm:py-28 relative bg-[#070B12] border-t border-white/5 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/30 px-3.5 py-1 text-xs font-mono text-amber-300">
            <Trophy className="h-3.5 w-3.5 text-amber-400" />
            <span>GAMIFICATION & PROGRESSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white">
            Learn. Earn. <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-cyan-400">Level up.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Turn cybersecurity instinct into measurable skill. Earn XP for every threat you identify and climb the ranks to Sentinel.
          </p>
        </div>

        {/* Main Progression Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Player Stats HUD & Badges (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Player Card & Live XP Bar */}
            <div className="rounded-2xl border border-white/10 bg-[#0C1322] p-6 sm:p-7 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-cyan-500/20 border border-amber-400/40 text-amber-300 font-bold text-lg font-mono">
                    07
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-lg font-bold text-white">Cyber Sentinel</h3>
                      <span className="font-mono text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded font-bold">
                        TIER II
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">Security IQ: Top 4% of Platform Agents</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider block">CURRENT XP</span>
                  <span 
                    ref={xpNumberRef}
                    className="font-mono text-2xl sm:text-3xl font-black text-amber-400"
                  >
                    {displayedXp.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ 3,500</span>
                  </span>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Progress to Level 08 (Cyber Vanguard)</span>
                  <span className="text-cyan-400 font-bold">78%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-900 border border-white/10 overflow-hidden p-0.5">
                  <div 
                    ref={progressBarRef}
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400 w-0 transition-all shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                  />
                </div>
              </div>

              {/* Earned Achievement Badges Grid */}
              <div>
                <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-cyan-400" />
                  EARNED BADGES & HONORS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {badges.map((badge) => (
                    <div 
                      key={badge.id}
                      className="rounded-xl border border-slate-800 bg-slate-900/70 p-3 flex items-start gap-3 hover:border-cyan-500/40 transition-colors"
                    >
                      <div className="text-2xl shrink-0 p-1 bg-slate-950 rounded-lg border border-white/5">
                        {badge.icon}
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-white font-heading">{badge.name}</span>
                          <span className="font-mono text-[9px] text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded">
                            {badge.tier}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{badge.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Quest Campaign Roadmap (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="rounded-2xl border border-white/10 bg-[#0C1322] p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5">
                <span className="font-mono text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Target className="h-4 w-4 text-cyan-400" />
                  CAMPAIGN ROADMAP
                </span>
                <span className="font-mono text-[10px] text-slate-500">
                  ACT I • CHAPTER 3
                </span>
              </div>

              {/* Vertical timeline steps */}
              <div className="space-y-3">
                {roadmap.map((node, i) => {
                  const NodeIcon = node.icon;
                  return (
                    <div 
                      key={node.name}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                        node.status === 'completed'
                          ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300'
                          : node.status === 'active'
                          ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 shadow-md shadow-cyan-500/15 ring-1 ring-cyan-400/50'
                          : 'border-slate-800 bg-slate-900/40 text-slate-500 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
                          node.status === 'completed'
                            ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-400'
                            : node.status === 'active'
                            ? 'border-cyan-400 bg-cyan-500/30 text-cyan-300'
                            : 'border-slate-800 bg-slate-900 text-slate-600'
                        }`}>
                          <NodeIcon className="h-3.5 w-3.5" />
                        </div>
                        <span className="font-heading text-xs font-semibold">{node.name}</span>
                      </div>

                      <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
                        {node.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Lottie XP Placeholder */}
              <div className="mt-4 pt-3 border-t border-white/5">
                <LottiePlaceholder 
                  type="xp"
                  title="Level Up & Mastery Engine — Real-time progression"
                  compact={true}
                  className="bg-slate-950/70"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
