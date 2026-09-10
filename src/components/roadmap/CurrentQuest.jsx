import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldAlert, Sparkles, Clock, Target } from 'lucide-react';

export default function CurrentQuest({ currentQuestRef, quest }) {
  if (!quest) return null;

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-10 font-mono">
      <div
        ref={currentQuestRef}
        className="rounded-2xl border-2 border-[#39C6E8]/40 bg-[#131925] p-5 sm:p-7 shadow-2xl shadow-black/70 relative overflow-hidden"
      >
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between border-b border-[#273347] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#39C6E8]" />
            <span className="text-[11px] font-mono font-bold text-[#39C6E8] tracking-wider uppercase">
              ACTIVE CAMPAIGN OBJECTIVE
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#73D6B1] bg-[#73D6B1]/10 px-2 py-0.5 rounded uppercase font-bold">
            READY TO DEPLOY
          </span>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-8 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold text-[#39C6E8] bg-[#39C6E8]/10 px-2 py-0.5 rounded">
                QUEST {quest.number}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#F4F6F8] uppercase">
                {quest.title}
              </h2>
            </div>

            <p className="text-xs font-mono text-[#75DDF2] font-semibold tracking-wide">
              {quest.subtitle}
            </p>

            <p className="text-xs text-[#AAB3C0] leading-relaxed font-normal">
              {quest.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono text-[#6F7B8A]">
              <span className="flex items-center gap-1 text-[#F4F6F8]">
                <Target className="w-3.5 h-3.5 text-[#39C6E8]" />
                0 / 5 CHALLENGES
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#AAB3C0]" />
                {quest.estimatedTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#FFB84D] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                +{quest.rewardXp} XP
              </span>
            </div>
          </div>

          <div className="md:col-span-4 flex md:justify-end">
            <Link
              to={quest.route}
              className="w-full md:w-auto btn-cq-primary cursor-pointer text-xs"
            >
              <span>ENTER QUEST</span>
              <ArrowRight className="w-4 h-4 arrow-icon" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

