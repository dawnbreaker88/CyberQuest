import React from 'react';

export default function QuestPath({ pathRef }) {
  return (
    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 pointer-events-none hidden md:block">
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 32 1200"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Background track line */}
        <line
          x1="16"
          y1="40"
          x2="16"
          y2="1160"
          stroke="#24272C"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Animated progressive path line */}
        <line
          ref={pathRef}
          x1="16"
          y1="40"
          x2="16"
          y2="1160"
          stroke="#F1F1EF"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
