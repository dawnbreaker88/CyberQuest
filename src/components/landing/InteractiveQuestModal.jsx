import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, Trophy, Award, Sparkles, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';

const QUEST_QUESTIONS = [
  {
    id: 1,
    category: "PHISHING SIMULATION",
    threatTitle: "Urgent Payroll Direct Deposit Update",
    sender: "HR Portal <support@hr-payroll-update.co>",
    body: "Notice: We failed to process your direct deposit for this month due to an outdated tax form. Click the link below to verify your SSN and bank details within 3 hours to avoid delayed salary payout.",
    options: [
      { id: 'a', text: "Click link immediately to prevent salary delay", isCorrect: false, explanation: "Never click urgent credential links! The domain hr-payroll-update.co is an external spoofed domain." },
      { id: 'b', text: "Inspect sender domain & report directly to SecOps", isCorrect: true, explanation: "Correct! The domain is suspicious and legitimate HR systems do not use panic countdowns." },
      { id: 'c', text: "Forward email to your personal Gmail to check later", isCorrect: false, explanation: "Forwarding potential malware to personal accounts leaks organizational exposure." }
    ]
  },
  {
    id: 2,
    category: "QR DETECTIVE",
    threatTitle: "Coffee Shop Parking Discount QR Code",
    sender: "Physical Sticker pasted over the parking meter display",
    body: "You see a fresh QR code sticker pasted OVER the official parking meter with the text: 'Scan for 50% discount and contactless payment via FastPay'.",
    options: [
      { id: 'a', text: "Scan and enter your card details on the mobile landing page", isCorrect: false, explanation: "This is 'Quishing' (QR Phishing). Attackers paste fake stickers over physical kiosks." },
      { id: 'b', text: "Peel sticker / pay exclusively via official terminal buttons", isCorrect: true, explanation: "Spot on! Physical tamper stickers over official payment hardware are high-risk fraud traps." },
      { id: 'c', text: "Scan code with camera just to see what URL opens", isCorrect: false, explanation: "Opening untrusted QR redirects can trigger drive-by exploit kits or credential traps." }
    ]
  },
  {
    id: 3,
    category: "SOCIAL ENGINEERING",
    threatTitle: "Urgent Boss WhatsApp Message",
    sender: "+1 (555) 019-3829 (Profile photo is your VP)",
    body: "Hey, I'm stuck in an executive boardroom meeting with no signal. I need you to purchase 4 Apple gift cards worth $200 each for the client presentation and text the claim codes here right away. Do not call, I'm presenting.",
    options: [
      { id: 'a', text: "Rush to purchase to impress the VP", isCorrect: false, explanation: "Classic CEO/Executive impersonation scam utilizing urgency and secrecy." },
      { id: 'b', text: "Verify with VP through official internal company Slack or office desk", isCorrect: true, explanation: "Outstanding decision! Always verify unusual financial requests via an out-of-band verified channel." },
      { id: 'c', text: "Ask for their corporate card details in WhatsApp", isCorrect: false, explanation: "Engaging with the scammer still acknowledges the attack vector." }
    ]
  }
];

