def generate_recommended_actions(
    savings_ratio: float,
    discretionary_percentage: float,
    expense_volatility: float,
    trading_exposure: float,
) -> list:
    actions = []

    if savings_ratio < 0.15:
        actions.append({
            "id": "REDUCE_DISCRETIONARY",
            "title": "Reduce discretionary spending",
            "reason": "Savings rate is below a stable threshold",
            "suggested_change": "Reduce discretionary expenses by 10–15%"
        })

    if expense_volatility > 0.25:
        actions.append({
            "id": "STABILIZE_EXPENSES",
            "title": "Stabilize monthly expenses",
            "reason": "High month-to-month expense variation",
            "suggested_change": "Set fixed monthly caps for non-essential spending"
        })

    if trading_exposure > 0.30:
        actions.append({
            "id": "REDUCE_TRADING_EXPOSURE",
            "title": "Reduce trading exposure",
            "reason": "High portion of funds allocated to trading",
            "suggested_change": "Lower trading capital allocation"
        })

    return actions
