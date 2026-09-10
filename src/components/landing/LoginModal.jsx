import React, { useState } from 'react';
import { X, Shield, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onStartQuest }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        className="relative w-full max-w-md rounded-2xl border border-cyan-500/30 bg-[#0B1120] p-6 shadow-2xl shadow-cyan-500/10 text-slate-100"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-cyan-400" />
            <h3 id="login-title" className="font-heading text-base font-bold text-white">
              Agent Access // CyberQuest
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close login dialog"
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-slate-300">
              Enter your corporate email or handle to sync XP, badges, and Escape Room leaderboard progress.
            </p>

            <div className="space-y-1.5">
              <label htmlFor="agent-email" className="font-mono text-xs text-slate-400 uppercase">Agent Email / ID</label>
              <input
                id="agent-email"
                type="email"
                required
                placeholder="agent@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="agent-passphrase" className="font-mono text-xs text-slate-400 uppercase">Passphrase</label>
              <input
                id="agent-passphrase"
                type="password"
                required
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-400 py-2.5 font-mono text-xs font-bold text-slate-950 hover:bg-cyan-300 transition-colors shadow-md shadow-cyan-500/20"
            >
              <span>ACCESS AGENT TERMINAL</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartQuest();
                }}
                className="text-xs text-cyan-400 hover:underline font-medium"
              >
                No account? Try Instant Live Guest Quest →
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-4 space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="font-heading text-lg font-bold text-white">Agent Authenticated</h4>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Welcome back. Launching your personalized training dashboard...
            </p>
            <button
              onClick={() => {
                onClose();
                onStartQuest();
              }}
              className="mt-2 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2 font-mono text-xs font-bold text-slate-950 hover:bg-cyan-300"
            >
              <span>Launch Live Simulation</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
