import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldAlert, KeyRound, QrCode, MessageSquareWarning, BrainCircuit, ArrowRight, CheckCircle2, Lock, ChevronRight, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TrainingWorlds({ onSelectWorld }) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [activeWorld, setActiveWorld] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.children || [];
      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const worlds = [
    {
      id: 'phishing',
      icon: ShieldAlert,
      tag: 'WORLD 01',
      title: 'PHISHING',
      tagline: 'Spot the trap.',
      description: 'Deconstruct spear phishing, lookalike domains, credential harvesting forms, and zero-day attachment lures.',
      threatCount: '34 Scenarios',
      difficulty: 'Medium',
      color: 'from-blue-500/20 to-cyan-500/10',
      borderColor: 'group-hover:border-cyan-400',
      iconColor: 'text-cyan-400',
      sampleThreat: 'Invoice_Overdue_PDF.exe pretending to be a financial statement.'
    },
    {
      id: 'password',
      icon: KeyRound,
      tag: 'WORLD 02',
      title: 'PASSWORD LAB',
      tagline: 'Build it. Break it. Secure it.',
      description: 'Test entropy strength against dictionary attacks, credential stuffing, and session token hijacking.',
      threatCount: '28 Scenarios',
      difficulty: 'Easy → Hard',
      color: 'from-amber-500/20 to-yellow-500/10',
      borderColor: 'group-hover:border-amber-400',
      iconColor: 'text-amber-400',
      sampleThreat: 'Brute-forcing common base passwords with leaked hash dictionaries.'
    },
    {
      id: 'qr',
      icon: QrCode,
      tag: 'WORLD 03',
      title: 'QR DETECTIVE',
      tagline: 'Scan before you trust.',
      description: 'Uncover "Quishing" attacks, tampered physical payment kiosks, and malicious instant-redirect redirects.',
      threatCount: '22 Scenarios',
      difficulty: 'Medium',
      color: 'from-purple-500/20 to-indigo-500/10',
      borderColor: 'group-hover:border-purple-400',
      iconColor: 'text-purple-400',
      sampleThreat: 'Physical overlay sticker on parking meter redirecting to fake payment portal.'
    },
    {
      id: 'scam',
      icon: MessageSquareWarning,
      tag: 'WORLD 04',
      title: 'SCAM STREET',
      tagline: 'Messages aren\'t always what they seem.',
      description: 'Navigate smishing, delivery failure SMS notifications, fake prize verification bots, and Telegram crypto traps.',
      threatCount: '40 Scenarios',
      difficulty: 'Hard',
      color: 'from-rose-500/20 to-orange-500/10',
      borderColor: 'group-hover:border-rose-400',
      iconColor: 'text-rose-400',
      sampleThreat: '"USPS: Package cannot be delivered due to incomplete address. Click to update."'
    },
    {
      id: 'social',
      icon: BrainCircuit,
      tag: 'WORLD 05',
      title: 'SOCIAL ENGINEERING',
      tagline: 'The weakest link isn\'t always technology.',
      description: 'Spot psychological manipulation: authority impersonation, deepfake audio vishing, urgency triggers, and baiting.',
      threatCount: '30 Scenarios',
      difficulty: 'Expert',
      color: 'from-emerald-500/20 to-teal-500/10',
      borderColor: 'group-hover:border-emerald-400',
      iconColor: 'text-emerald-400',
      sampleThreat: 'Executive assistant voice clone requesting emergency wire transfer.'
    }
  ];

  return (
    <section 
      id="training-worlds"
      ref={sectionRef} 
      className="py-20 sm:py-28 relative bg-[#070B12] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-950/30 px-3.5 py-1 text-xs font-mono text-cyan-300">
            <span>TRAINING DOMAINS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white">
            Five worlds. Hundreds of ways to <span className="text-cyan-400">get fooled.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Each training world challenges you with realistic vectors. Master each discipline to unlock the Cyber Escape Room.
          </p>
        </div>

        {/* Unified 5-World Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {worlds.map((world, idx) => {
            const Icon = world.icon;
            const isLast = idx === 4; // Center the 5th item nicely on wide screens or let it span
            
            return (
              <div
                key={world.id}
                onMouseEnter={() => setActiveWorld(idx)}
                onClick={() => onSelectWorld && onSelectWorld(world)}
                className={`group relative rounded-2xl border border-white/10 bg-[#0C1322] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer ${world.borderColor} ${isLast ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                {/* Background Ambient Glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${world.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div className="relative z-10 flex flex-col h-full justify-between space-y-4">
                  
                  {/* Top Bar: Tag & Threat Count */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-900 border border-white/5 px-2 py-0.5 rounded">
                        {world.tag}
                      </span>
                      <span className="font-mono text-[11px] text-cyan-400 flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        {world.threatCount}
                      </span>
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 border border-white/10 ${world.iconColor} group-hover:scale-105 transition-transform duration-200`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {world.title}
                        </h3>
                        <p className="font-mono text-xs text-slate-400 font-medium">
                          {world.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed mt-2">
                      {world.description}
                    </p>
                  </div>

                  {/* Sample Threat Box (Revealed on hover/active) */}
                  <div className="pt-2">
                    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-2.5 font-mono text-[11px] text-slate-400">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Example Vector:</span>
                      <span className="text-slate-300 line-clamp-2">"{world.sampleThreat}"</span>
                    </div>

                    <div className="mt-3 flex items-center justify-between font-mono text-xs text-cyan-400 group-hover:text-cyan-300 font-semibold pt-1">
                      <span>Launch World Simulation</span>
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
