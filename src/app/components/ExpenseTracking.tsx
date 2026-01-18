import React, { useState } from 'react';
import { Plus, TrendingDown, Calendar } from 'lucide-react';
import { Screen } from '../App';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Expense } from '../App';

interface ExpenseTrackingProps {
  navigate: (screen: Screen) => void;
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
}

export default function ExpenseTracking({
  navigate,
  expenses,
  addExpense,
}: ExpenseTrackingProps) {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: 'essentials' as Expense['category'],
    description: '',
  });

  /* ------------------ CATEGORIES ------------------ */
  const categories = [
    { id: 'essentials', label: 'Essentials', icon: '🏠', color: '#3b82f6' },
    { id: 'discretionary', label: 'Discretionary', icon: '🛍️', color: '#8b5cf6' },
    { id: 'investments', label: 'Investments', icon: '📈', color: '#10b981' },
    { id: 'trading', label: 'Trading', icon: '💹', color: '#f59e0b' },
  ];

  /* ------------------ ADD EXPENSE ------------------ */
  const handleAddExpense = () => {
    if (!newExpense.amount || !newExpense.description) return;

    addExpense({
      id: crypto.randomUUID(),
      amount: Number(newExpense.amount),
      category: newExpense.category,
      description: newExpense.description,
      date: new Date().toISOString(),
    });

    setIsAddExpenseOpen(false);
    setNewExpense({ amount: '', category: 'essentials', description: '' });
  };

  /* ------------------ DERIVED DATA ------------------ */
  const categoryTotals = categories.map((cat) => ({
    ...cat,
    total: expenses
      .filter((e) => e.category === cat.id)
      .reduce((sum, e) => sum + e.amount, 0),
  }));

  const monthlyTotal = expenses.reduce((sum, e) => sum + e.amount, 0);

  const monthlyData = [
    { month: 'This Month', amount: monthlyTotal },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl text-white mb-2">Expense Tracking</h1>
            <p className="text-slate-300 text-sm">Enter real spending</p>
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
                  <label className="text-sm mb-2 block">Amount</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={newExpense.amount}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, amount: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm mb-2 block">Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() =>
                          setNewExpense({ ...newExpense, category: cat.id as Expense['category'] })
                        }
                        className={`p-3 rounded-xl border-2 ${
                          newExpense.category === cat.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-slate-200'
                        }`}
                      >
                        <div className="text-xl mb-1">{cat.icon}</div>
                        <p className="text-xs">{cat.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm mb-2 block">Description</label>
                  <Input
                    placeholder="What was this for?"
                    value={newExpense.description}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, description: e.target.value })
                    }
                  />
                </div>

                <Button onClick={handleAddExpense} className="w-full">
                  Add Expense
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white/10 rounded-2xl p-4">
          <p className="text-slate-300 text-sm mb-1">This Month</p>
          <p className="text-3xl text-white">${monthlyTotal.toLocaleString()}</p>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Monthly Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border">
          <div className="flex justify-between mb-4">
            <h3>Monthly Total</h3>
            <Calendar className="w-5 h-5 text-slate-400" />
          </div>

          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Bar dataKey="amount">
                <Cell fill="#3b82f6" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div>
          <h3 className="mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {categoryTotals.map((cat) => (
              <div key={cat.id} className="bg-white dark:bg-slate-800 rounded-xl p-4 border">
                <div className="flex justify-between mb-2">
                  <div className="flex gap-3">
                    <div className="text-2xl">{cat.icon}</div>
                    <div>
                      <p>{cat.label}</p>
                      <p className="text-sm text-slate-500">
                        ${cat.total.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <TrendingDown className="w-5 h-5 text-slate-400" />
                </div>

                <div className="h-2 bg-slate-100 rounded-full">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: monthlyTotal
                        ? `${(cat.total / monthlyTotal) * 100}%`
                        : '0%',
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Expenses */}
        <div>
          <h3 className="mb-4">Recent Expenses</h3>
          <div className="space-y-2">
            {expenses.slice().reverse().map((expense) => {
              const category = categories.find((c) => c.id === expense.category);
              return (
                <div key={expense.id} className="bg-white dark:bg-slate-800 rounded-xl p-4 border">
                  <div className="flex justify-between">
                    <div className="flex gap-3">
                      <div className="text-xl">{category?.icon}</div>
                      <div>
                        <p>{expense.description}</p>
                        <p className="text-xs text-slate-500">
                          {new Date(expense.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p>${expense.amount.toLocaleString()}</p>
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
