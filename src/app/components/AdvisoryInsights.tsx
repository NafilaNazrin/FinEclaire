import React, { useState } from 'react';
import { Analysis } from '../types/analysis';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Screen } from '../App';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { Slider } from './ui/slider';

/* ------------------ PROPS ------------------ */
interface AdvisoryInsightsProps {
  navigate: (screen: Screen) => void;
  analysis: Analysis | null;
}

/* ------------------ EXPECTED ACTION SHAPE ------------------ */
/* (Matches backend `recommended_actions`) */
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

export default function AdvisoryInsights({
  navigate,
  analysis,
}: AdvisoryInsightsProps) {
  /* ------------------ EMPTY STATE ------------------ */
  if (!analysis || analysis.recommended_actions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">
          Add expenses to generate personalized insights.
        </p>
      </div>
    );
  }

  /* ------------------ STATE ------------------ */
  const [expandedId, setExpandedId] = useState<string | null>(null);

  /* ------------------ DATA FROM BACKEND ------------------ */
  const recommendedActions = analysis.recommended_actions as RecommendedAction[];

  /* ------------------ LOCAL SLIDER STATE (UI ONLY) ------------------ */
  const sliderState: Record<string, number[]> = {};
  recommendedActions.forEach((a) => {
    sliderState[a.id] = [a.interactive.defaultValue];
  });

  const [sliders, setSliders] = useState(sliderState);

  const setSliderValue = (id: string, value: number[]) => {
    setSliders((prev) => ({ ...prev, [id]: value }));
  };

  /* ------------------ SIMPLE PROBABILITY VISUAL ------------------ */
  const calculateProbabilities = (value: number) => {
    const loss = Math.max(5, 30 - value);
    const gain = Math.min(70, 40 + value);
    return {
      loss,
      neutral: 100 - loss - gain,
      gain,
    };
  };

  /* ------------------ ACTION CARD ------------------ */
  const ActionCard = ({ action }: { action: RecommendedAction }) => {
    const isExpanded = expandedId === action.id;
    const currentValue = sliders[action.id][0];
    const probs = calculateProbabilities(currentValue);

    return (
      <Collapsible open={isExpanded}>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <CollapsibleTrigger
            onClick={() => setExpandedId(isExpanded ? null : action.id)}
            className="w-full p-6 text-left"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-slate-900 dark:text-white font-medium">
                  {action.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {action.reason}
                </p>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent className="px-6 pb-6 space-y-4">
            <div className="text-sm text-slate-700 dark:text-slate-300">
              {action.explanation}
            </div>

            <Slider
              value={sliders[action.id]}
              onValueChange={(v) => setSliderValue(action.id, v)}
              min={action.interactive.min}
              max={action.interactive.max}
              step={action.interactive.step}
            />

            <div className="text-sm text-slate-600 dark:text-slate-400">
              Gain: {probs.gain}% • Neutral: {probs.neutral}% • Loss:{' '}
              {probs.loss}%
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500">
                Before: {action.beforeAfter.before} → After:{' '}
                {action.beforeAfter.after}
              </p>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    );
  };

  /* ------------------ RENDER ------------------ */
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pb-24">
      <div className="bg-purple-600 px-6 pt-12 pb-6 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5" />
          <h1 className="text-2xl font-semibold">Recommended Actions</h1>
        </div>
        <p className="text-sm opacity-90">
          AI-generated, behavior-aware financial guidance
        </p>
      </div>

      <div className="px-6 py-6 space-y-4">
        {recommendedActions.map((action) => (
          <ActionCard key={action.id} action={action} />
        ))}

        <div className="text-center text-sm text-slate-500 mt-8">
          <button
            onClick={() => navigate('transparency')}
            className="text-blue-600 hover:underline"
          >
            Learn how recommendations are generated →
          </button>
        </div>
      </div>
    </div>
  );
}
