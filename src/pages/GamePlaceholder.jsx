import React from 'react';
import { Link, useParams } from 'react-router-dom';
import AppNavbar from '../components/app/AppNavbar';
import { quests } from '../data/quests';

export default function GamePlaceholder() {
  const { questId } = useParams();
  const quest = quests.find((q) => q.id === questId) || quests[0];

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#F1F1EF] font-mono flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden bg-hairline-grid">
      <AppNavbar />

      <div className="max-w-xl mx-auto my-auto text-center space-y-8 pt-24 z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#24272C] bg-[#111316] px-3.5 py-1 text-[10px] font-medium tracking-widest text-[#969AA1] uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F1F1EF] animate-ping" />
          <span>CYBERQUEST // CHALLENGE SIMULATOR</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F1F1EF] uppercase leading-[1.1]">
            {quest.title}
          </h1>
          <p className="text-xs font-mono text-[#C7CDD4] uppercase tracking-wider">
            {quest.subtitle}
          </p>
        </div>

        <div className="rounded-2xl border border-[#24272C] bg-[#111316] p-8 space-y-4 text-left shadow-2xl">
          <span className="text-[10px] text-[#696D74] uppercase block">
            STAGE METADATA
          </span>
          <p className="text-sm text-[#F1F1EF] font-medium leading-relaxed">
            YOUR FIRST INTERACTIVE CHALLENGE IS COMING IN PHASE 3.
          </p>
          <p className="text-xs text-[#969AA1] leading-relaxed font-normal">
            You will be tasked with identifying suspicious sender domains, detecting character substitutions, and flagging urgent credential harvesting traps.
          </p>
        </div>

        <div>
          <Link
            to="/app/roadmap"
            className="inline-flex items-center gap-2 rounded-full border border-[#24272C] bg-[#16181B] px-6 py-3 text-xs font-semibold text-[#F1F1EF] hover:bg-[#24272C] hover:border-[#696D74] transition-all"
          >
            <span>← BACK TO ROADMAP</span>
          </Link>
        </div>
      </div>

      <div className="text-center text-[10px] text-[#696D74] z-10 pt-8">
        CYBERQUEST ENGINE // PHASE 2.1 ACTIVE
      </div>
    </div>
  );
}
