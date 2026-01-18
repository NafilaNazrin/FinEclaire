import React, { useEffect, useState } from 'react';
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

import { Analysis } from './types/analysis';

/* ------------------ SCREENS ------------------ */
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

/* ------------------ EXPENSE TYPE ------------------ */
export type Expense = {
  id: string;
  amount: number;
  category: 'essentials' | 'discretionary' | 'investments' | 'trading';
  description: string;
  date: string;
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [showBottomNav, setShowBottomNav] = useState(false);

  /* ------------------ FINANCIAL STATE (SOURCE OF TRUTH) ------------------ */
  const [income] = useState(50000); // later user editable
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);

  /* ------------------ THEME ------------------ */
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  /* ------------------ ADD EXPENSE (REAL DATA ENTRY POINT) ------------------ */
  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  /* ------------------ BACKEND ANALYSIS ------------------ */
  const fetchAnalysis = async () => {
    if (expenses.length === 0) {
      setAnalysis(null);
      return;
    }

    setLoadingAnalysis(true);

    const monthlyExpenses = expenses.map((e) => e.amount);
    const discretionaryTotal = expenses
      .filter((e) => e.category === 'discretionary')
      .reduce((sum, e) => sum + e.amount, 0);

    try {
      const res = await fetch('http://127.0.0.1:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          income,
          monthly_expenses: monthlyExpenses,
          discretionary_expenses: discretionaryTotal,
          trading_capital: 0,
          investable_funds: income,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch analysis');
      }

      const data: Analysis = await res.json();
      setAnalysis(data);
    } catch (err) {
      console.error('❌ Analysis fetch failed:', err);
      setAnalysis(null);
    } finally {
      setLoadingAnalysis(false);
    }
  };

  /* ------------------ NAVIGATION ------------------ */
  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);

    const mainScreens: Screen[] = [
      'dashboard',
      'expense-tracking',
      'trading-investments',
      'scenario-simulator',
      'advisory-insights',
      'chatbot',
      'settings',
      'finance-profile',
    ];

    setShowBottomNav(mainScreens.includes(screen));
  };

  /* ------------------ SCREEN RENDER ------------------ */
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onContinue={() => navigate('onboarding-welcome')} />;

      case 'onboarding-welcome':
        return <OnboardingWelcome onContinue={() => navigate('onboarding-ethics')} />;

      case 'onboarding-ethics':
        return <OnboardingEthics onContinue={() => navigate('onboarding-auth')} />;

      case 'onboarding-auth':
        return (
          <OnboardingAuth
            onContinue={() => {
              navigate('dashboard');
            }}
          />
        );

      case 'dashboard':
        return (
          <Dashboard
            navigate={navigate}
            analysis={analysis}
            loading={loadingAnalysis}
          />
        );

      case 'finance-profile':
        return <FinanceProfile navigate={navigate} />;

      case 'expense-tracking':
        return (
          <ExpenseTracking
            navigate={navigate}
            expenses={expenses}
            addExpense={addExpense}
            
          />
        );

      case 'trading-investments':
        return <TradingInvestments navigate={navigate} />;

      case 'scenario-simulator':
        return <ScenarioSimulator navigate={navigate} analysis={analysis} />;

      case 'advisory-insights':
        return <AdvisoryInsights navigate={navigate} analysis={analysis} />;

      case 'transparency':
        return <Transparency navigate={navigate} />;

      case 'chatbot':
        return <Chatbot navigate={navigate} />;

      case 'settings':
        return (
          <Settings
            navigate={navigate}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
        );

      default:
        return null;
    }
  };

  /* ------------------ AUTO-ANALYZE ON EXPENSE CHANGE ------------------ */
  useEffect(() => {
    fetchAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-md mx-auto min-h-screen bg-white dark:bg-slate-900 relative">
        {renderScreen()}
        {showBottomNav && (
          <BottomNav currentScreen={currentScreen} navigate={navigate} />
        )}
      </div>
    </div>
  );
}
