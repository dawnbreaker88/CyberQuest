import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Trophy, Lock } from 'lucide-react';

export default function AuthLayout({ children, mode = 'login' }) {
  return (
    <div className="min-h-screen bg-[#080B12] text-[#F4F6F8] font-mono flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden bg-cq-grid">
      
      {/* Top Header */}
      <header className="flex items-center justify-between w-full max-w-5xl mx-auto z-10 py-2">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-xs font-bold tracking-wider text-[#F4F6F8] hover:text-[#39C6E8] transition-colors"
        >
          <div className="w-6 h-6 rounded-md bg-[#131925] border border-[#273347] flex items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-[#39C6E8]" />
          </div>
          <span className="text-sm font-extrabold tracking-tight">CYBER<span className="text-[#39C6E8]">QUEST</span></span>
        </Link>

        <span className="text-[11px] font-mono text-[#6F7B8A] uppercase tracking-widest hidden sm:flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#73D6B1]" />
          SECURE PROTOCOL // 256-BIT
        </span>
      </header>

      {/* Main Two-Part Container */}
      <main className="w-full max-w-5xl mx-auto my-auto py-6 sm:py-10 z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Form Area (7 cols on lg) */}
        <div className="lg:col-span-7 cq-card rounded-2xl p-6 sm:p-8 border border-[#273347] bg-[#131925]">
          {children}
        </div>

        {/* Right Mascot & Game Identity Area (5 cols on lg) */}
        <div className="lg:col-span-5 hidden lg:flex flex-col gap-4">
          <div className="rounded-2xl border border-[#273347] bg-[#192131]/80 p-6 relative overflow-hidden flex flex-col items-center text-center">
            
            {/* Mascot Image Frame */}
            <div className="w-44 h-44 rounded-2xl overflow-hidden border-2 border-[#39C6E8]/30 bg-[#131925] mb-4 shadow-lg shadow-black/40 relative group">
              <img 
                src="/mascot.jpg" 
                alt="CyberQuest Mascot" 
                className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="absolute top-2 right-2 bg-[#080B12]/80 backdrop-blur-sm border border-[#273347] rounded-md px-2 py-0.5 text-[10px] text-[#39C6E8] font-bold">
                GUIDE
              </div>
            </div>

            <h3 className="text-sm font-bold text-[#F4F6F8] mb-1 tracking-tight">
              {mode === 'login' ? 'READY FOR YOUR NEXT QUEST?' : 'BE HARDER TO FOOL'}
            </h3>
            <p className="text-[11px] text-[#AAB3C0] max-w-xs leading-relaxed mb-4">
              {mode === 'login' 
                ? 'Resume your streak, unlock advanced threat tracks, and test your cyber reflexes.'
                : 'Experience real-world cybersecurity attacks disguised as an interactive game.'
              }
            </p>

            {/* Quick Micro-Stats Pills */}
            <div className="grid grid-cols-3 gap-2 w-full pt-3 border-t border-[#273347] text-[10px]">
              <div className="bg-[#131925] p-2 rounded-lg border border-[#273347]">
                <div className="text-[#39C6E8] font-bold">+100 XP</div>
                <div className="text-[#6F7B8A] text-[9px]">LEVEL 01</div>
              </div>
              <div className="bg-[#131925] p-2 rounded-lg border border-[#273347]">
                <div className="text-[#73D6B1] font-bold">5 TRACKS</div>
                <div className="text-[#6F7B8A] text-[9px]">INTERACTIVE</div>
              </div>
              <div className="bg-[#131925] p-2 rounded-lg border border-[#273347]">
                <div className="text-[#FFB84D] font-bold">ESCAPE</div>
                <div className="text-[#6F7B8A] text-[9px]">FINALE ROOM</div>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* Bottom Footer Metadata */}
      <footer className="flex items-center justify-between w-full max-w-5xl mx-auto text-[11px] text-[#6F7B8A] z-10 py-2">
        <span>ENCRYPTED LOCAL STATE SESSION</span>
        <span>© 2026 CYBERQUEST</span>
      </footer>

    </div>
  );
}

