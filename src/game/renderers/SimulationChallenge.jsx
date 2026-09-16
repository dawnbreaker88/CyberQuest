import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Monitor,
  Mail,
  MessageSquare,
  Globe,
  Bell,
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Settings,
  Lock,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function SimulationChallenge({ challenge, session, onAction }) {
  const { content } = challenge;
  const envs = content.environments || ['email', 'messages', 'browser'];
  const [activeEnv, setActiveEnv] = useState(content.initialEnvironment || envs[0]);
  const [revealedClues, setRevealedClues] = useState({});
  const [inspectedItems, setInspectedItems] = useState(new Set());
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const containerRef = useRef(null);

  const handleInspect = (element) => {
    setRevealedClues((prev) => ({
      ...prev,
      [element.id]: element.clue,
    }));
    setInspectedItems((prev) => new Set([...prev, element.id]));

    onAction({
      id: element.id,
      type: 'investigate',
      effect: { discovery: element.id },
    });
  };

  const currentEnvData = content.environmentData ? content.environmentData[activeEnv] : null;
  const totalClues = content.totalCluesCount || content.inspectableElements?.length || 5;
  const cluesFoundCount = Object.keys(revealedClues).length;

  // Environment tab icon helper
  const getEnvIcon = (envKey) => {
    switch (envKey) {
      case 'email':
      case 'inbox':
        return <Mail className="w-3.5 h-3.5" />;
      case 'messages':
      case 'sms':
      case 'chat':
        return <MessageSquare className="w-3.5 h-3.5" />;
      case 'browser':
      case 'web':
        return <Globe className="w-3.5 h-3.5" />;
      case 'notifications':
      case 'alerts':
        return <Bell className="w-3.5 h-3.5" />;
      case 'settings':
      case 'account':
      case 'security':
        return <Settings className="w-3.5 h-3.5" />;
      case 'phone':
      case 'calls':
        return <Phone className="w-3.5 h-3.5" />;
      default:
        return <Activity className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-5xl mx-auto space-y-4 text-left font-sans animate-in fade-in duration-300"
    >
      {/* Simulation Command Center Bar */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0D1119] border border-[#39C6E8]/40 shadow-xl flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#39C6E8]/10 border border-[#39C6E8]/30 flex items-center justify-center text-[#39C6E8]">
            <Monitor className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#39C6E8] bg-[#39C6E8]/15 px-2 py-0.5 rounded uppercase tracking-wider">
                LIVE SIMULATION ENGINE
              </span>
              <span className="text-[10px] text-[#73D6B1] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#73D6B1] animate-ping" />
                ACTIVE INCIDENT
              </span>
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-[#F4F6F8] uppercase mt-0.5">
              {content.simulationTitle || challenge.title}
            </h2>
          </div>
        </div>

        {/* Forensic Clue Discovery Metric */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="px-3 py-1.5 rounded-xl bg-[#131925] border border-[#273347] flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#FFB84D]" />
            <div className="text-[11px]">
              <span className="text-[#6F7B8A]">CLUES FOUND: </span>
              <strong className="text-[#FFB84D] font-mono">
                {cluesFoundCount} / {totalClues}
              </strong>
            </div>
          </div>
          {content.timeRemaining && (
            <div className="px-3 py-1.5 rounded-xl bg-[#131925] border border-[#273347] flex items-center gap-2 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-[#39C6E8]" />
              <span className="text-[#F4F6F8] font-bold">{content.timeRemaining}</span>
            </div>
          )}
        </div>
      </div>

      {/* Scenario Brief & Investigation Tools */}
      <div className="p-3.5 rounded-xl bg-[#131925] border border-[#273347] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <p className="text-xs text-[#AAB3C0] font-sans max-w-2xl">
          {content.missionObjective ||
            'Cross-examine multiple channels. Connect anomalies across communications, domains, and security settings before executing your final response.'}
        </p>

        <div className="flex flex-wrap items-center gap-1.5">
          {content.inspectableElements?.map((elem) => {
            const isRevealed = !!revealedClues[elem.id];
            return (
              <button
                key={elem.id}
                onClick={() => handleInspect(elem)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isRevealed
                    ? 'bg-[#192131] border-[#39C6E8] text-[#39C6E8]'
                    : 'bg-[#0D1119] border-[#273347] text-[#AAB3C0] hover:text-[#F4F6F8] hover:border-[#3A4B68]'
                }`}
              >
                <Info className="w-3 h-3" />
                <span>{elem.label}</span>
                {isRevealed && <span className="w-1.5 h-1.5 rounded-full bg-[#39C6E8]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Forensic Clue Stream */}
      {cluesFoundCount > 0 && (
        <div className="space-y-1.5">
          {Object.entries(revealedClues).map(([id, clue]) => (
            <div
              key={id}
              className="p-2.5 rounded-xl bg-[#131925] border border-[#39C6E8]/40 text-xs font-mono text-[#F4F6F8] flex items-start gap-2.5 shadow-md animate-in slide-in-from-top-1"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#39C6E8] shrink-0 mt-0.5" />
              <div className="text-[11px]">
                <strong className="text-[#39C6E8] uppercase mr-2">DISCOVERY:</strong>
                <span className="text-[#AAB3C0] font-sans">{clue}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main Digital Operating Environment Window */}
      <div className="cq-card rounded-2xl border border-[#273347] bg-[#131925] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Environment App Tabs Switcher */}
        <div className="px-4 py-2.5 bg-[#080B12] border-b border-[#273347] flex items-center justify-between overflow-x-auto gap-2">
          <div className="flex items-center gap-1.5">
            {envs.map((envKey) => {
              const isActive = activeEnv === envKey;
              const meta = content.environmentMeta ? content.environmentMeta[envKey] : null;
              return (
                <button
                  key={envKey}
                  type="button"
                  onClick={() => {
                    setActiveEnv(envKey);
                    setActiveItemIndex(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#192131] border border-[#39C6E8] text-[#39C6E8] shadow-sm'
                      : 'bg-[#0D1119] border border-transparent text-[#6F7B8A] hover:text-[#AAB3C0] hover:bg-[#131925]'
                  }`}
                >
                  {getEnvIcon(envKey)}
                  <span>{meta?.label || envKey}</span>
                  {meta?.badge && (
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-[#FF7468]/20 text-[#FF7468] border border-[#FF7468]/30">
                      {meta.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="text-[10px] font-mono text-[#6F7B8A] hidden sm:block">
            ACTIVE WORKSPACE: <span className="text-[#F4F6F8] uppercase">{activeEnv}</span>
          </div>
        </div>

        {/* Dynamic Environment Content Canvas */}
        <div className="p-5 sm:p-6 bg-[#0F1420] min-h-[300px]">
          {/* Render Environment items */}
          {currentEnvData ? (
            <div className="space-y-4">
              
              {/* Timeline / Item Selector if environment has multiple entries */}
              {currentEnvData.items && currentEnvData.items.length > 1 && (
                <div className="flex flex-wrap gap-2 pb-2 border-b border-[#273347]">
                  {currentEnvData.items.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveItemIndex(idx)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        activeItemIndex === idx
                          ? 'bg-[#39C6E8]/15 border border-[#39C6E8] text-[#39C6E8] font-bold'
                          : 'bg-[#0D1119] border border-[#273347] text-[#6F7B8A] hover:text-[#AAB3C0]'
                      }`}
                    >
                      {item.title || item.sender || `Item ${idx + 1}`}
                    </button>
                  ))}
                </div>
              )}

              {/* Active Item View */}
              {(() => {
                const item = currentEnvData.items
                  ? currentEnvData.items[activeItemIndex] || currentEnvData.items[0]
                  : currentEnvData;

                if (!item) return <div className="text-xs text-[#6F7B8A]">No active items.</div>;

                return (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#131925] border border-[#273347] space-y-4">
                    
                    {/* Item Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#273347]/60 pb-3 font-mono text-xs">
                      <div>
                        <span className="text-[10px] text-[#6F7B8A] uppercase block">
                          {item.category || activeEnv.toUpperCase()} CONTEXT:
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-[#F4F6F8]">
                          {item.title || item.subject || item.headline}
                        </h3>
                      </div>
                      {item.timestamp && (
                        <div className="text-[11px] text-[#6F7B8A] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.timestamp}</span>
                        </div>
                      )}
                    </div>

                    {/* Meta Fields (e.g. Sender, URL, Status) */}
                    {item.metaFields && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono p-3 rounded-xl bg-[#0D1119] border border-[#273347]/80">
                        {item.metaFields.map((mf, i) => (
                          <div key={i} className="flex items-center justify-between pr-2">
                            <span className="text-[#6F7B8A]">{mf.label}:</span>
                            <span className="font-semibold text-[#F4F6F8] break-all">{mf.value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Body / Description Text */}
                    <div className="text-xs sm:text-sm text-[#AAB3C0] font-sans leading-relaxed space-y-2">
                      {item.bodyHtml ? (
                        <div dangerouslySetInnerHTML={{ __html: item.bodyHtml }} />
                      ) : (
                        <p>{item.text || item.description}</p>
                      )}
                    </div>

                    {/* Sub-elements / Links / Warnings */}
                    {item.highlightBox && (
                      <div className="p-3 rounded-xl bg-[#192131] border border-[#39C6E8]/30 text-xs font-mono space-y-1">
                        <span className="text-[10px] text-[#39C6E8] font-bold uppercase block">
                          {item.highlightBox.title || 'SYSTEM FLAG'}
                        </span>
                        <p className="text-[#F4F6F8]">{item.highlightBox.text}</p>
                      </div>
                    )}

                  </div>
                );
              })()}

            </div>
          ) : (
            <div className="text-center py-12 text-[#6F7B8A] font-mono text-xs">
              No data in workspace. Switch environments using the tabs above.
            </div>
          )}
        </div>

        {/* Global Incident Decision Panel */}
        <div className="p-5 sm:p-6 bg-[#0D1119] border-t border-[#273347] space-y-3 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#F4F6F8] uppercase tracking-wider block">
              FINAL INCIDENT DECISION & RESPONSE:
            </span>
            <span className="text-[10px] text-[#6F7B8A]">
              Evaluate carefully using discovered cross-channel intel
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {content.availableActions?.map((action, idx) => {
              const isPrimary = action.variant === 'primary';
              const isDanger = action.variant === 'danger';
              return (
                <button
                  key={action.id}
                  onClick={() => onAction(action)}
                  className={`p-3.5 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between gap-3 cursor-pointer group shadow-md ${
                    isPrimary
                      ? 'bg-[#192131] border-[#73D6B1]/40 text-[#73D6B1] hover:bg-[#73D6B1]/10'
                      : isDanger
                      ? 'bg-[#192131] border-[#FF7468]/40 text-[#FF7468] hover:bg-[#FF7468]/10'
                      : 'bg-[#131925] border-[#273347] text-[#F4F6F8] hover:border-[#39C6E8] hover:bg-[#192131]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] text-[#6F7B8A] font-mono">0{idx + 1}</span>
                    <span>{action.label}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#6F7B8A] group-hover:text-[#F4F6F8] transition-transform group-hover:translate-x-0.5 shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
