import React, { useState } from 'react';
import {
  QrCode,
  Scan,
  Shield,
  ShieldAlert,
  AlertTriangle,
  ExternalLink,
  Search,
  Info,
  Layers,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function QrChallenge({ challenge, session, onAction }) {
  const { content } = challenge;
  const [scanned, setScanned] = useState(false);
  const [showUrlBreakdown, setShowUrlBreakdown] = useState(false);
  const [revealedClues, setRevealedClues] = useState({});

  const handleInspect = (element) => {
    setRevealedClues((prev) => ({
      ...prev,
      [element.id]: element.clue,
    }));

    if (element.target === 'url') setShowUrlBreakdown(true);
    if (element.target === 'scan') setScanned(true);

    onAction({
      id: element.id,
      type: 'investigate',
      effect: { discovery: element.id },
    });
  };

  const qrData = content.qrData || {
    label: 'QR Code',
    locationContext: 'Public Area',
    rawUrl: 'https://pay.example.test/scan',
    destinationDomain: 'pay.example.test',
    protocol: 'https',
    isOverlaySticker: false,
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 text-left font-sans animate-in fade-in duration-300">
      
      {/* Investigation Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#0D1119] border border-[#273347] text-xs font-mono">
        <div className="flex items-center gap-2 text-[#AAB3C0]">
          <Search className="w-3.5 h-3.5 text-[#39C6E8]" />
          <span className="font-bold text-[#F4F6F8]">QR FORENSICS:</span>
          <span className="text-[#6F7B8A]">Examine physical placement and decoded payload</span>
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

      {/* Clues Uncovered */}
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
                  OPTICAL / NETWORK INTEL REVEALED
                </span>
                <p className="text-xs text-[#AAB3C0] mt-0.5">{clue}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main QR Scanner & Physical Setting Card */}
      <div className="cq-card rounded-2xl border border-[#273347] bg-[#131925] shadow-2xl overflow-hidden">
        
        {/* Context Header */}
        <div className="px-6 py-3 bg-[#0D1119] border-b border-[#273347] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#FFB84D]" />
            <span className="font-bold text-[#F4F6F8]">SETTING:</span>
            <span className="text-[#AAB3C0]">{qrData.locationContext}</span>
          </div>
          <span className="text-[#6F7B8A] text-[11px]">QR TACTICAL SCANNER</span>
        </div>

        {/* Dual Column: Physical Item Visual + Scanner Viewfinder */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-[#0F1420]">
          
          {/* Physical Object View */}
          <div className="p-5 rounded-2xl bg-[#0D1119] border border-[#273347] space-y-4 text-center relative overflow-hidden">
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-mono font-bold text-[#39C6E8] uppercase tracking-wider block">
                PHYSICAL ENVIRONMENT INSPECTION
              </span>
              <h3 className="text-sm font-bold text-[#F4F6F8] font-mono">
                {content.itemTitle || 'Display Poster / Stand'}
              </h3>
            </div>

            {/* Fictional physical graphic representation */}
            <div className="mx-auto w-48 h-48 rounded-xl bg-[#192131] border-2 border-dashed border-[#3A4B68] p-4 flex flex-col items-center justify-center relative shadow-inner">
              <div className="w-28 h-28 bg-white p-2 rounded-lg shadow-md flex items-center justify-center relative group">
                <QrCode className="w-full h-full text-black" />
                {qrData.isOverlaySticker && (
                  <div className="absolute -top-1 -right-1 bg-[#FF7468] text-[#080B12] text-[8px] font-mono font-black px-1 rounded shadow">
                    STICKER OVERLAY
                  </div>
                )}
              </div>
              <span className="text-[10px] font-mono text-[#AAB3C0] mt-2 block">
                {qrData.caption || 'Scan to pay / visit portal'}
              </span>
            </div>

            <p className="text-xs text-[#AAB3C0] leading-relaxed text-left font-sans">
              {content.physicalDescription || 'You spot this QR code posted on the counter. Look closely before pointing your camera.'}
            </p>
          </div>

          {/* Scanner Viewfinder / Decoded HUD */}
          <div className="p-5 rounded-2xl bg-[#0A0E17] border border-[#273347] space-y-4">
            <div className="flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-1.5 text-[#73D6B1]">
                <Scan className="w-4 h-4 animate-pulse" />
                <span className="font-bold">OPTICAL DECODER</span>
              </div>
              <span className="text-[10px] text-[#6F7B8A]">CAMERA PREVIEW ACTIVE</span>
            </div>

            {/* Decoded URL HUD Card */}
            <div className="p-4 rounded-xl bg-[#131925] border border-[#39C6E8]/40 space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#6F7B8A] uppercase font-bold">DECODED TARGET PAYLOAD:</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#39C6E8]/10 text-[#39C6E8] font-bold">
                  {qrData.protocol.toUpperCase()}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0D1119] border border-[#273347] text-xs font-mono text-[#F4F6F8] break-all select-all">
                {qrData.rawUrl}
              </div>

              {/* URL Breakdown Analysis */}
              <div className="space-y-1 text-[11px]">
                <div className="flex items-center justify-between text-[#AAB3C0]">
                  <span className="text-[#6F7B8A]">Target Host:</span>
                  <span className="font-bold text-[#F4F6F8]">{qrData.destinationDomain}</span>
                </div>
                {qrData.redirectNotice && (
                  <div className="flex items-center justify-between text-[#FFB84D]">
                    <span>Redirect Notice:</span>
                    <span className="font-bold">{qrData.redirectNotice}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-xs text-[#AAB3C0] font-sans">
              {content.scannerTip || 'Verify the exact domain and whether this redirects to a third-party login or payment gateway.'}
            </div>
          </div>

        </div>

        {/* Action Decision Row */}
        <div className="p-5 bg-[#0D1119] border-t border-[#273347] space-y-3 font-mono">
          <span className="text-[11px] font-bold text-[#F4F6F8] uppercase tracking-wider block">
            HOW DO YOU PROCEED?
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
