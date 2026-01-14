import React, { useState } from 'react';
import { Lightbulb, ArrowRight, Info } from 'lucide-react';
import { Screen } from '../App';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';

interface ScenarioSimulatorProps {
  navigate: (screen: Screen) => void;
}

export default function ScenarioSimulator({ navigate }: ScenarioSimulatorProps) {
  const [discretionaryReduction, setDiscretionaryReduction] = useState([20]);
  const [tradingIncrease, setTradingIncrease] = useState([10]);
  const [incomeChange, setIncomeChange] = useState([0]);
  const [savingsIncrease, setSavingsIncrease] = useState([15]);

  const calculateProbabilities = (scenario: string) => {
    // Mock probability calculations based on scenario
    const scenarios: Record<string, { loss: number; neutral: number; gain: number; risk: string }> = {
      'reduce-spending': { loss: 15, neutral: 25, gain: 60, risk: 'Low' },
      'increase-trading': { loss: 35, neutral: 30, gain: 35, risk: 'High' },
      'income-change': { loss: 20, neutral: 35, gain: 45, risk: 'Moderate' },
      'increase-savings': { loss: 10, neutral: 20, gain: 70, risk: 'Low' }
    };
    return scenarios[scenario];
  };

  const ProbabilityBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
        <span className="text-sm text-slate-900 dark:text-slate-100">{value}%</span>
      </div>
      <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );

  const ScenarioCard = ({ 
    scenario, 
    title, 
    description, 
    children 
  }: { 
    scenario: string; 
    title: string; 
    description: string; 
    children: React.ReactNode;
  }) => {
    const probs = calculateProbabilities(scenario);
    
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-xl p-4">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-900 dark:text-blue-300 mb-1">{title}</p>
              <p className="text-xs text-blue-700 dark:text-blue-400">{description}</p>
            </div>
          </div>
        </div>

        {children}

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-900 dark:text-slate-100">Outcome Probabilities</h3>
            <span className={`px-3 py-1 text-xs rounded-full ${
              probs.risk === 'Low' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
              probs.risk === 'Moderate' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
              'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
            }`}>
              {probs.risk} Risk
            </span>
          </div>

          <ProbabilityBar label="Financial Loss" value={probs.loss} color="#ef4444" />
          <ProbabilityBar label="Neutral Outcome" value={probs.neutral} color="#64748b" />
          <ProbabilityBar label="Financial Gain" value={probs.gain} color="#10b981" />

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Probabilities are based on your historical patterns and rule-based calculations. They do not predict market movements or guarantee outcomes.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
          <h4 className="text-slate-900 dark:text-slate-100 mb-3">Expected Impact</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Monthly Savings</span>
              <span className="text-green-600 dark:text-green-400">+$180</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Stability Score</span>
              <span className="text-green-600 dark:text-green-400">+0.4</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Risk Level</span>
              <span className="text-blue-600 dark:text-blue-400">Maintained</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 px-6 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl text-white">What-If Scenarios</h1>
            <p className="text-slate-300 text-sm">Explore financial decisions</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <Tabs defaultValue="reduce-spending" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="reduce-spending">Spending</TabsTrigger>
            <TabsTrigger value="increase-trading">Trading</TabsTrigger>
          </TabsList>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="income-change">Income</TabsTrigger>
            <TabsTrigger value="increase-savings">Savings</TabsTrigger>
          </TabsList>

          <TabsContent value="reduce-spending">
            <ScenarioCard
              scenario="reduce-spending"
              title="Reduce Discretionary Spending"
              description="What if you cut back on non-essential expenses?"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                <h3 className="text-slate-900 dark:text-slate-100 mb-4">Reduction Amount</h3>
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6">
                  <div className="text-center mb-6">
                    <p className="text-3xl text-slate-900 dark:text-slate-100 mb-1">{discretionaryReduction[0]}%</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">less discretionary spending</p>
                  </div>
                  <Slider
                    value={discretionaryReduction}
                    onValueChange={setDiscretionaryReduction}
                    min={5}
                    max={50}
                    step={5}
                  />
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-4">
                    <span>5%</span>
                    <span>50%</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4">
                  <span className="text-sm text-slate-700 dark:text-slate-300">Monthly Savings</span>
                  <span className="text-lg text-blue-600 dark:text-blue-400">
                    +${Math.round(800 * discretionaryReduction[0] / 100)}
                  </span>
                </div>
              </div>
            </ScenarioCard>
          </TabsContent>

          <TabsContent value="increase-trading">
            <ScenarioCard
              scenario="increase-trading"
              title="Increase Trading Capital"
              description="What if you allocate more capital to trading?"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                <h3 className="text-slate-900 dark:text-slate-100 mb-4">Capital Increase</h3>
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6">
                  <div className="text-center mb-6">
                    <p className="text-3xl text-slate-900 dark:text-slate-100 mb-1">+{tradingIncrease[0]}%</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">more trading capital</p>
                  </div>
                  <Slider
                    value={tradingIncrease}
                    onValueChange={setTradingIncrease}
                    min={5}
                    max={50}
                    step={5}
                  />
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-4">
                    <span>5%</span>
                    <span>50%</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between bg-amber-50 dark:bg-amber-950/30 rounded-xl p-4">
                  <span className="text-sm text-slate-700 dark:text-slate-300">Exposure Change</span>
                  <span className="text-lg text-amber-600 dark:text-amber-400">
                    +{tradingIncrease[0]}%
                  </span>
                </div>
              </div>
            </ScenarioCard>
          </TabsContent>

          <TabsContent value="income-change">
            <ScenarioCard
              scenario="income-change"
              title="Income Adjustment"
              description="What if your monthly income changes?"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                <h3 className="text-slate-900 dark:text-slate-100 mb-4">Income Change</h3>
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6">
                  <div className="text-center mb-6">
                    <p className="text-3xl text-slate-900 dark:text-slate-100 mb-1">
                      {incomeChange[0] >= 0 ? '+' : ''}{incomeChange[0]}%
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">income adjustment</p>
                  </div>
                  <Slider
                    value={incomeChange}
                    onValueChange={setIncomeChange}
                    min={-30}
                    max={30}
                    step={5}
                  />
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-4">
                    <span>-30%</span>
                    <span>+30%</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4">
                  <span className="text-sm text-slate-700 dark:text-slate-300">New Monthly Income</span>
                  <span className="text-lg text-blue-600 dark:text-blue-400">
                    ${Math.round(4500 * (1 + incomeChange[0] / 100)).toLocaleString()}
                  </span>
                </div>
              </div>
            </ScenarioCard>
          </TabsContent>

          <TabsContent value="increase-savings">
            <ScenarioCard
              scenario="increase-savings"
              title="Boost Savings Rate"
              description="What if you increase your monthly savings?"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                <h3 className="text-slate-900 dark:text-slate-100 mb-4">Savings Increase</h3>
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6">
                  <div className="text-center mb-6">
                    <p className="text-3xl text-slate-900 dark:text-slate-100 mb-1">+{savingsIncrease[0]}%</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">additional savings</p>
                  </div>
                  <Slider
                    value={savingsIncrease}
                    onValueChange={setSavingsIncrease}
                    min={5}
                    max={40}
                    step={5}
                  />
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-4">
                    <span>5%</span>
                    <span>40%</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between bg-green-50 dark:bg-green-950/30 rounded-xl p-4">
                  <span className="text-sm text-slate-700 dark:text-slate-300">New Savings Rate</span>
                  <span className="text-lg text-green-600 dark:text-green-400">
                    {22.5 + savingsIncrease[0]}%
                  </span>
                </div>
              </div>
            </ScenarioCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}