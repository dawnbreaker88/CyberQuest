import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  Trophy,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Target,
  Flame,
} from 'lucide-react';

export default function QuestComplete({ summary, onRestart }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        scale: 0.92,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.4)',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!summary) return null;

  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4 font-sans animate-in fade-in duration-300">
      <div
        ref={containerRef}
        className="cq-card rounded-3xl border-2 border-[#73D6B1]/40 bg-[#131925] p-6 sm:p-10 shadow-2xl shadow-black/80 space-y-8 text-center"
      >
        
        {/* Mascot & Victory Badge Header */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#73D6B1] bg-[#192131] shadow-xl shadow-emerald-500/10">
            <img
              src="/mascot.jpg"
              alt="CyberQuest Mascot"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#73D6B1]/15 border border-[#73D6B1]/30 text-xs font-mono font-bold text-[#73D6B1] uppercase">
            <Trophy className="w-3.5 h-3.5" />
            <span>QUEST OBJECTIVE ACHIEVED</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl font-black text-[#F4F6F8] uppercase tracking-tight">
              {summary.questTitle} <span className="text-[#73D6B1]">COMPLETED</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#AAB3C0] max-w-md mx-auto">
              Your digital instincts held strong against deceptive vectors. All scenario credentials secured.
            </p>
          </div>
        </div>

        {/* 4-Stat Game Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          <div className="p-4 rounded-xl bg-[#0D1119] border border-[#273347] space-y-1">
            <span className="text-[10px] text-[#6F7B8A] uppercase font-bold block">
              TOTAL XP EARNED
            </span>
            <span className="text-xl sm:text-2xl font-black text-[#FFB84D] flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4 text-[#FFB84D]" />
              +{summary.xpEarned}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#0D1119] border border-[#273347] space-y-1">
            <span className="text-[10px] text-[#6F7B8A] uppercase font-bold block">
              ACCURACY
            </span>
            <span className="text-xl sm:text-2xl font-black text-[#73D6B1]">
              {summary.accuracy}%
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#0D1119] border border-[#273347] space-y-1">
            <span className="text-[10px] text-[#6F7B8A] uppercase font-bold block">
              CHALLENGES
            </span>
            <span className="text-xl sm:text-2xl font-black text-[#39C6E8]">
              {summary.challengesCompleted} / {summary.totalChallenges}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#0D1119] border border-[#273347] space-y-1">
            <span className="text-[10px] text-[#6F7B8A] uppercase font-bold block">
              LIVES REMAINING
            </span>
            <span className="text-xl sm:text-2xl font-black text-[#FF7468]">
              {summary.livesRemaining} / 3
            </span>
          </div>
        </div>

        {/* Reward Unlocks Card */}
        <div className="p-5 rounded-2xl bg-[#0D1119] border border-[#273347] text-left space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#F4F6F8] uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#73D6B1]" />
              PERSISTENT REWARDS REGISTERED
            </span>
            <span className="text-[10px] text-[#73D6B1] bg-[#73D6B1]/10 px-2 py-0.5 rounded font-bold">
              PROFILE UPDATED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#AAB3C0]">
            <div className="p-2.5 rounded-lg bg-[#131925] border border-[#273347] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#73D6B1]" />
              <span>+{summary.xpEarned} XP added to total rank</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#131925] border border-[#273347] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#39C6E8]" />
              <span>Quest completed badge unlocked</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2 font-mono">
          <Link
            to="/app/roadmap"
            className="btn-cq-primary text-xs font-bold uppercase tracking-wider px-6 py-3.5 flex items-center gap-2 shadow-lg shadow-cyan-500/10"
          >
            <span>RETURN TO ROADMAP</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={onRestart}
            className="btn-cq-secondary text-xs font-bold uppercase tracking-wider px-5 py-3.5 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>REPLAY QUEST</span>
          </button>
        </div>

      </div>
    </div>
  );
}
