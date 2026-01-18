export type Analysis = {
  metrics: {
    savings_ratio: number;
    discretionary_percentage: number;
    expense_volatility: number;
    trading_exposure: number;
  };
  probabilities: {
    loss: number;
    neutral: number;
    gain: number;
  };
  recommended_actions: any[];
};
