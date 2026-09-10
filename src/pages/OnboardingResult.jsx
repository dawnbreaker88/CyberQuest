import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import SecurityIQReveal from '../components/onboarding/SecurityIQReveal';
import ProfileInsight from '../components/onboarding/ProfileInsight';
import { useAuth } from '../context/AuthContext';

export default function OnboardingResult() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [analyzing, setAnalyzing] = useState(true);

  useEffect(() => {
    // 1.2s analyzing sequence
    const timer = setTimeout(() => {
      setAnalyzing(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const baselineScores = user?.onboarding?.baselineScores || {
    phishing: 75,
    passwords: 65,
    qr: 50,
    scams: 70,
    socialEngineering: 45,
  };

  const securityIQ = user?.stats?.securityIQ || 61;
  const strength = user?.onboarding?.strength || 'phishing';
  const blindSpot = user?.onboarding?.blindSpot || 'socialEngineering';

  const handleFinish = () => {
    navigate('/app/roadmap');
  };

  return (
    <AuthLayout>
      {analyzing ? (
        <div className="space-y-6 max-w-md mx-auto text-center py-12 animate-in fade-in duration-300 font-mono">
          <div className="flex items-center justify-center">
            <span className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F1F1EF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-[#C7CDD4]"></span>
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#F1F1EF] uppercase tracking-tight">
              ANALYZING YOUR INSTINCTS...
            </h2>
            <p className="text-xs text-[#969AA1]">
              Synthesizing decision vectors and compiling your baseline Security IQ.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">
          <SecurityIQReveal
            securityIQ={securityIQ}
            baselineScores={baselineScores}
          />

          <ProfileInsight
            strength={strength}
            blindSpot={blindSpot}
            onComplete={handleFinish}
          />
        </div>
      )}
    </AuthLayout>
  );
}
