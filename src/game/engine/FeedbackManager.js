/**
 * FeedbackManager
 * Prepares feedback payloads for outcomes, explanations, clues, and rules.
 */

export class FeedbackManager {
  /**
   * Structures evaluation feedback payload for the UI.
   */
  formatFeedback({ evaluation, challenge, action }) {
    if (!evaluation) {
      return null;
    }

    const { outcome, score, xp, lifeLost, feedback } = evaluation;

    return {
      outcome, // 'correct' | 'partial' | 'wrong'
      score,
      xp,
      lifeLost,
      title: feedback?.title || (outcome === 'correct' ? 'Threat Neutralized' : 'Security Breach'),
      explanation: feedback?.explanation || 'Action evaluated.',
      rule: feedback?.rule || 'Pay close attention to anomalous patterns and requests.',
      cluesUncovered: feedback?.cluesUncovered || [],
      actionLabel: action?.label || 'Submitted Action',
      challengeTitle: challenge?.title || 'Challenge',
    };
  }
}
