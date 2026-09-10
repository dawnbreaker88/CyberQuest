import React, { useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import gsap from 'gsap';
import { Sparkles, Trophy, Compass, Shield } from 'lucide-react';

export default function RoadmapHero({ greetingRef, statsRef }) {
  const { user } = useAuth();
  const xpCountRef = useRef(null);

  useEffect(() => {
    const targetXp = user?.stats?.xp || user?.xp || 0;
    const obj = { val: 0 };
    
    gsap.to(obj, {
      val: targetXp,
      duration: 1.2,
      ease: 'power2.out',
      onUpdate: () => {
        if (xpCountRef.current) {
          xpCountRef.current.textContent = `${Math.floor(obj.val)} XP`;
        }
      },
    });
  }, [user?.stats?.xp, user?.xp]);

  const userName = (user?.name || 'AGENT').toUpperCase();
  const currentLevel = user?.stats?.level || user?.level || 1;
  const currentQuest = (user?.currentQuest || 'PHISHING').toUpperCase();

  return (
    <section className="pt-24 sm:pt-28 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-left font-mono">
      <div className="space-y-4">
        
        {/* Section Label with Mascot Avatar */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 bg-[#39C6E8]/10 text-[#39C6E8] px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#39C6E8]" />
            CAMPAIGN ROADMAP // AGENT DISPATCH
          </div>
          <span className="text-[10px] text-[#6F7B8A] uppercase hidden sm:inline">
            SYSTEM VERSION 2.4
          </span>
        </div>

        {/* Personalized Large Greeting */}
        <div ref={greetingRef} className="space-y-1">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#F4F6F8] uppercase leading-tight">
            WELCOME BACK, <span className="text-[#39C6E8]">{userName}</span>.
          </h1>
          <p className="text-xs sm:text-sm text-[#AAB3C0]">
            Advance through the cybersecurity tracks and conquer the Escape Room.
          </p>
        </div>

        {/* Level & XP Badges */}
        <div
          ref={statsRef}
          className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-[#1C2433]"
        >
          <div className="flex items-center gap-2 rounded-xl border border-[#273347] bg-[#131925] px-3 py-1.5 text-xs font-mono">
            <span className="text-[#6F7B8A] uppercase text-[10px]">RANK:</span>
            <span className="font-bold text-[#39C6E8] text-xs">LEVEL 0{currentLevel}</span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#273347] bg-[#131925] px-3 py-1.5 text-xs font-mono">
            <span className="text-[#6F7B8A] uppercase text-[10px]">XP EARNED:</span>
            <span ref={xpCountRef} className="font-bold text-[#FFB84D] text-xs">
              0 XP
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#273347] bg-[#131925] px-3 py-1.5 text-xs font-mono">
            <span className="text-[#6F7B8A] uppercase text-[10px]">ACTIVE TRACK:</span>
            <span className="font-bold text-[#73D6B1] text-xs uppercase">
              {currentQuest}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

