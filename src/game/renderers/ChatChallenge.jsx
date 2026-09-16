import React, { useState } from 'react';
import {
  MessageSquare,
  Shield,
  ShieldAlert,
  AlertTriangle,
  Search,
  Info,
  Send,
  User,
  Phone,
  ArrowRight,
  CheckCircle2,
  Paperclip,
  CheckCheck,
} from 'lucide-react';

export default function ChatChallenge({ challenge, session, onAction }) {
  const { content } = challenge;
  const [inspectedSender, setInspectedSender] = useState(false);
  const [revealedClues, setRevealedClues] = useState({});

  const handleInspect = (element) => {
    setRevealedClues((prev) => ({
      ...prev,
      [element.id]: element.clue,
    }));

    if (element.target === 'sender') setInspectedSender(true);

    onAction({
      id: element.id,
      type: 'investigate',
      effect: { discovery: element.id },
    });
  };

  const sender = content.sender || {
    name: 'Unknown Contact',
    handle: '+91 98765 43210',
    avatarText: '?',
    verified: false,
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 text-left font-sans animate-in fade-in duration-300">
      
      {/* Investigation Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#0D1119] border border-[#273347] text-xs font-mono">
        <div className="flex items-center gap-2 text-[#AAB3C0]">
          <Search className="w-3.5 h-3.5 text-[#39C6E8]" />
          <span className="font-bold text-[#F4F6F8]">CHAT INVESTIGATION:</span>
          <span className="text-[#6F7B8A]">Analyze sender identity and message pretext</span>
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

      {/* Revealed Clues */}
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
                  COMMUNICATION INTEL REVEALED
                </span>
                <p className="text-xs text-[#AAB3C0] mt-0.5">{clue}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Simulated Messaging App Window */}
      <div className="cq-card rounded-2xl border border-[#273347] bg-[#131925] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Chat Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#0D1119] border-b border-[#273347]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#192131] border border-[#273347] text-[#39C6E8] font-bold flex items-center justify-center text-xs font-mono">
              {sender.avatarText || sender.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#F4F6F8]">{sender.name}</span>
                {sender.badge && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#FF7468]/20 text-[#FF7468] border border-[#FF7468]/30">
                    {sender.badge}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-[#6F7B8A] font-mono flex items-center gap-2">
                <span>{sender.handle || sender.phone || sender.email}</span>
                <button
                  type="button"
                  onClick={() => setInspectedSender(!inspectedSender)}
                  className="text-[#39C6E8] hover:underline cursor-pointer"
                >
                  {inspectedSender ? 'Hide Intel' : 'Inspect Profile'}
                </button>
              </div>
            </div>
          </div>

          <div className="text-right text-[11px] font-mono text-[#6F7B8A] hidden sm:block">
            <span>{content.chatPlatform || 'Secure Chat'}</span>
            <div className="text-[#73D6B1] text-[10px] flex items-center justify-end gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#73D6B1]" />
              <span>Online</span>
            </div>
          </div>
        </div>

        {/* Sender Inspection Dropdown */}
        {inspectedSender && sender.details && (
          <div className="p-4 bg-[#0A0E17] border-b border-[#273347] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#AAB3C0] animate-in fade-in duration-200">
            <div>
              <span className="text-[#6F7B8A]">Contact Status: </span>
              <span className="text-[#F4F6F8]">{sender.details.status || 'Not in Address Book'}</span>
            </div>
            <div>
              <span className="text-[#6F7B8A]">Report History: </span>
              <span className="text-[#FF7468] font-semibold">{sender.details.reports || '3 recent scam flags'}</span>
            </div>
            <div>
              <span className="text-[#6F7B8A]">Registered Location: </span>
              <span className="text-[#F4F6F8]">{sender.details.location || 'Unknown / VoIP Gateway'}</span>
            </div>
            <div>
              <span className="text-[#6F7B8A]">Security Rating: </span>
              <span className="text-[#FFB84D]">{sender.details.trustLevel || 'Unverified External'}</span>
            </div>
          </div>
        )}

        {/* Message Thread Stream */}
        <div className="p-5 sm:p-6 space-y-4 bg-[#0F1420] min-h-[220px] overflow-y-auto">
          {content.messages?.map((msg, idx) => {
            const isMe = msg.senderRole === 'player' || msg.isMe;
            return (
              <div
                key={idx}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm font-sans leading-relaxed shadow-md ${
                    isMe
                      ? 'bg-[#1F2937] text-[#F4F6F8] border border-[#3A4B68] rounded-br-xs'
                      : 'bg-[#131925] text-[#F4F6F8] border border-[#273347] rounded-bl-xs'
                  }`}
                >
                  {!isMe && (
                    <span className="text-[11px] font-mono font-bold text-[#39C6E8] block mb-1">
                      {msg.senderName || sender.name}
                    </span>
                  )}
                  <p>{msg.text}</p>

                  {/* Attachment if present */}
                  {msg.attachment && (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-[#0D1119] border border-[#273347] flex items-center gap-2 text-xs font-mono">
                      <Paperclip className="w-3.5 h-3.5 text-[#39C6E8]" />
                      <div className="overflow-hidden">
                        <span className="text-[#F4F6F8] font-bold truncate block">{msg.attachment.filename}</span>
                        <span className="text-[10px] text-[#6F7B8A]">{msg.attachment.size} • {msg.attachment.type}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#6F7B8A] px-1">
                  <span>{msg.timestamp || 'Just now'}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-[#73D6B1]" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Response Action Decision Grid */}
        <div className="p-5 bg-[#0D1119] border-t border-[#273347] space-y-3 font-mono">
          <span className="text-[11px] font-bold text-[#F4F6F8] uppercase tracking-wider block">
            SELECT HOW TO RESPOND / ACT:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {content.availableActions?.map((action, idx) => {
              const isPrimary = action.variant === 'primary';
              const isDanger = action.variant === 'danger';
              return (
                <button
                  key={action.id}
                  onClick={() => onAction(action)}
                  className={`p-3.5 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between gap-3 cursor-pointer group shadow-sm ${
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
