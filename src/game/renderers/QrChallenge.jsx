import React, { useState } from 'react';
import {
  QrCode,
  Scan,
  Search,
  Info,
  MapPin,
  ArrowRight,
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
      
      {/* Tactical Investigation Bar */}
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
                type="button"
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

      {/* Forensic Evidence Stream */}
      {Object.keys(revealedClues).length > 0 && (
        <div className="space-y-2">
          {Object.entries(revealedClues).map(([id, clue]) => (
            <div
              key={id}
              className="p-3 rounded-xl bg-[#131925] border border-[#273347] text-xs font-mono text-[#F4F6F8] flex items-start gap-2.5 shadow-md"
            >
              <Info className="w-4 h-4 text-[#39C6E8] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#39C6E8] uppercase tracking-wider block text-[10px]">
                  OPTICAL / NETWORK INTEL CAPTURED
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
            <MapPin className="w-3.5 h-3.5 text-[#39C6E8]" />
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
              </div>
              <span className="text-[10px] font-mono text-[#AAB3C0] mt-2 block">
                {qrData.caption || 'Scan to pay / visit portal'}
              </span>
            </div>

            <p className="text-xs text-[#AAB3C0] leading-relaxed text-left font-sans">
              {content.physicalDescription || 'You observe this code in the physical environment. Examine the surface and destination carefully before proceeding.'}
            </p>
          </div>

          {/* Scanner Viewfinder / Decoded HUD */}
          <div className="p-5 rounded-2xl bg-[#0A0E17] border border-[#273347] space-y-4">
            <div className="flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-1.5 text-[#39C6E8]">
                <Scan className="w-4 h-4 animate-pulse" />
                <span className="font-bold">OPTICAL DECODER</span>
              </div>
              <span className="text-[10px] text-[#6F7B8A]">CAMERA PREVIEW ACTIVE</span>
            </div>

            {/* Decoded URL HUD Card */}
            <div className="p-4 rounded-xl bg-[#131925] border border-[#273347] space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#6F7B8A] uppercase font-bold">DECODED TARGET PAYLOAD:</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#192131] text-[#AAB3C0] font-bold border border-[#273347]">
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
                  <div className="flex items-center justify-between text-[#AAB3C0]">
                    <span className="text-[#6F7B8A]">Redirect Notice:</span>
                    <span className="font-semibold text-[#F4F6F8]">{qrData.redirectNotice}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-xs text-[#AAB3C0] font-sans">
              {content.scannerTip || 'Verify the exact domain and whether this redirects to an unexpected login or payment gateway.'}
            </div>
          </div>

        </div>

        {/* Action Decision Row - Strictly Neutral */}
        <div className="p-5 bg-[#0D1119] border-t border-[#273347] space-y-3 font-mono">
          <span className="text-[11px] font-bold text-[#F4F6F8] uppercase tracking-wider block text-left">
            SELECT YOUR ACTION:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {content.availableActions?.map((action, idx) => (
              <button
                key={action.id}
                type="button"
                onClick={() => onAction(action)}
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

