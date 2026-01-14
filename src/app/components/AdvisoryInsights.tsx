import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, CheckCircle2, AlertCircle } from 'lucide-react';
import { Screen } from '../App';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Slider } from './ui/slider';

interface AdvisoryInsightsProps {
  navigate: (screen: Screen) => void;
}

interface RecommendedAction {
  id: string;
  title: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  reason: string;
  explanation: string;
  metrics: { label: string; value: string }[];
  rules: string[];
  beforeAfter: { before: string; after: string; metric: string };
  interactive: {
    type: 'slider';
    label: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    unit: string;
    currentValue: string;
  };
}

export default function AdvisoryInsights({ navigate }: AdvisoryInsightsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [rulesExpandedId, setRulesExpandedId] = useState<string | null>(null);
  
  // State for interactive controls
  const [discretionaryReduction, setDiscretionaryReduction] = useState([15]);
  const [tradingReduction, setTradingReduction] = useState([35]);
  const [emergencyAllocation, setEmergencyAllocation] = useState([100]);
  const [investmentMaintain, setInvestmentMaintain] = useState([100]);

  // Calculate dynamic probabilities based on slider values
  const calculateProbabilities = (actionId: string, value: number) => {
    switch (actionId) {
      case '1': // Discretionary spending reduction
        const lossProb1 = Math.max(5, 20 - value);
        const gainProb1 = Math.min(75, 45 + value);
        const neutralProb1 = 100 - lossProb1 - gainProb1;
        return {
          loss: lossProb1,
          neutral: neutralProb1,
          gain: gainProb1,
          risk: value >= 12 ? 'Low' : value >= 8 ? 'Moderate' : 'High'
        };
      
      case '2': // Trading exposure reduction
        const lossProb2 = Math.max(10, 50 - value);
        const gainProb2 = Math.min(65, 35 + value * 0.8);
        const neutralProb2 = 100 - lossProb2 - gainProb2;
        return {
          loss: lossProb2,
          neutral: neutralProb2,
          gain: gainProb2,
          risk: value >= 30 ? 'Low' : value >= 20 ? 'Moderate' : 'High'
        };
      
      case '3': // Emergency fund building
        const lossProb3 = Math.max(8, 18 - value / 20);
        const gainProb3 = Math.min(72, 50 + value / 10);
        const neutralProb3 = 100 - lossProb3 - gainProb3;
        return {
          loss: lossProb3,
          neutral: neutralProb3,
          gain: gainProb3,
          risk: value >= 100 ? 'Low' : value >= 60 ? 'Moderate' : 'High'
        };
      
      case '4': // Investment consistency
        return {
          loss: 5,
          neutral: 15,
          gain: 80,
          risk: 'Low'
        };
      
      default:
        return { loss: 20, neutral: 30, gain: 50, risk: 'Moderate' };
    }
  };

  const recommendedActions: RecommendedAction[] = [
    {
      id: '1',
      title: 'Reduce discretionary spending by 12%',
      category: 'Savings Optimization',
      priority: 'high',
      reason: 'Your discretionary spending (17.8% of income) exceeds the recommended range of 10-15% for your moderate risk profile and income level.',
      explanation: 'Based on your 6-month spending patterns, discretionary expenses are 17.8% of income ($800/month). Industry benchmarks and your stated financial goals suggest 10-15% is optimal. Reducing this within the safe range of 10-15% would free up capital for savings or debt reduction while maintaining quality of life.',
      metrics: [
        { label: 'Current Discretionary %', value: '17.8%' },
        { label: 'Safe Target Range', value: '10-15%' },
        { label: 'Potential Monthly Savings', value: '$96-$180' },
        { label: 'Stability Score Impact', value: '+0.4 to +0.6' }
      ],
      rules: [
        'Rule #12: Discretionary spending >15% of income triggers high priority for moderate risk profiles',
        'Rule #45: 6-month trend shows consistent overspending in entertainment and dining categories',
        'Rule #78: Savings ratio below stated financial goals by 3.2 percentage points'
      ],
      beforeAfter: {
        before: '$800',
        after: '$704',
        metric: 'Monthly Discretionary Spending'
      },
      interactive: {
        type: 'slider',
        label: 'Target Discretionary %',
        min: 10,
        max: 15,
        step: 0.5,
        defaultValue: 12,
        unit: '%',
        currentValue: '17.8%'
      }
    },
    {
      id: '2',
      title: 'Lower trading exposure to 15% of monthly income',
      category: 'Risk Management',
      priority: 'high',
      reason: 'Your trading exposure (22.2% of monthly income) is high for your moderate risk tolerance. Historical volatility and max drawdown suggest reducing to 10-15% range.',
      explanation: 'Your trading data shows a 58% win rate with 6-month P&L of +$210, but max drawdown reached -18%. The current exposure of 22.2% creates volatility inconsistent with your moderate risk preference. Reducing exposure within the 10-15% safe range maintains trading activity while aligning with your risk tolerance.',
      metrics: [
        { label: 'Current Exposure', value: '22.2%' },
        { label: 'Safe Target Range', value: '10-15%' },
        { label: 'Historical Max Drawdown', value: '-18%' },
        { label: 'Win Rate (6-month)', value: '58%' }
      ],
      rules: [
        'Rule #23: Trading exposure >20% triggers high priority for moderate risk profiles',
        'Rule #56: Max drawdown exceeding 15% requires exposure reduction recommendation',
        'Rule #89: Volatility/risk alignment check—current exposure inconsistent with stated preference'
      ],
      beforeAfter: {
        before: '22.2%',
        after: '15%',
        metric: 'Trading Exposure Ratio'
      },
      interactive: {
        type: 'slider',
        label: 'Exposure Reduction %',
        min: 10,
        max: 50,
        step: 5,
        defaultValue: 35,
        unit: '%',
        currentValue: '22.2%'
      }
    },
    {
      id: '3',
      title: 'Allocate $100/month to build emergency fund',
      category: 'Financial Security',
      priority: 'medium',
      reason: 'Your emergency fund covers 2.4 months of expenses. The target for salary earners is 3-6 months. Building to minimum threshold reduces financial vulnerability.',
      explanation: 'Emergency funds provide a cushion for unexpected expenses or income loss. With monthly expenses of $4,000, your target is $12,000-$24,000. Current savings of $9,600 cover 2.4 months. Allocating $50-$200/month within safe bounds would reach the 3-month minimum in 6-24 months depending on allocation.',
      metrics: [
        { label: 'Current Coverage', value: '2.4 months' },
        { label: 'Target Range', value: '3-6 months' },
        { label: 'Gap to Minimum', value: '$2,400' },
        { label: 'Time to Target (at $100/mo)', value: '24 months' }
      ],
      rules: [
        'Rule #5: Emergency fund below 3-month minimum triggers medium priority for salary earners',
        'Rule #34: Income type (W-2 salary) requires 3-6 month buffer per industry standards',
        'Rule #67: Current allocation rate insufficient to reach minimum threshold within 24 months'
      ],
      beforeAfter: {
        before: '2.4 mo',
        after: '3.0 mo',
        metric: 'Emergency Fund Coverage'
      },
      interactive: {
        type: 'slider',
        label: 'Monthly Allocation',
        min: 50,
        max: 200,
        step: 10,
        defaultValue: 100,
        unit: '$',
        currentValue: '$0'
      }
    },
    {
      id: '4',
      title: 'Maintain $600/month investment consistency',
      category: 'Long-Term Growth',
      priority: 'low',
      reason: 'Your investment contributions have been 100% consistent for 6 months. This habit aligns perfectly with long-term wealth-building strategies—no changes needed.',
      explanation: 'You have maintained a consistent $600/month investment contribution (13.3% of income) for 6 consecutive months. This consistency is excellent and supports dollar-cost averaging. The rate aligns with your long-term goals. Continue this strong habit without changes.',
      metrics: [
        { label: 'Monthly Contribution', value: '$600' },
        { label: 'Consistency Rate', value: '100%' },
        { label: '6-Month Total Invested', value: '$3,600' },
        { label: '% of Income', value: '13.3%' }
      ],
      rules: [
        'Rule #98: Investment consistency at 100% for 6+ consecutive months—maintain current approach',
        'Rule #102: Contribution rate (13.3%) aligns with long-term wealth goals for income bracket',
        'Rule #115: Dollar-cost averaging strategy optimal for moderate risk, long-term investors'
      ],
      beforeAfter: {
        before: '100%',
        after: '100%',
        metric: 'Investment Consistency'
      },
      interactive: {
        type: 'slider',
        label: 'Maintain Consistency %',
        min: 80,
        max: 100,
        step: 5,
        defaultValue: 100,
        unit: '%',
        currentValue: '100%'
      }
    }
  ];

  const getSliderValue = (actionId: string): number[] => {
    switch (actionId) {
      case '1': return discretionaryReduction;
      case '2': return tradingReduction;
      case '3': return emergencyAllocation;
      case '4': return investmentMaintain;
      default: return [0];
    }
  };

  const setSliderValue = (actionId: string, value: number[]) => {
    switch (actionId) {
      case '1': setDiscretionaryReduction(value); break;
      case '2': setTradingReduction(value); break;
      case '3': setEmergencyAllocation(value); break;
      case '4': setInvestmentMaintain(value); break;
    }
  };

  const ProbabilityBar = ({ 
    label, 
    value, 
    color,
    icon 
  }: { 
    label: string; 
    value: number; 
    color: string;
    icon: 'loss' | 'neutral' | 'gain';
  }) => (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded-full flex items-center justify-center`} style={{ backgroundColor: color }}>
            {icon === 'loss' && <span className="text-white text-xs">−</span>}
            {icon === 'neutral' && <span className="text-white text-xs">•</span>}
            {icon === 'gain' && <span className="text-white text-xs">+</span>}
          </div>
          <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
        </div>
        <span className="text-sm text-slate-900 dark:text-slate-100 font-medium">{value}%</span>
      </div>
      <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );

  const ActionCard = ({ action }: { action: RecommendedAction }) => {
    const isExpanded = expandedId === action.id;
    const isRulesExpanded = rulesExpandedId === action.id;
    const currentValue = getSliderValue(action.id)[0];
    const probs = calculateProbabilities(action.id, currentValue);
    
    return (
      <Collapsible
        open={isExpanded}
        onOpenChange={() => setExpandedId(isExpanded ? null : action.id)}
      >
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <CollapsibleTrigger className="w-full">
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${ 
                    action.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                    action.priority === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                    'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  }`}>
                    {action.priority === 'high' ? '🔴' : action.priority === 'medium' ? '🟡' : '🟢'} {action.priority}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{action.category}</span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                )}
              </div>
              
              <h3 className="text-slate-900 dark:text-slate-100 text-left mb-2 font-medium">{action.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 text-left leading-relaxed">{action.reason}</p>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="px-6 pb-6 space-y-5">
              {/* Explanation */}
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
                <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">Why this matters</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{action.explanation}</p>
              </div>

              {/* Interactive Control */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-5 border border-blue-100 dark:border-blue-900/30">
                <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">Adjust within safe bounds</h4>
                
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{action.interactive.label}</span>
                    <div className="text-right">
                      <span className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        {currentValue}{action.interactive.unit}
                      </span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Current: {action.interactive.currentValue}
                      </p>
                    </div>
                  </div>
                  
                  <Slider
                    value={getSliderValue(action.id)}
                    onValueChange={(value) => setSliderValue(action.id, value)}
                    min={action.interactive.min}
                    max={action.interactive.max}
                    step={action.interactive.step}
                    className="my-4"
                  />
                  
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                    <span>{action.interactive.min}{action.interactive.unit}</span>
                    <span className="text-slate-400 dark:text-slate-500">Safe range</span>
                    <span>{action.interactive.max}{action.interactive.unit}</span>
                  </div>
                </div>

                {/* Dynamic Outcome Probabilities */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Outcome Probabilities</h4>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      probs.risk === 'Low' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                      probs.risk === 'Moderate' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                      'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {probs.risk} Risk
                    </span>
                  </div>

                  <ProbabilityBar label="Financial Loss" value={probs.loss} color="#ef4444" icon="loss" />
                  <ProbabilityBar label="Neutral Outcome" value={probs.neutral} color="#64748b" icon="neutral" />
                  <ProbabilityBar label="Financial Gain" value={probs.gain} color="#10b981" icon="gain" />
                </div>
              </div>

              {/* Key Metrics */}
              <div>
                <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-3">Key Metrics Influencing This</h4>
                <div className="grid grid-cols-2 gap-3">
                  {action.metrics.map((metric, index) => (
                    <div key={index} className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-3">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{metric.label}</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current vs After Action */}
              <div className="bg-gradient-to-r from-slate-50 to-green-50 dark:from-slate-900/50 dark:to-green-950/30 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4 text-center">Current State → After Action</h4>
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Current</p>
                    <div className="bg-white dark:bg-slate-800 rounded-lg px-4 py-3">
                      <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{action.beforeAfter.before}</p>
                    </div>
                  </div>
                  <div className="px-4 text-slate-400 dark:text-slate-500 text-xl">→</div>
                  <div className="text-center flex-1">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">After</p>
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-lg px-4 py-3">
                      <p className="text-2xl font-semibold text-green-700 dark:text-green-400">{action.beforeAfter.after}</p>
                    </div>
                  </div>
                </div>
                <p className="text-center text-xs text-slate-600 dark:text-slate-400 mt-3">{action.beforeAfter.metric}</p>
              </div>

              {/* Referenced Rules (Collapsed) */}
              <Collapsible
                open={isRulesExpanded}
                onOpenChange={() => setRulesExpandedId(isRulesExpanded ? null : action.id)}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                    <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Referenced Financial Rules</h4>
                    {isRulesExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-2 space-y-2 px-4">
                    {action.rules.map((rule, index) => (
                      <div key={index} className="flex gap-2 py-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{rule}</p>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 px-6 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white font-semibold">Recommended Actions</h1>
            <p className="text-purple-100 text-sm">Guided scenario exploration</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <p className="text-white text-sm">
            {recommendedActions.filter(a => a.priority === 'high').length} high priority actions • 
            {' '}{recommendedActions.filter(a => a.priority === 'medium').length} medium • 
            {' '}{recommendedActions.filter(a => a.priority === 'low').length} low
          </p>
        </div>
      </div>

      {/* Disclaimer Banner */}
      <div className="px-6 py-4 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-900 dark:text-amber-300 font-medium mb-1">
              Behavior-based probabilities, not predictions
            </p>
            <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
              Outcomes shown are probability estimates based on your historical financial patterns and rule-based calculations. 
              They do not predict market movements or guarantee future results.
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="px-6 py-6 space-y-4">
        {recommendedActions.map((action) => (
          <ActionCard key={action.id} action={action} />
        ))}

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            All recommendations are refreshed based on your latest financial data and evidence-driven rules.
            <br />
            <button 
              onClick={() => navigate('transparency')}
              className="text-blue-600 dark:text-blue-400 mt-3 inline-block hover:underline"
            >
              Learn how recommendations are generated →
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
