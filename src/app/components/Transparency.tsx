import React from 'react';
import { ArrowLeft, Shield, Calculator, BookOpen, XCircle } from 'lucide-react';
import { Screen } from '../App';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface TransparencyProps {
  navigate: (screen: Screen) => void;
}

export default function Transparency({ navigate }: TransparencyProps) {
  const metrics = [
    {
      name: 'Financial Stability Score',
      formula: '(Savings Ratio × 0.3) + (Emergency Fund × 0.3) + (Income Consistency × 0.2) + (Debt-to-Income × 0.2)',
      range: '0-10',
      interpretation: 'Higher score indicates better financial stability. Above 7 is considered good.'
    },
    {
      name: 'Savings Ratio',
      formula: '(Monthly Income - Total Expenses) / Monthly Income × 100',
      range: '0-100%',
      interpretation: 'Percentage of income saved. 20% or higher is recommended for most financial goals.'
    },
    {
      name: 'Trading Exposure Ratio',
      formula: 'Trading Capital / Monthly Income × 100',
      range: '0-100%',
      interpretation: 'Percentage of income allocated to trading. 10-15% is moderate; >20% is high exposure.'
    },
    {
      name: 'Emergency Fund Coverage',
      formula: 'Total Savings / Average Monthly Expenses',
      range: '0-12 months',
      interpretation: '3-6 months of expenses is recommended for salary earners; 6-12 for variable income.'
    },
    {
      name: 'Win Rate',
      formula: 'Winning Trades / Total Trades × 100',
      range: '0-100%',
      interpretation: 'Percentage of profitable trades. Historical pattern only—not predictive of future performance.'
    }
  ];

  const rules = [
    {
      id: 'R001',
      category: 'Spending',
      rule: 'If discretionary spending >15% of income AND risk profile = moderate, flag for review',
      purpose: 'Ensure spending aligns with stated risk tolerance'
    },
    {
      id: 'R012',
      category: 'Savings',
      rule: 'If savings ratio <20% AND has retirement goal, recommend increase',
      purpose: 'Support long-term financial goals'
    },
    {
      id: 'R023',
      category: 'Trading',
      rule: 'If trading exposure >20% AND risk profile = conservative/moderate, flag high risk',
      purpose: 'Prevent excessive risk exposure'
    },
    {
      id: 'R034',
      category: 'Emergency Fund',
      rule: 'If emergency fund <3 months AND income type = salary, recommend building buffer',
      purpose: 'Ensure adequate financial cushion'
    },
    {
      id: 'R045',
      category: 'Patterns',
      rule: 'If category spending increases >25% over 3 months, flag for analysis',
      purpose: 'Detect unusual spending patterns'
    },
    {
      id: 'R056',
      category: 'Risk',
      rule: 'If max drawdown >15% AND trading exposure >20%, flag risk mismatch',
      purpose: 'Align risk exposure with performance'
    }
  ];

  const probabilityMethod = [
    {
      step: '1. Historical Analysis',
      description: 'Analyze your spending, saving, and trading patterns from the last 6-12 months to establish baseline behavior.'
    },
    {
      step: '2. Scenario Modeling',
      description: 'Apply the proposed change (e.g., reduce spending by 15%) to your historical data to model outcomes.'
    },
    {
      step: '3. Outcome Distribution',
      description: 'Calculate how often similar patterns led to loss, neutral, or gain scenarios in your history.'
    },
    {
      step: '4. Risk Adjustment',
      description: 'Adjust probabilities based on volatility, consistency, and external factors (e.g., income stability).'
    },
    {
      step: '5. Confidence Bounds',
      description: 'Present results with transparency about data quality and sample size limitations.'
    }
  ];

  const limitations = [
    'We do NOT predict market movements, stock prices, or economic conditions',
    'Probabilities are based solely on YOUR historical patterns, not external forecasts',
    'Past patterns do not guarantee future outcomes',
    'External factors (job loss, medical emergency, market crash) are not modeled',
    'All insights are decision-support tools, not financial advice',
    'Small data samples (e.g., <6 months) have lower confidence'
  ];

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
        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl">
            <Shield className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl text-white mb-1">Transparency</h1>
            <p className="text-slate-300 text-sm">How FinÉclairé works</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Metrics Glossary */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg text-slate-900">Metrics Glossary</h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-2">
            {metrics.map((metric, index) => (
              <AccordionItem 
                key={index} 
                value={`metric-${index}`}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <span className="text-slate-900 text-left">{metric.name}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Formula</p>
                      <p className="text-sm text-slate-700 font-mono bg-slate-50 p-2 rounded">
                        {metric.formula}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Range</p>
                      <p className="text-sm text-slate-700">{metric.range}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Interpretation</p>
                      <p className="text-sm text-slate-700">{metric.interpretation}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Rules Overview */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg text-slate-900">Rules Overview</h2>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
            <p className="text-sm text-blue-900">
              All insights are generated using transparent, rule-based logic. Here are examples of our 120+ rules:
            </p>
          </div>

          <div className="space-y-2">
            {rules.map((rule) => (
              <div key={rule.id} className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                    {rule.id}
                  </span>
                  <span className="text-xs text-slate-500">{rule.category}</span>
                </div>
                <p className="text-sm text-slate-700 mb-2">{rule.rule}</p>
                <p className="text-xs text-slate-500">Purpose: {rule.purpose}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Probability Calculation */}
        <div>
          <h2 className="text-lg text-slate-900 mb-4">How Probabilities Are Calculated</h2>
          
          <div className="space-y-3">
            {probabilityMethod.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-slate-900 mb-1">{item.step}</h3>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What We DON'T Do */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-5 h-5 text-red-600" />
            <h2 className="text-lg text-slate-900">What FinÉclairé Does NOT Do</h2>
          </div>
          
          <div className="space-y-2">
            {limitations.map((limitation, index) => (
              <div key={index} className="flex gap-3 bg-white rounded-xl p-4 border border-slate-200">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">{limitation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Privacy */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
          <h3 className="text-slate-900 mb-3">Data Privacy & Security</h3>
          <div className="space-y-2 text-sm text-slate-700">
            <p>• All financial data is encrypted end-to-end</p>
            <p>• We never share or sell your information</p>
            <p>• You can export or delete your data anytime</p>
            <p>• Analysis happens in secure cloud infrastructure</p>
            <p>• No third-party access to your financial details</p>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center pt-6 pb-4 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            FinÉclairé Transparency Report v1.0
            <br />
            Last updated: January 2026
          </p>
        </div>
      </div>
    </div>
  );
}
