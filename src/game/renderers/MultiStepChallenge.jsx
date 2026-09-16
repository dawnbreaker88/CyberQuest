import React, { useState } from 'react';
import {
  GitBranch,
  Phone,
  Mail,
  User,
  Shield,
  ShieldAlert,
  AlertTriangle,
  ArrowRight,
  Info,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export default function MultiStepChallenge({ challenge, session, onAction }) {
  const { content } = challenge;
  const currentStepId = session?.currentStepId || content.steps[0]?.id;
  const currentStep = content.steps.find((s) => s.id === currentStepId) || content.steps[0];

  const [revealedClues, setRevealedClues] = useState({});

  const handleInspectClue = (idx, clue) => {
    setRevealedClues((prev) => ({
      ...prev,
      [`${currentStep.id}_${idx}`]: clue,
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 text-left font-sans animate-in fade-in duration-300">
      
      {/* Scenario Context Header Card */}
      <div className="p-4 rounded-xl bg-[#0D1119] border border-[#273347] space-y-1.5 font-mono">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-[#9D91E8]" />
            <span className="text-xs font-bold text-[#F4F6F8] uppercase tracking-wider">
              MULTI-STAGE INCIDENT RESPONSE
            </span>
          </div>
          <div className="text-[11px] text-[#39C6E8] bg-[#131925] border border-[#273347] px-2.5 py-0.5 rounded-full font-bold">
            STAGE {currentStep.stepNumber} OF {content.steps.length}
          </div>
        </div>
        <p className="text-xs text-[#AAB3C0] font-sans">
          {content.scenarioBrief}
        </p>
      </div>

      {/* Main Interactive Stage Container */}
      <div className="cq-card rounded-2xl border border-[#273347] bg-[#131925] shadow-2xl overflow-hidden">
        
        {/* Stage Title Bar */}
        <div className="px-6 py-3.5 bg-[#0D1119] border-b border-[#273347] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9D91E8]" />
            <span className="font-bold text-[#F4F6F8]">{currentStep.contextTitle}</span>
          </div>
          <span className="text-[11px] text-[#6F7B8A]">
            Decision Point #{currentStep.stepNumber}
          </span>
        </div>

        {/* Dialogue & Incident Feed */}
        <div className="p-6 space-y-4 bg-[#0F1420]">
          {currentStep.dialogue?.map((item, idx) => {
            const isPhone = item.role === 'phone_call';
            const isSystem = item.role === 'system';
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border space-y-2 transition-all ${
                  isPhone
                    ? 'bg-[#131925] border-[#73D6B1]/40'
                    : isSystem
                    ? 'bg-[#131925] border-[#FF7468]/40'
                    : 'bg-[#131925] border-[#273347]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    {isPhone ? (
                      <Phone className="w-3.5 h-3.5 text-[#73D6B1]" />
                    ) : isSystem ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-[#FF7468]" />
                    ) : (
                      <Mail className="w-3.5 h-3.5 text-[#39C6E8]" />
                    )}
                    <span className="font-bold text-[#F4F6F8]">{item.sender}</span>
                  </div>
                  <span className="text-[10px] text-[#6F7B8A]">{item.timestamp}</span>
                </div>

                <p className="text-sm text-[#AAB3C0] leading-relaxed font-sans">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Step Clues Section */}
        {currentStep.inspectableClues && currentStep.inspectableClues.length > 0 && (
          <div className="px-6 py-3 bg-[#080B12] border-t border-b border-[#273347] space-y-2 font-mono text-xs">
            <span className="text-[10px] font-bold text-[#9D91E8] uppercase tracking-wider block">
              SITUATIONAL INTELLIGENCE:
            </span>
            <div className="space-y-1.5">
              {currentStep.inspectableClues.map((clue, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[#AAB3C0] text-xs">
                  <span className="text-[#9D91E8] font-bold">•</span>
                  <span>{clue}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Decision Action Buttons */}
        <div className="p-6 bg-[#0D1119] space-y-3 font-mono">
          <span className="text-[11px] font-bold text-[#F4F6F8] uppercase tracking-wider block text-left">
            CHOOSE YOUR NEXT ACTION:
          </span>

          <div className="grid grid-cols-1 gap-2.5">
            {currentStep.availableActions?.map((action) => {
              const isDanger = action.variant === 'danger';
              const isPrimary = action.variant === 'primary';
              return (
                <button
                  key={action.id}
                  onClick={() => onAction(action)}
                  className={`w-full p-4 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between gap-3 cursor-pointer shadow-md ${
                    isPrimary
                      ? 'bg-[#192131] border-[#39C6E8] text-[#F4F6F8] hover:bg-[#202A38]'
                      : isDanger
                      ? 'bg-[#FF7468]/10 hover:bg-[#FF7468]/20 text-[#FF7468] border-[#FF7468]/30'
                      : 'bg-[#131925] border-[#273347] text-[#AAB3C0] hover:text-[#F4F6F8] hover:border-[#3A4B68]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono ${
                        isPrimary
                          ? 'bg-[#39C6E8]/20 text-[#39C6E8]'
                          : isDanger
                          ? 'bg-[#FF7468]/20 text-[#FF7468]'
                          : 'bg-[#192131] text-[#AAB3C0]'
                      }`}
                    >
                      →
                    </div>
                    <span>{action.label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 shrink-0 opacity-60" />
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
