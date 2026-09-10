import React, { useState } from 'react';
import { Shield, AlertTriangle, Key, QrCode, MessageSquare, UserCheck, ArrowRight } from 'lucide-react';

const categoryMeta = {
  phishing: { color: '#39C6E8', icon: Shield, name: 'Phishing' },
  passwords: { color: '#73D6B1', icon: Key, name: 'Passwords' },
  qr: { color: '#FFB84D', icon: QrCode, name: 'QR Safety' },
  scams: { color: '#FF7468', icon: AlertTriangle, name: 'Scams' },
  socialEngineering: { color: '#9D91E8', icon: UserCheck, name: 'Social Engineering' },
};

export default function AssessmentScenario({ scenario, onChooseOption, scenarioContainerRef }) {
  const [selectedOptId, setSelectedOptId] = useState(null);

  if (!scenario) return null;

  const meta = categoryMeta[scenario.category] || { color: '#39C6E8', icon: Shield, name: scenario.categoryName };
  const CategoryIcon = meta.icon;

  const handleSelect = (optId) => {
    setSelectedOptId(optId);
    setTimeout(() => {
      onChooseOption(optId);
      setSelectedOptId(null);
    }, 280);
  };

  return (
    <div
      ref={scenarioContainerRef}
      className="w-full max-w-2xl mx-auto space-y-4 text-left font-mono"
    >
      {/* Context Badge */}
      <div className="rounded-xl border border-[#273347] bg-[#131925] p-3.5 text-xs text-[#AAB3C0] leading-relaxed flex items-start gap-3">
        <span 
          className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 mt-0.5"
          style={{ 
            color: meta.color, 
            backgroundColor: `${meta.color}15`,
            border: `1px solid ${meta.color}30`
          }}
        >
          // SITUATION
        </span>
        <p className="text-[#F4F6F8] text-xs">{scenario.context}</p>
      </div>

      {/* Simulated Incident Box */}
      <div 
        className="rounded-2xl border border-[#273347] bg-[#131925] p-5 sm:p-7 shadow-xl shadow-black/60 space-y-4"
        style={{ borderTop: `2px solid ${meta.color}` }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#273347] pb-3 text-xs">
          <div className="flex items-center gap-2">
            <CategoryIcon className="w-4 h-4 shrink-0" style={{ color: meta.color }} />
            <div>
              <span className="text-[10px] text-[#6F7B8A] uppercase block font-bold">
                INCIDENT // {scenario.source}
              </span>
              <p className="text-[#F4F6F8] font-semibold text-xs mt-0.5">{scenario.sender}</p>
            </div>
          </div>
          <span 
            className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider self-start sm:self-auto"
            style={{ 
              color: meta.color, 
              backgroundColor: `${meta.color}15`,
              border: `1px solid ${meta.color}30`
            }}
          >
            {meta.name}
          </span>
        </div>

        <div className="space-y-2 py-1">
          <p className="text-xs text-[#F4F6F8] font-bold flex items-center gap-1.5">
            <span className="text-[#6F7B8A]">Subject:</span>
            <span>{scenario.subject}</span>
          </p>
          <div className="rounded-xl border border-[#273347] bg-[#0D1119] p-3.5 text-xs text-[#AAB3C0] leading-relaxed select-text">
            "{scenario.body}"
          </div>
        </div>

        {/* Action Prompt */}
        <div className="pt-3 border-t border-[#273347] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#F4F6F8] uppercase tracking-wider block">
              WHAT DO YOU DO?
            </span>
            <span className="text-[10px] text-[#6F7B8A]">SELECT YOUR ACTION</span>
          </div>

          {/* 4 Decision Options */}
          <div className="space-y-2">
            {scenario.options.map((option, idx) => {
              const isSelected = selectedOptId === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(option.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer group ${
                    isSelected
                      ? 'border-[#39C6E8] bg-[#192131] text-[#F4F6F8] scale-[1.01] shadow-lg shadow-black/50'
                      : 'border-[#273347] bg-[#0D1119] text-[#AAB3C0] hover:border-[#3A4B68] hover:text-[#F4F6F8] hover:bg-[#161D2B] hover:translate-x-0.5'
                  }`}
                  style={isSelected ? { borderColor: meta.color, backgroundColor: `${meta.color}15` } : {}}
                >
                  <span 
                    className="text-xs font-bold transition-colors mt-0.5 shrink-0 px-1.5 py-0.5 rounded bg-[#131925] border border-[#273347]"
                    style={isSelected ? { color: meta.color, borderColor: meta.color } : { color: '#6F7B8A' }}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-xs leading-relaxed font-normal flex-1">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

