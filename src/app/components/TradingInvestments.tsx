import React from 'react';
import { ArrowLeft, AlertTriangle, BarChart3 } from 'lucide-react';
import { Screen, Expense } from '../App';
import { Analysis } from '../types/analysis';

interface TradingInvestmentsProps {
  navigate: (screen: Screen) => void;
  analysis: Analysis | null;
  expenses: Expense[];
  income: number;
}

export default function TradingInvestments({
  navigate,
  analysis,
  expenses,
  income,
}: TradingInvestmentsProps) {
  const tradingTotal = expenses
    .filter((expense) => expense.category === 'trading')
    .reduce((sum, expense) => sum + expense.amount, 0);

  const investmentTotal = expenses
    .filter((expense) => expense.category === 'investments')
    .reduce((sum, expense) => sum + expense.amount, 0);

  const exposureRatio = analysis
    ? analysis.metrics.trading_exposure * 100
    : income > 0
    ? (tradingTotal / income) * 100
    : 0;

  const discretionaryPct = analysis ? analysis.metrics.discretionary_percentage * 100 : 0;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pb-24">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 px-6 pt-12 pb-6">
        <button onClick={() => navigate('dashboard')} className="mb-6 text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl text-white mb-2">Trading & Investments</h1>
        <p className="text-slate-300 text-sm">Live exposure from your tracked expenses</p>
      </div>

      <div className="px-6 py-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-900 mb-1">Disclaimer</p>
              <p className="text-xs text-amber-800">
                FinÉclairé does not predict markets or returns. This analysis tracks your behavior patterns only.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="text-slate-900 dark:text-slate-100">Current Totals</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-700/40 p-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">Trading Total</p>
              <p className="text-xl text-slate-900 dark:text-slate-100">${tradingTotal.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-slate-50 dark:bg-slate-700/40 p-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">Investments Total</p>
              <p className="text-xl text-slate-900 dark:text-slate-100">${investmentTotal.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
          <h3 className="text-slate-900 dark:text-slate-100 mb-4">Risk Metrics</h3>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600 dark:text-slate-300">Trading Exposure</span>
                <span className="text-slate-900 dark:text-slate-100">{exposureRatio.toFixed(2)}%</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(exposureRatio, 100)}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600 dark:text-slate-300">Discretionary Spend</span>
                <span className="text-slate-900 dark:text-slate-100">{discretionaryPct.toFixed(2)}%</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${Math.min(discretionaryPct, 100)}%` }}></div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-4">
            These numbers are refreshed from your latest expense entries and backend analysis.
          </p>
        </div>
      </div>
    </div>
  );
}
