import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Atom, LayoutDashboard, Cpu, HelpCircle, BarChart3, BookOpen, Menu, X, Sparkles } from 'lucide-react';
import { StorageService } from '../../lib/storage/localStorage';
import { ProgressMetrics } from '../../types/assessment';

interface NavbarProps {
  progress: ProgressMetrics;
  onProgressUpdate: (progress: ProgressMetrics) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ progress, onProgressUpdate }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Playground', path: '/playground', icon: Cpu },
    { label: 'Pre-Test', path: '/pre-assessment', icon: HelpCircle },
    { label: 'Post-Test', path: '/post-assessment', icon: BarChart3 },
    { label: 'Analytics', path: '/educator-analytics', icon: BarChart3 },
    { label: 'Guide', path: '/user-guide', icon: BookOpen },
    { label: 'Methodology', path: '/about', icon: BookOpen },
  ];

  const handleToggleDemoData = () => {
    if (progress.isDemoData) {
      StorageService.resetProgress();
      onProgressUpdate(StorageService.loadProgress());
    } else {
      const demo = StorageService.loadDemoData();
      onProgressUpdate(demo.progress);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 flex items-center justify-center glow-cyan group-hover:scale-105 transition">
            <div className="w-full h-full bg-gray-950 rounded-[10px] flex items-center justify-center">
              <Atom className="w-5 h-5 text-cyan-400 animate-spin-slow" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-cyan-300 transition">
              Qubit<span className="text-cyan-400">Path</span>
            </span>
            <span className="text-[10px] text-gray-400 block -mt-1 font-mono">
              Adaptive Quantum Lab
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                  isActive
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    : 'text-gray-300 hover:text-white hover:bg-gray-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center space-x-3">
          <button
            onClick={handleToggleDemoData}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition border flex items-center space-x-1.5 ${
              progress.isDemoData
                ? 'bg-amber-950/80 border-amber-500/60 text-amber-300 hover:bg-amber-900'
                : 'bg-gray-900 border-gray-700 text-gray-300 hover:border-cyan-500/50'
            }`}
            title="Toggle Demo Learner Data for Presentations"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{progress.isDemoData ? 'Demo Data Active' : 'Load Demo Data'}</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-950 border-b border-gray-800 px-4 pt-2 pb-4 space-y-2">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-900"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => {
              handleToggleDemoData();
              setMobileMenuOpen(false);
            }}
            className="w-full mt-2 text-left px-3 py-2 rounded-md text-sm font-medium text-amber-300 bg-amber-950/40 border border-amber-800/40"
          >
            {progress.isDemoData ? 'Reset Demo Data' : 'Load Demo Data'}
          </button>
        </div>
      )}
    </header>
  );
};
