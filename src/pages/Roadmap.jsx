import React, { useRef, useEffect } from 'react';
import AppNavbar from '../components/app/AppNavbar';
import RoadmapHero from '../components/roadmap/RoadmapHero';
import CurrentQuest from '../components/roadmap/CurrentQuest';
import QuestMap from '../components/roadmap/QuestMap';
import { quests } from '../data/quests';
import { useAuth } from '../context/AuthContext';
import { initRoadmapEntrance } from '../animations/roadmapAnimations';

export default function Roadmap() {
  const { user } = useAuth();
  const greetingRef = useRef(null);
  const statsRef = useRef(null);
  const currentQuestPanelRef = useRef(null);
  const mapHeadingRef = useRef(null);
  const nodesRef = useRef([]);

  const currentQuest = quests.find((q) => q.id === (user?.currentQuest || 'phishing')) || quests[0];

  useEffect(() => {
    const tl = initRoadmapEntrance({
      greeting: greetingRef.current,
      stats: statsRef.current,
      currentQuestPanel: currentQuestPanelRef.current,
      mapHeading: mapHeadingRef.current,
      questNodes: nodesRef.current,
    });

    return () => {
      if (tl) tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#F1F1EF] font-mono antialiased selection:bg-[#24272C] selection:text-[#F1F1EF] bg-hairline-grid overflow-x-hidden">
      
      {/* Smart Hide/Reveal App Navbar */}
      <AppNavbar />

      <main>
        {/* Personalized Welcome Header */}
        <RoadmapHero
          greetingRef={greetingRef}
          statsRef={statsRef}
        />

        {/* Current Active Quest Panel */}
        <CurrentQuest
          currentQuestRef={currentQuestPanelRef}
          quest={currentQuest}
        />

        {/* Interactive Campaign Quest Map */}
        <QuestMap
          mapHeadingRef={mapHeadingRef}
          nodesRef={nodesRef}
          currentQuestId={currentQuest.id}
        />
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-[#24272C]/40 bg-[#0B0C0E] py-12 px-4 sm:px-6 lg:px-8 text-center text-xs font-mono text-[#696D74]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F1F1EF]" />
            <span className="text-[#F1F1EF] font-bold">CYBERQUEST ENGINE</span>
          </div>
          <span>SESSION ACTIVE • PROGRESS SAVED LOCALLY</span>
        </div>
      </footer>

    </div>
  );
}
