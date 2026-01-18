from typing import List


def savings_ratio(income: float, total_expenses: float) -> float:
    """
    (Income - Expenses) / Income
    """
    if income <= 0:
        return 0.0
    return round((income - total_expenses) / income, 4)


def discretionary_percentage(discretionary_expenses: float, income: float) -> float:
    """
    Discretionary expenses / Income
    """
    if income <= 0:
        return 0.0
    return round(discretionary_expenses / income, 4)


def expense_volatility(monthly_expenses: List[float]) -> float:
    """
    Simple v1 volatility:
    (max - min) / average
    """
    if not monthly_expenses or len(monthly_expenses) < 2:
        return 0.0

    avg = sum(monthly_expenses) / len(monthly_expenses)
    if avg == 0:
        return 0.0

    return round((max(monthly_expenses) - min(monthly_expenses)) / avg, 4)


def trading_exposure(trading_capital: float, investable_funds: float) -> float:
    """
    Trading capital / investable funds
    """
    if investable_funds <= 0:
        return 0.0
    return round(trading_capital / investable_funds, 4)
