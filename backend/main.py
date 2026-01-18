from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from finance_engine.metrics import (
    savings_ratio,
    discretionary_percentage,
    expense_volatility,
    trading_exposure,
)
from finance_engine.probabilities import stability_probability
from finance_engine.actions import generate_recommended_actions

# ✅ SINGLE FastAPI app
app = FastAPI(title="FinÉclairé Backend")

# ✅ CORS (this fixes OPTIONS 405)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],   # enables OPTIONS, POST, etc.
    allow_headers=["*"],
)

# ✅ API ROUTE
@app.post("/analyze")
def analyze_finances(payload: dict):
    income = payload["income"]
    monthly_expenses = payload["monthly_expenses"]
    discretionary_expenses = payload["discretionary_expenses"]
    trading_capital = payload.get("trading_capital", 0)
    investable_funds = payload.get("investable_funds", income)

    total_expenses = sum(monthly_expenses)

    metrics = {
        "savings_ratio": savings_ratio(income, total_expenses),
        "discretionary_percentage": discretionary_percentage(
            discretionary_expenses, income
        ),
        "expense_volatility": expense_volatility(monthly_expenses),
        "trading_exposure": trading_exposure(trading_capital, investable_funds),
    }

    probabilities = stability_probability(
        metrics["savings_ratio"],
        metrics["expense_volatility"],
    )

    actions = generate_recommended_actions(
        metrics["savings_ratio"],
        metrics["discretionary_percentage"],
        metrics["expense_volatility"],
        metrics["trading_exposure"],
    )

    return {
        "metrics": metrics,
        "probabilities": probabilities,
        "recommended_actions": actions,
    }
