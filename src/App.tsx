import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { StorageService } from './lib/storage/localStorage';
import { ProgressMetrics } from './types/assessment';
import { LearnerMisconceptionState } from './types/adaptive';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { Module1Page } from './pages/Module1Page';
import { Module2Page } from './pages/Module2Page';
import { Module3Page } from './pages/Module3Page';
import { Module4Page } from './pages/Module4Page';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { PreAssessmentPage } from './pages/PreAssessmentPage';
import { PostAssessmentPage } from './pages/PostAssessmentPage';
import { ResultsPage } from './pages/ResultsPage';
import { EducatorAnalyticsPage } from './pages/EducatorAnalyticsPage';
import { AboutMethodologyPage } from './pages/AboutMethodologyPage';
import { UserGuidePage } from './pages/UserGuidePage';

export const App: React.FC = () => {
  const [progress, setProgress] = useState<ProgressMetrics>(() => StorageService.loadProgress());
  const [misconceptions, setMisconceptions] = useState<LearnerMisconceptionState>(() => StorageService.loadMisconceptions());

  // Track session duration
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = { ...prev, timeSpentSeconds: prev.timeSpentSeconds + 5 };
        StorageService.saveProgress(next);
        return next;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-[#090d16] text-gray-100 quantum-grid-bg">
        <Navbar progress={progress} onProgressUpdate={setProgress} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/dashboard"
              element={<DashboardPage progress={progress} misconceptions={misconceptions} />}
            />
            <Route
              path="/module/m1"
              element={
                <Module1Page
                  progress={progress}
                  misconceptions={misconceptions}
                  onUpdateProgress={setProgress}
                  onUpdateMisconceptions={setMisconceptions}
                />
              }
            />
            <Route
              path="/module/m2"
              element={
                <Module2Page
                  progress={progress}
                  misconceptions={misconceptions}
                  onUpdateProgress={setProgress}
                  onUpdateMisconceptions={setMisconceptions}
                />
              }
            />
            <Route
              path="/module/m3"
              element={
                <Module3Page
                  progress={progress}
                  misconceptions={misconceptions}
                  onUpdateProgress={setProgress}
                  onUpdateMisconceptions={setMisconceptions}
                />
              }
            />
            <Route
              path="/module/m4"
              element={
                <Module4Page
                  progress={progress}
                  misconceptions={misconceptions}
                  onUpdateProgress={setProgress}
                  onUpdateMisconceptions={setMisconceptions}
                />
              }
            />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route
              path="/pre-assessment"
              element={
                <PreAssessmentPage
                  progress={progress}
                  misconceptions={misconceptions}
                  onUpdateProgress={setProgress}
                  onUpdateMisconceptions={setMisconceptions}
                />
              }
            />
            <Route
              path="/post-assessment"
              element={
                <PostAssessmentPage
                  progress={progress}
                  misconceptions={misconceptions}
                  onUpdateProgress={setProgress}
                  onUpdateMisconceptions={setMisconceptions}
                />
              }
            />
            <Route
              path="/results"
              element={<ResultsPage progress={progress} misconceptions={misconceptions} />}
            />
            <Route
              path="/educator-analytics"
              element={<EducatorAnalyticsPage progress={progress} misconceptions={misconceptions} />}
            />
            <Route path="/about" element={<AboutMethodologyPage />} />
            <Route path="/user-guide" element={<UserGuidePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
