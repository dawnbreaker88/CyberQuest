import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import OnboardingWelcome from '../components/onboarding/OnboardingWelcome';
import ExperienceSelector from '../components/onboarding/ExperienceSelector';
import GoalSelector from '../components/onboarding/GoalSelector';
import { useAuth } from '../context/AuthContext';

export default function Onboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Step 0: Welcome, Step 1: Experience, Step 2: Goals
  const [step, setStep] = useState(0);
  const [experienceLevel, setExperienceLevel] = useState('beginner');
  const [selectedGoals, setSelectedGoals] = useState(['phishing', 'scams']);

  // If already completed, redirect to roadmap
  if (user?.onboarding?.completed) {
    return <Navigate to="/app/roadmap" replace />;
  }

  const handleToggleGoal = (goalId) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((g) => g !== goalId)
        : [...prev, goalId]
    );
  };

  const handleStartAssessment = () => {
    // Store preliminary choices in sessionStorage to pass to assessment runner
    sessionStorage.setItem('cyberquest_onboarding_prefs', JSON.stringify({
      experienceLevel,
      goals: selectedGoals,
    }));
    navigate('/onboarding/assessment');
  };

  return (
    <AuthLayout>
      {step === 0 && (
        <OnboardingWelcome onStart={() => setStep(1)} />
      )}

      {step === 1 && (
        <ExperienceSelector
          selected={experienceLevel}
          onSelect={setExperienceLevel}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <GoalSelector
          selectedGoals={selectedGoals}
          onToggleGoal={handleToggleGoal}
          onNext={handleStartAssessment}
          onBack={() => setStep(1)}
        />
      )}
    </AuthLayout>
  );
}
