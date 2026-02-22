import React from 'react';
import { TrendingUp, ChevronRight, User, Shield } from 'lucide-react';
import { Screen, Expense } from '../App';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  navigate: (screen: Screen) => void;
  analysis: any;
  loading: boolean;
  expenses: Expense[];
}

export default function Dashboard({ navigate, analysis, loading, expenses }: DashboardProps) {
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">Loading financial analysis…</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">No financial data available.</p>
      </div>
    );
  }

  const { metrics, probabilities, recommended_actions } = analysis;

  const categories = [
    { id: 'essentials', name: 'Essentials', color: '#3b82f6' },
    { id: 'discretionary', name: 'Discretionary', color: '#8b5cf6' },
    { id: 'investments', name: 'Investments', color: '#10b981' },
    { id: 'trading', name: 'Trading', color: '#f59e0b' },
  ] as const;

  const expenseData = categories
    .map((cat) => ({
      name: cat.name,
      color: cat.color,
      value: expenses
        .filter((e) => e.category === cat.id)
        .reduce((sum, e) => sum + e.amount, 0),
    }))
    .filter((item) => item.value > 0);

  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0);

  const lossPct = Math.round(probabilities.loss * 100);
  const stabilityScore = Math.round((1 - probabilities.loss) * 10);
  const riskLevel = lossPct > 60 ? 'High' : lossPct > 40 ? 'Moderate' : 'Low';

  return (
    <div className="min-h-screen pb-24 dark:bg-slate-900">
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
          <button onClick={() => navigate('finance-profile')} className="bg-white/10 backdrop-blur-sm p-2 rounded-xl">
            <User className="w-5 h-5 text-white" />
          </button>
        </div>

        <p className="text-slate-300 text-sm mb-2">Financial Overview</p>
        <div className="flex items-baseline gap-2">
          <h2 className="text-4xl text-white">{(metrics.savings_ratio * 100).toFixed(1)}%</h2>
          <span className="text-slate-400 text-sm">savings rate</span>
        </div>
      </div>

      <div className="px-6 -mt-6 space-y-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-900 dark:text-slate-100">Financial Stability</h3>
            <button onClick={() => navigate('transparency')} className="text-slate-400 hover:text-slate-600 dark:text-slate-500">
              <Shield className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-end gap-4">
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl text-slate-900 dark:text-slate-100">{stabilityScore}</span>
                <span className="text-slate-500 dark:text-slate-400">/10</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600" style={{ width: `${stabilityScore * 10}%` }}></div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-400">Risk Level</p>
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full">
                {riskLevel}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-slate-900 dark:text-slate-100 mb-4">Expense Breakdown</h3>
          {totalExpenses === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">Add expenses to see category distribution.</p>
          ) : (
            <>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={expenseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
                      {expenseData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {expenseData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
                    </div>
                    <span className="text-slate-900 dark:text-slate-100">${item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => navigate('scenario-simulator')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-5 flex justify-between items-center"
        >
          <span>Run What-If Simulation</span>
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-slate-900 dark:text-slate-100 mb-3">Top Recommended Actions</h3>
          <div className="space-y-3">
            {recommended_actions.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">No critical actions right now. Keep tracking expenses consistently.</p>
            ) : (
              recommended_actions.slice(0, 3).map((action: any) => (
                <div key={action.id} className="rounded-xl bg-slate-50 dark:bg-slate-700/40 p-3">
                  <p className="text-sm text-slate-900 dark:text-slate-100">{action.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{action.reason}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
