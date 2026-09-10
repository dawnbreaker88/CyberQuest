import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, ShieldAlert, CheckCircle2, AlertOctagon, HelpCircle, ArrowRight, UserCheck, Flame, Zap, Shield, Sparkles } from 'lucide-react';
import LottiePlaceholder from './LottiePlaceholder';

gsap.registerPlugin(ScrollTrigger);

export default function RealisticSimulation() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const simWrapperRef = useRef(null);

  const [selectedDecision, setSelectedDecision] = useState(null); // 'send' | 'verify' | 'refuse' | 'report'
  const [revealedSignals, setRevealedSignals] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(simWrapperRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        scale: 0.96,
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDecision = (decision) => {
    setSelectedDecision(decision);
    setRevealedSignals(true);
  };

  const signals = [
    {
      id: 'urgency',
      tag: '⚠ URGENCY',
      title: 'Forced Fast Decision',
      detail: '"Can\'t talk right now" eliminates time for rational verification.',
      color: 'border-amber-500/50 bg-amber-950/30 text-amber-300'
    },
    {
      id: 'authority',
      tag: '⚠ AUTHORITY',
      title: 'Executive Impersonation',
      detail: 'Leveraging "Your Manager" to discourage questioning of commands.',
      color: 'border-purple-500/50 bg-purple-950/30 text-purple-300'
    },
    {
      id: 'secrecy',
      tag: '⚠ SECRECY',
      title: 'Channel Isolation',
      detail: '"Send me the codes here" prevents logging into standard purchase workflows.',
      color: 'border-rose-500/50 bg-rose-950/30 text-rose-300'
    },
    {
      id: 'unusual',
      tag: '⚠ UNUSUAL REQUEST',
      title: 'Untraceable Value Transfer',
      detail: 'Gift cards are non-refundable and immediately liquidatable cash equivalents.',
      color: 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300'
    }
  ];

  return (
    <section 
      id="realistic-simulation"
      ref={sectionRef} 
      className="py-20 sm:py-28 relative bg-[#080C14] overflow-hidden"
    >
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Differentiator Headline */}
        <div ref={headlineRef} className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-950/30 px-3.5 py-1 text-xs font-mono text-cyan-300">
            <span>THE CYBERQUEST DIFFERENTIATOR</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-400">
            We don't ask what you know.
          </h3>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading text-white tracking-tight">
            We ask what you <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">would do.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 pt-1">
            Real attacks test human psychology under pressure. Try making the right move below:
          </p>
        </div>

        {/* Live Interactive Simulation Grid */}
        <div 
          ref={simWrapperRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left: Simulated Chat Thread (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0C1322] p-6 sm:p-7 shadow-2xl">
            
            {/* Header / Contact bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                  <span className="font-bold text-sm">VP</span>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0C1322]" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-white flex items-center gap-2">
                    David Vance (VP of Operations)
                    <span className="font-mono text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">DIRECT CHAT</span>
                  </h4>
                  <p className="text-xs text-slate-400">Online • Mobile App</p>
                </div>
              </div>
              <span className="font-mono text-xs text-slate-500">11:42 AM</span>
            </div>

            {/* Chat Message Bubble */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl rounded-tl-sm bg-slate-900 border border-slate-800 p-4 max-w-lg space-y-2 text-slate-200 text-sm shadow-md">
                  <p className="font-semibold text-xs text-cyan-400 font-mono">YOUR MANAGER</p>
                  <p className="leading-relaxed">
                    Hey, I'm in a crucial client meeting right now.
                  </p>
                  <p className="leading-relaxed">
                    I need you to urgently purchase <span className="font-bold text-white font-mono bg-black/40 px-1 py-0.5 rounded">₹15,000</span> worth of gift cards for our presentation rewards.
                  </p>
                  <p className="leading-relaxed">
                    Send me the card claim codes here as soon as you have them. <span className="text-amber-300 font-medium">Can't talk right now.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Decision Buttons */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  SELECT YOUR ACTION:
                </span>
                <span className="font-mono text-[11px] text-slate-400">
                  {selectedDecision ? 'DECISION RECORDED' : 'CHOOSE ONE TO TEST'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => handleDecision('send')}
                  className={`p-3 rounded-xl border font-mono text-xs font-semibold transition-all ${
                    selectedDecision === 'send'
                      ? 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-lg shadow-rose-500/20'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-rose-500/50'
                  }`}
                >
                  <span className="block text-[10px] text-slate-500 mb-0.5">[01]</span>
                  <span>Send Codes</span>
                </button>

                <button
                  onClick={() => handleDecision('verify')}
                  className={`p-3 rounded-xl border font-mono text-xs font-semibold transition-all ${
                    selectedDecision === 'verify'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-emerald-500/50'
                  }`}
                >
                  <span className="block text-[10px] text-slate-500 mb-0.5">[02]</span>
                  <span>Verify Call</span>
                </button>

                <button
                  onClick={() => handleDecision('refuse')}
                  className={`p-3 rounded-xl border font-mono text-xs font-semibold transition-all ${
                    selectedDecision === 'refuse'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-amber-500/50'
                  }`}
                >
                  <span className="block text-[10px] text-slate-500 mb-0.5">[03]</span>
                  <span>Refuse</span>
                </button>

                <button
                  onClick={() => handleDecision('report')}
                  className={`p-3 rounded-xl border font-mono text-xs font-semibold transition-all ${
                    selectedDecision === 'report'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-cyan-500/50'
                  }`}
                >
                  <span className="block text-[10px] text-slate-500 mb-0.5">[04]</span>
                  <span>Report Threat</span>
                </button>
              </div>

              {/* Decision Feedback outcome */}
              {selectedDecision && (
                <div className={`mt-4 p-4 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-200 ${
                  selectedDecision === 'verify' || selectedDecision === 'report'
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : selectedDecision === 'send'
                    ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                    : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                }`}>
                  <div className="font-bold font-mono flex items-center gap-2 mb-1">
                    {selectedDecision === 'verify' || selectedDecision === 'report' ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span>OUTSTANDING INSTINCTS // SECURE PROTOCOL PRESERVED (+450 XP)</span>
                      </>
                    ) : selectedDecision === 'send' ? (
                      <>
                        <AlertOctagon className="h-4 w-4 text-rose-400" />
                        <span>SECURITY BREACH // ₹15,000 TRANSFERRED TO ATTACKER (0 XP)</span>
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="h-4 w-4 text-amber-400" />
                        <span>PARTIAL DEFENSE // THREAT BLOCKED BUT SENDER NOT FLAGGED</span>
                      </>
                    )}
                  </div>
                  <p className="text-[11px] opacity-90">
                    {selectedDecision === 'verify' && "Always verify unusual or emergency financial instructions via an out-of-band verified channel (official Slack or phone desk)."}
                    {selectedDecision === 'report' && "Flagging impersonation attacks immediately helps security operations block spoofed phone numbers company-wide."}
                    {selectedDecision === 'send' && "Attackers impersonate senior executives knowing employees hesitate to question urgent requests from authority."}
                    {selectedDecision === 'refuse' && "Refusing prevents financial loss, but make sure to notify security so other employees aren't targeted."}
                  </p>
                </div>
              )}

            </div>
          </div>

          {/* Right: Manipulation Signals Engine Breakdown (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="rounded-2xl border border-white/10 bg-[#0C1322] p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <span className="font-mono text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4" />
                  MANIPULATION SIGNALS ANALYSIS
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  {revealedSignals ? '4 / 4 TRIGGERED' : 'AWAITING ACTION'}
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-4">
                CyberQuest breaks down the exact psychological levers used by social engineering attackers:
              </p>

              {/* 4 Signals Badges */}
              <div className="space-y-2.5">
                {signals.map((sig) => (
                  <div
                    key={sig.id}
                    className={`rounded-xl border p-3 transition-all ${
                      revealedSignals ? sig.color : 'border-slate-800 bg-slate-900/40 text-slate-400 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold uppercase">
                        {sig.tag}
                      </span>
                      <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-black/40 text-slate-400">
                        {sig.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      {sig.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Lottie Placeholder integration */}
              <div className="mt-4 pt-3 border-t border-white/5">
                <LottiePlaceholder 
                  type="threat"
                  title="Threat Detection Engine — Real-time signal analysis"
                  compact={true}
                  className="bg-slate-950/70"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
