/**
 * GameEngine
 * Universal, threat-agnostic coordinator for CyberQuest challenge runtime.
 */

import { ChallengeManager } from './ChallengeManager';
import { ChallengeEvaluator } from './ChallengeEvaluator';
import { ScoreManager } from './ScoreManager';
import { RewardManager } from './RewardManager';
import { GameProgressManager } from './GameProgressManager';
import { FeedbackManager } from './FeedbackManager';

export class GameEngine {
  constructor(questData = null) {
    this.challengeManager = new ChallengeManager();
    this.evaluator = new ChallengeEvaluator();
    this.scoreManager = new ScoreManager();
    this.rewardManager = new RewardManager();
    this.progressManager = new GameProgressManager();
    this.feedbackManager = new FeedbackManager();

    this.questData = null;
    this.challengeSession = null;
    this.lastEvaluation = null;
    this.feedbackData = null;

    if (questData) {
      this.loadQuest(questData);
    }
  }

  loadQuest(questData) {
    this.questData = questData;
    const challenges = questData.challenges || [];
    this.challengeManager.setChallenges(challenges);
    this.progressManager.startSession(questData.id);
    this.initChallengeSession();
  }

  initChallengeSession() {
    const current = this.challengeManager.getCurrentChallenge();
    this.challengeSession = {
      challengeId: current ? current.id : null,
      interactions: [],
      discoveries: [],
      decisions: [],
      currentStep: 0,
      currentStepId: current?.content?.steps ? current.content.steps[0]?.id : null,
      startedAt: Date.now(),
    };
    this.lastEvaluation = null;
    this.feedbackData = null;
  }

  getCurrentChallenge() {
    return this.challengeManager.getCurrentChallenge();
  }

  getChallengeSession() {
    return this.challengeSession;
  }

  getGameState() {
    return this.progressManager.getState();
  }

  getFeedbackData() {
    return this.feedbackData;
  }

  /**
   * Generic investigation / discovery interaction.
   * Modifies the challenge session without completing or evaluating the challenge.
   */
  investigate(action) {
    if (!this.challengeSession) return this.challengeSession;

    const interactionRecord = {
      actionId: action.id,
      type: action.type || 'investigate',
      effect: action.effect || null,
      timestamp: Date.now(),
    };

    const discoveries = action.effect?.discovery
      ? [...new Set([...this.challengeSession.discoveries, action.effect.discovery])]
      : this.challengeSession.discoveries;

    this.challengeSession = {
      ...this.challengeSession,
      interactions: [...this.challengeSession.interactions, interactionRecord],
      discoveries,
    };

    return this.challengeSession;
  }

  /**
   * Generic multi-step navigation action.
   */
  advanceStep(nextStepId, action) {
    if (!this.challengeSession) return this.challengeSession;

    this.challengeSession = {
      ...this.challengeSession,
      currentStepId: nextStepId,
      currentStep: this.challengeSession.currentStep + 1,
      interactions: [
        ...this.challengeSession.interactions,
        { actionId: action.id, nextStepId, timestamp: Date.now() },
      ],
    };

    return this.challengeSession;
  }

  /**
   * Submits an action for evaluation.
   */
  submitAction(action) {
    const challenge = this.getCurrentChallenge();
    if (!challenge) return null;

    // If it's purely an investigation action with an effect, record and return
    if (action.type === 'investigate') {
      this.investigate(action);
      return { type: 'investigation_updated', session: this.challengeSession };
    }

    // If it's a step advancement action in a multi-step challenge
    if (action.type === 'advance' && action.nextStep) {
      this.advanceStep(action.nextStep, action);
      return { type: 'step_advanced', session: this.challengeSession };
    }

    // Otherwise, perform evaluation of decision
    const evaluation = this.evaluator.evaluate({
      challenge,
      session: this.challengeSession,
      action,
    });

    this.lastEvaluation = evaluation;
    this.progressManager.recordEvaluation({
      challengeId: challenge.id,
      actionId: action.id,
      outcome: evaluation.outcome,
      score: evaluation.score,
      xp: evaluation.xp,
      lifeLost: evaluation.lifeLost,
    });

    this.feedbackData = this.feedbackManager.formatFeedback({
      evaluation,
      challenge,
      action,
    });

    return {
      type: 'evaluation_complete',
      evaluation,
      feedback: this.feedbackData,
      gameState: this.progressManager.getState(),
    };
  }

  /**
   * Proceeds to the next challenge or finishes the quest.
   */
  nextChallenge() {
    if (this.challengeManager.hasNext()) {
      const nextChallenge = this.challengeManager.next();
      this.progressManager.advanceToNextChallenge(this.challengeManager.getChallengeIndex());
      this.initChallengeSession();
      return { status: 'playing', challenge: nextChallenge };
    } else {
      this.progressManager.completeQuest();
      return { status: 'completed', summary: this.getCompletionSummary() };
    }
  }

  restartQuest() {
    if (this.questData) {
      this.loadQuest(this.questData);
    }
  }

  getCompletionSummary() {
    const state = this.progressManager.getState();
    const totalChallenges = this.challengeManager.getTotalCount();
    const accuracy = state.attempts > 0 ? Math.round((state.correctAnswers / state.attempts) * 100) : 0;

    const reward = this.rewardManager.generateQuestCompletionUpdate({
      questId: state.questId,
      challengesCompleted: state.correctAnswers,
      challengesAttempted: state.attempts,
      totalScore: state.score,
      totalXp: state.xpEarned,
      accuracy,
      livesRemaining: state.lives,
    });

    return {
      questId: state.questId,
      questTitle: this.questData?.title || 'Quest Complete',
      score: state.score,
      xpEarned: state.xpEarned,
      accuracy,
      livesRemaining: state.lives,
      challengesCompleted: state.correctAnswers,
      totalChallenges,
      reward,
    };
  }
}
