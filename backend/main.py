import json
import os
from urllib import error, request

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from finance_engine.actions import generate_recommended_actions
from finance_engine.metrics import (
    discretionary_percentage,
    expense_volatility,
    savings_ratio,
    trading_exposure,
)
from finance_engine.probabilities import stability_probability

load_dotenv()

app = FastAPI(title="FinÉclairé Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    analysis: dict | None = None


class ChatResponse(BaseModel):
    reply: str


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


def build_system_prompt(analysis: dict | None) -> str:
    analysis_context = json.dumps(analysis or {}, indent=2)
    return (
        "You are FinÉclairé's finance explanation assistant. "
        "You explain user metrics and app recommendations in simple language. "
        "Do not give market predictions, stock picks, buy/sell timing, or guaranteed outcomes. "
        "If asked for investing recommendations, politely refuse and redirect to education. "
        "Use short paragraphs and bullets when useful. "
        "The following app context is the only financial data you can reference:\n"
        f"{analysis_context}\n\n"
        "Always include this disclaimer once at the end when relevant: "
        "'This is informational only and not financial advice.'"
    )


def call_gemini(user_message: str, analysis: dict | None) -> str:
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="Missing GOOGLE_API_KEY. Add it to backend/.env and restart the backend.",
        )

    model = "gemini-1.5-flash"
    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
        f"?key={api_key}"
    )

    payload = {
        "system_instruction": {
            "parts": [{"text": build_system_prompt(analysis)}],
        },
        "contents": [
            {
                "role": "user",
                "parts": [{"text": user_message}],
            }
        ],
    }

    req = request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with request.urlopen(req, timeout=30) as resp:
            body = json.loads(resp.read().decode("utf-8"))
    except error.HTTPError as exc:
        details = exc.read().decode("utf-8")
        raise HTTPException(status_code=502, detail=f"Gemini API error: {details}") from exc
    except error.URLError as exc:
        raise HTTPException(status_code=502, detail=f"Gemini connection error: {exc.reason}") from exc

    candidates = body.get("candidates", [])
    if not candidates:
        raise HTTPException(status_code=502, detail="Gemini returned no candidates.")

    parts = candidates[0].get("content", {}).get("parts", [])
    text_chunks = [part.get("text", "") for part in parts if "text" in part]
    reply = "\n".join(chunk for chunk in text_chunks if chunk).strip()

    if not reply:
        raise HTTPException(status_code=502, detail="Gemini response contained no text.")

    return reply


@app.post("/chat", response_model=ChatResponse)
def chat_with_advisor(payload: ChatRequest):
    user_message = payload.message.strip()
    if not user_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    reply = call_gemini(user_message, payload.analysis)
    return ChatResponse(reply=reply)
