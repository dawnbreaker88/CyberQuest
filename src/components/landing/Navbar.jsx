import React, { useRef, useEffect, useState } from 'react';
import { initNavbarAnimation } from '../../animations/landingAnimations';
import { ArrowRight, Shield } from 'lucide-react';

export default function Navbar({ onStartQuest }) {
  const navRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const tween = initNavbarAnimation(navRef.current);
    return () => {
      if (tween) tween.kill();
    };
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none font-mono">
      <nav
        ref={navRef}
        aria-label="Primary Navigation"
        className="pointer-events-auto flex items-center justify-between w-full max-w-3xl rounded-xl border border-[#273347] bg-[#131925]/90 px-4 sm:px-5 py-2 backdrop-blur-md shadow-xl shadow-black/60 transition-colors"
      >
        {/* Brand with Mascot Thumbnail */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-xs font-bold tracking-wider text-[#F4F6F8] hover:text-[#39C6E8] transition-colors group"
        >
          <div className="w-7 h-7 rounded-lg overflow-hidden border border-[#273347] bg-[#192131] flex items-center justify-center relative group-hover:border-[#39C6E8] transition-colors">
            <img 
              src="/mascot.jpg" 
              alt="CyberQuest Mascot" 
              className="w-full h-full object-cover object-center scale-110"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <span className="font-extrabold text-[13px] tracking-tight">
            CYBER<span className="text-[#39C6E8]">QUEST</span>
          </span>
        </a>

        {/* Center Links */}
        <div className="hidden sm:flex items-center gap-4 text-[11px] font-semibold tracking-wide text-[#AAB3C0]">
          <a
            href="#premise"
            onClick={(e) => scrollToSection(e, 'premise')}
            className="hover:text-[#F4F6F8] transition-colors px-2 py-1 rounded-md hover:bg-[#192131]"
          >
            ABOUT
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => scrollToSection(e, 'how-it-works')}
            className="hover:text-[#F4F6F8] transition-colors px-2 py-1 rounded-md hover:bg-[#192131]"
          >
            GAMEPLAY
          </a>
          <a
            href="#threats"
            onClick={(e) => scrollToSection(e, 'threats')}
            className="hover:text-[#F4F6F8] transition-colors px-2 py-1 rounded-md hover:bg-[#192131]"
          >
            TRACKS
          </a>
          <a
            href="#preview"
            onClick={(e) => scrollToSection(e, 'preview')}
            className="hover:text-[#F4F6F8] transition-colors px-2 py-1 rounded-md hover:bg-[#192131]"
          >
            PREVIEW
          </a>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={onStartQuest}
            className="btn-cq-primary text-[11px] py-1.5 px-3.5 cursor-pointer"
          >
            <span>START QUEST</span>
            <ArrowRight className="w-3.5 h-3.5 arrow-icon" />
          </button>
        </div>
      </nav>
    </div>
  );
}

