import React from 'react';
import { domainInsights } from '../../data/onboarding/scenarios';
import { ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

export default function ProfileInsight({ strength, blindSpot, onComplete }) {
  const strengthData = domainInsights[strength] || domainInsights.phishing;
  const blindSpotData = domainInsights[blindSpot] || domainInsights.socialEngineering;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5 font-mono text-left animate-in fade-in duration-300">
      
      {/* 2-Column Strength vs Blind Spot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        
        {/* Strength Card */}
        <div className="rounded-2xl border border-[#73D6B1]/30 bg-[#131925] p-5 space-y-2.5 shadow-lg shadow-black/40">
          <div className="flex items-center justify-between border-b border-[#273347] pb-2">
            <span className="text-[10px] text-[#73D6B1] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              YOUR STRENGTH
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#73D6B1]" />
          </div>

          <h3 className="text-sm font-bold text-[#F4F6F8] uppercase">
            {strengthData.strengthTitle}
          </h3>

          <p className="text-xs text-[#AAB3C0] leading-relaxed font-normal">
            {strengthData.strengthDesc}
          </p>
        </div>

        {/* Blind Spot Card */}
        <div className="rounded-2xl border border-[#FF7468]/30 bg-[#131925] p-5 space-y-2.5 shadow-lg shadow-black/40">
          <div className="flex items-center justify-between border-b border-[#273347] pb-2">
            <span className="text-[10px] text-[#FF7468] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              YOUR BLIND SPOT
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF7468]" />
          </div>

          <h3 className="text-sm font-bold text-[#F4F6F8] uppercase">
            {blindSpotData.blindSpotTitle}
          </h3>

          <p className="text-xs text-[#AAB3C0] leading-relaxed font-normal">
            {blindSpotData.blindSpotDesc}
          </p>
        </div>

      </div>

      {/* Completion Banner & Action */}
      <div className="rounded-2xl border border-[#273347] bg-[#192131] p-5 sm:p-6 text-center space-y-3 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] text-[#39C6E8] bg-[#39C6E8]/10 px-2.5 py-0.5 rounded uppercase font-bold">
            <Sparkles className="w-3 h-3" />
            INITIAL RECRUIT PROFILE // READY
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#F4F6F8] uppercase">
            PROFILE CREATED • LEVEL 01
          </h3>
          <p className="text-xs text-[#AAB3C0] max-w-sm mx-auto">
            Your campaign roadmap is unlocked. Phishing Quest Track is ready to begin.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={onComplete}
            className="w-full sm:w-auto btn-cq-primary cursor-pointer"
          >
            <span>ENTER CYBERQUEST ROADMAP</span>
            <ArrowRight className="w-4 h-4 arrow-icon" />
          </button>
        </div>
      </div>

    </div>
  );
}

