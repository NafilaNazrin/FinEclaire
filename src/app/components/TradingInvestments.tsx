import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, AlertTriangle, BarChart3 } from 'lucide-react';
import { Screen } from '../App';
import { Slider } from './ui/slider';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';

interface TradingInvestmentsProps {
  navigate: (screen: Screen) => void;
}

export default function TradingInvestments({ navigate }: TradingInvestmentsProps) {
  const [tradingCapital, setTradingCapital] = useState([1000]);
  
  const performanceData = [
    { month: 'Aug', pnl: -50 },
    { month: 'Sep', pnl: 120 },
    { month: 'Oct', pnl: -80 },
    { month: 'Nov', pnl: 200 },
    { month: 'Dec', pnl: 50 },
    { month: 'Jan', pnl: -30 }
  ];

  const stats = {
    totalPnL: 210,
    winRate: 58,
    avgWin: 156,
    avgLoss: -87,
    maxDrawdown: -180,
    exposureRatio: 22.2 // % of monthly income
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
        <h1 className="text-2xl text-white mb-2">Trading & Investments</h1>
        <p className="text-slate-300 text-sm">Exposure analysis only</p>
      </div>

      {/* Disclaimer */}
      <div className="px-6 py-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-900 mb-1">Disclaimer</p>
              <p className="text-xs text-amber-800">
                FinÉclairé does not predict markets or returns. This analysis shows your exposure patterns only.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-6">
        {/* Trading Capital Allocation */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="text-slate-900">Monthly Trading Capital</h3>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-6">
            <div className="text-center mb-6">
              <p className="text-3xl text-slate-900 mb-1">
                ${tradingCapital[0].toLocaleString()}
              </p>
              <p className="text-sm text-slate-500">allocated per month</p>
            </div>
            
            <Slider
              value={tradingCapital}
              onValueChange={setTradingCapital}
              min={100}
              max={3000}
              step={50}
              className="mb-4"
            />
            
            <div className="flex justify-between text-xs text-slate-500">
              <span>$100</span>
              <span>$3,000</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">% of Monthly Income</span>
              <span className="text-lg text-slate-900">{stats.exposureRatio}%</span>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-2">Total P&L (6M)</p>
            <p className={`text-2xl ${stats.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.totalPnL >= 0 ? '+' : ''}${stats.totalPnL}
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-2">Win Rate</p>
            <p className="text-2xl text-slate-900">{stats.winRate}%</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-2">Avg Win</p>
            <p className="text-2xl text-green-600">+${stats.avgWin}</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-600 mb-2">Avg Loss</p>
            <p className="text-2xl text-red-600">${stats.avgLoss}</p>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-900">P&L Trend</h3>
            <TrendingUp className="w-5 h-5 text-slate-400" />
          </div>
          
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceData}>
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
                tickFormatter={(value) => `$${value}`}
              />
              <ReferenceLine y={0} stroke="#cbd5e1" strokeDasharray="3 3" />
              <Line 
                type="monotone" 
                dataKey="pnl" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Drawdown Analysis */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-slate-900 mb-4">Risk Metrics</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Maximum Drawdown</span>
                <span className="text-red-600">${stats.maxDrawdown}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: '60%' }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Trading Exposure</span>
                <span className="text-slate-900">{stats.exposureRatio}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${stats.exposureRatio}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 leading-relaxed">
              These metrics reflect your historical trading patterns. They do not predict future performance or market movements.
            </p>
          </div>
        </div>

        {/* Investment Contributions */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
          <h3 className="text-slate-900 mb-4">Long-Term Investments</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Monthly Contribution</span>
              <span className="text-slate-900">$600</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700">6-Month Total</span>
              <span className="text-slate-900">$3,600</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Consistency</span>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                100%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
