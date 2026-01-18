import React, { useState } from 'react';
import { Lightbulb, Info } from 'lucide-react';
import { Screen } from '../App';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import { Analysis } from '../types/analysis';

/* ------------------ PROPS ------------------ */
interface ScenarioSimulatorProps {
  navigate: (screen: Screen) => void;
  analysis: Analysis | null;
}

export default function ScenarioSimulator({
  navigate,
  analysis,
}: ScenarioSimulatorProps) {
  /* ------------------ EMPTY STATE ------------------ */
  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">
          Add expenses to explore scenarios.
        </p>
      </div>
    );
  }

  /* ------------------ SLIDER STATE (UI ONLY) ------------------ */
  const [discretionaryReduction, setDiscretionaryReduction] = useState([20]);
  const [tradingIncrease, setTradingIncrease] = useState([10]);
  const [incomeChange, setIncomeChange] = useState([0]);
  const [savingsIncrease, setSavingsIncrease] = useState([15]);

  /* ------------------ BACKEND PROBABILITIES ------------------ */
  const { loss, neutral, gain } = analysis.probabilities;

  const riskLabel =
    loss > 50 ? 'High' : loss > 30 ? 'Moderate' : 'Low';

  /* ------------------ UI COMPONENTS ------------------ */
  const ProbabilityBar = ({
    label,
    value,
    color,
  }: {
    label: string;
    value: number;
    color: string;
  }) => (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {label}
        </span>
        <span className="text-sm text-slate-900 dark:text-slate-100">
          {value}%
        </span>
      </div>
      <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );

  const ScenarioCard = ({
    title,
    description,
    children,
  }: {
    title: string;
    description: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-xl p-4">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <p className="text-sm text-blue-900 dark:text-blue-300 mb-1">
              {title}
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-400">
              {description}
            </p>
          </div>
        </div>
      </div>

      {children}

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-900 dark:text-slate-100">
            Outcome Probabilities
          </h3>
          <span
            className={`px-3 py-1 text-xs rounded-full ${
              riskLabel === 'Low'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : riskLabel === 'Moderate'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
            }`}
          >
            {riskLabel} Risk
          </span>
        </div>

        <ProbabilityBar label="Financial Loss" value={loss} color="#ef4444" />
        <ProbabilityBar label="Neutral Outcome" value={neutral} color="#64748b" />
        <ProbabilityBar label="Financial Gain" value={gain} color="#10b981" />
      </div>
    </div>
  );

  /* ------------------ RENDER ------------------ */
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pb-24">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-6 pt-12 pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-xl">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl text-white">What-If Scenarios</h1>
            <p className="text-slate-300 text-sm">
              Explore financial decisions
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <Tabs defaultValue="reduce-spending">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="reduce-spending">Spending</TabsTrigger>
            <TabsTrigger value="increase-trading">Trading</TabsTrigger>
          </TabsList>

          <TabsContent value="reduce-spending">
            <ScenarioCard
              title="Reduce Discretionary Spending"
              description="What if you cut back on non-essential expenses?"
            >
              <Slider
                value={discretionaryReduction}
                onValueChange={setDiscretionaryReduction}
                min={5}
                max={50}
                step={5}
              />
            </ScenarioCard>
          </TabsContent>

          <TabsContent value="increase-trading">
            <ScenarioCard
              title="Increase Trading Exposure"
              description="What if you increase your trading capital?"
            >
              <Slider
                value={tradingIncrease}
                onValueChange={setTradingIncrease}
                min={5}
                max={50}
                step={5}
              />
            </ScenarioCard>
          </TabsContent>

          <TabsContent value="income-change">
            <ScenarioCard
              title="Income Adjustment"
              description="What if your income changes?"
            >
              <Slider
                value={incomeChange}
                onValueChange={setIncomeChange}
                min={-30}
                max={30}
                step={5}
              />
            </ScenarioCard>
          </TabsContent>

          <TabsContent value="increase-savings">
            <ScenarioCard
              title="Boost Savings Rate"
              description="What if you increase monthly savings?"
            >
              <Slider
                value={savingsIncrease}
                onValueChange={setSavingsIncrease}
                min={5}
                max={40}
                step={5}
              />
            </ScenarioCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
