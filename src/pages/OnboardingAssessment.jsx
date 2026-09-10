import React, { useState, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import AssessmentProgress from '../components/onboarding/AssessmentProgress';
import AssessmentScenario from '../components/onboarding/AssessmentScenario';
import { onboardingScenarios } from '../data/onboarding/scenarios';
import { useAuth } from '../context/AuthContext';
import { animateScenarioTransition } from '../animations/onboardingAnimations';

export default function OnboardingAssessment() {
  const { user, completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const scenarioRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  // If already completed, redirect to roadmap
  if (user?.onboarding?.completed) {
    return <Navigate to="/app/roadmap" replace />;
  }

  const currentScenario = onboardingScenarios[currentIndex];

  const handleChooseOption = (optionId) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const updatedAnswers = {
      ...answers,
      [currentScenario.id]: optionId,
    };
    setAnswers(updatedAnswers);

    if (currentIndex < onboardingScenarios.length - 1) {
      animateScenarioTransition(scenarioRef.current, 'next', () => {
        setCurrentIndex((prev) => prev + 1);
        setIsTransitioning(false);
      });
    } else {
      // Completed all 10 scenarios! Retrieve stored preferences
      let prefs = { experienceLevel: 'beginner', goals: ['phishing', 'scams'] };
      try {
        const stored = sessionStorage.getItem('cyberquest_onboarding_prefs');
        if (stored) prefs = JSON.parse(stored);
      } catch (e) {
        console.error('Error reading onboarding prefs:', e);
      }

      completeOnboarding({
        experienceLevel: prefs.experienceLevel,
        goals: prefs.goals,
        answers: updatedAnswers,
      });

      navigate('/onboarding/result');
    }
  };

  return (
    <AuthLayout>
      <div className="w-full">
        <AssessmentProgress
          currentIndex={currentIndex}
          totalCount={onboardingScenarios.length}
        />

        <AssessmentScenario
          scenario={currentScenario}
          onChooseOption={handleChooseOption}
          scenarioContainerRef={scenarioRef}
        />
      </div>
    </AuthLayout>
  );
}
