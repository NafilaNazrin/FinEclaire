import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Button } from './ui/button';

interface OnboardingWelcomeProps {
  onContinue: () => void;
}

export default function OnboardingWelcome({ onContinue }: OnboardingWelcomeProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white px-6 py-12">
      <div className="flex-1">
        <h1 className="text-3xl text-slate-900 mb-2">
          Welcome to Fin<span className="text-blue-600">Éclairé</span>
        </h1>
        <p className="text-slate-600 mb-12">
          Your financial clarity companion
        </p>

        <div className="space-y-8">
          <div>
            <h2 className="text-lg text-slate-900 mb-4">What FinÉclairé does:</h2>
            <div className="space-y-3">
              {[
                'Analyzes your financial behavior patterns',
                'Calculates transparent, rule-based metrics',
                'Provides AI-explained insights with evidence',
                'Simulates "what-if" scenarios for your decisions',
                'Tracks spending and investment exposure'
              ].map((item, index) => (
                <div key={index} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg text-slate-900 mb-4">What FinÉclairé does NOT do:</h2>
            <div className="space-y-3">
              {[
                'Predict market movements or returns',
                'Guarantee financial outcomes',
                'Provide investment advice or recommendations',
                'Make decisions for you'
              ].map((item, index) => (
                <div key={index} className="flex gap-3">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Button 
        onClick={onContinue}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 rounded-xl"
      >
        Continue
      </Button>
    </div>
  );
}
