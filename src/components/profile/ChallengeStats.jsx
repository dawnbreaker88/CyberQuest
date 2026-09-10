import React from 'react';
import { Target, Flame, CheckSquare, Compass } from 'lucide-react';

export default function ChallengeStats({ statsRef, stats = {} }) {
  const completed = stats.challengesCompleted || 7;
  const accuracy = stats.accuracy || 86;
  const streak = stats.streak || 5;
  const questsCompleted = stats.questsCompleted || 2;
  const totalQuests = 6;

  return (
    <div
      ref={statsRef}
      className="cq-card rounded-2xl p-5 sm:p-7 shadow-xl font-mono text-left space-y-4"
    >
      <div className="flex items-center justify-between border-b border-[#273347] pb-2.5">
        <span className="text-[11px] font-bold text-[#F4F6F8] uppercase tracking-wider">
          GAME STATISTICS
        </span>
        <span className="text-[9px] text-[#6F7B8A] uppercase font-bold">
          SUMMARY
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left">
        <div className="p-3 rounded-xl border border-[#273347] bg-[#0D1119] flex flex-col justify-between gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-[#6F7B8A] uppercase font-bold">
              CHALLENGES
            </span>
            <Target className="w-3 h-3 text-[#39C6E8]" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-[#39C6E8]">
            {String(completed).padStart(2, '0')}
          </span>
        </div>

        <div className="p-3 rounded-xl border border-[#273347] bg-[#0D1119] flex flex-col justify-between gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-[#6F7B8A] uppercase font-bold">
              ACCURACY
            </span>
            <CheckSquare className="w-3 h-3 text-[#73D6B1]" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-[#73D6B1]">
            {accuracy}%
          </span>
        </div>

        <div className="p-3 rounded-xl border border-[#273347] bg-[#0D1119] flex flex-col justify-between gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-[#6F7B8A] uppercase font-bold">
              STREAK
            </span>
            <Flame className="w-3 h-3 text-[#FF7468]" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-[#FF7468]">
            {String(streak).padStart(2, '0')} DAYS
          </span>
        </div>

        <div className="p-3 rounded-xl border border-[#273347] bg-[#0D1119] flex flex-col justify-between gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-[#6F7B8A] uppercase font-bold">
              QUESTS
            </span>
            <Compass className="w-3 h-3 text-[#FFB84D]" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-[#FFB84D]">
            0{questsCompleted} / 0{totalQuests}
          </span>
        </div>
      </div>
    </div>
  );
}

