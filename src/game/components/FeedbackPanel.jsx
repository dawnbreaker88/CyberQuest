import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  Lightbulb,
} from 'lucide-react';

export default function FeedbackPanel({ feedback, onNext, isLastChallenge = false }) {
  const panelRef = useRef(null);
  const xpRef = useRef(null);

  useEffect(() => {
    if (!feedback) return;

    const ctx = gsap.context(() => {
      // Slide & fade in the feedback panel
      gsap.from(panelRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.45,
        ease: 'power3.out',
      });

      // Animate XP counter if XP gained
      if (feedback.xp > 0 && xpRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: feedback.xp,
          duration: 0.7,
          ease: 'power2.out',
          onUpdate: () => {
            if (xpRef.current) {
              xpRef.current.innerText = `+${Math.round(obj.val)} XP`;
            }
          },
        });
      }
    }, panelRef);

    return () => ctx.revert();
  }, [feedback]);

  if (!feedback) return null;

  const isCorrect = feedback.outcome === 'correct';
  const isPartial = feedback.outcome === 'partial';
  const isWrong = feedback.outcome === 'wrong';

  const themeColor = isCorrect ? '#73D6B1' : isPartial ? '#FFB84D' : '#FF7468';
  const borderColor = isCorrect
    ? 'border-[#73D6B1]/40'
    : isPartial
    ? 'border-[#FFB84D]/40'
    : 'border-[#FF7468]/40';
  const bgColor = isCorrect
    ? 'bg-[#73D6B1]/10'
    : isPartial
    ? 'bg-[#FFB84D]/10'
    : 'bg-[#FF7468]/10';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080B12]/80 backdrop-blur-md overflow-y-auto">
      <div
        ref={panelRef}
        className={`w-full max-w-2xl rounded-2xl border ${borderColor} bg-[#131925] p-6 sm:p-8 shadow-2xl space-y-6 text-left font-sans my-auto`}
      >
        {/* Outcome Header Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#273347] pb-4 font-mono">
          <div className="flex items-center gap-2.5">
            {isCorrect && <CheckCircle2 className="w-6 h-6 text-[#73D6B1]" />}
            {isPartial && <AlertTriangle className="w-6 h-6 text-[#FFB84D]" />}
            {isWrong && <XCircle className="w-6 h-6 text-[#FF7468]" />}

            <div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${bgColor}`}
                style={{ color: themeColor }}
              >
                {isCorrect
                  ? 'DECISION: CORRECT'
                  : isPartial
                  ? 'DECISION: PARTIAL'
                  : 'DECISION: INCIDENT'}
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#F4F6F8] tracking-tight mt-1">
                {feedback.title}
              </h2>
            </div>
          </div>

          {/* XP Reward Badge */}
          {feedback.xp > 0 && (
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0D1119] border border-[#FFB84D]/30 text-sm font-bold text-[#FFB84D] shrink-0 self-start sm:self-auto">
              <Sparkles className="w-4 h-4 text-[#FFB84D]" />
              <span ref={xpRef}>+{feedback.xp} XP</span>
            </div>
          )}
        </div>

        {/* Detailed Explanation */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-[#6F7B8A] uppercase tracking-wider block">
            DEBRIEF & THREAT ANALYSIS
          </span>
          <p className="text-sm sm:text-base text-[#F4F6F8] leading-relaxed">
            {feedback.explanation}
          </p>
        </div>

        {/* Clues Uncovered Breakdown */}
        {feedback.cluesUncovered && feedback.cluesUncovered.length > 0 && (
          <div className="p-4 rounded-xl bg-[#0D1119] border border-[#273347] space-y-2 font-mono text-xs">
            <span className="text-[10px] font-bold text-[#39C6E8] uppercase tracking-wider block">
              KEY SIGNALS UNCOVERED:
            </span>
            <div className="space-y-1.5">
              {feedback.cluesUncovered.map((clue, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[#AAB3C0]">
                  <span className="text-[#39C6E8] font-bold">✓</span>
                  <span>{clue}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Core Instinct Rule Callout */}
        {feedback.rule && (
          <div className="p-4 rounded-xl bg-[#192131] border border-[#39C6E8]/30 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#39C6E8] shrink-0 mt-0.5" />
            <div className="space-y-0.5 font-sans">
              <span className="text-[10px] font-mono font-bold text-[#39C6E8] uppercase tracking-wider block">
                CYBER INSTINCT RULE
              </span>
              <p className="text-xs sm:text-sm text-[#F4F6F8] font-medium leading-relaxed">
                {feedback.rule}
              </p>
            </div>
          </div>
        )}

        {/* Action Button to Next Challenge */}
        <div className="pt-2 flex justify-end font-mono">
          <button
            onClick={onNext}
            className="btn-cq-primary w-full sm:w-auto px-7 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10"
          >
            <span>{isLastChallenge ? 'COMPLETE QUEST' : 'NEXT CHALLENGE'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
