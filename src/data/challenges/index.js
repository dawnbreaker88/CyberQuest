/**
 * Quest & Challenge Registry
 * Resolves quest metadata and challenges by questId.
 * Maps all 5 CyberQuest threat tracks (50 total challenges).
 */

import { phishingChallenges } from './phishing.js';
import { passwordChallenges } from './passwords.js';
import { qrSafetyChallenges } from './qrSafety.js';
import { scamChallenges } from './scams.js';
import { socialEngineeringChallenges } from './socialEngineering.js';
import { validateChallenge } from './validator.js';

// Registry of quest definitions and their challenge suites
const questRegistry = {
  phishing: {
    id: 'phishing',
    title: 'Phishing',
    subtitle: 'Spot the trap before you click',
    category: 'phishing',
    color: '#39C6E8',
    rewardXp: 150,
    challenges: phishingChallenges,
  },
  passwords: {
    id: 'passwords',
    title: 'Passwords',
    subtitle: 'Build uncrackable credential habits',
    category: 'passwords',
    color: '#73D6B1',
    rewardXp: 200,
    challenges: passwordChallenges,
  },
  qr: {
    id: 'qr',
    title: 'QR Safety',
    subtitle: "Don't trust what you scan",
    category: 'qr',
    color: '#FFB84D',
    rewardXp: 200,
    challenges: qrSafetyChallenges,
  },
  'qr-safety': {
    id: 'qr',
    title: 'QR Safety',
    subtitle: "Don't trust what you scan",
    category: 'qr',
    color: '#FFB84D',
    rewardXp: 200,
    challenges: qrSafetyChallenges,
  },
  scams: {
    id: 'scams',
    title: 'Scams',
    subtitle: 'Recognize manipulation & urgency traps',
    category: 'scams',
    color: '#FF7468',
    rewardXp: 250,
    challenges: scamChallenges,
  },
  'social-engineering': {
    id: 'social-engineering',
    title: 'Social Engineering',
    subtitle: 'Outsmart human deception & pretexting',
    category: 'social-engineering',
    color: '#9D91E8',
    rewardXp: 300,
    challenges: socialEngineeringChallenges,
  },
  socialEngineering: {
    id: 'social-engineering',
    title: 'Social Engineering',
    subtitle: 'Outsmart human deception & pretexting',
    category: 'social-engineering',
    color: '#9D91E8',
    rewardXp: 300,
    challenges: socialEngineeringChallenges,
  },
};

/**
 * Validates and retrieves a quest by its unique identifier.
 * @param {string} questId - The quest ID to retrieve.
 * @returns {Object|null} The resolved quest data or null if not found.
 */
export function getQuest(questId) {
  if (!questId) return null;
  const quest = questRegistry[questId];
  if (!quest) return null;

  // Run validation in development
  if (process.env.NODE_ENV !== 'production' && quest.challenges) {
    quest.challenges.forEach((challenge) => {
      validateChallenge(challenge);
    });
  }

  return quest;
}

/**
 * Returns all unique registered quest IDs.
 */
export function getAllQuestIds() {
  return ['phishing', 'passwords', 'qr', 'scams', 'social-engineering'];
}

export { validateChallenge };
