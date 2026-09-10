import React, { useRef, useEffect } from 'react';
import AppNavbar from '../components/app/AppNavbar';
import ProfileHeader from '../components/profile/ProfileHeader';
import SecurityIQ from '../components/profile/SecurityIQ';
import CategoryMastery from '../components/profile/CategoryMastery';
import ProfileInsights from '../components/profile/ProfileInsights';
import QuestProgress from '../components/profile/QuestProgress';
import BadgeCollection from '../components/profile/BadgeCollection';
import AchievementList from '../components/profile/AchievementList';
import ChallengeStats from '../components/profile/ChallengeStats';
import { useAuth } from '../context/AuthContext';
import { initProfileEntrance } from '../animations/profileAnimations';

export default function Profile() {
  const { user } = useAuth();

  const headerRef = useRef(null);
  const xpBarRef = useRef(null);
  const securityIQRef = useRef(null);
  const insightsRef = useRef(null);
  const categoriesRef = useRef(null);
  const categoryBarsRef = useRef([]);
  const badgesRef = useRef([]);
  const statsRef = useRef(null);

  const baselineScores = user?.onboarding?.baselineScores || {
    phishing: 75,
    passwords: 65,
    qr: 50,
    scams: 70,
    socialEngineering: 45,
  };

  const scoresList = [
    baselineScores.phishing || 75,
    baselineScores.passwords || 65,
    baselineScores.qr || 50,
    baselineScores.scams || 70,
    baselineScores.socialEngineering || 45,
  ];

  useEffect(() => {
    const tl = initProfileEntrance({
      header: headerRef.current,
      xpBar: xpBarRef.current,
      securityIQ: securityIQRef.current,
      insights: insightsRef.current,
      categories: categoriesRef.current,
      categoryBars: categoryBarsRef.current,
      categoryScores: scoresList,
      badges: badgesRef.current,
      stats: statsRef.current,
    });

    return () => {
      if (tl) tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F4F6F8] font-mono antialiased selection:bg-[#273347] selection:text-[#39C6E8] bg-cq-grid overflow-x-hidden">
      
      {/* App Floating Navbar */}
      <AppNavbar />

      <main className="pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-5">
        
        {/* 01. Profile Header & Rank / XP */}
        <ProfileHeader
          headerRef={headerRef}
          xpBarRef={xpBarRef}
        />

        {/* 02. Two-column grid for Security IQ & Insights */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          <div className="md:col-span-5">
            <SecurityIQ
              securityIQRef={securityIQRef}
              securityIQ={user?.stats?.securityIQ || 74}
            />
          </div>

          <div className="md:col-span-7">
            <ProfileInsights
              insightsRef={insightsRef}
              strength={user?.onboarding?.strength || 'phishing'}
              blindSpot={user?.onboarding?.blindSpot || 'socialEngineering'}
            />
          </div>
        </div>

        {/* 03. Category Mastery */}
        <CategoryMastery
          categoriesRef={categoriesRef}
          categoryBarsRef={categoryBarsRef}
          scores={baselineScores}
        />

        {/* 04. Quest Progress Overview */}
        <QuestProgress />

        {/* 05. Badge Collection */}
        <BadgeCollection badgesRef={badgesRef} />

        {/* 06. Achievements */}
        <AchievementList />

        {/* 07. Challenge Statistics */}
        <ChallengeStats
          statsRef={statsRef}
          stats={user?.stats}
        />

      </main>

      {/* Footer */}
      <footer className="border-t border-[#1C2433] bg-[#080B12] py-8 px-4 text-center text-xs font-mono text-[#6F7B8A]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#39C6E8]" />
            <span className="text-[#F4F6F8] font-bold">CYBERQUEST CHARACTER ENGINE</span>
          </div>
          <span>PROFILE SYNCHRONIZED LOCALLY</span>
        </div>
      </footer>

    </div>
  );
}

