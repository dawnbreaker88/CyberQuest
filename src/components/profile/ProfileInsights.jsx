import React from 'react';
import { Link } from 'react-router-dom';
import { domainInsights } from '../../data/onboarding/scenarios';
import { ShieldCheck, AlertCircle, ArrowRight, Brain } from 'lucide-react';

export default function ProfileInsights({ insightsRef, strength, blindSpot }) {
  const strengthData = domainInsights[strength] || domainInsights.phishing;
  const blindSpotData = domainInsights[blindSpot] || domainInsights.socialEngineering;

  const categoryNameMap = {
    phishing: 'PHISHING',
    passwords: 'PASSWORDS',
    qr: 'QR SAFETY',
    scams: 'SCAMS',
    socialEngineering: 'SOCIAL ENGINEERING',
  };

  const recommendedTrack = categoryNameMap[blindSpot] || 'SOCIAL ENGINEERING';

  return (
    <div
      ref={insightsRef}
      className="cq-card rounded-2xl p-5 sm:p-6 shadow-xl font-mono text-left space-y-4"
    >
      <div className="flex items-center justify-between border-b border-[#273347] pb-2.5">
        <span className="text-[11px] font-bold text-[#F4F6F8] uppercase tracking-wider flex items-center gap-1.5">
          <Brain className="w-3.5 h-3.5 text-[#39C6E8]" />
          TACTICAL INSTINCT INSIGHTS
        </span>
        <span className="text-[9px] text-[#6F7B8A] uppercase font-bold">
          AI ENGINE ANALYSIS
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Strength Card */}
        <div className="rounded-xl border border-[#73D6B1]/30 bg-[#0D1119] p-4 space-y-1.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#73D6B1] uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              YOUR STRENGTH
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#73D6B1]" />
          </div>
          <h4 className="text-xs font-bold text-[#F4F6F8] uppercase">
            {strengthData.strengthTitle}
          </h4>
          <p className="text-[11px] text-[#AAB3C0] leading-relaxed font-normal">
            {strengthData.strengthDesc}
          </p>
        </div>

        {/* Blind Spot Card */}
        <div className="rounded-xl border border-[#FF7468]/30 bg-[#0D1119] p-4 space-y-1.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#FF7468] uppercase tracking-wider flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              YOUR BLIND SPOT
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF7468]" />
          </div>
          <h4 className="text-xs font-bold text-[#F4F6F8] uppercase">
            {blindSpotData.blindSpotTitle}
          </h4>
          <p className="text-[11px] text-[#AAB3C0] leading-relaxed font-normal">
            {blindSpotData.blindSpotDesc}
          </p>
        </div>
      </div>

      {/* Recommendation Banner */}
      <div className="rounded-xl border border-[#273347] bg-[#192131] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <span className="text-[9px] text-[#FFB84D] uppercase font-bold block">
            RECOMMENDED CAMPAIGN FOCUS
          </span>
          <p className="text-xs text-[#F4F6F8] font-bold">
            {recommendedTrack} QUEST TRACK
          </p>
          <p className="text-[10px] text-[#AAB3C0]">
            Sharpening this domain will accelerate your Security IQ progression fastest.
          </p>
        </div>

        <Link
          to="/app/roadmap"
          className="btn-cq-primary text-[11px] py-2 px-3.5 shrink-0 cursor-pointer"
        >
          <span>TRAIN NOW</span>
          <ArrowRight className="w-3.5 h-3.5 arrow-icon" />
        </Link>
      </div>
    </div>
  );
}

