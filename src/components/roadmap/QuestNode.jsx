import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Key, QrCode, AlertTriangle, UserCheck, Flame, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

const questMeta = {
  phishing: { color: '#39C6E8', icon: Shield, name: 'PHISHING' },
  passwords: { color: '#73D6B1', icon: Key, name: 'PASSWORDS' },
  qr: { color: '#FFB84D', icon: QrCode, name: 'QR SAFETY' },
  scams: { color: '#FF7468', icon: AlertTriangle, name: 'SCAMS' },
  'social-engineering': { color: '#9D91E8', icon: UserCheck, name: 'SOCIAL ENG.' },
  'final-escape': { color: '#FFC96B', icon: Flame, name: 'ESCAPE ROOM' },
};

export default function QuestNode({ quest, index, isCurrent, nodeRef }) {
  const [hovered, setHovered] = useState(false);
  const isAvailable = quest.status === 'available';

  const meta = questMeta[quest.id] || { color: '#39C6E8', icon: Shield, name: quest.title };
  const CategoryIcon = meta.icon;

  const NodeContent = (
    <div
      ref={nodeRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-2xl border transition-all duration-200 p-5 sm:p-6 font-mono text-left ${
        isCurrent
          ? 'border-[#39C6E8] bg-[#192131] shadow-xl shadow-black/60'
          : isAvailable
          ? 'border-[#273347] bg-[#131925] hover:border-[#3A4B68] hover:bg-[#161D2B]'
          : 'border-[#1C2433] bg-[#0D1119] opacity-75 hover:opacity-100 hover:border-[#273347]'
      }`}
      style={isCurrent ? { borderLeft: `4px solid ${meta.color}` } : { borderLeft: `3px solid ${meta.color}50` }}
    >
      {/* Node Header */}
      <div className="flex items-center justify-between border-b border-[#273347] pb-3 mb-3.5">
        <div className="flex items-center gap-3">
          {/* Node Number & Category Icon */}
          <div 
            className="flex h-9 w-9 items-center justify-center rounded-xl border text-xs font-mono font-bold transition-transform"
            style={{ 
              color: meta.color, 
              borderColor: `${meta.color}40`, 
              backgroundColor: `${meta.color}15` 
            }}
          >
            <CategoryIcon className="w-4 h-4" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#6F7B8A]">
                TRACK {quest.number}
              </span>
              <span 
                className="text-[9px] font-bold px-1.5 py-0.2 rounded"
                style={{ 
                  color: meta.color, 
                  backgroundColor: `${meta.color}15` 
                }}
              >
                {meta.name}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#F4F6F8] uppercase tracking-tight">
              {quest.title}
            </h3>
          </div>
        </div>

        {/* Status Tag */}
        <div className="text-[10px] font-mono font-bold tracking-wider uppercase">
          {isCurrent ? (
            <span className="flex items-center gap-1.5 rounded-lg border border-[#39C6E8]/40 bg-[#39C6E8]/10 px-2.5 py-1 text-[#39C6E8]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#39C6E8]" />
              CURRENT QUEST
            </span>
          ) : isAvailable ? (
            <span className="rounded-lg border border-[#73D6B1]/30 bg-[#73D6B1]/10 px-2.5 py-1 text-[#73D6B1] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              UNLOCKED
            </span>
          ) : (
            <span className="rounded-lg border border-[#273347] bg-[#131925] px-2.5 py-1 text-[#6F7B8A] flex items-center gap-1 group-hover:text-[#AAB3C0] transition-colors">
              <Lock className="w-3 h-3" />
              {hovered && quest.unlockRequirement ? (
                <span className="text-[#FFB84D]">{quest.unlockRequirement}</span>
              ) : (
                'LOCKED'
              )}
            </span>
          )}
        </div>
      </div>

      {/* Subtitle & Description */}
      <p className="text-xs font-mono font-semibold mb-1" style={{ color: meta.color }}>
        {quest.subtitle}
      </p>
      <p className="text-xs text-[#AAB3C0] leading-relaxed font-normal mb-3.5">
        {quest.description}
      </p>

      {/* Footer Info & Action */}
      <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[#1C2433]">
        <span className="text-[11px] text-[#6F7B8A]">
          +{quest.rewardXp} XP • {quest.estimatedTime}
        </span>

        {isAvailable && (
          <span className={`font-bold transition-all flex items-center gap-1 text-xs ${
            isCurrent ? 'text-[#39C6E8]' : 'text-[#AAB3C0] group-hover:text-[#F4F6F8]'
          }`}>
            <span>ENTER TRACK</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform transform group-hover:translate-x-1" />
          </span>
        )}
      </div>
    </div>
  );

  if (isAvailable) {
    return (
      <Link to={quest.route} className="block group">
        {NodeContent}
      </Link>
    );
  }

  return <div>{NodeContent}</div>;
}

