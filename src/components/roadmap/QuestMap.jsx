import React, { useRef, useEffect } from 'react';
import { quests } from '../../data/quests';
import QuestNode from './QuestNode';
import QuestPath from './QuestPath';
import { initPathScrollAnimation } from '../../animations/roadmapAnimations';

export default function QuestMap({ mapHeadingRef, nodesRef, currentQuestId = 'phishing' }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const tween = initPathScrollAnimation(pathRef.current, containerRef.current);
    return () => {
      if (tween) tween.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-32 relative">
      
      {/* Section Heading */}
      <div ref={mapHeadingRef} className="space-y-4 mb-12 text-left">
        <div className="text-[10px] font-mono tracking-widest text-[#696D74] uppercase">
          [ 02 // QUEST PROGRESSION MAP ]
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#F1F1EF] uppercase">
          THE CAMPAIGN TRAIL
        </h2>

        <p className="text-xs sm:text-sm text-[#969AA1] max-w-md font-normal leading-relaxed">
          Complete each quest track to unlock subsequent challenge domains.
        </p>
      </div>

      {/* Quest Journey Stream */}
      <div className="relative space-y-8 sm:space-y-12">
        {/* Animated Connecting SVG Path */}
        <QuestPath pathRef={pathRef} />

        {/* Nodes Grid */}
        <div className="space-y-6 sm:space-y-10 relative z-10">
          {quests.map((quest, idx) => (
            <QuestNode
              key={quest.id}
              quest={quest}
              index={idx}
              isCurrent={quest.id === currentQuestId}
              nodeRef={(el) => {
                if (nodesRef && nodesRef.current) {
                  nodesRef.current[idx] = el;
                }
              }}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
