import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Sparkles, Shield } from 'lucide-react';

export default function GameHeader({
  questTitle,
  categoryColor = '#39C6E8',
  currentIndex = 0,
  totalCount = 3,
  lives = 3,
  maxLives = 3,
  score = 0,
  xpEarned = 0,
}) {
  const formattedIndex = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalCount).padStart(2, '0');

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080B12]/95 backdrop-blur-md border-b border-[#1F2937] px-4 sm:px-6 lg:px-8 py-3.5 font-mono">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Back Link & Quest Title */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/app/roadmap"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#131925] border border-[#273347] text-[#AAB3C0] hover:text-[#F4F6F8] hover:border-[#3A4B68] text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ROADMAP</span>
          </Link>

          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full hidden sm:inline-block"
              style={{ backgroundColor: categoryColor }}
            />
            <h1 className="text-xs sm:text-sm font-extrabold text-[#F4F6F8] uppercase tracking-wider">
              {questTitle}
            </h1>
          </div>
        </div>

        {/* Center: Progress Counter */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#6F7B8A] uppercase font-bold hidden md:inline">
            CHALLENGE
          </span>
          <div className="px-3 py-1 rounded-lg bg-[#131925] border border-[#273347] text-xs font-bold text-[#F4F6F8]">
            <span style={{ color: categoryColor }}>{formattedIndex}</span>
            <span className="text-[#6F7B8A] mx-1">/</span>
            <span>{formattedTotal}</span>
          </div>
        </div>

        {/* Right: Lives & Score / XP Counter */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Lives Display */}
          <div className="flex items-center gap-1 bg-[#131925] border border-[#273347] px-2.5 py-1 rounded-lg">
            {Array.from({ length: maxLives }).map((_, i) => {
              const isAlive = i < lives;
              return (
                <Heart
                  key={i}
                  className={`w-3.5 h-3.5 transition-all ${
                    isAlive
                      ? 'text-[#FF7468] fill-[#FF7468]'
                      : 'text-[#273347] fill-[#192131]'
                  }`}
                />
              );
            })}
          </div>

          {/* XP Live Counter */}
          <div className="flex items-center gap-1.5 bg-[#131925] border border-[#FFB84D]/30 px-3 py-1 rounded-lg text-xs font-bold text-[#FFB84D] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB84D]" />
            <span>+{xpEarned} XP</span>
          </div>

        </div>

      </div>
    </header>
  );
}
