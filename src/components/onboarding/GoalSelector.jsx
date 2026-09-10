import React from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

export default function GoalSelector({ selectedGoals, onToggleGoal, onNext, onBack }) {
  const goalOptions = [
    { id: 'phishing', label: 'SPOTTING PHISHING', category: 'Phishing', color: '#39C6E8', desc: 'Detecting deceptive links and fake login portals' },
    { id: 'passwords', label: 'PROTECTING ACCOUNTS', category: 'Passwords', color: '#73D6B1', desc: 'Mastering entropy, 2FA, and credential stuffing' },
    { id: 'scams', label: 'AVOIDING SCAMS', category: 'Scams', color: '#FF7468', desc: 'Urgent wire requests, fake deliveries, and bots' },
    { id: 'qr', label: 'QR CODE SAFETY', category: 'QR Safety', color: '#FFB84D', desc: 'Quishing and malicious terminal overlay stickers' },
    { id: 'socialEngineering', label: 'SOCIAL DECEPTION', category: 'Social Eng.', color: '#9D91E8', desc: 'Outsmarting authority impersonation and vishing' },
    { id: 'testing', label: 'TEST MY LIMITS', category: 'All Tracks', color: '#FFC96B', desc: 'Full-spectrum cyber threat instinct testing' },
  ];

  const hasSelection = selectedGoals && selectedGoals.length > 0;

  return (
    <div className="space-y-6 max-w-xl mx-auto text-left animate-in fade-in duration-300 font-mono">
      
      {/* Step Header */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 bg-[#73D6B1]/10 text-[#73D6B1] px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
          CALIBRATION // STEP 02 OF 02
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#F4F6F8] uppercase leading-tight">
          WHAT DO YOU WANT TO GET BETTER AT?
        </h2>
        <p className="text-xs text-[#AAB3C0]">
          Select one or more challenge areas to prioritize in your journey.
        </p>
      </div>

      {/* Multi-Select Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {goalOptions.map((goal) => {
          const isSelected = selectedGoals.includes(goal.id);
          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => onToggleGoal(goal.id)}
              className={`text-left p-3.5 rounded-xl border font-mono transition-all flex flex-col justify-between gap-2.5 cursor-pointer ${
                isSelected
                  ? 'border-[#39C6E8] bg-[#192131] text-[#F4F6F8] shadow-md shadow-black/40'
                  : 'border-[#273347] bg-[#131925] text-[#AAB3C0] hover:border-[#3A4B68] hover:text-[#F4F6F8] hover:bg-[#161D2B]'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span 
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                    style={{ 
                      color: goal.color, 
                      backgroundColor: `${goal.color}15`, 
                      border: `1px solid ${goal.color}30` 
                    }}
                  >
                    {goal.category}
                  </span>
                  <div className={`h-3.5 w-3.5 rounded border flex items-center justify-center transition-colors ${
                    isSelected ? 'border-[#39C6E8] bg-[#39C6E8] text-[#080B12]' : 'border-[#273347] bg-[#0D1119]'
                  }`}>
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </div>

                <span className={`text-xs font-bold block ${isSelected ? 'text-[#F4F6F8]' : 'text-[#AAB3C0]'}`}>
                  {goal.label}
                </span>
                <span className="text-[10px] text-[#6F7B8A] font-normal block leading-snug">
                  {goal.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#6F7B8A] hover:text-[#F4F6F8] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK</span>
        </button>

        <button
          onClick={onNext}
          disabled={!hasSelection}
          className="btn-cq-primary cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
        >
          <span>BEGIN BASELINE ASSESSMENT</span>
          <ArrowRight className="w-4 h-4 arrow-icon" />
        </button>
      </div>

    </div>
  );
}

