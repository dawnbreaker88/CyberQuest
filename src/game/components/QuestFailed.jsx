import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, RotateCcw, ArrowLeft, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function QuestFailed({ onRestart, questTitle }) {
  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4 font-sans animate-in fade-in duration-300">
      <div className="cq-card rounded-3xl border-2 border-[#FF7468]/40 bg-[#131925] p-6 sm:p-10 shadow-2xl space-y-6 text-center">
        
        {/* Defeat Icon & Header */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-[#FF7468]/15 border border-[#FF7468]/40 flex items-center justify-center text-[#FF7468]">
            <XCircle className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7468]/15 border border-[#FF7468]/30 text-xs font-mono font-bold text-[#FF7468] uppercase">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>CRITICAL DEFENSE BREACH</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[#F4F6F8] uppercase tracking-tight">
            LIVES DEPLETED
          </h1>

          <p className="text-xs sm:text-sm text-[#AAB3C0] max-w-md mx-auto">
            You encountered multiple deceptive lures. Don't worry — failure in the simulator is how authentic instincts are built.
          </p>
        </div>

        {/* Debrief Card */}
        <div className="p-5 rounded-2xl bg-[#0D1119] border border-[#273347] text-left space-y-2 font-mono text-xs">
          <span className="text-[10px] font-bold text-[#FF7468] uppercase tracking-wider block">
            DEFENDER LESSON:
          </span>
          <p className="text-xs text-[#AAB3C0] leading-relaxed font-sans">
            Slow down when inspecting urgent notifications, verify root domains before clicking, and use out-of-band channels for sensitive payment changes.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2 font-mono">
          <button
            onClick={onRestart}
            className="btn-cq-primary text-xs font-bold uppercase tracking-wider px-6 py-3.5 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RETRY QUEST</span>
          </button>

          <Link
            to="/app/roadmap"
            className="btn-cq-secondary text-xs font-bold uppercase tracking-wider px-5 py-3.5 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ROADMAP</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
