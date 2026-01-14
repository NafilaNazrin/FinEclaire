import React, { useState } from 'react';
import { Plus, TrendingDown, Calendar } from 'lucide-react';
import { Screen } from '../App';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';

interface ExpenseTrackingProps {
  navigate: (screen: Screen) => void;
}

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export default function ExpenseTracking({ navigate }: ExpenseTrackingProps) {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: 'essentials',
    description: ''
  });

  const expenses: Expense[] = [
    { id: '1', amount: 850, category: 'essentials', description: 'Rent', date: '2026-01-01' },
    { id: '2', amount: 200, category: 'essentials', description: 'Groceries', date: '2026-01-05' },
    { id: '3', amount: 120, category: 'discretionary', description: 'Dining Out', date: '2026-01-07' },
    { id: '4', amount: 500, category: 'investments', description: 'Index Fund', date: '2026-01-10' },
    { id: '5', amount: 80, category: 'discretionary', description: 'Entertainment', date: '2026-01-12' }
  ];

  const monthlyData = [
    { month: 'Aug', amount: 3800 },
    { month: 'Sep', amount: 4100 },
    { month: 'Oct', amount: 3900 },
    { month: 'Nov', amount: 4200 },
    { month: 'Dec', amount: 4000 },
    { month: 'Jan', amount: 4500 }
  ];

  const categories = [
    { id: 'essentials', label: 'Essentials', icon: '🏠', color: '#3b82f6' },
    { id: 'discretionary', label: 'Discretionary', icon: '🛍️', color: '#8b5cf6' },
    { id: 'investments', label: 'Investments', icon: '📈', color: '#10b981' },
    { id: 'trading', label: 'Trading', icon: '💹', color: '#f59e0b' }
  ];

  const categoryTotals = categories.map(cat => ({
    ...cat,
    total: expenses
      .filter(e => e.category === cat.id)
      .reduce((sum, e) => sum + e.amount, 0)
  }));

  const handleAddExpense = () => {
    // In a real app, this would save to backend
    setIsAddExpenseOpen(false);
    setNewExpense({ amount: '', category: 'essentials', description: '' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl text-white mb-2">Expense Tracking</h1>
            <p className="text-slate-300 text-sm">Build behavioral history</p>
          </div>
          
          <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
            <DialogTrigger asChild>
              <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl">
                <Plus className="w-5 h-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Add Expense</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm text-slate-700 dark:text-slate-300 mb-2 block">Amount</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-slate-700 dark:text-slate-300 mb-2 block">Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setNewExpense({ ...newExpense, category: cat.id })}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          newExpense.category === cat.id
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/30'
                            : 'border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <div className="text-xl mb-1">{cat.icon}</div>
                        <p className="text-xs text-slate-700 dark:text-slate-300">{cat.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-slate-700 dark:text-slate-300 mb-2 block">Description</label>
                  <Input
                    placeholder="What was this for?"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                
                <Button
                  onClick={handleAddExpense}
                  className="w-full bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white rounded-xl"
                >
                  Add Expense
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <p className="text-slate-300 text-sm mb-1">This Month</p>
          <p className="text-3xl text-white">${monthlyData[monthlyData.length - 1].amount.toLocaleString()}</p>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Monthly Trend Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-900 dark:text-slate-100">Monthly Trend</h3>
            <Calendar className="w-5 h-5 text-slate-400 dark:text-slate-500" />
          </div>
          
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthlyData}>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                {monthlyData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === monthlyData.length - 1 ? '#3b82f6' : '#cbd5e1'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div>
          <h3 className="text-slate-900 dark:text-slate-100 mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {categoryTotals.map((cat) => (
              <div 
                key={cat.id}
                className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{cat.icon}</div>
                    <div>
                      <p className="text-slate-900 dark:text-slate-100">{cat.label}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">${cat.total.toLocaleString()}</p>
                    </div>
                  </div>
                  <TrendingDown className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${(cat.total / 4500) * 100}%`,
                      backgroundColor: cat.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Expenses */}
        <div>
          <h3 className="text-slate-900 dark:text-slate-100 mb-4">Recent Expenses</h3>
          <div className="space-y-2">
            {expenses.slice(0, 5).map((expense) => {
              const category = categories.find(c => c.id === expense.category);
              return (
                <div 
                  key={expense.id}
                  className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-xl">{category?.icon}</div>
                      <div>
                        <p className="text-slate-900 dark:text-slate-100">{expense.description}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {new Date(expense.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <p className="text-slate-900 dark:text-slate-100">${expense.amount.toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}