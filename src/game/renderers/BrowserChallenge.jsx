import React, { useState } from 'react';
import {
  Globe,
  Lock,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Shield,
  ShieldAlert,
  AlertTriangle,
  Info,
  Search,
  CheckCircle2,
  X,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export default function BrowserChallenge({ challenge, session, onAction }) {
  const { content } = challenge;
  const [showSslModal, setShowSslModal] = useState(false);
  const [showUrlBreakdown, setShowUrlBreakdown] = useState(false);
  const [revealedClues, setRevealedClues] = useState({});

  const handleInspect = (element) => {
    setRevealedClues((prev) => ({
      ...prev,
      [element.id]: element.clue,
    }));

    if (element.target === 'ssl') setShowSslModal(true);
    if (element.target === 'addressBar') setShowUrlBreakdown(true);

    onAction({
      id: element.id,
      type: 'investigate',
      effect: { discovery: element.id },
    });
  };

  const { browserChrome, pageContent } = content;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 text-left font-sans animate-in fade-in duration-300">
      
      {/* Investigation Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#0D1119] border border-[#273347] text-xs font-mono">
        <div className="flex items-center gap-2 text-[#AAB3C0]">
          <Search className="w-3.5 h-3.5 text-[#39C6E8]" />
          <span className="font-bold text-[#F4F6F8]">BROWSER FORENSICS:</span>
          <span className="text-[#6F7B8A]">Analyze address bar and certificate details</span>
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

      {/* Clue Discovery Banners */}
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
                  URL FORENSIC DISCOVERY
                </span>
                <p className="text-xs text-[#AAB3C0] mt-0.5">{clue}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main Simulated Browser Window */}
      <div className="cq-card rounded-2xl border border-[#273347] bg-[#131925] shadow-2xl overflow-hidden">
        
        {/* Browser Top Window Bar */}
        <div className="bg-[#0A0E17] border-b border-[#273347] px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF7468]/80" />
            <span className="w-3 h-3 rounded-full bg-[#FFB84D]/80" />
            <span className="w-3 h-3 rounded-full bg-[#73D6B1]/80" />
            <span className="text-xs font-mono text-[#6F7B8A] ml-2">CyberQuest Sandbox Browser v1.4</span>
          </div>
          <div className="text-[11px] font-mono text-[#39C6E8] bg-[#131925] border border-[#273347] px-2 py-0.5 rounded">
            ISOLATED SESSION
          </div>
        </div>

        {/* Browser Navigation & Address Bar */}
        <div className="bg-[#0D1119] border-b border-[#273347] p-3 flex flex-wrap sm:flex-nowrap items-center gap-3">
          
          {/* Nav Controls */}
          <div className="flex items-center gap-1.5 text-[#6F7B8A]">
            <button className="p-1.5 rounded-lg hover:bg-[#192131] hover:text-[#F4F6F8] disabled:opacity-40" disabled>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-[#192131] hover:text-[#F4F6F8] disabled:opacity-40" disabled>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-[#192131] hover:text-[#F4F6F8]">
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Address Input Bar */}
          <div className="flex-1 min-w-[260px] flex items-center gap-2 bg-[#131925] border border-[#273347] rounded-xl px-3 py-1.5 text-xs font-mono">
            
            {/* SSL Lock Indicator */}
            <button
              onClick={() => setShowSslModal(!showSslModal)}
              className="flex items-center gap-1 text-[#73D6B1] hover:bg-[#192131] px-1.5 py-0.5 rounded cursor-pointer shrink-0"
              title="Click to view SSL Certificate"
            >
              <Lock className="w-3.5 h-3.5 text-[#73D6B1]" />
              <span className="text-[10px] uppercase font-bold hidden md:inline">HTTPS</span>
            </button>

            {/* URL Display */}
            <div className="flex-1 overflow-x-auto whitespace-nowrap text-[11px] text-[#AAB3C0]">
              <span className="text-[#6F7B8A]">https://</span>
              <span className="text-[#F4F6F8] font-bold">{browserChrome?.subdomain}.</span>
              <span className="text-[#FF7468] font-black bg-[#FF7468]/15 px-1 rounded">{browserChrome?.realDomain}</span>
              <span className="text-[#6F7B8A]">/signin/v2/challenge</span>
            </div>

            <button
              onClick={() => setShowUrlBreakdown(!showUrlBreakdown)}
              className="text-[10px] text-[#39C6E8] hover:underline shrink-0 cursor-pointer"
            >
              {showUrlBreakdown ? 'Hide Breakdown' : 'Deconstruct URL'}
            </button>
          </div>

        </div>

        {/* Interactive URL Deconstruction Panel */}
        {showUrlBreakdown && (
          <div className="p-4 bg-[#080B12] border-b border-[#273347] text-xs font-mono space-y-2 animate-in fade-in duration-200">
            <span className="text-[10px] font-bold text-[#39C6E8] uppercase tracking-wider block">
              HOSTNAME BREAKDOWN (RIGHT-TO-LEFT PARSING)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2.5 rounded-lg bg-[#131925] border border-[#273347]">
                <span className="text-[10px] text-[#6F7B8A] block">Subdomain (Spoof Layer)</span>
                <span className="text-xs font-bold text-[#F4F6F8]">{browserChrome?.subdomain}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#131925] border border-[#FF7468]/40">
                <span className="text-[10px] text-[#FF7468] font-bold block">True Root Domain</span>
                <span className="text-xs font-black text-[#FF7468]">{browserChrome?.realDomain}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#131925] border border-[#273347]">
                <span className="text-[10px] text-[#6F7B8A] block">SSL Cert Subject</span>
                <span className="text-xs font-bold text-[#FFB84D]">{browserChrome?.sslSubject}</span>
              </div>
            </div>
          </div>
        )}

        {/* SSL Certificate Inspector Popover */}
        {showSslModal && (
          <div className="p-4 bg-[#080B12] border-b border-[#273347] text-xs font-mono space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#73D6B1]" />
                <span className="font-bold text-[#F4F6F8]">SSL / TLS Certificate Inspector</span>
              </div>
              <button onClick={() => setShowSslModal(false)} className="text-[#6F7B8A] hover:text-[#F4F6F8]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
              <div>
                <span className="text-[#6F7B8A]">Issued To:</span>{' '}
                <span className="text-[#FF7468] font-bold">{browserChrome?.sslSubject}</span>
              </div>
              <div>
                <span className="text-[#6F7B8A]">Issuer:</span>{' '}
                <span className="text-[#AAB3C0]">{browserChrome?.sslIssuer}</span>
              </div>
              <div className="sm:col-span-2 text-[#AAB3C0] text-[10px] italic border-t border-[#1F2937] pt-1">
                Note: HTTPS encryption proves the data is encrypted in transit, but does NOT verify that the domain owner is Google.
              </div>
            </div>
          </div>
        )}

        {/* Simulated Web Page Content Area */}
        <div className="p-8 sm:p-12 flex flex-col items-center justify-center bg-[#0F1420] min-h-[320px]">
          
          <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#131925] border border-[#273347] shadow-xl space-y-5">
            
            {/* Page Header */}
            <div className="text-center space-y-1.5">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#192131] border border-[#273347] text-[#39C6E8] font-black text-sm mb-1">
                G
              </div>
              <h2 className="text-xl font-bold text-[#F4F6F8] tracking-tight">
                {pageContent?.headline}
              </h2>
              <p className="text-xs text-[#AAB3C0]">
                {pageContent?.subheadline}
              </p>
            </div>

            {/* Simulated Form Fields */}
            <div className="space-y-3 font-mono text-xs">
              {pageContent?.formFields?.map((field) => (
                <div key={field.id} className="space-y-1">
                  <label className="text-[11px] text-[#AAB3C0] block">{field.label}</label>
                  <input
                    type={field.type}
                    value={field.value || ''}
                    placeholder={field.placeholder || ''}
                    readOnly
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1119] border border-[#273347] text-[#F4F6F8] text-xs focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="text-center text-[11px] text-[#6F7B8A] font-mono border-t border-[#273347] pt-3">
              {pageContent?.notice}
            </div>

          </div>

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
                {isPrimary && <ShieldCheck className="w-4 h-4" />}
                {isDanger && <AlertTriangle className="w-4 h-4" />}
                {!isPrimary && !isDanger && <ArrowLeft className="w-4 h-4" />}
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
}
