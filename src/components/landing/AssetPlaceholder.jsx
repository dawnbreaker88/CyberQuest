import React from 'react';
import { Image, Layers, Sparkles } from 'lucide-react';

export default function AssetPlaceholder({ title, description, icon: Icon = Image, className = "", children }) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-dashed border-cyan-500/30 bg-slate-950/60 p-5 backdrop-blur-sm transition-all hover:border-cyan-400/60 ${className}`}>
      {/* Tactical corner crosshairs */}
      <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t-2 border-l-2 border-cyan-400/70" />
      <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t-2 border-r-2 border-cyan-400/70" />
      <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b-2 border-l-2 border-cyan-400/70" />
      <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b-2 border-r-2 border-cyan-400/70" />

      {/* Header Tag */}
      <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-cyan-500/10 text-cyan-400">
            <Icon className="h-3 w-3" />
          </span>
          <span className="font-mono text-[10px] font-semibold tracking-wider text-cyan-400/90 uppercase">
            [ASSET PLACEHOLDER]
          </span>
        </div>
        <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
          SVG / 3D Asset
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center text-center py-3">
        {children ? (
          children
        ) : (
          <>
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900 border border-white/10 text-cyan-400">
              <Icon className="h-6 w-6 opacity-80" />
            </div>
            <p className="text-xs font-medium text-slate-200">{title}</p>
            {description && (
              <p className="mt-1 text-[11px] text-slate-400 max-w-[260px]">{description}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
