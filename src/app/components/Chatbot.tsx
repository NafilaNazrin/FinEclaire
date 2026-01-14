import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertCircle } from 'lucide-react';
import { Screen } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

interface ChatbotProps {
  navigate: (screen: Screen) => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Chatbot({ navigate }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your FinÉclairé AI advisor. I can help you understand your financial patterns, explain metrics, and guide you through scenarios. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Financial stability questions
    if (lowerMessage.includes('stability') || lowerMessage.includes('score')) {
      return 'Your Financial Stability Score is currently 7.4/10, which is in the "good" range. This score is calculated using:\n\n• Savings Ratio (22.5%) × 0.3\n• Emergency Fund Coverage (2.4 months) × 0.3\n• Income Consistency × 0.2\n• Debt-to-Income × 0.2\n\nTo improve your score, I recommend building your emergency fund to 3+ months and maintaining your current savings rate. Would you like to see specific recommendations?';
    }

    // Spending questions
    if (lowerMessage.includes('spending') || lowerMessage.includes('expenses') || lowerMessage.includes('discretionary')) {
      return 'Your current discretionary spending is 17.8% of income ($800/month). Based on your moderate risk profile, the recommended range is 10-15%.\n\nReducing this by 15% would:\n• Save you ~$180/month\n• Improve stability score by +0.6\n• Lower your risk level\n\nWould you like me to create a scenario simulation for this?';
    }

    // Trading questions
    if (lowerMessage.includes('trading') || lowerMessage.includes('exposure') || lowerMessage.includes('risk')) {
      return 'Your trading exposure is 22.2% of monthly income with:\n\n• Win Rate: 58%\n• Max Drawdown: -18%\n• 6-Month P&L: +$210\n\n⚠️ This exposure is high for your moderate risk profile. Consider reducing to 10-15% to better align with your risk tolerance.\n\nRemember: I do not predict future trading performance - this analysis is based solely on your historical patterns.';
    }

    // Savings questions
    if (lowerMessage.includes('savings') || lowerMessage.includes('save') || lowerMessage.includes('emergency')) {
      return 'Your current savings situation:\n\n• Savings Ratio: 22.5% (Good!)\n• Emergency Fund: 2.4 months coverage\n• Target: 3-6 months for salary earners\n• Gap: $2,400 to minimum target\n\nI recommend allocating an additional $100/month to reach the 3-month minimum in ~2 years. Your investment consistency is excellent at 100%!';
    }

    // Scenario questions
    if (lowerMessage.includes('scenario') || lowerMessage.includes('what if') || lowerMessage.includes('simulation')) {
      return 'I can help you explore various financial scenarios:\n\n1. Reduce discretionary spending\n2. Adjust trading capital\n3. Model income changes\n4. Increase savings rate\n\nEach scenario shows probabilities for loss/neutral/gain outcomes based on your historical patterns. Which scenario would you like to explore?';
    }

    // Metrics questions
    if (lowerMessage.includes('metric') || lowerMessage.includes('formula') || lowerMessage.includes('calculate')) {
      return 'All FinÉclairé metrics are transparent and rule-based. Key metrics include:\n\n• Financial Stability Score (0-10)\n• Savings Ratio (% of income)\n• Trading Exposure Ratio\n• Emergency Fund Coverage\n• Win/Loss Rates\n\nEvery metric has a clear formula you can review in the Transparency section. Which specific metric would you like to understand?';
    }

    // Recommendations
    if (lowerMessage.includes('recommend') || lowerMessage.includes('advice') || lowerMessage.includes('suggest')) {
      return 'Based on your current financial profile, here are my top recommendations:\n\n1. 🔴 High Priority: Reduce discretionary spending to 15% of income\n2. 🔴 High Priority: Lower trading exposure to align with moderate risk profile\n3. 🟡 Medium Priority: Build emergency fund to 3-6 months\n4. 🟢 Low Priority: Maintain your excellent investment consistency\n\nEach recommendation includes detailed explanations, supporting metrics, and expected impact. Check the Insights tab for full details!';
    }

    // Help
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you') || lowerMessage.includes('how do')) {
      return 'I can help you with:\n\n📊 Understanding your financial metrics\n💡 Explaining AI-generated insights\n🎯 Exploring what-if scenarios\n📈 Analyzing spending patterns\n💰 Reviewing trading exposure\n🛡️ Building financial stability\n\nI provide evidence-based guidance, not predictions. Ask me anything about your financial data!';
    }

    // Default response
    return 'I understand you\'re asking about "' + userMessage + '". I can help you with:\n\n• Financial stability and metrics\n• Spending and savings analysis\n• Trading exposure and risk\n• Scenario planning\n• Understanding recommendations\n\nCould you rephrase your question or ask about one of these topics? Remember, I provide decision support based on your data, not market predictions.';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const quickActions = [
    { label: 'Explain my stability score', query: 'What is my financial stability score?' },
    { label: 'Review spending', query: 'How is my spending?' },
    { label: 'Trading analysis', query: 'Analyze my trading exposure' },
    { label: 'Get recommendations', query: 'What are your recommendations?' }
  ];

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-900 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 px-6 pt-12 pb-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white">AI Advisor Chat</h1>
            <p className="text-blue-100 text-sm">Ask me anything about your finances</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-6 py-3 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900 flex-shrink-0">
        <div className="flex gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-300">
            AI responses are based on your data and rules - not predictions or guarantees
          </p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.role === 'user' 
                ? 'bg-gradient-to-br from-purple-500 to-purple-600' 
                : 'bg-gradient-to-br from-blue-500 to-blue-600'
            }`}>
              {message.role === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>
            
            <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-purple-600 dark:bg-purple-700 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.role === 'user' 
                    ? 'text-purple-200' 
                    : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {message.timestamp.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="px-6 pb-4 flex-shrink-0">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Quick questions:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => setInput(action.query)}
                className="text-left text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-xl transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-6 pb-4 flex-shrink-0 border-t border-slate-200 dark:border-slate-700 pt-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your finances..."
            className="flex-1 rounded-xl bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
