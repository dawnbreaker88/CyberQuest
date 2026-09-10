import React, { useState } from 'react';
import { Play, Pause, RefreshCw, Shield, AlertTriangle, Cpu, Sparkles, Key, CheckCircle2 } from 'lucide-react';

export default function LottiePlaceholder({ 
  type = "shield", // shield | threat | decision | xp | escape
  title = "Cybersecurity shield / threat scanner animation",
  className = "",
  compact = false
}) {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className={`relative overflow-hidden rounded-xl border border-cyan-500/20 bg-slate-950/80 p-4 backdrop-blur-md transition-all hover:border-cyan-400/50 ${className}`}>
      {/* Tactical HUD Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 ${isPlaying ? 'animate-ping' : ''}`} />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
          </span>
          <span className="font-mono text-[10px] font-semibold tracking-wider text-cyan-300 uppercase">
            [LOTTIE PLACEHOLDER]
          </span>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "Pause animation preview" : "Play animation preview"}
          className="flex items-center gap-1 rounded bg-slate-900 px-1.5 py-0.5 font-mono text-[9px] text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
        >
          {isPlaying ? <Pause className="h-2.5 w-2.5" /> : <Play className="h-2.5 w-2.5" />}
          <span>{isPlaying ? 'ACTIVE' : 'PAUSED'}</span>
        </button>
      </div>

      {/* Animation Simulation View */}
      <div className={`flex flex-col items-center justify-center ${compact ? 'py-2' : 'py-4'}`}>
        {type === "shield" && (
          <div className="relative flex h-24 w-24 items-center justify-center">
            {/* Outer rotating scan ring */}
            <div className={`absolute inset-0 rounded-full border border-dashed border-cyan-500/40 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
            <div className={`absolute inset-2 rounded-full border border-cyan-400/20 ${isPlaying ? 'animate-ping' : ''}`} style={{ animationDuration: '3s' }} />
            
            {/* Center Shield Graphic */}
            <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-b from-cyan-950/80 to-slate-900 border border-cyan-400/50 text-cyan-400 shadow-lg shadow-cyan-500/20">
              <Shield className="h-7 w-7" />
              {/* Scan Beam */}
              {isPlaying && (
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-pulse" />
              )}
            </div>

            {/* Radar status dots */}
            <div className="absolute top-1 right-2 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
            <div className="absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
          </div>
        )}

        {type === "threat" && (
          <div className="relative flex h-24 w-24 items-center justify-center">
            <div className={`absolute inset-0 rounded-full border border-amber-500/30 ${isPlaying ? 'animate-ping' : ''}`} style={{ animationDuration: '2s' }} />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-b from-amber-950/60 to-slate-900 border border-amber-400/60 text-amber-400 shadow-lg shadow-amber-500/20">
              <AlertTriangle className={`h-7 w-7 ${isPlaying ? 'animate-bounce' : ''}`} style={{ animationDuration: '2s' }} />
            </div>
            <div className="absolute -top-1 right-1 rounded bg-amber-500/20 px-1 font-mono text-[8px] text-amber-300 font-bold border border-amber-500/40">
              THREAT DETECTED
            </div>
          </div>
        )}

        {type === "decision" && (
          <div className="relative flex h-24 w-28 items-center justify-center">
            <div className="w-full space-y-1.5 px-2">
              <div className="flex items-center justify-between rounded bg-slate-900/90 border border-white/5 px-2 py-1 text-[10px]">
                <span className="text-slate-400">Action A</span>
                <span className="text-xs text-red-400 font-mono">RISKY</span>
              </div>
              <div className="flex items-center justify-between rounded bg-cyan-950/60 border border-cyan-400/50 px-2 py-1 text-[10px] shadow-sm shadow-cyan-500/20">
                <span className="text-cyan-200 font-medium">Action B: Verify</span>
                <span className="text-xs text-emerald-400 font-mono font-bold">SAFE ✓</span>
              </div>
            </div>
            {/* Animated simulated cursor */}
            {isPlaying && (
              <div className="absolute -bottom-1 right-3 animate-bounce text-cyan-400">
                <svg className="h-4 w-4 drop-shadow" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 3l7 18 3-7 7-3L3 3z" />
                </svg>
              </div>
            )}
          </div>
        )}

        {type === "xp" && (
          <div className="relative flex h-24 w-28 flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-amber-400">
              <Sparkles className={`h-6 w-6 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
              <span className="font-mono text-xl font-bold tracking-tight text-white">+500 XP</span>
            </div>
            <div className="mt-1.5 w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden border border-white/10">
              <div className={`h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all ${isPlaying ? 'w-4/5' : 'w-1/2'}`} />
            </div>
            <span className="mt-1 font-mono text-[9px] text-cyan-300">LEVEL 07 READY</span>
          </div>
        )}

        {type === "escape" && (
          <div className="relative flex h-24 w-28 items-center justify-center">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-b from-emerald-950/80 to-slate-900 border border-emerald-400/60 text-emerald-400 shadow-lg shadow-emerald-500/20">
              <Key className={`h-7 w-7 ${isPlaying ? 'animate-pulse' : ''}`} />
            </div>
            <div className="absolute -bottom-1 rounded bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[8px] text-emerald-300 font-bold border border-emerald-500/40">
              VAULT UNLOCKED
            </div>
          </div>
        )}

        {/* Caption */}
        <p className="mt-2 text-center text-[11px] font-medium text-slate-300 max-w-[240px] leading-tight">
          {title}
        </p>
      </div>
    </div>
  );
}
