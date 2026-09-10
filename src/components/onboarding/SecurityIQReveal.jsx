import React, { useRef, useEffect } from 'react';
import { animateSecurityIQCount, animateCategoryBars } from '../../animations/onboardingAnimations';
import { Shield, Key, QrCode, AlertTriangle, UserCheck } from 'lucide-react';

export default function SecurityIQReveal({ securityIQ, baselineScores, onCountComplete }) {
  const countRef = useRef(null);
  const barsRef = useRef([]);

  const categories = [
    { key: 'phishing', label: 'PHISHING', color: '#39C6E8', icon: Shield },
    { key: 'passwords', label: 'PASSWORDS', color: '#73D6B1', icon: Key },
    { key: 'qr', label: 'QR SAFETY', color: '#FFB84D', icon: QrCode },
    { key: 'scams', label: 'SCAMS', color: '#FF7468', icon: AlertTriangle },
    { key: 'socialEngineering', label: 'SOCIAL ENGINEERING', color: '#9D91E8', icon: UserCheck },
  ];

  const scoresList = categories.map((c) => baselineScores[c.key] || 50);

  useEffect(() => {
    animateSecurityIQCount(countRef.current, securityIQ, onCountComplete);
    animateCategoryBars(barsRef.current, scoresList);
  }, [securityIQ]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5 font-mono text-left">
      
      {/* Big Security IQ Hero Gauge */}
      <div className="rounded-2xl border border-[#273347] bg-[#131925] p-6 sm:p-8 shadow-2xl text-center space-y-3 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 bg-[#39C6E8]/10 text-[#39C6E8] px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#39C6E8]" />
          CALIBRATION COMPLETE // BASELINE ESTABLISHED
        </div>

        <h2 className="text-sm font-bold text-[#AAB3C0] uppercase tracking-wider">
          YOUR SECURITY IQ
        </h2>

        <div className="py-1 flex items-center justify-center">
          <div className="relative inline-flex items-center justify-center">
            <span
              ref={countRef}
              className="text-6xl sm:text-7xl font-extrabold text-[#F4F6F8] tracking-tight font-mono block"
            >
              0
            </span>
          </div>
        </div>

        <div className="space-y-0.5 max-w-sm mx-auto pt-2 border-t border-[#273347] text-xs text-[#AAB3C0]">
          <p className="text-[#39C6E8] font-bold">YOUR INSTINCTS ARE CALIBRATED</p>
          <p className="text-[#6F7B8A] text-[11px]">This is your starting baseline. Every quest will level this up.</p>
        </div>
      </div>

      {/* Category Mastery Breakdown */}
      <div className="rounded-2xl border border-[#273347] bg-[#131925] p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#273347] pb-2.5">
          <span className="text-xs font-bold text-[#F4F6F8] uppercase tracking-wider">
            CATEGORY INSTINCT BREAKDOWN
          </span>
          <span className="text-[10px] text-[#6F7B8A] uppercase">
            SCALE: 0–100
          </span>
        </div>

        <div className="space-y-3 pt-1">
          {categories.map((cat, idx) => {
            const score = baselineScores[cat.key] || 50;
            const Icon = cat.icon;
            return (
              <div key={cat.key} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                    <span className="text-[#AAB3C0] font-semibold text-[11px]">{cat.label}</span>
                  </div>
                  <span className="font-bold text-xs" style={{ color: cat.color }}>{score}%</span>
                </div>

                <div className="w-full h-2 rounded-full bg-[#0D1119] border border-[#273347] overflow-hidden p-0.5">
                  <div
                    ref={(el) => (barsRef.current[idx] = el)}
                    className="h-full rounded-full transition-all duration-700"
                    style={{ 
                      width: '0%',
                      backgroundColor: cat.color 
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

