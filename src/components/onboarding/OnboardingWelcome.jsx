import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Compass } from 'lucide-react';

export default function OnboardingWelcome({ onStart }) {
  return (
    <div className="space-y-6 max-w-xl mx-auto text-center sm:text-left animate-in fade-in duration-300 font-mono">
      
      {/* Mascot & Status Tag */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#39C6E8]/40 bg-[#131925] shadow-lg shadow-black/50 shrink-0">
          <img 
            src="/mascot.jpg" 
            alt="CyberQuest Mascot Guide" 
            className="w-full h-full object-cover object-center scale-110"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-[#39C6E8]/10 text-[#39C6E8] px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#39C6E8]" />
            CHARACTER CALIBRATION // LEVEL 00
          </div>
          <div className="text-xs text-[#AAB3C0]">
            Guided baseline calibration
          </div>
        </div>
      </div>

      {/* Main Copy */}
      <div className="space-y-3">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#F4F6F8] uppercase leading-tight">
          YOUR DIGITAL INSTINCTS ARE <br />
          <span className="text-[#39C6E8]">ABOUT TO BE TESTED.</span>
        </h1>

        <p className="text-xs sm:text-sm text-[#AAB3C0] font-normal leading-relaxed">
          CyberQuest evaluates how you react in realistic situations. No textbook questions.
        </p>

        <div className="grid grid-cols-3 gap-2 py-2 text-[11px]">
          <div className="p-2.5 rounded-xl border border-[#273347] bg-[#131925] text-left">
            <div className="text-[#39C6E8] font-bold">01. NO STUDYING</div>
            <div className="text-[#6F7B8A] text-[10px] mt-0.5">Pure instinct</div>
          </div>
          <div className="p-2.5 rounded-xl border border-[#273347] bg-[#131925] text-left">
            <div className="text-[#73D6B1] font-bold">02. 10 SCENARIOS</div>
            <div className="text-[#6F7B8A] text-[10px] mt-0.5">~3 minutes</div>
          </div>
          <div className="p-2.5 rounded-xl border border-[#273347] bg-[#131925] text-left">
            <div className="text-[#FFB84D] font-bold">03. SECURITY IQ</div>
            <div className="text-[#6F7B8A] text-[10px] mt-0.5">Initial score</div>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="pt-2">
        <button
          onClick={onStart}
          className="w-full sm:w-auto btn-cq-primary cursor-pointer"
        >
          <span>BEGIN CALIBRATION</span>
          <ArrowRight className="w-4 h-4 arrow-icon" />
        </button>
      </div>

    </div>
  );
}

