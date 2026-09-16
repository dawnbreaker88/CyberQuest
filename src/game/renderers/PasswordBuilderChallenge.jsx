import React, { useState, useEffect } from 'react';
import {
  Key,
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Eye,
  EyeOff,
  ArrowRight,
  Info,
} from 'lucide-react';

export default function PasswordBuilderChallenge({ challenge, session, onAction }) {
  const { content } = challenge;
  const [password, setPassword] = useState(content.initialPassword || '');
  const [showPassword, setShowPassword] = useState(true);
  const [copied, setCopied] = useState(false);

  // Analyze entropy and patterns
  const length = password.length;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  // Common predictable patterns
  const isPredictableSubstitution = /p[@a]ssw[0o]rd/i.test(password);
  const hasSequentialNumbers = /(123|1234|12345|124|125)/.test(password);
  const hasPersonalData = content.personalDataKeywords
    ? content.personalDataKeywords.some((kw) => password.toLowerCase().includes(kw.toLowerCase()))
    : false;

  // Calculate score (0-100)
  let strengthScore = 0;
  if (length >= 8) strengthScore += 20;
  if (length >= 12) strengthScore += 20;
  if (length >= 16) strengthScore += 15;
  if (hasLower && hasUpper) strengthScore += 15;
  if (hasNumber) strengthScore += 15;
  if (hasSpecial) strengthScore += 15;

  if (isPredictableSubstitution) strengthScore = Math.min(strengthScore, 35);
  if (hasPersonalData) strengthScore = Math.min(strengthScore, 30);
  if (hasSequentialNumbers && length < 14) strengthScore = Math.min(strengthScore, 40);

  // Crack time estimation label
  let crackTimeLabel = 'Instant (0 seconds)';
  let strengthColor = '#FF7468'; // Coral
  let strengthLabel = 'CRITICALLY WEAK';

  if (strengthScore >= 80) {
    crackTimeLabel = 'Centuries (Billions of years)';
    strengthColor = '#73D6B1'; // Mint
    strengthLabel = 'MAXIMUM ENTROPY';
  } else if (strengthScore >= 55) {
    crackTimeLabel = 'Several Months to Years';
    strengthColor = '#FFB84D'; // Amber
    strengthLabel = 'MODERATE RESISTANCE';
  } else if (strengthScore >= 30) {
    crackTimeLabel = 'A few minutes to hours';
    strengthColor = '#FF7468';
    strengthLabel = 'EASILY CRACKED';
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handlePresetSelect = (presetVal) => {
    setPassword(presetVal);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 text-left font-sans animate-in fade-in duration-300">
      
      {/* Objective Card */}
      <div className="p-4 rounded-xl bg-[#0D1119] border border-[#273347] space-y-1.5 font-mono">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-[#73D6B1]" />
            <span className="text-xs font-bold text-[#F4F6F8] uppercase tracking-wider">
              PASSWORD ENTROPY LAB
            </span>
          </div>
          <span className="text-[10px] text-[#73D6B1] bg-[#73D6B1]/10 px-2 py-0.5 rounded font-bold">
            INTERACTIVE BUILDER
          </span>
        </div>
        <p className="text-xs text-[#AAB3C0] font-sans">
          {content.objectivePrompt || 'Construct or evaluate the credential to test resilience against dictionary and brute-force attacks.'}
        </p>
      </div>

      {/* Main Builder Stage */}
      <div className="cq-card rounded-2xl border border-[#273347] bg-[#131925] p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Input & Generator Row */}
        <div className="space-y-2">
          <div className="flex items-center justify-between font-mono text-xs">
            <label className="text-[#F4F6F8] font-bold uppercase">
              CREDENTIAL INPUT BUFFER:
            </label>
            <span className="text-[11px] text-[#6F7B8A]">
              Length: <strong className="text-[#39C6E8]">{length}</strong> chars
            </span>
          </div>

          <div className="relative flex items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type or select a password..."
              className="w-full px-4 py-3.5 pr-24 rounded-xl bg-[#0D1119] border border-[#273347] text-[#F4F6F8] font-mono text-sm sm:text-base focus:border-[#73D6B1] focus:outline-none transition-all"
            />
            <div className="absolute right-3 flex items-center gap-1.5 text-[#6F7B8A]">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1.5 hover:text-[#F4F6F8] rounded cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="p-1.5 hover:text-[#F4F6F8] rounded cursor-pointer"
                title="Copy password"
              >
                {copied ? <Check className="w-4 h-4 text-[#73D6B1]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Strength & Entropy Metrics Card */}
        <div className="p-4 rounded-xl bg-[#0D1119] border border-[#273347] space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#6F7B8A]">STRENGTH:</span>
              <span className="font-bold text-xs" style={{ color: strengthColor }}>
                {strengthLabel}
              </span>
            </div>
            <div className="text-right text-[11px]">
              <span className="text-[#6F7B8A]">CRACK TIME: </span>
              <span className="text-[#F4F6F8] font-bold">{crackTimeLabel}</span>
            </div>
          </div>

          {/* Progress Meter */}
          <div className="w-full h-2 rounded-full bg-[#131925] border border-[#273347] overflow-hidden p-0.5">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${strengthScore}%`, backgroundColor: strengthColor }}
            />
          </div>

          {/* Attribute Checklist Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
            <div className={`p-2 rounded-lg border ${length >= 12 ? 'border-[#73D6B1]/40 text-[#73D6B1] bg-[#73D6B1]/10' : 'border-[#273347] text-[#6F7B8A] bg-[#131925]'}`}>
              {length >= 12 ? '✓' : '•'} 12+ Chars ({length})
            </div>
            <div className={`p-2 rounded-lg border ${hasUpper && hasLower ? 'border-[#73D6B1]/40 text-[#73D6B1] bg-[#73D6B1]/10' : 'border-[#273347] text-[#6F7B8A] bg-[#131925]'}`}>
              {hasUpper && hasLower ? '✓' : '•'} Upper & Lower
            </div>
            <div className={`p-2 rounded-lg border ${hasNumber ? 'border-[#73D6B1]/40 text-[#73D6B1] bg-[#73D6B1]/10' : 'border-[#273347] text-[#6F7B8A] bg-[#131925]'}`}>
              {hasNumber ? '✓' : '•'} Numbers
            </div>
            <div className={`p-2 rounded-lg border ${hasSpecial ? 'border-[#73D6B1]/40 text-[#73D6B1] bg-[#73D6B1]/10' : 'border-[#273347] text-[#6F7B8A] bg-[#131925]'}`}>
              {hasSpecial ? '✓' : '•'} Special Symbols
            </div>
          </div>

          {/* Vulnerability Warnings */}
          {(isPredictableSubstitution || hasPersonalData || hasSequentialNumbers) && (
            <div className="p-3 rounded-lg bg-[#FF7468]/15 border border-[#FF7468]/40 text-[#FF7468] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>PREDICTABLE PATTERN DETECTED</span>
              </div>
              <ul className="text-[11px] list-disc list-inside space-y-0.5 text-[#F4F6F8]/80 font-sans">
                {isPredictableSubstitution && <li>Substitution like 'P@ssw0rd' is in standard dictionary rainbow tables.</li>}
                {hasPersonalData && <li>Contains easily guessable personal info (names/dates/schools).</li>}
                {hasSequentialNumbers && <li>Sequential patterns like '123' or '124' are checked first by brute-force bots.</li>}
              </ul>
            </div>
          )}
        </div>

        {/* Preset Samples to Compare (if provided in challenge content) */}
        {content.presets && content.presets.length > 0 && (
          <div className="space-y-2 font-mono">
            <span className="text-[11px] text-[#AAB3C0] font-bold uppercase block">
              SAMPLE CANDIDATES TO TEST:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {content.presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handlePresetSelect(preset.value)}
                  className={`p-3 rounded-xl border text-left transition-all text-xs flex items-center justify-between cursor-pointer ${
                    password === preset.value
                      ? 'border-[#73D6B1] bg-[#192131] text-[#F4F6F8]'
                      : 'border-[#273347] bg-[#0D1119] text-[#AAB3C0] hover:text-[#F4F6F8]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#6F7B8A] block">{preset.label}</span>
                    <span className="font-bold text-xs">{preset.value}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#6F7B8A]" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Available Decision Actions - Strictly Neutral */}
        <div className="p-5 bg-[#0D1119] rounded-xl border border-[#273347] space-y-3 font-mono">
          <div className="text-[11px] font-bold text-[#F4F6F8] uppercase tracking-wider block text-left">
            SUBMIT CREDENTIAL DECISION:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {content.availableActions?.map((action, idx) => (
              <button
                key={action.id}
                type="button"
                onClick={() => onAction({ ...action, payload: { password, strengthScore } })}
                className="w-full p-4 rounded-xl border border-[#273347] bg-[#131925] hover:bg-[#192131] hover:border-[#39C6E8] text-[#F4F6F8] text-xs font-bold transition-all flex items-center justify-between gap-3 cursor-pointer group shadow-sm text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-[#0D1119] border border-[#273347] text-[#39C6E8] flex items-center justify-center text-xs font-mono font-bold shrink-0">
                    0{idx + 1}
                  </span>
                  <span>{action.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#6F7B8A] group-hover:text-[#39C6E8] transition-transform group-hover:translate-x-1 shrink-0" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
