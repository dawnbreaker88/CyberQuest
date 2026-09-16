/**
 * GameProgressManager
 * Manages runtime game session state (lives, score, xp, answers, status).
 */

export class GameProgressManager {
  constructor(initialLives = 3) {
    this.initialLives = initialLives;
    this.state = this.getInitialState();
  }

  getInitialState(questId = null) {
    return {
      questId,
      status: 'idle', // 'idle' | 'playing' | 'evaluating' | 'feedback' | 'completed' | 'failed'
      currentChallengeIndex: 0,
      score: 0,
      xpEarned: 0,
      lives: this.initialLives,
      attempts: 0,
      correctAnswers: 0,
      answers: [], // [{ challengeId, actionId, outcome, score, xp, timestamp }]
      sessionStartedAt: null,
      sessionCompletedAt: null,
    };
  }

  startSession(questId) {
    this.state = {
      ...this.getInitialState(questId),
      status: 'playing',
      sessionStartedAt: Date.now(),
    };
    return this.state;
  }

  recordEvaluation({ challengeId, actionId, outcome, score, xp, lifeLost }) {
    const newLives = lifeLost ? Math.max(0, this.state.lives - 1) : this.state.lives;
    const isCorrect = outcome === 'correct';

    this.state = {
      ...this.state,
      score: this.state.score + score,
      xpEarned: this.state.xpEarned + xp,
      lives: newLives,
      attempts: this.state.attempts + 1,
      correctAnswers: this.state.correctAnswers + (isCorrect ? 1 : 0),
      answers: [
        ...this.state.answers,
        {
          challengeId,
          actionId,
          outcome,
          score,
          xp,
          timestamp: Date.now(),
        },
      ],
      status: newLives === 0 ? 'failed' : 'feedback',
    };

    return this.state;
  }

  advanceToNextChallenge(nextIndex) {
    this.state = {
      ...this.state,
      currentChallengeIndex: nextIndex,
      status: 'playing',
    };
    return this.state;
  }

  completeQuest() {
    this.state = {
      ...this.state,
      status: 'completed',
      sessionCompletedAt: Date.now(),
    };
    return this.state;
  }

  failQuest() {
    this.state = {
      ...this.state,
      status: 'failed',
      sessionCompletedAt: Date.now(),
    };
    return this.state;
  }

  getState() {
    return this.state;
  }
}
