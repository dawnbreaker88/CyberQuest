import React from 'react';
import { Shield } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-[#1F2937] bg-[#080B12] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-xs font-mono">
        
        {/* Brand & Mascot */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#273347] bg-[#131925] flex-shrink-0">
            <img src="/mascot.jpg" alt="CyberQuest Mascot" className="w-full h-full object-cover object-top" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-wider text-[#F4F6F8]">CYBERQUEST</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#131925] text-[#39C6E8] border border-[#273347]">v2.1</span>
            </div>
            <p className="text-[#6F7B8A] text-[11px] font-sans">
              Think. Click. Survive. Realistic cybersecurity simulations.
            </p>
          </div>
        </div>

        {/* Minimal Links & Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-8 text-[#AAB3C0]">
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-5">
            <a
              href="#premise"
              onClick={(e) => scrollToSection(e, 'premise')}
              className="hover:text-[#39C6E8] transition-colors"
            >
              Overview
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => scrollToSection(e, 'how-it-works')}
              className="hover:text-[#73D6B1] transition-colors"
            >
              Progression
            </a>
            <a
              href="#threats"
              onClick={(e) => scrollToSection(e, 'threats')}
              className="hover:text-[#FFB84D] transition-colors"
            >
              Threats
            </a>
            <a
              href="#preview"
              onClick={(e) => scrollToSection(e, 'preview')}
              className="hover:text-[#FF7468] transition-colors"
            >
              Simulations
            </a>
          </nav>

          <span className="text-[11px] text-[#6F7B8A] font-sans border-t sm:border-t-0 sm:border-l border-[#1F2937] pt-3 sm:pt-0 sm:pl-6">
            © 2026 CyberQuest. All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
}

