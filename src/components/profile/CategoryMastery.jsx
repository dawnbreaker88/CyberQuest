import React from 'react';
import { Shield, Key, QrCode, AlertTriangle, UserCheck } from 'lucide-react';

export default function CategoryMastery({ categoriesRef, categoryBarsRef, scores = {} }) {
  const categoryDefs = [
    { key: 'phishing', label: 'PHISHING', color: '#39C6E8', icon: Shield, desc: 'Deceptive senders & lookalike URLs' },
    { key: 'passwords', label: 'PASSWORDS', color: '#73D6B1', icon: Key, desc: 'Passphrases, entropy & 2FA' },
    { key: 'qr', label: 'QR SAFETY', color: '#FFB84D', icon: QrCode, desc: 'Tamper stickers & malicious quishing' },
    { key: 'scams', label: 'SCAMS', color: '#FF7468', icon: AlertTriangle, desc: 'Urgency levers & financial lures' },
    { key: 'socialEngineering', label: 'SOCIAL ENGINEERING', color: '#9D91E8', icon: UserCheck, desc: 'Authority impostors & vishing' },
  ];

  return (
    <div
      ref={categoriesRef}
      className="cq-card rounded-2xl p-5 sm:p-7 shadow-xl font-mono text-left space-y-4"
    >
      <div className="flex items-center justify-between border-b border-[#273347] pb-2.5">
        <span className="text-[11px] font-bold text-[#F4F6F8] uppercase tracking-wider">
          CATEGORY MASTERY
        </span>
        <span className="text-[9px] text-[#6F7B8A] uppercase font-bold">
          LIVE INDEX
        </span>
      </div>

      <div className="space-y-4">
        {categoryDefs.map((cat, idx) => {
          const score = scores[cat.key] || 50;
          const Icon = cat.icon;
          return (
            <div key={cat.key} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: cat.color }} />
                  <div>
                    <span className="text-[#F4F6F8] font-bold text-[11px]">{cat.label}</span>
                    <span className="text-[10px] text-[#6F7B8A] font-normal block sm:inline sm:ml-2">
                      {cat.desc}
                    </span>
                  </div>
                </div>
                <span className="font-bold text-xs shrink-0" style={{ color: cat.color }}>
                  {score}%
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-[#0D1119] border border-[#273347] overflow-hidden p-0.5">
                <div
                  ref={(el) => {
                    if (categoryBarsRef && categoryBarsRef.current) {
                      categoryBarsRef.current[idx] = el;
                    }
                  }}
                  className="h-full rounded-full transition-all duration-700"
                  style={{ 
                    width: `${score}%`,
                    backgroundColor: cat.color 
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

