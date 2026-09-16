/**
 * RewardManager
 * Produces generic player state update payloads upon challenge and quest completion.
 */

export class RewardManager {
  /**
   * Generates persistent player updates for a completed quest.
   * @param {Object} params
   * @param {string} params.questId
   * @param {number} params.challengesCompleted
   * @param {number} params.challengesAttempted
   * @param {number} params.totalScore
   * @param {number} params.totalXp
   * @param {number} params.accuracy
   * @param {number} params.livesRemaining
   * @returns {Object} Delta payload for AuthContext / player storage
   */
  generateQuestCompletionUpdate({
    questId,
    challengesCompleted,
    challengesAttempted,
    totalScore,
    totalXp,
    accuracy,
    livesRemaining,
  }) {
    return {
      xpDelta: totalXp,
      questId,
      questCompleted: true,
      challengesCompletedDelta: challengesCompleted,
      challengesAttemptedDelta: challengesAttempted,
      accuracy,
      perfectRun: livesRemaining === 3 && accuracy === 100,
      timestamp: new Date().toISOString(),
    };
  }
}
