import React, { useState, useRef, useEffect } from 'react';
import { initSectionReveal } from '../../animations/landingAnimations';
import { Shield, Eye, AlertTriangle, Send, Sparkles } from 'lucide-react';

export default function GameplayPreview() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const [selectedAction, setSelectedAction] = useState('inspect'); // 'open' | 'inspect' | 'report'

  useEffect(() => {
    const tween = initSectionReveal(cardRef.current, { y: 25, duration: 0.8 });
    return () => {
      if (tween) tween.kill();
    };
  }, []);

  return (
    <section
      id="preview"
      ref={sectionRef}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#080B12] border-t border-[#1C2433] font-mono"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 bg-[#39C6E8]/10 text-[#39C6E8] px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
            <Eye className="w-3 h-3" />
            LIVE SIMULATION PREVIEW
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#F4F6F8] uppercase leading-tight">
            THINK BEFORE YOU CLICK.
          </h2>

          <p className="text-xs sm:text-sm text-[#AAB3C0] max-w-lg font-normal leading-relaxed">
            Every challenge places you inside a realistic scenario where you make the call under pressure.
          </p>
        </div>

        {/* Fictional Scenario Preview Box */}
        <div
          ref={cardRef}
          className="cq-card rounded-2xl p-5 sm:p-8 shadow-2xl relative overflow-hidden text-left"
          style={{ borderTop: '2px solid #39C6E8' }}
        >
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-[#273347] pb-3 mb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#AAB3C0]">
              <Shield className="w-3.5 h-3.5 text-[#39C6E8]" />
              <span className="font-bold text-[#F4F6F8]">SCENARIO 01</span>
              <span className="text-[#6F7B8A]">//</span>
              <span>PHISHING TRAP</span>
            </div>
            <span className="text-[10px] font-mono text-[#39C6E8] bg-[#39C6E8]/10 border border-[#39C6E8]/30 px-2 py-0.5 rounded uppercase font-bold">
              NOVICE CALIBRATION
            </span>
          </div>

          {/* Simulated Email Interface */}
          <div className="rounded-xl border border-[#273347] bg-[#0D1119] p-4 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#273347] pb-3">
              <div>
                <p className="text-xs font-bold text-[#F4F6F8]">CAMPUS IT SECURITY ALERT</p>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px]">
                  <span className="text-[#6F7B8A]">From:</span>
                  <span className={`px-1.5 py-0.5 rounded transition-colors ${
                    selectedAction === 'inspect'
                      ? 'bg-[#39C6E8]/20 text-[#39C6E8] font-bold border border-[#39C6E8]/40'
                      : 'text-[#AAB3C0]'
                  }`}>
                    security@univer<span className="underline underline-offset-2 font-bold text-[#FF7468]">5</span>ity.example
                  </span>
                  {selectedAction === 'inspect' && (
                    <span className="text-[10px] text-[#FFB84D] bg-[#FFB84D]/10 border border-[#FFB84D]/30 px-1.5 py-0.2 rounded">
                      TYPO DETECTED ("5" instead of "s")
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[10px] text-[#6F7B8A]">10:42 AM</span>
            </div>

            <div className="space-y-2.5 py-1">
              <p className="text-xs text-[#F4F6F8] font-medium leading-relaxed">
                Your campus credentials require immediate verification within 2 hours to prevent account lockout.
              </p>
              
              <div className="pt-1">
                <div className="inline-block rounded-lg border border-[#273347] bg-[#131925] px-3.5 py-1.5 text-xs text-[#39C6E8] font-bold">
                  [ VERIFY ACCOUNT PORTAL → ]
                </div>
              </div>
            </div>
          </div>

          {/* Decision Buttons Interface */}
          <div className="mt-5 pt-4 border-t border-[#273347] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#F4F6F8] uppercase tracking-wider block">
                WHAT IS YOUR ACTION?
              </span>
              <span className="text-[10px] text-[#6F7B8A]">
                CLICK TO TEST OUTCOME
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 text-xs">
              <button
                onClick={() => setSelectedAction('open')}
                className={`py-2.5 px-3 rounded-xl border transition-all text-center cursor-pointer font-bold ${
                  selectedAction === 'open'
                    ? 'border-[#FF7468] bg-[#FF7468]/15 text-[#FF7468]'
                    : 'border-[#273347] bg-[#0D1119] text-[#AAB3C0] hover:text-[#F4F6F8] hover:border-[#3A4B68]'
                }`}
              >
                [ OPEN LINK ]
              </button>

              <button
                onClick={() => setSelectedAction('inspect')}
                className={`py-2.5 px-3 rounded-xl border transition-all text-center cursor-pointer font-bold ${
                  selectedAction === 'inspect'
                    ? 'border-[#39C6E8] bg-[#39C6E8]/15 text-[#39C6E8] shadow-sm'
                    : 'border-[#273347] bg-[#0D1119] text-[#AAB3C0] hover:text-[#F4F6F8] hover:border-[#3A4B68]'
                }`}
              >
                [ INSPECT DOMAIN ]
              </button>

              <button
                onClick={() => setSelectedAction('report')}
                className={`py-2.5 px-3 rounded-xl border transition-all text-center cursor-pointer font-bold ${
                  selectedAction === 'report'
                    ? 'border-[#73D6B1] bg-[#73D6B1]/15 text-[#73D6B1]'
                    : 'border-[#273347] bg-[#0D1119] text-[#AAB3C0] hover:text-[#F4F6F8] hover:border-[#3A4B68]'
                }`}
              >
                [ REPORT THREAT ]
              </button>
            </div>

            {/* Decision Feedback Box */}
            <div className="rounded-xl border border-[#273347] bg-[#0D1119] p-3.5 text-xs text-[#AAB3C0] leading-relaxed">
              {selectedAction === 'inspect' && (
                <div className="space-y-1">
                  <span className="font-bold text-[#39C6E8] flex items-center gap-1.5 text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    INSPECTION SUCCEEDED (+100 XP):
                  </span>
                  <span>
                    Examining the sender revealed a subtle character substitution (<span className="text-[#F4F6F8] font-bold">univer5ity.example</span>). Attackers rely on panic to bypass inspection.
                  </span>
                </div>
              )}
              {selectedAction === 'open' && (
                <div className="space-y-1">
                  <span className="font-bold text-[#FF7468] flex items-center gap-1.5 text-xs">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    RISKY MOVE (TRAP TRIGGERED):
                  </span>
                  <span>
                    Opening unverified links exposes credentials to spoofed harvested login forms. Always inspect the domain first.
                  </span>
                </div>
              )}
              {selectedAction === 'report' && (
                <div className="space-y-1">
                  <span className="font-bold text-[#73D6B1] flex items-center gap-1.5 text-xs">
                    <Shield className="w-3.5 h-3.5" />
                    THREAT NEUTRALIZED (+150 XP):
                  </span>
                  <span>
                    Reporting malicious lures alerts defenders and blocks the spoofed infrastructure campus-wide.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

