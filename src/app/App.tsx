import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import OnboardingWelcome from './components/OnboardingWelcome';
import OnboardingEthics from './components/OnboardingEthics';
import OnboardingAuth from './components/OnboardingAuth';
import Dashboard from './components/Dashboard';
import FinanceProfile from './components/FinanceProfile';
import ExpenseTracking from './components/ExpenseTracking';
import TradingInvestments from './components/TradingInvestments';
import ScenarioSimulator from './components/ScenarioSimulator';
import AdvisoryInsights from './components/AdvisoryInsights';
import Transparency from './components/Transparency';
import Settings from './components/Settings';
import Chatbot from './components/Chatbot';
import BottomNav from './components/BottomNav';

export type Screen = 
  | 'splash'
  | 'onboarding-welcome'
  | 'onboarding-ethics'
  | 'onboarding-auth'
  | 'dashboard'
  | 'finance-profile'
  | 'expense-tracking'
  | 'trading-investments'
  | 'scenario-simulator'
  | 'advisory-insights'
  | 'transparency'
  | 'chatbot'
  | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [showBottomNav, setShowBottomNav] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDarkMode(shouldUseDark);
    if (shouldUseDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
    
    // Show bottom nav only on main app screens
    const mainScreens: Screen[] = [
      'dashboard',
      'expense-tracking',
      'scenario-simulator',
      'advisory-insights',
      'chatbot',
      'settings',
      'finance-profile'
    ];
    setShowBottomNav(mainScreens.includes(screen));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onContinue={() => navigate('onboarding-welcome')} />;
      case 'onboarding-welcome':
        return <OnboardingWelcome onContinue={() => navigate('onboarding-ethics')} />;
      case 'onboarding-ethics':
        return <OnboardingEthics onContinue={() => navigate('onboarding-auth')} />;
      case 'onboarding-auth':
        return <OnboardingAuth onContinue={() => navigate('dashboard')} />;
      case 'dashboard':
        return <Dashboard navigate={navigate} />;
      case 'finance-profile':
        return <FinanceProfile navigate={navigate} />;
      case 'expense-tracking':
        return <ExpenseTracking navigate={navigate} />;
      case 'trading-investments':
        return <TradingInvestments navigate={navigate} />;
      case 'scenario-simulator':
        return <ScenarioSimulator navigate={navigate} />;
      case 'advisory-insights':
        return <AdvisoryInsights navigate={navigate} />;
      case 'transparency':
        return <Transparency navigate={navigate} />;
      case 'chatbot':
        return <Chatbot navigate={navigate} />;
      case 'settings':
        return <Settings navigate={navigate} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
      default:
        return <Dashboard navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-md mx-auto bg-white dark:bg-slate-900 min-h-screen relative">
        {renderScreen()}
        {showBottomNav && (
          <BottomNav currentScreen={currentScreen} navigate={navigate} />
        )}
      </div>
    </div>
  );
}