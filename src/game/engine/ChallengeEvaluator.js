/**
 * ChallengeEvaluator
 * Evaluates submitted actions strictly against challenge data rules.
 * Threat-agnostic: No hardcoded actions or quest branching.
 */

export class ChallengeEvaluator {
  /**
   * Evaluates an action in the context of a challenge and session.
   * @param {Object} params
   * @param {Object} params.challenge - The active challenge contract.
   * @param {Object} params.session - The current challenge interaction session.
   * @param {Object} params.action - The submitted action object.
   * @returns {Object} Evaluation result { outcome, score, xp, lifeLost, evaluationKey, feedback }
   */
  evaluate({ challenge, session, action }) {
    if (!challenge || !action) {
      return {
        outcome: 'wrong',
        score: 0,
        xp: 0,
        lifeLost: true,
        feedback: null,
      };
    }

    const evalKey = action.evaluationKey || action.id;
    const rule = challenge.evaluation ? challenge.evaluation[evalKey] : null;

    if (!rule) {
      // Default fallback if unmapped action submitted
      return {
        outcome: 'wrong',
        score: 0,
        xp: 0,
        lifeLost: true,
        evaluationKey: evalKey,
        feedback: {
          title: 'Action Unrecognized',
          outcome: 'wrong',
          explanation: 'This action could not be evaluated.',
          rule: 'Choose a recognized decision path.',
          cluesUncovered: [],
        },
      };
    }

    const outcome = rule.outcome || 'wrong';
    const lifeLost = rule.lifeLost !== undefined ? rule.lifeLost : outcome === 'wrong';
    const score = rule.score !== undefined ? rule.score : outcome === 'correct' ? 100 : 0;
    const xp = rule.xp !== undefined ? rule.xp : outcome === 'correct' ? (challenge.xp || 100) : 0;

    // Resolve matching feedback
    const feedback = challenge.feedback ? challenge.feedback[evalKey] || challenge.feedback[outcome] : null;

    return {
      outcome,
      score,
      xp,
      lifeLost,
      evaluationKey: evalKey,
      feedback: feedback || {
        title: outcome === 'correct' ? 'Success!' : outcome === 'partial' ? 'Partial Success' : 'Incident Occurred',
        outcome,
        explanation: 'Evaluation complete.',
        rule: 'Observe patterns to protect your assets.',
        cluesUncovered: [],
      },
    };
  }
}
