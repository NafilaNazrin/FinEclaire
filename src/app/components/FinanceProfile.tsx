import React, { useState } from 'react';
import { ArrowLeft, DollarSign, Briefcase, Target } from 'lucide-react';
import { Screen } from '../App';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

interface FinanceProfileProps {
  navigate: (screen: Screen) => void;
}

export default function FinanceProfile({ navigate }: FinanceProfileProps) {
  const [monthlyIncome, setMonthlyIncome] = useState([4500]);
  const [selectedIncomeType, setSelectedIncomeType] = useState('salary');
  const [selectedRiskProfile, setSelectedRiskProfile] = useState('moderate');
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['emergency-fund', 'retirement']);

  const incomeTypes = [
    { id: 'salary', label: 'Salary', icon: '💼' },
    { id: 'freelance', label: 'Freelance', icon: '🎨' },
    { id: 'business', label: 'Business', icon: '🏢' },
    { id: 'mixed', label: 'Mixed', icon: '🔄' }
  ];

  const riskProfiles = [
    { id: 'conservative', label: 'Conservative', description: 'Preserve capital, minimal risk' },
    { id: 'moderate', label: 'Moderate', description: 'Balanced growth and safety' },
    { id: 'aggressive', label: 'Aggressive', description: 'High growth potential' }
  ];

  const financialGoals = [
    { id: 'emergency-fund', label: 'Emergency Fund', icon: '🛡️' },
    { id: 'retirement', label: 'Retirement', icon: '🌴' },
    { id: 'home', label: 'Buy a Home', icon: '🏠' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'travel', label: 'Travel', icon: '✈️' },
    { id: 'debt-free', label: 'Debt-Free', icon: '💳' }
  ];

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-6 pt-12 pb-6">
        <button 
          onClick={() => navigate('dashboard')}
          className="mb-6 text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl text-white mb-2">Finance Profile</h1>
        <p className="text-slate-300 text-sm">Build your financial baseline</p>
      </div>

      <div className="px-6 py-6 space-y-8">
        {/* Monthly Income */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg text-slate-900">Monthly Income</h2>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-6">
            <div className="text-center mb-6">
              <p className="text-4xl text-slate-900 mb-1">
                ${monthlyIncome[0].toLocaleString()}
              </p>
              <p className="text-sm text-slate-500">per month</p>
            </div>
            
            <Slider
              value={monthlyIncome}
              onValueChange={setMonthlyIncome}
              min={1000}
              max={15000}
              step={100}
              className="mb-4"
            />
            
            <div className="flex justify-between text-xs text-slate-500">
              <span>$1,000</span>
              <span>$15,000</span>
            </div>
          </div>
        </div>

        {/* Income Type */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg text-slate-900">Income Type</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {incomeTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedIncomeType(type.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedIncomeType === type.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="text-2xl mb-2">{type.icon}</div>
                <p className={`text-sm ${
                  selectedIncomeType === type.id ? 'text-blue-900' : 'text-slate-700'
                }`}>
                  {type.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Risk Preference */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg text-slate-900">Risk Preference</h2>
          </div>
          
          <div className="space-y-3">
            {riskProfiles.map((profile) => (
              <button
                key={profile.id}
                onClick={() => setSelectedRiskProfile(profile.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedRiskProfile === profile.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <p className={`mb-1 ${
                  selectedRiskProfile === profile.id ? 'text-blue-900' : 'text-slate-900'
                }`}>
                  {profile.label}
                </p>
                <p className={`text-sm ${
                  selectedRiskProfile === profile.id ? 'text-blue-700' : 'text-slate-500'
                }`}>
                  {profile.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Financial Goals */}
        <div>
          <h2 className="text-lg text-slate-900 mb-4">Financial Goals</h2>
          <p className="text-sm text-slate-500 mb-4">Select all that apply</p>
          
          <div className="grid grid-cols-2 gap-3">
            {financialGoals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedGoals.includes(goal.id)
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="text-2xl mb-2">{goal.icon}</div>
                <p className={`text-sm ${
                  selectedGoals.includes(goal.id) ? 'text-blue-900' : 'text-slate-700'
                }`}>
                  {goal.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <Button
          onClick={() => navigate('dashboard')}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 rounded-xl"
        >
          Save Profile
        </Button>
      </div>
    </div>
  );
}
