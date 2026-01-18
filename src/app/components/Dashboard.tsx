import React from 'react';
import {
  TrendingUp,
  ArrowUpRight,
  ChevronRight,
  User,
  Shield
} from 'lucide-react';
import { Screen } from '../App';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  navigate: (screen: Screen) => void;
  analysis: any;
  loading: boolean;
}

export default function Dashboard({
  navigate,
  analysis,
  loading
}: DashboardProps) {

  // 🔹 Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">
          Loading financial analysis…
        </p>
      </div>
    );
  }

  // 🔹 No analysis yet
  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">
          No financial data available.
        </p>
      </div>
    );
  }

  const {
    metrics,
    probabilities,
    recommended_actions
  } = analysis;

  // Temporary expense breakdown (can be dynamic later)
  const expenseData = [
    { name: 'Essentials', value: 2400, color: '#3b82f6' },
    { name: 'Discretionary', value: 800, color: '#8b5cf6' },
    { name: 'Investments', value: 600, color: '#10b981' },
    { name: 'Trading', value: 200, color: '#f59e0b' }
  ];

  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0);

  // Simple derived UI values
  const stabilityScore = Math.round(
    (1 - probabilities.loss) * 10
  );

  const riskLevel =
    probabilities.loss > 0.6
      ? 'High'
      : probabilities.loss > 0.4
      ? 'Moderate'
      : 'Low';

  return (
    <div className="min-h-screen pb-24 dark:bg-slate-900">

      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 px-6 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <h1 className="text-xl text-white">
              Fin<span className="text-blue-400">Éclairé</span>
            </h1>
          </div>
          <button
            onClick={() => navigate('finance-profile')}
            className="bg-white/10 backdrop-blur-sm p-2 rounded-xl"
          >
            <User className="w-5 h-5 text-white" />
          </button>
        </div>

        <p className="text-slate-300 text-sm mb-2">Financial Overview</p>
        <div className="flex items-baseline gap-2">
          <h2 className="text-4xl text-white">
            {(metrics.savings_ratio * 100).toFixed(1)}%
          </h2>
          <span className="text-slate-400 text-sm">
            savings rate
          </span>
        </div>
      </div>

      <div className="px-6 -mt-6 space-y-4">

        {/* Financial Stability */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-900 dark:text-slate-100">
              Financial Stability
            </h3>
            <button
              onClick={() => navigate('transparency')}
              className="text-slate-400 hover:text-slate-600 dark:text-slate-500"
            >
              <Shield className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-end gap-4">
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl text-slate-900 dark:text-slate-100">
                  {stabilityScore}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  /10
                </span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                  style={{ width: `${stabilityScore * 10}%` }}
                ></div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Risk Level
              </p>
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full">
                {riskLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Savings Ratio */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-slate-900 dark:text-slate-100 mb-4">
            Savings Ratio
          </h3>
          <p className="text-3xl text-slate-900 dark:text-slate-100 mb-1">
            {(metrics.savings_ratio * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            of monthly income
          </p>
        </div>

        {/* Expense Breakdown (unchanged visual) */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-900 dark:text-slate-100">
              Expense Breakdown
            </h3>
            <button
              onClick={() => navigate('expense-tracking')}
              className="text-blue-600 dark:text-blue-400 text-sm flex items-center gap-1"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-6">
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex-1 space-y-2">
              {expenseData.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {item.name}
                  </span>
                  <span className="text-sm text-slate-900 dark:text-slate-100">
                    ${item.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Total Monthly
              </span>
              <span className="text-slate-900 dark:text-slate-100">
                ${totalExpenses.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('scenario-simulator')}
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl text-left"
          >
            🎯 What-If
          </button>

          <button
            onClick={() => navigate('advisory-insights')}
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl text-left"
          >
            💡 Insights
          </button>
        </div>
      </div>
    </div>
  );
}
