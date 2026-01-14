import React from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Download, 
  Trash2, 
  ChevronRight,
  LogOut,
  HelpCircle,
  Moon,
  Sun
} from 'lucide-react';
import { Screen } from '../App';
import { Switch } from './ui/switch';

interface SettingsProps {
  navigate: (screen: Screen) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function Settings({ navigate, isDarkMode, toggleTheme }: SettingsProps) {
  const settingsSections = [
    {
      title: 'Account',
      items: [
        { 
          icon: User, 
          label: 'Edit Profile', 
          action: () => navigate('finance-profile'),
          color: 'text-blue-600'
        },
        { 
          icon: Bell, 
          label: 'Notifications', 
          action: () => {},
          color: 'text-purple-600'
        }
      ]
    },
    {
      title: 'Privacy & Security',
      items: [
        { 
          icon: Shield, 
          label: 'Privacy Policy', 
          action: () => {},
          color: 'text-green-600'
        },
        { 
          icon: Download, 
          label: 'Export Data', 
          action: () => {},
          color: 'text-blue-600'
        }
      ]
    },
    {
      title: 'Information',
      items: [
        { 
          icon: HelpCircle, 
          label: 'How It Works', 
          action: () => navigate('transparency'),
          color: 'text-slate-600'
        },
        { 
          icon: Shield, 
          label: 'Ethics & Disclaimer', 
          action: () => {},
          color: 'text-slate-600'
        }
      ]
    },
    {
      title: 'Danger Zone',
      items: [
        { 
          icon: Trash2, 
          label: 'Delete Account', 
          action: () => {},
          color: 'text-red-600'
        },
        { 
          icon: LogOut, 
          label: 'Sign Out', 
          action: () => {},
          color: 'text-red-600'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 px-6 pt-12 pb-6">
        <h1 className="text-2xl text-white mb-2">Settings</h1>
        <p className="text-slate-300 text-sm">Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="px-6 -mt-6 mb-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
              JD
            </div>
            <div>
              <h3 className="text-slate-900 dark:text-slate-100">John Doe</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">john.doe@example.com</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Member since Jan 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="px-6 space-y-6">
        {/* Appearance Section */}
        <div>
          <h3 className="text-sm text-slate-500 dark:text-slate-400 mb-3 px-2">Appearance</h3>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                {isDarkMode ? (
                  <Moon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                ) : (
                  <Sun className="w-5 h-5 text-amber-600" />
                )}
                <div>
                  <span className="text-slate-900 dark:text-slate-100 block">Dark Mode</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {isDarkMode ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
              <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
            </div>
          </div>
        </div>

        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className="text-sm text-slate-500 dark:text-slate-400 mb-3 px-2">{section.title}</h3>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIndex}
                    onClick={item.action}
                    className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                      itemIndex !== section.items.length - 1 ? 'border-b border-slate-100 dark:border-slate-700' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${item.color} dark:${item.color.replace('600', '400')}`} />
                      <span className="text-slate-900 dark:text-slate-100">{item.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* App Info */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-700">
          <p className="text-lg text-slate-900 dark:text-slate-100 mb-1">
            Fin<span className="text-blue-600 dark:text-blue-400">Éclairé</span>
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Version 1.0.0</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Financial clarity, explained.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex justify-center gap-6 py-4">
          <button className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">
            Terms
          </button>
          <button className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">
            Privacy
          </button>
          <button className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">
            Support
          </button>
        </div>
      </div>
    </div>
  );
}