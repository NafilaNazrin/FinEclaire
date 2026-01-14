import React, { useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

interface SplashScreenProps {
  onContinue: () => void;
}

export default function SplashScreen({ onContinue }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
        <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/20">
          <TrendingUp className="w-16 h-16 text-blue-400" strokeWidth={1.5} />
        </div>
      </div>
      
      <h1 className="text-4xl text-white mb-3 tracking-tight">
        Fin<span className="text-blue-400">Éclairé</span>
      </h1>
      
      <p className="text-slate-300 text-lg text-center">
        Financial clarity, explained.
      </p>
      
      <div className="mt-16 flex gap-2">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
}
