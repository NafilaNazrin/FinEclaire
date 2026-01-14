import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';

interface OnboardingEthicsProps {
  onContinue: () => void;
}

export default function OnboardingEthics({ onContinue }: OnboardingEthicsProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white px-6 py-12">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-xl">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl text-slate-900">Ethics & Disclaimer</h1>
        </div>

        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-amber-900 mb-1">Important Notice</h3>
                <p className="text-sm text-amber-800">
                  FinÉclairé is a decision-support tool, not a financial advisor.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-slate-900 mb-2">No Predictions</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We do not predict market movements, stock prices, or future returns. All probabilities are based on historical patterns in your own behavior, not external markets.
              </p>
            </div>

            <div>
              <h3 className="text-slate-900 mb-2">No Guarantees</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Financial outcomes depend on many factors beyond our analysis. We provide clarity, not certainty.
              </p>
            </div>

            <div>
              <h3 className="text-slate-900 mb-2">Evidence-Based</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Every insight is backed by transparent rules and calculations. You can always see how we arrived at a conclusion.
              </p>
            </div>

            <div>
              <h3 className="text-slate-900 mb-2">Your Responsibility</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                All financial decisions remain yours. FinÉclairé helps you understand your patterns and explore scenarios—it does not tell you what to do.
              </p>
            </div>

            <div>
              <h3 className="text-slate-900 mb-2">Data Privacy</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Your financial data is encrypted and private. We never share or sell your information.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Button 
        onClick={onContinue}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 rounded-xl"
      >
        I Understand
      </Button>
    </div>
  );
}
