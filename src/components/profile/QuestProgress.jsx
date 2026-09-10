import React from 'react';
import { quests } from '../../data/quests';
import { Shield, Key, QrCode, AlertTriangle, UserCheck, Flame, Lock, CheckCircle2 } from 'lucide-react';

const questMeta = {
  phishing: { color: '#39C6E8', icon: Shield },
  passwords: { color: '#73D6B1', icon: Key },
  qr: { color: '#FFB84D', icon: QrCode },
  scams: { color: '#FF7468', icon: AlertTriangle },
  'social-engineering': { color: '#9D91E8', icon: UserCheck },
  'final-escape': { color: '#FFC96B', icon: Flame },
};

export default function QuestProgress() {
  return (
    <div className="cq-card rounded-2xl p-5 sm:p-7 shadow-xl font-mono text-left space-y-4">
      <div className="flex items-center justify-between border-b border-[#273347] pb-2.5">
        <span className="text-[11px] font-bold text-[#F4F6F8] uppercase tracking-wider">
          CAMPAIGN TRACK LOG
        </span>
        <span className="text-[9px] text-[#6F7B8A] uppercase font-bold">
          6 TRACKS
        </span>
      </div>

      <div className="space-y-2.5">
        {quests.map((quest) => {
          const isAvailable = quest.status === 'available';
          const meta = questMeta[quest.id] || { color: '#39C6E8', icon: Shield };
          const Icon = meta.icon;

          return (
            <div
              key={quest.id}
              className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                isAvailable
                  ? 'border-[#273347] bg-[#192131] text-[#F4F6F8]'
                  : 'border-[#1C2433] bg-[#0D1119] opacity-75 text-[#6F7B8A]'
              }`}
              style={{ borderLeft: `3px solid ${isAvailable ? meta.color : `${meta.color}40`}` }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-7 h-7 rounded-lg border flex items-center justify-center text-xs"
                  style={{ 
                    color: meta.color, 
                    borderColor: `${meta.color}30`,
                    backgroundColor: `${meta.color}15`
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className={`text-xs font-bold uppercase block ${isAvailable ? 'text-[#F4F6F8]' : 'text-[#6F7B8A]'}`}>
                    {quest.number}. {quest.title}
                  </span>
                  <span className="text-[10px] text-[#AAB3C0] font-normal block">
                    {quest.subtitle}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                {isAvailable ? (
                  <span className="text-[10px] font-bold text-[#39C6E8] bg-[#39C6E8]/10 border border-[#39C6E8]/30 px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    ACTIVE
                  </span>
                ) : (
                  <span className="text-[10px] text-[#6F7B8A] bg-[#131925] border border-[#273347] px-2 py-0.5 rounded flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" />
                    LOCKED
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

