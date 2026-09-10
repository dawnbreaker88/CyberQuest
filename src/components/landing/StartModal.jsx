import React, { useState } from 'react';

export default function StartModal({ isOpen, onClose }) {
  const [handle, setHandle] = useState('');
  const [isLaunched, setIsLaunched] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLaunched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0C0E]/90 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="start-modal-title"
        className="relative w-full max-w-md rounded-2xl border border-[#24272C] bg-[#111316] p-7 text-[#F1F1EF] shadow-2xl shadow-black/80"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#24272C] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#F1F1EF]" />
            <h3 id="start-modal-title" className="text-xs font-bold tracking-wider uppercase font-mono">
              CYBERQUEST // ACCESS
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-xs text-[#969AA1] hover:text-[#F1F1EF] p-1"
          >
            ✕
          </button>
        </div>

        {!isLaunched ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <h4 className="text-xl font-bold tracking-tight text-[#F1F1EF]">
                Begin your quest.
              </h4>
              <p className="text-xs text-[#969AA1] leading-relaxed">
                Enter your identifier to start practicing. Your progress will be saved automatically.
              </p>
            </div>

            <div className="space-y-1.5 pt-1">
              <label htmlFor="agent-handle" className="text-[10px] font-mono uppercase text-[#696D74] tracking-wider block">
                AGENT HANDLE OR EMAIL
              </label>
              <input
                id="agent-handle"
                type="text"
                required
                placeholder="e.g. alex@workspace.com"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full rounded-lg border border-[#24272C] bg-[#0B0C0E] px-3.5 py-2.5 text-xs text-[#F1F1EF] placeholder-[#696D74] focus:border-[#C7CDD4] focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#F1F1EF] py-2.5 text-xs font-bold text-[#0B0C0E] hover:bg-[#C7CDD4] transition-all"
            >
              <span>ENTER THE PLATFORM</span>
              <span>→</span>
            </button>
          </form>
        ) : (
          <div className="py-4 text-center space-y-4">
            <div className="h-8 w-8 mx-auto rounded-full border border-[#24272C] bg-[#16181B] flex items-center justify-center text-xs font-mono text-[#F1F1EF]">
              ✓
            </div>
            <h4 className="text-base font-bold text-[#F1F1EF]">
              Identity Registered
            </h4>
            <p className="text-xs text-[#969AA1] max-w-xs mx-auto">
              Preparing your personalized practice curriculum for <span className="text-[#F1F1EF] font-mono">{handle}</span>...
            </p>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-lg border border-[#24272C] bg-[#16181B] px-5 py-2 text-xs font-semibold text-[#F1F1EF] hover:bg-[#24272C]"
            >
              <span>Launch CyberQuest</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
