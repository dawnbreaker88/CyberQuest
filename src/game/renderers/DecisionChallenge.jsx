import React from 'react';
import { HelpCircle, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function DecisionChallenge({ challenge, session, onAction }) {
  const { content } = challenge;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 text-left font-sans animate-in fade-in duration-300">
      <div className="cq-card rounded-2xl border border-[#273347] bg-[#131925] p-6 sm:p-8 space-y-6 shadow-2xl">
        
        {/* Scenario Header */}
        <div className="space-y-2 border-b border-[#273347] pb-4 font-mono">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#39C6E8] uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>DECISION SCENARIO</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F4F6F8] uppercase tracking-tight">
            {challenge.title}
          </h2>
        </div>

        {/* Narrative Context */}
        <p className="text-sm sm:text-base text-[#AAB3C0] leading-relaxed font-sans">
          {content.scenarioText || content.description}
        </p>

        {/* Available Decisions */}
        <div className="space-y-3 pt-2 font-mono">
          <span className="text-[11px] font-bold text-[#F4F6F8] uppercase tracking-wider block">
            SELECT YOUR DECISION:
          </span>

          <div className="grid grid-cols-1 gap-3">
            {content.availableActions?.map((action, idx) => (
              <button
                key={action.id}
                onClick={() => onAction(action)}
                className="w-full p-4 rounded-xl border border-[#273347] bg-[#0D1119] hover:bg-[#192131] hover:border-[#39C6E8] text-[#F4F6F8] text-xs font-bold transition-all flex items-center justify-between gap-3 cursor-pointer group shadow-sm text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-[#131925] text-[#39C6E8] flex items-center justify-center text-xs font-mono font-bold">
                    0{idx + 1}
                  </span>
                  <span>{action.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#6F7B8A] group-hover:text-[#39C6E8] transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
