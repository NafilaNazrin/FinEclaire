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

## Gemini Setup (.env)

Create `backend/.env`:

```env
GOOGLE_API_KEY=your_google_ai_studio_key
```

That is the only key needed. The backend reads it automatically and uses `gemini-1.5-flash`.

If no key is set, `/chat` returns a clear setup error.
