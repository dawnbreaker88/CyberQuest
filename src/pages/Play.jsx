import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../components/app/AppNavbar';
import { Shield, Key, QrCode, AlertTriangle, UserCheck, Shuffle, ArrowRight, Sparkles, Flame } from 'lucide-react';

const playCategories = [
  {
    id: 'phishing',
    title: 'PHISHING',
    subtitle: 'Spot fake senders and malicious URLs',
    color: '#39C6E8',
    icon: Shield,
    route: '/app/game/phishing',
    challenges: '5 scenarios',
    xpReward: '+150 XP',
  },
  {
    id: 'passwords',
    title: 'PASSWORDS',
    subtitle: 'Master passphrases and entropy',
    color: '#73D6B1',
    icon: Key,
    route: '/app/game/passwords',
    challenges: '5 scenarios',
    xpReward: '+200 XP',
  },
  {
    id: 'qr',
    title: 'QR SAFETY',
    subtitle: 'Unmask tamper stickers & redirect traps',
    color: '#FFB84D',
    icon: QrCode,
    route: '/app/game/qr',
    challenges: '5 scenarios',
    xpReward: '+200 XP',
  },
  {
    id: 'scams',
    title: 'SCAMS',
    subtitle: 'Detect urgency levers and lure texts',
    color: '#FF7468',
    icon: AlertTriangle,
    route: '/app/game/scams',
    challenges: '5 scenarios',
    xpReward: '+250 XP',
  },
  {
    id: 'social-engineering',
    title: 'SOCIAL ENG.',
    subtitle: 'Outsmart authority impostors & pretexting',
    color: '#9D91E8',
    icon: UserCheck,
    route: '/app/game/social-engineering',
    challenges: '5 scenarios',
    xpReward: '+300 XP',
  },
];

export default function Play() {
  const navigate = useNavigate();
  const [shuffling, setShuffling] = useState(false);

  const handleSurpriseMe = () => {
    setShuffling(true);
    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * playCategories.length);
      const chosen = playCategories[randomIdx];
      navigate(chosen.route);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F4F6F8] font-mono antialiased bg-cq-grid overflow-x-hidden">
      <AppNavbar />

      <main className="pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-left">
        
        {/* Header */}
        <div className="space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 bg-[#39C6E8]/10 text-[#39C6E8] px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
            <Flame className="w-3.5 h-3.5" />
            INSTANT MISSION DISPATCH
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#F4F6F8] uppercase leading-tight">
            QUICK PLAY
          </h1>
          <p className="text-xs sm:text-sm text-[#AAB3C0]">
            What are you in the mood for? Pick a threat vector or let CyberQuest decide.
          </p>
        </div>

        {/* Surprise Me Hero Tile */}
        <div className="rounded-2xl border-2 border-[#FFC96B]/40 bg-[#131925] p-5 sm:p-7 shadow-xl shadow-black/60 mb-8 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#FFC96B] uppercase tracking-wider bg-[#FFC96B]/10 px-2.5 py-0.5 rounded">
              <Sparkles className="w-3 h-3" />
              RANDOM MISSION ROTATION
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#F4F6F8] uppercase tracking-tight">
              SURPRISE ME
            </h2>
            <p className="text-xs text-[#AAB3C0] max-w-md">
              Let CyberQuest choose a mission based on your blind spots and active streak.
            </p>
          </div>

          <button
            onClick={handleSurpriseMe}
            disabled={shuffling}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFB84D] text-[#080B12] font-bold px-6 py-3 text-xs tracking-wider uppercase hover:bg-[#FFC96B] transition-all cursor-pointer shadow-lg shadow-[#FFB84D]/20 active:scale-95 disabled:opacity-50"
          >
            <Shuffle className={`w-4 h-4 ${shuffling ? 'animate-spin' : ''}`} />
            <span>{shuffling ? 'LAUNCHING...' : 'PLAY NOW →'}</span>
          </button>
        </div>

        {/* 5 Categories Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-[#273347] pb-2">
            <span className="text-xs font-bold text-[#F4F6F8] uppercase tracking-wider">
              TARGET PRACTICE DOMAINS
            </span>
            <span className="text-[10px] text-[#6F7B8A] uppercase">
              5 TRACKS AVAILABLE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {playCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => navigate(cat.route)}
                  className="cq-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-4 cursor-pointer group hover:scale-[1.01]"
                  style={{ borderLeft: `3px solid ${cat.color}` }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div 
                        className="flex h-8 w-8 items-center justify-center rounded-lg border text-xs"
                        style={{ 
                          color: cat.color, 
                          borderColor: `${cat.color}40`, 
                          backgroundColor: `${cat.color}15` 
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span 
                        className="text-[9px] font-bold px-2 py-0.5 rounded uppercase"
                        style={{ color: cat.color, backgroundColor: `${cat.color}15` }}
                      >
                        {cat.xpReward}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-[#F4F6F8] uppercase tracking-tight group-hover:text-[#39C6E8] transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-[11px] text-[#AAB3C0] mt-0.5 leading-snug">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#1C2433] text-[10px]">
                    <span className="text-[#6F7B8A]">{cat.challenges}</span>
                    <span 
                      className="font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      style={{ color: cat.color }}
                    >
                      <span>LAUNCH</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-[#1C2433] bg-[#080B12] py-8 px-4 text-center text-xs font-mono text-[#6F7B8A]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#39C6E8]" />
            <span className="text-[#F4F6F8] font-bold">CYBERQUEST SIMULATION SUITE</span>
          </div>
          <span>REAL-WORLD TRAINING SCENARIOS</span>
        </div>
      </footer>
    </div>
  );
}
