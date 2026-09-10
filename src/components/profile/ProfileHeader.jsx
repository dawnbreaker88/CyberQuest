import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, Sparkles, Flame, User, Trophy } from 'lucide-react';

export default function ProfileHeader({ headerRef, xpBarRef }) {
  const { user } = useAuth();

  const name = user?.name || user?.profile?.name || 'PRABHATH';
  const level = user?.stats?.level || user?.level || 1;
  const xp = user?.stats?.xp || user?.xp || 0;
  const xpNeeded = 500;
  const xpPercent = Math.min(100, Math.round((xp / xpNeeded) * 100));
  const streak = user?.stats?.streak || 0;

  return (
    <div
      ref={headerRef}
      className="cq-card rounded-2xl p-5 sm:p-7 shadow-2xl font-mono text-left space-y-5"
    >
      {/* Top Identity Row with Mascot Avatar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#273347] pb-5">
        <div className="flex items-center gap-4">
          {/* Mascot Portrait Frame */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#39C6E8]/40 bg-[#192131] shadow-lg shadow-black/50 shrink-0 relative group">
            <img 
              src="/mascot.jpg" 
              alt="CyberQuest Player Portrait" 
              className="w-full h-full object-cover object-center scale-110"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="absolute bottom-0 inset-x-0 bg-[#080B12]/80 text-[8px] text-[#39C6E8] text-center font-bold py-0.5">
              AGENT
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#39C6E8] bg-[#39C6E8]/10 border border-[#39C6E8]/30 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                PLAYER CHARACTER SHEET
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-[#F4F6F8] uppercase">
              {name}
            </h1>
            <p className="text-xs text-[#AAB3C0]">
              Level 0{level} Cyber Operative • Handle: @{name.toLowerCase().replace(/\s+/g, '')}
            </p>
          </div>
        </div>

        {/* Streak & Experience Tier Badges */}
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl border border-[#FF7468]/30 bg-[#FF7468]/10 px-3 py-2 text-right">
            <span className="text-[9px] text-[#FF7468] font-bold uppercase flex items-center gap-1 justify-end">
              <Flame className="w-3 h-3" />
              STREAK
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#F4F6F8]">{streak} DAYS</span>
          </div>
          <div className="rounded-xl border border-[#273347] bg-[#192131] px-3 py-2 text-right">
            <span className="text-[9px] text-[#6F7B8A] uppercase block font-bold">EXPERIENCE</span>
            <span className="text-xs sm:text-sm font-bold text-[#73D6B1] uppercase">
              {user?.profile?.experienceLevel || 'RECRUIT'}
            </span>
          </div>
        </div>
      </div>

      {/* XP Level Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#AAB3C0] font-semibold text-[11px]">
            PROGRESS TO LEVEL 0{level + 1}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[#FFB84D] font-bold text-xs">{xp} XP</span>
            <span className="text-[#6F7B8A] text-[10px]">/ {xpNeeded} XP ({xpPercent}%)</span>
          </div>
        </div>

        <div className="w-full h-2 rounded-full bg-[#0D1119] border border-[#273347] overflow-hidden p-0.5">
          <div
            ref={xpBarRef}
            className="h-full rounded-full bg-[#39C6E8] transition-all duration-700 shadow-sm shadow-[#39C6E8]/30"
            style={{ width: `${Math.max(5, xpPercent)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

