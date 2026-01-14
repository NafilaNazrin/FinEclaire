import React from 'react';
import { Home, Receipt, Lightbulb, MessageCircle, Settings } from 'lucide-react';
import { Screen } from '../App';

interface BottomNavProps {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
}

export default function BottomNav({ currentScreen, navigate }: BottomNavProps) {
  const navItems = [
    { screen: 'dashboard' as Screen, icon: Home, label: 'Home' },
    { screen: 'expense-tracking' as Screen, icon: Receipt, label: 'Expenses' },
    { screen: 'scenario-simulator' as Screen, icon: Lightbulb, label: 'Scenarios' },
    { screen: 'chatbot' as Screen, icon: MessageCircle, label: 'Chat' },
    { screen: 'settings' as Screen, icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 safe-area-bottom">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.screen;
            
            return (
              <button
                key={item.screen}
                onClick={() => navigate(item.screen)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  isActive 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}