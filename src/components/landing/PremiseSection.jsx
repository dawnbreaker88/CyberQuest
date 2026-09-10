import React, { useRef, useEffect } from 'react';
import { initSectionReveal } from '../../animations/landingAnimations';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

export default function PremiseSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const tween1 = initSectionReveal(headlineRef.current, { y: 25, duration: 0.8 });
    const tween2 = initSectionReveal(bodyRef.current, { y: 15, duration: 0.7 });

    return () => {
      if (tween1) tween1.kill();
      if (tween2) tween2.kill();
    };
  }, []);

  return (
    <section
      id="premise"
      ref={sectionRef}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#080B12] border-t border-[#1C2433] relative font-sans"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
        
        {/* Left Narrative Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section Tag */}
          <div className="inline-flex items-center gap-2 bg-[#39C6E8]/10 text-[#39C6E8] border border-[#39C6E8]/30 px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wider uppercase">
            <ShieldAlert className="w-3.5 h-3.5 text-[#39C6E8]" />
            <span>THE PREMISE // THE REALITY GAP</span>
          </div>

          {/* Narrative Headline */}
          <div ref={headlineRef} className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#AAB3C0] uppercase">
              MOST PEOPLE LEARN CYBERSECURITY AFTER SOMETHING GOES WRONG.
            </h2>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#F4F6F8] uppercase leading-tight">
              WE'D RATHER LET YOU <span className="text-[#39C6E8]">TEST IT HERE.</span>
            </h2>
          </div>

          {/* Supporting Copy */}
          <div ref={bodyRef} className="pt-4 border-t border-[#1F2937] space-y-3">
            <p className="text-sm sm:text-base text-[#AAB3C0] leading-relaxed">
              Real attackers rely on urgency, disguised senders, and hidden traps. In CyberQuest, you encounter realistic deception in a zero-risk simulator — training your reflexes before anyone attacks your real accounts.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-[#6F7B8A]">
              <span className="text-[#73D6B1] font-bold">✓ REALISTIC SIMULATIONS</span>
              <span>•</span>
              <span className="text-[#FFB84D] font-bold">✓ ZERO DATA RISK</span>
              <span>•</span>
              <span className="text-[#39C6E8] font-bold">✓ INSTANT FEEDBACK</span>
            </div>
          </div>
        </div>

        {/* Right Threat Simulation Artwork Card (trap.jpg) */}
        <div className="lg:col-span-5">
          <div className="cq-card rounded-2xl overflow-hidden border border-[#273347] bg-[#131925] shadow-2xl group">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#080B12]">
              <img
                src="/trap.jpg"
                alt="Cyber Threat Trap Simulation"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131925] via-transparent to-transparent" />
              <div className="absolute top-3 left-3 bg-[#080B12]/80 border border-[#273347] px-2.5 py-1 rounded font-mono text-[10px] font-bold text-[#FF7468] flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3 text-[#FF7468]" />
                <span>SIMULATED INCIDENT</span>
              </div>
            </div>
            <div className="p-4 border-t border-[#273347]/60 text-left">
              <span className="text-xs font-mono font-bold text-[#F4F6F8] block">
                IMMERSIVE THREAT LABS
              </span>
              <p className="text-xs text-[#6F7B8A] mt-1 font-sans">
                Analyze fake invoices, urgent executive memos, and disguised MFA prompts.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
