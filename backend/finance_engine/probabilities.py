def stability_probability(savings_ratio: float, expense_volatility: float) -> dict:
    """
    Returns behavior-based probability buckets.
    """

    score = 0

    # Savings contribution
    if savings_ratio >= 0.20:
        score += 2
    elif savings_ratio >= 0.10:
        score += 1

    # Volatility penalty
    if expense_volatility > 0.30:
        score -= 2
    elif expense_volatility > 0.15:
        score -= 1

    # Clamp score
    score = max(-2, min(2, score))

    if score >= 2:
        return {"loss": 0.15, "neutral": 0.25, "gain": 0.60}
    elif score == 1:
        return {"loss": 0.25, "neutral": 0.35, "gain": 0.40}
    elif score == 0:
        return {"loss": 0.40, "neutral": 0.35, "gain": 0.25}
    elif score == -1:
        return {"loss": 0.55, "neutral": 0.30, "gain": 0.15}
    else:
        return {"loss": 0.70, "neutral": 0.20, "gain": 0.10}