export default function InteractiveQuestModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const currentQ = QUEST_QUESTIONS[currentStep];

  const handleSelectOption = (opt) => {
    if (showResult) return;
    setSelectedOption(opt);
    setShowResult(true);
    if (opt.isCorrect) {
      setScore((prev) => prev + 500);
    }
  };

  const handleNext = () => {
    if (currentStep < QUEST_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback gracefully if canvas context is unavailable
      }
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-2xl rounded-2xl border border-cyan-500/40 bg-[#0B1120] p-6 shadow-2xl shadow-cyan-500/20 text-slate-100 overflow-hidden"
      >
        {/* Decorative corner markers */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-400/40 text-cyan-400">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h2 id="modal-title" className="font-heading text-lg font-bold tracking-tight text-white flex items-center gap-2">
                CYBERQUEST LIVE SCENARIO LAB
                <span className="rounded bg-cyan-500/20 px-2 py-0.5 font-mono text-[10px] text-cyan-300 font-bold border border-cyan-500/30">
                  DEMO
                </span>
              </h2>
              <p className="text-xs text-slate-400">Test your real-world instincts. What would you do?</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close scenario modal"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!isCompleted ? (
          <div>
            {/* Progress Bar & Stage Indicator */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-cyan-400 font-semibold uppercase">
                  {currentQ.category}
                </span>
                <span className="text-slate-600">•</span>
                <span className="font-mono text-xs text-slate-400">
                  Scenario {currentStep + 1} of {QUEST_QUESTIONS.length}
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs text-amber-400 font-bold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{score} XP</span>
              </div>
            </div>

            {/* Scenario Display Box */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 mb-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-slate-400 text-[11px]">
                <span className="font-bold text-slate-300 truncate">SENDER: {currentQ.sender}</span>
                <span className="text-amber-400 flex items-center gap-1 font-semibold">
                  <AlertTriangle className="h-3 w-3" /> SUSPICIOUS
                </span>
              </div>
              <h3 className="font-heading text-sm font-semibold text-white mb-1.5">{currentQ.threatTitle}</h3>
              <p className="font-sans text-xs text-slate-300 leading-relaxed bg-black/30 p-2.5 rounded-lg border border-white/5">
                "{currentQ.body}"
              </p>
            </div>

            {/* Decision Options */}
            <div className="space-y-2 mb-4">
              <p className="font-mono text-[11px] font-semibold text-cyan-300 uppercase tracking-wider">
                MAKE YOUR DECISION:
              </p>
              {currentQ.options.map((option) => {
                let btnStyle = "border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 hover:border-cyan-500/40 text-slate-200";
                if (showResult) {
                  if (option.isCorrect) {
                    btnStyle = "border-emerald-500/80 bg-emerald-950/40 text-emerald-200";
                  } else if (selectedOption?.id === option.id) {
                    btnStyle = "border-rose-500/80 bg-rose-950/40 text-rose-200";
                  } else {
                    btnStyle = "opacity-50 border-slate-800 bg-slate-900/40 text-slate-500";
                  }
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option)}
                    disabled={showResult}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start justify-between gap-3 ${btnStyle}`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="font-mono text-xs font-bold text-cyan-400 mt-0.5 uppercase">
                        [{option.id}]
                      </span>
                      <span className="leading-snug">{option.text}</span>
                    </div>
                    {showResult && option.isCorrect && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {showResult && selectedOption?.id === option.id && !option.isCorrect && (
                      <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Result Explanation */}
            {showResult && (
              <div className={`p-3 rounded-xl mb-4 border text-xs leading-relaxed ${
                selectedOption?.isCorrect 
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' 
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
              }`}>
                <div className="font-bold flex items-center gap-1.5 mb-1 font-mono">
                  {selectedOption?.isCorrect ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      SURVIVED (+500 XP)
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                      COMPROMISED (0 XP)
                    </>
                  )}
                </div>
                <p className="text-[11px] opacity-90">{selectedOption?.explanation}</p>
              </div>
            )}

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <span className="font-mono text-[11px] text-slate-500">
                CYBERQUEST ENGINE v2.6
              </span>
              {showResult && (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/25"
                >
                  <span>{currentStep < QUEST_QUESTIONS.length - 1 ? 'NEXT SCENARIO' : 'VIEW FINAL SCORE'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Victory Completion View */
          <div className="text-center py-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-b from-cyan-500/20 to-emerald-500/20 border border-cyan-400/50 text-cyan-300 shadow-xl shadow-cyan-500/20">
              <Trophy className="h-8 w-8 text-amber-400" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-white mb-1">
              Simulation Complete!
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-5">
              You scored <span className="font-mono font-bold text-amber-400">{score} / 1500 XP</span> in this live CyberQuest assessment session.
            </p>

            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-6 text-left">
              <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
                <span className="font-mono text-[10px] text-slate-500 uppercase">Security IQ</span>
                <p className="font-mono text-lg font-bold text-cyan-400">
                  {score >= 1000 ? '94%' : '68%'}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
                <span className="font-mono text-[10px] text-slate-500 uppercase">Rank</span>
                <p className="font-mono text-lg font-bold text-emerald-400">
                  {score === 1500 ? 'Sentinel' : 'Analyst'}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
                <span className="font-mono text-[10px] text-slate-500 uppercase">Badge</span>
                <p className="font-mono text-sm font-bold text-amber-300 truncate">
                  {score === 1500 ? 'Trap Master' : 'Survivor'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleRestart}
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Retry Scenarios</span>
              </button>
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 rounded-xl bg-cyan-400 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/25"
              >
                <span>Back to CyberQuest</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
