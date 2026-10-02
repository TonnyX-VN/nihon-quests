/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Header } from './components/common/Header';
import { Navigation } from './components/common/Navigation';
import { Breadcrumbs } from './components/common/Breadcrumbs';
import { ToastContainer } from './components/common/ToastContainer';
import { HomeView } from './components/home/HomeView';
import { WorldMapView } from './components/map/WorldMapView';
import { BattleArenaView } from './components/battle/BattleArenaView';
import { StudyView } from './components/study/StudyView';
import { CustomKnowledgeView } from './components/custom/CustomKnowledgeView';
import { DailyQuestView } from './components/daily/DailyQuestView';
import { AchievementsView } from './components/achievements/AchievementsView';
import { ProfileView } from './components/profile/ProfileView';
import { ReviewView } from './components/review/ReviewView';
import { GameEngineModal } from './components/game/GameEngineModal';
import { GoogleAuthModal } from './components/auth/GoogleAuthModal';

const AppContent: React.FC = () => {
  const { view, activeStage, setActiveStage, isAuthModalOpen, closeGoogleAuthModal } = useGame();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white bg-torii-pattern">
      {/* RPG Top Navigation Header */}
      <Header />

      {/* Main Layout Area */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        {/* Desktop Sidebar Navigation */}
        <Navigation />

        {/* Dynamic Content View Container */}
        <main className="flex-1 min-w-0 p-3 sm:p-6 lg:p-8 mb-20 lg:mb-0">
          <Breadcrumbs />

          {view === 'home' && <HomeView />}
          {view === 'map' && <WorldMapView />}
          {view === 'battle' && <BattleArenaView />}
          {view === 'study' && <StudyView />}
          {view === 'custom_knowledge' && <CustomKnowledgeView />}
          {view === 'daily' && <DailyQuestView />}
          {view === 'achievements' && <AchievementsView />}
          {view === 'profile' && <ProfileView />}
          {view === 'review' && <ReviewView />}
        </main>
      </div>

      {/* Active Stage Gameplay Modal */}
      {activeStage && (
        <GameEngineModal
          stage={activeStage}
          onClose={() => {
            (window as any).__customStageQuestions = undefined;
            setActiveStage(null);
          }}
        />
      )}

      {/* Global Google Auth Modal */}
      <GoogleAuthModal isOpen={isAuthModalOpen} onClose={closeGoogleAuthModal} />

      {/* Floating Game Notification Toasts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
