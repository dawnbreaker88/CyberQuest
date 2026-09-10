import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function ExperienceSelector({ selected, onSelect, onNext }) {
  const options = [
    { id: 'beginner', label: "I'M NEW TO THIS", desc: 'Little to no previous cybersecurity background' },
    { id: 'basic', label: 'I KNOW THE BASICS', desc: 'Familiar with common passwords and obvious spam' },
    { id: 'comfortable', label: "I'M PRETTY COMFORTABLE", desc: 'Can spot subtle phishing and lookalike domains' },
    { id: 'advanced', label: 'I KNOW MY STUFF', desc: 'Experienced with security concepts and threat analysis' },
  ];

  return (
    <div className="space-y-6 max-w-xl mx-auto text-left animate-in fade-in duration-300 font-mono">
      
      {/* Step Header */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 bg-[#39C6E8]/10 text-[#39C6E8] px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
          CALIBRATION // STEP 01 OF 02
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#F4F6F8] uppercase leading-tight">
          HOW COMFORTABLE ARE YOU WITH CYBERSECURITY?
        </h2>
        <p className="text-xs text-[#AAB3C0]">
          We calibrate your starting difficulty and quest milestones.
        </p>
      </div>

      {/* Options List */}
      <div className="space-y-2.5">
        {options.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              className={`w-full text-left p-3.5 rounded-xl border font-mono transition-all flex items-start justify-between gap-4 cursor-pointer ${
                isSelected
                  ? 'border-[#39C6E8] bg-[#192131] text-[#F4F6F8] shadow-md shadow-black/40'
                  : 'border-[#273347] bg-[#131925] text-[#AAB3C0] hover:border-[#3A4B68] hover:text-[#F4F6F8] hover:bg-[#161D2B]'
              }`}
            >
              <div className="space-y-0.5">
                <span className={`text-xs font-bold block ${isSelected ? 'text-[#39C6E8]' : 'text-[#F4F6F8]'}`}>
                  {opt.label}
                </span>
                <span className="text-[11px] text-[#6F7B8A] font-normal block">{opt.desc}</span>
              </div>

              <div className={`h-4 w-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                isSelected ? 'border-[#39C6E8] bg-[#39C6E8] text-[#080B12]' : 'border-[#273347] bg-[#0D1119]'
              }`}>
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Action */}
      <div className="pt-2">
        <button
          onClick={onNext}
          className="w-full sm:w-auto btn-cq-primary cursor-pointer"
        >
          <span>CONTINUE</span>
          <ArrowRight className="w-4 h-4 arrow-icon" />
        </button>
      </div>

    </div>
  );
}

