import React from 'react';

export default function AssessmentProgress({ currentIndex, totalCount, categoryColor = '#39C6E8' }) {
  const progressPercent = Math.round(((currentIndex + 1) / totalCount) * 100);
  const formattedIndex = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalCount).padStart(2, '0');

  return (
    <div className="w-full max-w-2xl mx-auto space-y-2 mb-6 font-mono">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#39C6E8]" />
          <span className="text-[#F4F6F8] font-bold tracking-wider uppercase text-[11px]">
            DIGITAL INSTINCTS CALIBRATION
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#6F7B8A]">{progressPercent}%</span>
          <span className="text-[#39C6E8] font-bold text-xs bg-[#192131] border border-[#273347] px-2 py-0.5 rounded-md">
            {formattedIndex} / {formattedTotal}
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-1.5 rounded-full bg-[#0D1119] border border-[#273347] overflow-hidden p-0.5">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{ 
            width: `${progressPercent}%`,
            backgroundColor: categoryColor 
          }}
        />
      </div>
    </div>
  );
}

