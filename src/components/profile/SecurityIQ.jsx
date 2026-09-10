import React from 'react';
import { Shield, Sparkles } from 'lucide-react';

export default function SecurityIQ({ securityIQRef, securityIQ = 74 }) {
  const getIQStatus = (score) => {
    if (score >= 85) return { label: 'TACTICAL MASTER', color: '#73D6B1', sub: 'Elite digital reflexes' };
    if (score >= 70) return { label: 'SHARP INSTINCTS', color: '#39C6E8', sub: 'Your instincts are sharpening' };
    if (score >= 50) return { label: 'SOLID BASELINE', color: '#FFB84D', sub: 'Ready to refine threat vectors' };
    return { label: 'DEVELOPING DEFENDER', color: '#FF7468', sub: 'Focus on core detection rules' };
  };

  const status = getIQStatus(securityIQ);

  return (
    <div
      ref={securityIQRef}
      className="cq-card rounded-2xl p-5 sm:p-6 shadow-xl font-mono text-left space-y-3 relative overflow-hidden"
      style={{ borderTop: `2px solid ${status.color}` }}
    >
      <div className="flex items-center justify-between border-b border-[#273347] pb-2.5">
        <span className="text-[11px] font-bold text-[#F4F6F8] uppercase tracking-wider flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" style={{ color: status.color }} />
          SECURITY IQ
        </span>
        <span className="text-[9px] text-[#6F7B8A] uppercase font-bold">
          GAME STAT
        </span>
      </div>

      <div className="flex items-center gap-4 py-1">
        <div className="relative flex items-center justify-center">
          <span className="text-5xl sm:text-6xl font-black tracking-tight" style={{ color: status.color }}>
            {securityIQ}
          </span>
        </div>

        <div className="space-y-0.5">
          <span 
            className="text-[10px] font-extrabold px-2 py-0.5 rounded tracking-wider uppercase inline-block"
            style={{ 
              color: status.color, 
              backgroundColor: `${status.color}15`,
              border: `1px solid ${status.color}30`
            }}
          >
            {status.label}
          </span>
          <span className="text-xs text-[#F4F6F8] font-bold block">
            {status.sub}
          </span>
          <span className="text-[10px] text-[#6F7B8A] block">
            Scale 00 – 100
          </span>
        </div>
      </div>

      <p className="text-[10px] text-[#6F7B8A] border-t border-[#1C2433] pt-2 leading-relaxed">
        Live calculation based on completed challenge tracks and baseline decisions.
      </p>
    </div>
  );
}

