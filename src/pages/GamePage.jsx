import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGameEngine } from '../game/hooks/useGameEngine';
import { useAuth } from '../context/AuthContext';
import GameHeader from '../game/components/GameHeader';
import GameRenderer from '../game/renderers/GameRenderer';
import FeedbackPanel from '../game/components/FeedbackPanel';
import QuestComplete from '../game/components/QuestComplete';
import QuestFailed from '../game/components/QuestFailed';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export default function GamePage() {
  const { questId } = useParams();
  const { user, updateUser } = useAuth();
  const hasSavedCompletion = useRef(false);

  const {
    questData,
    gameState,
    currentChallenge,
    challengeSession,
    feedbackData,
    completionSummary,
    submitAction,
    nextChallenge,
    restartQuest,
    totalChallenges,
    currentChallengeIndex,
  } = useGameEngine(questId);

  // Persist rewards upon completion
  useEffect(() => {
    if (gameState.status === 'completed' && completionSummary && !hasSavedCompletion.current) {
      hasSavedCompletion.current = true;
      if (user) {
        const currentCompletedQuests = user.progress?.questsCompleted || [];
        const updatedQuests = currentCompletedQuests.includes(questId)
          ? currentCompletedQuests
          : [...currentCompletedQuests, questId];

        const prevXp = user.stats?.xp || 0;
        const prevCompleted = user.stats?.challengesCompleted || 0;
        const prevAttempted = user.stats?.challengesAttempted || 0;

        updateUser({
          stats: {
            ...user.stats,
            xp: prevXp + completionSummary.xpEarned,
            challengesCompleted: prevCompleted + completionSummary.challengesCompleted,
            challengesAttempted: prevAttempted + completionSummary.totalChallenges,
          },
          progress: {
            ...user.progress,
            questsCompleted: updatedQuests,
          },
        });
      }
    }
  }, [gameState.status, completionSummary, questId, user, updateUser]);

  const handleRestart = () => {
    hasSavedCompletion.current = false;
    restartQuest();
  };

  // Fallback for quests not yet registered
  if (!questData) {
    return (
      <div className="min-h-screen bg-[#080B12] text-[#F4F6F8] font-mono flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#131925] border border-[#273347] flex items-center justify-center text-[#39C6E8]">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2 max-w-md">
          <h1 className="text-xl sm:text-2xl font-bold uppercase">
            Quest '{questId}' In Development
          </h1>
          <p className="text-xs text-[#AAB3C0] font-sans leading-relaxed">
            The universal game engine is active. This quest module is being calibrated for deployment in upcoming updates.
          </p>
        </div>
        <Link
          to="/app/roadmap"
          className="btn-cq-primary text-xs font-bold uppercase px-6 py-3 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO ROADMAP</span>
        </Link>
      </div>
    );
  }

  const isCompleted = gameState.status === 'completed';
  const isFailed = gameState.status === 'failed';

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F4F6F8] font-sans flex flex-col justify-between selection:bg-[#39C6E8]/20 selection:text-[#39C6E8]">
      
      {/* Game HUD Header */}
      <GameHeader
        questTitle={questData.title}
        categoryColor={questData.color}
        currentIndex={currentChallengeIndex}
        totalCount={totalChallenges}
        lives={gameState.lives}
        maxLives={3}
        score={gameState.score}
        xpEarned={gameState.xpEarned}
      />

      {/* Main Challenge Gameplay Stage */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center items-center">
        {isCompleted ? (
          <QuestComplete summary={completionSummary} onRestart={handleRestart} />
        ) : isFailed ? (
          <QuestFailed onRestart={handleRestart} questTitle={questData.title} />
        ) : (
          <GameRenderer
            challenge={currentChallenge}
            session={challengeSession}
            onAction={submitAction}
          />
        )}
      </main>

      {/* Universal Feedback Panel Modal */}
      {feedbackData && !isCompleted && !isFailed && (
        <FeedbackPanel
          feedback={feedbackData}
          onNext={nextChallenge}
          isLastChallenge={currentChallengeIndex === totalChallenges - 1}
        />
      )}

      {/* Bottom Status Footer */}
      <footer className="py-3 px-4 border-t border-[#1F2937]/50 bg-[#080B12] text-center text-[10px] font-mono text-[#6F7B8A]">
        CYBERQUEST UNIVERSAL GAME ENGINE // THREAT-AGNOSTIC RUNTIME v3.2
      </footer>

    </div>
  );
}
