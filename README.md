# FinÉclairé

FinÉclairé is a personal finance app with:
- Rule-based financial analysis (`/analyze`)
- Gemini-powered explanation chat (`/chat`)

## Run Frontend

```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Run Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend runs on `http://127.0.0.1:8000`.

## Gemini (Free Version) Setup

1. Create a free Gemini API key in Google AI Studio.
2. Export it before starting backend:

```bash
export GEMINI_API_KEY="your_key_here"
```

Optional: override model (default is free-friendly `gemini-1.5-flash`):

```bash
export GEMINI_MODEL="gemini-1.5-flash"
```

If no API key is set, `/chat` returns a clear error message telling you to configure it.
