/**
 * ScoreManager
 * Owns scoring, XP calculations, streaks, and perfect bonuses.
 * Renderers must NEVER calculate scores or XP directly.
 */

export class ScoreManager {
  constructor(config = {}) {
    this.config = {
      correctBase: 100,
      partialBase: 50,
      wrongBase: 0,
      streakBonusPerItem: 10,
      perfectRunBonus: 50,
      ...config,
    };
  }

  calculateActionScore({ outcome, xpBase = 100, streak = 0 }) {
    let baseScore = 0;
    let earnedXp = 0;

    if (outcome === 'correct') {
      baseScore = this.config.correctBase;
      const streakBonus = streak * this.config.streakBonusPerItem;
      earnedXp = xpBase + streakBonus;
    } else if (outcome === 'partial') {
      baseScore = this.config.partialBase;
      earnedXp = Math.round(xpBase * 0.5);
    } else {
      baseScore = this.config.wrongBase;
      earnedXp = 0;
    }

    return {
      score: baseScore,
      xp: earnedXp,
    };
  }

  calculateQuestBonus({ perfectRun = false }) {
    return perfectRun ? this.config.perfectRunBonus : 0;
  }
}
