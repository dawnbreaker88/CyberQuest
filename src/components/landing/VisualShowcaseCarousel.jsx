import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Shield, Sparkles, Compass, AlertTriangle } from 'lucide-react';

const slides = [
  {
    id: 'operative',
    tag: '01 // THE OPERATIVE',
    title: 'YOUR ADAPTIVE FIELD COMPANION',
    subtitle: 'Calibrates to Your Natural Decision Instincts',
    description:
      'Meet your tactical companion in CyberQuest. As you navigate scenarios, the operative evaluates your reaction speed, identifies cognitive blind spots, and customizes your training path to make you resilient against real-world manipulation.',
    image: '/mascot.jpg',
    badgeText: 'SECURITY IQ ADAPTIVE',
    badgeColor: '#39C6E8',
    icon: Shield,
  },
  {
    id: 'traps',
    tag: '02 // THREAT SIMULATIONS',
    title: 'REALISTIC DECEPTION. ZERO REAL RISK.',
    subtitle: 'Interactive Scenario Environments',
    description:
      'Experience zero-day phishing lures, cloned portal logins, malicious QR triggers, and urgent social engineering attacks. Learn to spot the subtle psychological hooks attackers use before you encounter them in your personal inbox.',
    image: '/trap.jpg',
    badgeText: 'LIVE SIMULATION ENGINE',
    badgeColor: '#FF7468',
    icon: AlertTriangle,
  },
  {
    id: 'roadmap',
    tag: '03 // CAMPAIGN PROGRESSION',
    title: 'THE PROGRESSION ROADMAP',
    subtitle: 'Branching Skill Trees & Milestones',
    description:
      'Advance your ranking from Recruit to Cyber Guardian. Complete challenges across 5 core threat domains, unlock collectible medals, and put everything on the line in the time-pressured Cyber Escape Room finale.',
    image: '/path.jpg',
    badgeText: '5 DOMAINS • FINAL ESCAPE ROOM',
    badgeColor: '#73D6B1',
    icon: Compass,
  },
];

export default function VisualShowcaseCarousel() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIdx((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = slides[currentIdx];
  const Icon = currentSlide.icon;

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0D1119] border-t border-[#1F2937] font-sans relative">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1F2937] pb-6">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#131925] border border-[#273347] text-[11px] font-mono tracking-widest text-[#39C6E8] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#39C6E8]" />
              <span>THE EXPERIENCE // VISUAL OVERVIEW</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#F4F6F8] uppercase">
              INSIDE <span className="text-[#39C6E8]">CYBERQUEST</span>
            </h2>
          </div>

          {/* Quick Select Tabs */}
          <div className="flex items-center gap-2 font-mono text-xs">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentIdx(idx)}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  currentIdx === idx
                    ? 'bg-[#192131] border-[#39C6E8] text-[#F4F6F8] font-bold shadow-sm'
                    : 'bg-[#131925] border-[#273347] text-[#6F7B8A] hover:text-[#AAB3C0]'
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Showcase Card */}
        <div className="cq-card rounded-2xl overflow-hidden border border-[#273347] bg-[#131925] shadow-2xl transition-all duration-300">
          
          {/* Main Visual Display (Clean, framed artwork) */}
          <div className="relative w-full h-64 sm:h-96 md:h-[420px] bg-[#080B12] overflow-hidden group">
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
            />
            {/* Subtle Vignette Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#131925] via-transparent to-black/30 pointer-events-none" />

            {/* Top Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#080B12]/85 backdrop-blur-md border border-[#273347] px-3 py-1.5 rounded-lg font-mono text-xs font-bold text-[#F4F6F8]">
              <Icon className="w-3.5 h-3.5" style={{ color: currentSlide.badgeColor }} />
              <span style={{ color: currentSlide.badgeColor }}>{currentSlide.tag}</span>
            </div>

            {/* Navigation Arrow Controls */}
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#080B12]/80 hover:bg-[#192131] border border-[#273347] text-[#F4F6F8] flex items-center justify-center transition-all shadow-lg cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#080B12]/80 hover:bg-[#192131] border border-[#273347] text-[#F4F6F8] flex items-center justify-center transition-all shadow-lg cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Context & Description Content Area Below Artwork */}
          <div className="p-6 sm:p-8 space-y-4 text-left border-t border-[#273347]/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold tracking-wider text-[#AAB3C0] uppercase block">
                  {currentSlide.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#F4F6F8] tracking-tight uppercase">
                  {currentSlide.title}
                </h3>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1119] border border-[#273347] text-xs font-mono font-bold text-[#AAB3C0] self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentSlide.badgeColor }} />
                <span>{currentSlide.badgeText}</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#AAB3C0] leading-relaxed max-w-3xl">
              {currentSlide.description}
            </p>

            {/* Slide Indicator Dots */}
            <div className="flex items-center gap-2 pt-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentIdx === idx ? 'w-8 bg-[#39C6E8]' : 'w-2 bg-[#273347] hover:bg-[#6F7B8A]'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
