import React, { useState } from 'react';
import { badges } from '../../data/badges';
import { ShieldCheck, Target, QrCode, AlertOctagon, Brain, UserCheck, Key, Lock, Sparkles } from 'lucide-react';

const iconMap = {
  SHIELD_CHECK: ShieldCheck,
  TARGET: Target,
  QR_CODE: QrCode,
  ALERT_OCTAGON: AlertOctagon,
  BRAIN: Brain,
  USER_CHECK: UserCheck,
  KEY: Key,
};

const categoryColorMap = {
  Phishing: '#39C6E8',
  'QR Safety': '#FFB84D',
  Scams: '#FF7468',
  Instinct: '#FFC96B',
  'Social Engineering': '#9D91E8',
  'Escape Room': '#FFB84D',
};

export default function BadgeCollection({ badgesRef }) {
  const [hoveredBadge, setHoveredBadge] = useState(null);

  return (
    <div className="cq-card rounded-2xl p-5 sm:p-7 shadow-xl font-mono text-left space-y-4">
      <div className="flex items-center justify-between border-b border-[#273347] pb-2.5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#FFB84D]" />
          <span className="text-[11px] font-bold text-[#F4F6F8] uppercase tracking-wider">
            COLLECTIBLE MEDALS & BADGES
          </span>
        </div>
        <span className="text-[9px] text-[#39C6E8] bg-[#39C6E8]/10 px-2 py-0.5 rounded font-bold uppercase">
          1 UNLOCKED • 6 REMAINING
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {badges.map((badge, idx) => {
          const isUnlocked = badge.status === 'unlocked';
          const isHovered = hoveredBadge === badge.id;
          const Icon = iconMap[badge.iconCode] || ShieldCheck;
          const catColor = categoryColorMap[badge.category] || '#39C6E8';

          return (
            <div
              key={badge.id}
              ref={(el) => {
                if (badgesRef && badgesRef.current) {
                  badgesRef.current[idx] = el;
                }
              }}
              onMouseEnter={() => setHoveredBadge(badge.id)}
              onMouseLeave={() => setHoveredBadge(null)}
              className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2.5 ${
                isUnlocked
                  ? 'border-[#39C6E8]/40 bg-[#192131] text-[#F4F6F8] shadow-md shadow-black/40 hover:-translate-y-1 hover:rotate-1'
                  : 'border-[#1C2433] bg-[#0D1119] text-[#6F7B8A] hover:border-[#273347] hover:bg-[#131925] hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-7 h-7 rounded-lg border flex items-center justify-center transition-colors"
                    style={{ 
                      color: isUnlocked ? catColor : '#6F7B8A', 
                      borderColor: isUnlocked ? `${catColor}40` : '#273347',
                      backgroundColor: isUnlocked ? `${catColor}15` : '#131925'
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className={`text-xs font-bold uppercase font-mono ${isUnlocked ? 'text-[#F4F6F8]' : 'text-[#6F7B8A]'}`}>
                    {badge.title}
                  </span>
                </div>

                <span className={`h-1.5 w-1.5 rounded-full ${isUnlocked ? 'bg-[#39C6E8]' : 'bg-[#273347]'}`} />
              </div>

              <p className="text-[11px] text-[#AAB3C0] leading-snug font-normal">
                {badge.description}
              </p>

              <div className="pt-2 border-t border-[#1C2433] text-[9px] uppercase font-bold flex items-center justify-between">
                <span style={{ color: isUnlocked ? catColor : '#6F7B8A' }}>
                  {badge.category}
                </span>
                <span className={isUnlocked ? 'text-[#73D6B1]' : 'text-[#6F7B8A]'}>
                  {isUnlocked ? 'UNLOCKED ✓' : 'LOCKED'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

