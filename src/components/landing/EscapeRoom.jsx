import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Key, Lock, Mail, MessageSquare, QrCode, PhoneCall, AlertTriangle, ShieldCheck, Trophy, Sparkles, ChevronRight, Play } from 'lucide-react';
import LottiePlaceholder from './LottiePlaceholder';

gsap.registerPlugin(ScrollTrigger);

export default function EscapeRoom({ onEnterEscapeRoom }) {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const matrixRef = useRef(null);

  const [activeStep, setActiveStep] = useState(0);

  const timelineSteps = [
    {
      id: 0,
      title: 'Email Alert',
      icon: Mail,
      tag: 'STAGE 1',
      channel: 'Corporate Outlook',
      excerpt: 'Urgent notice regarding suspended AWS billing account with verification link.',
      clue: 'Domain check: aws-billing-verify.net is not official amazon.com.'
    },
    {
      id: 1,
      title: 'SMS Verification',
      icon: MessageSquare,
      tag: 'STAGE 2',
      channel: 'Mobile Phone SMS',
      excerpt: '"2FA CODE: 893-102. If you did not request this, reply STOP immediately."',
      clue: 'Replying STOP confirms active phone line to bot network.'
    },
    {
      id: 2,
      title: 'Badge QR Code',
      icon: QrCode,
      tag: 'STAGE 3',
      channel: 'Office Entryway Kiosk',
      excerpt: 'Sticker over badge scanner claiming: "New visitor WiFi - scan to authenticate."',
      clue: 'Inspect physical terminal for overlay tampered hardware.'
    },
    {
      id: 3,
      title: 'Friend Impersonation',
      icon: MessageSquare,
      tag: 'STAGE 4',
      channel: 'Slack DM',
      excerpt: '"Hey did you see this video of you from yesterday? [Link]"',
      clue: 'Compromised colleague token spreading session cookie stealer.'
    },
    {
      id: 4,
      title: 'Bank Call Vishing',
      icon: PhoneCall,
      tag: 'STAGE 5',
      channel: 'Incoming Voice Call',
      excerpt: '"This is Chase Fraud Prevention. Please read back the OTP we just texted you."',
      clue: 'Real banks will NEVER ask for incoming OTPs over the phone.'
    },
    {
      id: 5,
      title: 'Security Lockdown',
      icon: AlertTriangle,
      tag: 'STAGE 6',
      channel: 'Workstation OS',
      excerpt: 'Ransomware precursor beaconing out to Command & Control server.',
      clue: 'Isolate network adapter before encryption keys download.'
    },
    {
      id: 6,
      title: 'FINAL ESCAPE',
      icon: Trophy,
      tag: 'STAGE 7',
      channel: 'Vault Access Granted',
      excerpt: 'All 6 vectors neutralized. Threat actor expelled from organizational grid.',
      clue: 'Grandmaster Cybersecurity IQ Rating Awarded.'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nodes = timelineRef.current?.children || [];
      gsap.from(nodes, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        scale: 0.9,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
      });

      gsap.from(matrixRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="escape-room"
      ref={sectionRef} 
      className="py-20 sm:py-32 relative bg-[#060910] border-t border-white/5 overflow-hidden"
    >
      {/* Immersive background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-900/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-mono text-cyan-300">
            <Key className="h-3.5 w-3.5 text-cyan-400" />
            <span>THE ULTIMATE ASSESSMENT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white">
            Think you've mastered the <span className="text-cyan-400">basics?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Everything you've learned comes together in one continuous, high-stakes real-world scenario.
          </p>
        </div>

        {/* 7-Step Horizontal Timeline Track */}
        <div className="mb-12 overflow-x-auto pb-4 pt-2">
          <div 
            ref={timelineRef}
            className="flex items-center justify-between min-w-[700px] gap-2 px-2"
          >
            {timelineSteps.map((step, idx) => {
              const Icon = step.icon;
              const isCurrent = activeStep === idx;
              const isEscape = idx === 6;

              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => setActiveStep(idx)}
                    className={`group relative flex flex-col items-center p-3 rounded-xl border transition-all text-center min-w-[100px] ${
                      isCurrent
                        ? isEscape 
                          ? 'border-amber-400 bg-amber-950/40 text-amber-200 shadow-lg shadow-amber-500/20'
                          : 'border-cyan-400 bg-cyan-950/50 text-cyan-200 shadow-lg shadow-cyan-500/20'
                        : 'border-white/10 bg-slate-900/60 text-slate-400 hover:border-white/25 hover:text-slate-200'
                    }`}
                  >
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg border mb-1.5 transition-transform group-hover:scale-105 ${
                      isCurrent
                        ? isEscape
                          ? 'border-amber-400/80 bg-amber-500/20 text-amber-300'
                          : 'border-cyan-400/80 bg-cyan-500/20 text-cyan-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      {step.tag}
                    </span>
                    <span className="text-xs font-bold text-white font-heading truncate max-w-[85px]">
                      {step.title}
                    </span>
                  </button>

                  {idx < timelineSteps.length - 1 && (
                    <div className="h-[2px] w-6 bg-gradient-to-r from-slate-800 via-cyan-500/40 to-slate-800 shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Immersive Threat Matrix Preview Display */}
        <div 
          ref={matrixRef}
          className="rounded-2xl border border-white/10 bg-[#0A0F1D] p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Top HUD Status */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                CYBER ESCAPE PROTOCOL // ACTIVE SCENARIO THREAD
              </span>
            </div>
            <span className="font-mono text-[11px] bg-slate-900 border border-white/10 px-2.5 py-1 rounded text-cyan-300">
              STEP {activeStep + 1} OF 7
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Fragment Breakdown (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded bg-slate-900 border border-white/10 px-2.5 py-1 text-xs font-mono text-slate-300">
                <span className="text-cyan-400 font-bold">CHANNEL:</span>
                <span>{timelineSteps[activeStep].channel}</span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-white">
                {timelineSteps[activeStep].title}
              </h3>

              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 font-mono text-xs text-slate-300 leading-relaxed shadow-inner">
                <span className="text-[10px] text-slate-500 block mb-1 uppercase font-bold">// INCOMING INCIDENT STREAM</span>
                "{timelineSteps[activeStep].excerpt}"
              </div>

              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3.5 flex items-start gap-2.5 text-xs text-cyan-200">
                <Sparkles className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold font-mono text-[11px] text-cyan-300 uppercase block">INVESTIGATION CLUE:</span>
                  <p className="text-[11px] text-slate-300">{timelineSteps[activeStep].clue}</p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={onEnterEscapeRoom}
                  className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 font-mono text-xs font-bold text-slate-950 hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/25"
                >
                  <Play className="h-3.5 w-3.5 fill-slate-950" />
                  <span>PLAY THIS ESCAPE ROOM STAGE</span>
                </button>

                <button
                  onClick={() => setActiveStep((prev) => (prev + 1) % timelineSteps.length)}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  <span>Next Stage</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Right Lottie / Escape Room Vault Visual (5 cols) */}
            <div className="lg:col-span-5">
              <LottiePlaceholder 
                type="escape"
                title="Cybersecurity Escape Room // Threat chain resolution engine"
                className="bg-slate-950/80 p-6"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
