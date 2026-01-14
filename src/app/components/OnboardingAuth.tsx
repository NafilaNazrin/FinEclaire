import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface OnboardingAuthProps {
  onContinue: () => void;
}

export default function OnboardingAuth({ onContinue }: OnboardingAuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    setIsLoading(true);
    // Simulate authentication
    setTimeout(() => {
      onContinue();
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 py-12">
      <div className="flex-1">
        <h1 className="text-3xl text-slate-900 mb-2">
          Create Account
        </h1>
        <p className="text-slate-600 mb-12">
          Start your journey to financial clarity
        </p>

        <div className="space-y-4 mb-8">
          <div>
            <label className="text-sm text-slate-700 mb-2 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11 py-6 rounded-xl border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-700 mb-2 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11 py-6 rounded-xl border-slate-200"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 mb-6">
          <p className="text-xs text-slate-600 leading-relaxed">
            By creating an account, you agree to our Terms of Service and Privacy Policy. Your financial data is encrypted and never shared with third parties.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <Button 
          onClick={handleContinue}
          disabled={isLoading || !email || !password}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 rounded-xl disabled:opacity-50"
        >
          {isLoading ? 'Creating Account...' : 'Get Started'}
        </Button>
        
        <button className="w-full text-slate-600 text-sm">
          Already have an account? <span className="text-blue-600">Sign in</span>
        </button>
      </div>
    </div>
  );
}
