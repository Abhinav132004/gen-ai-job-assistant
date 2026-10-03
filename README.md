# Gen AI Job Assistant

An AI-powered interview preparation and job assistant. Upload your resume (PDF)
and a target job description, and the app uses Google's Gemini model to generate:

- A **match score** (0–100) of your profile against the job
- **Technical** and **behavioral** interview questions (with the interviewer's
  intent and how to answer each)
- **Skill gaps** with severity
- A day-wise **preparation plan**
- A tailored, ATS-friendly **resume PDF**

## Tech stack

- **Backend:** Node.js, Express 5, MongoDB (Mongoose), JWT auth, Multer, pdf-parse,
  Puppeteer, `@google/genai` (Gemini)
- **Frontend:** React 19, Vite, React Router, Axios, Sass

## Project structure

```
Backend/    Express API (auth + interview endpoints, AI service)
Frontend/   React + Vite single-page app
```

## Getting started

### Prerequisites

- Node.js 18+ (tested on Node 22)
- A Google Gemini API key: https://aistudio.google.com/app/apikey
- MongoDB — optional for local dev (an in-memory DB mode is bundled)

### 1. Backend

```bash
cd Backend
npm install
cp .env.example .env   # then edit .env and add your GOOGLE_GENAI_API_KEY
```

Run it:

```bash
# Option A: no MongoDB install needed — runs an in-memory database
npm run dev:mem

# Option B: against your own MongoDB (set MONGO_URI in .env first)
npm run dev
```

The API runs on **http://localhost:3000**.

### 2. Frontend

```bash
cd Frontend
npm install
npm run dev
```

The app runs on **http://localhost:5173** and talks to the backend on port 3000.

## Environment variables (Backend/.env)

| Variable               | Required | Description                                  |
| ---------------------- | -------- | -------------------------------------------- |
| `MONGO_URI`            | for `npm run dev` | MongoDB connection string           |
| `JWT_SECRET`           | yes      | Secret for signing JWT auth tokens           |
| `GOOGLE_GENAI_API_KEY` | yes      | Google Gemini API key for the AI features    |

## API routes

- `POST /api/auth/register` — create an account
- `POST /api/auth/login` — log in
- `GET  /api/auth/logout` — log out
- `GET  /api/auth/get-me` — current user
- `POST /api/interview/` — generate an interview report (resume upload + descriptions)
- `GET  /api/interview/` — list your reports
- `GET  /api/interview/report/:interviewId` — get a report by id
- `POST /api/interview/resume/pdf/:interviewReportId` — generate a tailored resume PDF
