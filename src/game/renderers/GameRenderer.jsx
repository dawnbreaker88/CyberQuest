/**
 * GameRenderer
 * The ONLY place where challenge.type dispatch happens.
 * Routes interaction types to specialized renderers.
 */

import React from 'react';
import EmailChallenge from './EmailChallenge';
import BrowserChallenge from './BrowserChallenge';
import MultiStepChallenge from './MultiStepChallenge';
import DecisionChallenge from './DecisionChallenge';
import PasswordBuilderChallenge from './PasswordBuilderChallenge';
import ChatChallenge from './ChatChallenge';
import QrChallenge from './QrChallenge';
import SimulationChallenge from './SimulationChallenge';
import { AlertCircle } from 'lucide-react';

export default function GameRenderer({ challenge, session, onAction }) {
  if (!challenge) {
    return (
      <div className="p-8 text-center text-[#6F7B8A] font-mono text-xs">
        No active challenge loaded.
      </div>
    );
  }

  switch (challenge.type) {
    case 'email':
      return (
        <EmailChallenge
          challenge={challenge}
          session={session}
          onAction={onAction}
        />
      );

    case 'browser':
      return (
        <BrowserChallenge
          challenge={challenge}
          session={session}
          onAction={onAction}
        />
      );

    case 'multi_step':
      return (
        <MultiStepChallenge
          challenge={challenge}
          session={session}
          onAction={onAction}
        />
      );

    case 'decision':
      return (
        <DecisionChallenge
          challenge={challenge}
          session={session}
          onAction={onAction}
        />
      );

    case 'password_builder':
      return (
        <PasswordBuilderChallenge
          challenge={challenge}
          session={session}
          onAction={onAction}
        />
      );

    case 'chat':
      return (
        <ChatChallenge
          challenge={challenge}
          session={session}
          onAction={onAction}
        />
      );

    case 'qr':
      return (
        <QrChallenge
          challenge={challenge}
          session={session}
          onAction={onAction}
        />
      );

    case 'simulation':
      return (
        <SimulationChallenge
          challenge={challenge}
          session={session}
          onAction={onAction}
        />
      );

    default:
      return (
        <div className="max-w-md mx-auto p-6 rounded-2xl bg-[#131925] border border-[#FF7468]/40 text-center font-mono space-y-3">
          <AlertCircle className="w-8 h-8 text-[#FF7468] mx-auto" />
          <h3 className="text-sm font-bold text-[#F4F6F8]">
            UNKNOWN INTERACTION TYPE: {challenge.type}
          </h3>
          <p className="text-xs text-[#AAB3C0]">
            The challenge requires a renderer for '{challenge.type}'.
          </p>
        </div>
      );
  }
}
