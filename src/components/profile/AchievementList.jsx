import React from 'react';
import { achievements } from '../../data/achievements';
import { CheckCircle2, Circle, Clock, Award } from 'lucide-react';

export default function AchievementList() {
  return (
    <div className="cq-card rounded-2xl p-5 sm:p-7 shadow-xl font-mono text-left space-y-4">
      <div className="flex items-center justify-between border-b border-[#273347] pb-2.5">
        <div className="flex items-center gap-2">
          <Award className="w-3.5 h-3.5 text-[#39C6E8]" />
          <span className="text-[11px] font-bold text-[#F4F6F8] uppercase tracking-wider">
            ACHIEVEMENTS & MILESTONES
          </span>
        </div>
        <span className="text-[9px] text-[#6F7B8A] uppercase font-bold">
          4 REGISTERED
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {achievements.map((ach) => {
          const progressPercent = Math.min(100, Math.round((ach.progress / ach.target) * 100));
          const isInProgress = !ach.completed && ach.progress > 0;

          return (
            <div
              key={ach.id}
              className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2.5 transition-all ${
                ach.completed
                  ? 'border-[#73D6B1]/30 bg-[#192131] text-[#F4F6F8]'
                  : isInProgress
                  ? 'border-[#FFB84D]/30 bg-[#131925] text-[#F4F6F8]'
                  : 'border-[#1C2433] bg-[#0D1119] text-[#6F7B8A]'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {ach.completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#73D6B1] shrink-0" />
                    ) : isInProgress ? (
                      <Clock className="w-3.5 h-3.5 text-[#FFB84D] shrink-0" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-[#6F7B8A] shrink-0" />
                    )}
                    <span className={`text-xs font-bold uppercase ${ach.completed ? 'text-[#F4F6F8]' : isInProgress ? 'text-[#FFB84D]' : 'text-[#AAB3C0]'}`}>
                      {ach.title}
                    </span>
                  </div>

                  {ach.completed && (
                    <span className="text-[9px] text-[#73D6B1] bg-[#73D6B1]/10 px-1.5 py-0.2 rounded font-bold">
                      DONE
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-[#AAB3C0] leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="space-y-1 pt-1.5 border-t border-[#1C2433]">
                <div className="flex items-center justify-between text-[10px] text-[#6F7B8A]">
                  <span>PROGRESS</span>
                  <span className="font-bold text-[#F4F6F8]">{ach.progress} / {ach.target}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#0D1119] border border-[#273347] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      ach.completed ? 'bg-[#73D6B1]' : isInProgress ? 'bg-[#FFB84D]' : 'bg-[#273347]'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

