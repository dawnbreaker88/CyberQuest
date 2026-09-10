import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import PremiseSection from '../components/landing/PremiseSection';
import VisualShowcaseCarousel from '../components/landing/VisualShowcaseCarousel';
import HowItWorks from '../components/landing/HowItWorks';
import QuestCategories from '../components/landing/QuestCategories';
import GameplayPreview from '../components/landing/GameplayPreview';
import ProgressionPreview from '../components/landing/ProgressionPreview';
import PhilosophySection from '../components/landing/PhilosophySection';
import FinalCTA from '../components/landing/FinalCTA';
import Footer from '../components/landing/Footer';

export default function Landing() {
  const navigate = useNavigate();

  const handleStartQuest = () => {
    navigate('/signup');
  };

  const handleSeeHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F4F6F8] selection:bg-[#39C6E8]/20 selection:text-[#39C6E8] font-sans antialiased overflow-x-hidden">
      
      {/* Floating Pill Navbar */}
      <Navbar onStartQuest={handleStartQuest} />

      <main>
        {/* 01. Hero with Highlighted CYBERQUEST & HARDER TO FOOL and Clean Mascot */}
        <Hero 
          onStartQuest={handleStartQuest}
          onSeeHowItWorks={handleSeeHowItWorks}
        />

        {/* 02. The Premise with Threat Simulation Scene (trap.jpg) */}
        <PremiseSection />

        {/* 03. Visual Artwork Carousel (Mascot, Threat Traps, Campaign Path) */}
        <VisualShowcaseCarousel />

        {/* 04. Gameplay Loop — Spot. Think. Decide. Learn. */}
        <HowItWorks />

        {/* 05. What You'll Face — Five Threats Quest Destinations */}
        <QuestCategories />

        {/* 06. Gameplay Preview — Think Before You Click Scenario */}
        <GameplayPreview />

        {/* 07. Progression & XP — Level Up, Badges, & Pathway (path.jpg) */}
        <ProgressionPreview />

        {/* 08. The Philosophy — Knowledge helps. Instinct protects. */}
        <PhilosophySection />

        {/* 09. Final Call to Action */}
        <FinalCTA onStartQuest={handleStartQuest} />
      </main>

      {/* 10. Minimal Footer */}
      <Footer />

    </div>
  );
}
