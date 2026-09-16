import React, { useState } from 'react';
import {
  Mail,
  Shield,
  ShieldAlert,
  AlertTriangle,
  ExternalLink,
  Trash2,
  Flag,
  Search,
  Info,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

export default function EmailChallenge({ challenge, session, onAction }) {
  const { content } = challenge;
  const [inspectedSender, setInspectedSender] = useState(false);
  const [inspectedLink, setInspectedLink] = useState(false);
  const [revealedClues, setRevealedClues] = useState({});

  const handleInspect = (element) => {
    setRevealedClues((prev) => ({
      ...prev,
      [element.id]: element.clue,
    }));

    if (element.target === 'sender') setInspectedSender(true);
    if (element.target === 'link' || element.target === 'link_verify') setInspectedLink(true);

    onAction({
      id: element.id,
      type: 'investigate',
      effect: { discovery: element.id },
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 text-left font-sans animate-in fade-in duration-300">
      
      {/* Investigation Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#0D1119] border border-[#273347] text-xs font-mono">
        <div className="flex items-center gap-2 text-[#AAB3C0]">
          <Search className="w-3.5 h-3.5 text-[#39C6E8]" />
          <span className="font-bold text-[#F4F6F8]">TACTICAL INVESTIGATION:</span>
          <span className="text-[#6F7B8A]">Inspect anomalies before taking action</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {content.inspectableElements?.map((elem) => {
            const isRevealed = !!revealedClues[elem.id];
            return (
              <button
                key={elem.id}
                onClick={() => handleInspect(elem)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isRevealed
                    ? 'bg-[#192131] border-[#39C6E8] text-[#39C6E8]'
                    : 'bg-[#131925] border-[#273347] text-[#AAB3C0] hover:text-[#F4F6F8] hover:border-[#3A4B68]'
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

      {/* Clue Discovery Banners (if any uncovered) */}
      {Object.keys(revealedClues).length > 0 && (
        <div className="space-y-2">
          {Object.entries(revealedClues).map(([id, clue]) => (
            <div
              key={id}
              className="p-3 rounded-xl bg-[#131925] border border-[#39C6E8]/40 text-xs font-mono text-[#F4F6F8] flex items-start gap-2.5 shadow-md"
            >
              <ShieldAlert className="w-4 h-4 text-[#39C6E8] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#39C6E8] uppercase tracking-wider block text-[10px]">
                  FORENSIC CLUE REVEALED
                </span>
                <p className="text-xs text-[#AAB3C0] mt-0.5">{clue}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main Simulated Email Client Container */}
      <div className="cq-card rounded-2xl border border-[#273347] bg-[#131925] shadow-2xl overflow-hidden">
        
        {/* Email App Header Bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#0D1119] border-b border-[#273347] text-xs font-mono text-[#AAB3C0]">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#39C6E8]" />
            <span className="font-bold text-[#F4F6F8]">CORPORATE WEBMAIL</span>
            <span className="text-[#6F7B8A]">•</span>
            <span>{content.clientMeta?.folder || 'Inbox'}</span>
          </div>
          <span className="text-[11px] text-[#6F7B8A]">
            {content.clientMeta?.accountEmail}
          </span>
        </div>

        {/* Email Metadata Card */}
        <div className="p-5 border-b border-[#273347]/70 space-y-3 bg-[#0F1420]">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#F4F6F8] tracking-tight">
              {content.subject}
            </h2>
            {content.urgency && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF7468]/15 border border-[#FF7468]/30 text-[#FF7468] text-[10px] font-mono font-bold uppercase self-start sm:self-auto">
                <AlertTriangle className="w-3 h-3" />
                {content.urgency}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {/* Sender with Inspection Badge */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#192131] border border-[#273347] text-[#39C6E8] flex items-center justify-center font-bold text-xs shrink-0">
                {content.sender?.avatarText || 'IT'}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#F4F6F8]">{content.sender?.name}</span>
                  <button
                    onClick={() => setInspectedSender(!inspectedSender)}
                    className="text-[10px] text-[#39C6E8] hover:underline cursor-pointer"
                  >
                    {inspectedSender ? 'Hide Details' : 'Inspect Sender'}
                  </button>
                </div>
                <span className="text-[11px] text-[#AAB3C0] block">{content.sender?.email}</span>
              </div>
            </div>

            {/* Timestamp & Recipient */}
            <div className="sm:text-right text-[11px] text-[#6F7B8A] space-y-0.5">
              <div>To: <span className="text-[#AAB3C0]">{content.recipient}</span></div>
              <div className="flex items-center sm:justify-end gap-1">
                <Clock className="w-3 h-3" />
                <span>{content.timestamp}</span>
              </div>
            </div>
          </div>

          {/* Expanded Sender Security Inspection Box */}
          {inspectedSender && content.sender && (
            <div className="p-3.5 rounded-xl bg-[#080B12] border border-[#273347] text-xs font-mono space-y-1.5 animate-in fade-in duration-200">
              <span className="text-[10px] font-bold text-[#39C6E8] uppercase tracking-wider block">
                SECURITY HEADER ANALYSIS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#6F7B8A]">SPF Status:</span>
                  <span className="text-[#FF7468] font-bold">{content.sender.spfResult}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#6F7B8A]">Domain Age:</span>
                  <span className="text-[#FFB84D] font-bold">{content.sender.domainAge}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Email Body Content */}
        <div className="p-6 text-sm text-[#F4F6F8] space-y-5 leading-relaxed bg-[#131925]">
          <div
            className="prose prose-invert max-w-none text-xs sm:text-sm text-[#AAB3C0] space-y-3"
            dangerouslySetInnerHTML={{ __html: content.bodyHtml }}
          />

          {/* Hyperlinks Section */}
          {content.links?.map((link) => (
            <div key={link.id} className="pt-2">
              <div className="p-4 rounded-xl bg-[#0D1119] border border-[#273347] space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <button
                    onClick={() => setInspectedLink(!inspectedLink)}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#39C6E8] hover:underline cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                  </button>

                  <button
                    onClick={() => setInspectedLink(!inspectedLink)}
                    className="text-[10px] font-mono text-[#AAB3C0] bg-[#192131] hover:text-[#F4F6F8] px-2.5 py-1 rounded border border-[#273347] self-start sm:self-auto cursor-pointer"
                  >
                    {inspectedLink ? 'Hide Link Analysis' : 'Inspect Destination URL'}
                  </button>
                </div>

                {/* Expanded Link Inspection Target */}
                {inspectedLink && (
                  <div className="p-3 rounded-lg bg-[#080B12] border border-[#FF7468]/30 font-mono text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#6F7B8A]">Displayed Anchor:</span>
                      <span className="text-[#73D6B1]">{link.displayUrl}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] border-t border-[#1F2937] pt-1">
                      <span className="text-[#FF7468] font-bold">Actual Target:</span>
                      <span className="text-[#FF7468] font-bold break-all">{link.actualDestination}</span>
                    </div>
                    {link.clue && (
                      <p className="text-[11px] text-[#AAB3C0] pt-1 italic">
                        ⚠️ {link.clue}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

        </div>

        {/* Available Player Action Bar */}
        <div className="p-5 bg-[#0D1119] border-t border-[#273347] flex flex-wrap items-center justify-end gap-3 font-mono">
          {content.availableActions?.map((action) => {
            const isDanger = action.variant === 'danger';
            const isPrimary = action.variant === 'primary';
            return (
              <button
                key={action.id}
                onClick={() => onAction(action)}
                className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                  isPrimary
                    ? 'btn-cq-primary'
                    : isDanger
                    ? 'bg-[#FF7468]/15 hover:bg-[#FF7468]/25 text-[#FF7468] border border-[#FF7468]/40'
                    : 'btn-cq-secondary'
                }`}
              >
                {isPrimary && <Flag className="w-4 h-4" />}
                {isDanger && <AlertTriangle className="w-4 h-4" />}
                {!isPrimary && !isDanger && <Trash2 className="w-4 h-4" />}
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
}
