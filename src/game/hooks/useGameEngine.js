/**
 * useGameEngine React Hook
 * Provides reactive game state machine binding to GameEngine.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { GameEngine } from '../engine/GameEngine';
import { getQuest } from '../../data/challenges';

export function useGameEngine(questId) {
  const questData = getQuest(questId);
  const engineRef = useRef(null);

  // Lazy instantiate engine
  if (!engineRef.current && questData) {
    engineRef.current = new GameEngine(questData);
  }

  // Reactive state mirrors
  const [gameState, setGameState] = useState(() =>
    engineRef.current ? engineRef.current.getGameState() : { status: 'idle', questId }
  );

  const [currentChallenge, setCurrentChallenge] = useState(() =>
    engineRef.current ? engineRef.current.getCurrentChallenge() : null
  );

  const [challengeSession, setChallengeSession] = useState(() =>
    engineRef.current ? engineRef.current.getChallengeSession() : null
  );

  const [feedbackData, setFeedbackData] = useState(() =>
    engineRef.current ? engineRef.current.getFeedbackData() : null
  );

  const [completionSummary, setCompletionSummary] = useState(null);

  // Sync if questId changes
  useEffect(() => {
    if (questId && (!engineRef.current || engineRef.current.questData?.id !== questId)) {
      const q = getQuest(questId);
      if (q) {
        engineRef.current = new GameEngine(q);
        setGameState(engineRef.current.getGameState());
        setCurrentChallenge(engineRef.current.getCurrentChallenge());
        setChallengeSession(engineRef.current.getChallengeSession());
        setFeedbackData(null);
        setCompletionSummary(null);
      }
    }
  }, [questId]);

  const syncStateFromEngine = useCallback(() => {
    if (!engineRef.current) return;
    setGameState({ ...engineRef.current.getGameState() });
    setCurrentChallenge(engineRef.current.getCurrentChallenge());
    setChallengeSession({ ...engineRef.current.getChallengeSession() });
    setFeedbackData(engineRef.current.getFeedbackData());
  }, []);

  const submitAction = useCallback(
    (action) => {
      if (!engineRef.current) return;
      const res = engineRef.current.submitAction(action);
      syncStateFromEngine();
      return res;
    },
    [syncStateFromEngine]
  );

  const nextChallenge = useCallback(() => {
    if (!engineRef.current) return;
    const res = engineRef.current.nextChallenge();
    if (res.status === 'completed') {
      setCompletionSummary(res.summary);
    }
    syncStateFromEngine();
  }, [syncStateFromEngine]);

  const restartQuest = useCallback(() => {
    if (!engineRef.current) return;
    engineRef.current.restartQuest();
    setCompletionSummary(null);
    syncStateFromEngine();
  }, [syncStateFromEngine]);

  return {
    questData,
    gameState,
    currentChallenge,
    challengeSession,
    feedbackData,
    completionSummary,
    submitAction,
    nextChallenge,
    restartQuest,
    totalChallenges: questData?.challenges?.length || 0,
    currentChallengeIndex: gameState?.currentChallengeIndex || 0,
  };
}
