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
    { screen: 'scenario-simulator' as Screen, icon: Lightbulb, label: 'What-if' },
    { screen: 'chatbot' as Screen, icon: MessageCircle, label: 'Chat' },
    { screen: 'settings' as Screen, icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 safe-area-bottom z-50">
      <div className="max-w-md mx-auto w-full">
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.screen;

            return (
              <button
                key={item.screen}
                onClick={() => navigate(item.screen)}
                className={`flex flex-col items-center justify-center relative transition-colors ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] mt-1 font-medium truncate w-full px-1">{item.label}</span>
                {isActive && <div className="absolute top-0 w-8 h-1 bg-blue-600 rounded-b-full" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
