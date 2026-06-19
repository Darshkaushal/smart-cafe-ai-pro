# DK's Cafe Pro

A professional full-stack DK's Cafe platform with:

- Public Gen-Z responsive website: homepage, menu, slot booking, about, contact.
- Separate owner/admin dashboard for bookings, orders, customers, conversations, and ML predictions.
- Secure MySQL persistence using Prisma ORM.
- Gen AI drink chatbot that recommends 2–3 menu items in English and Hindi and stores every conversation.
- Demand planning predictor that trains from booking data and writes demand forecasts back into MySQL.

## Folder structure

```txt
smart-cafe-ai-pro/
  apps/
    web/       Customer website
    admin/     Separate owner dashboard
    api/       Express + Prisma + Socket.IO backend
    ml/        Python demand planning predictor and weekly scheduler
  step.txt     Backend workflow explanation in Hinglish
```

## Requirements

- Node.js 20+
- pnpm
- Python 3.10+
- Docker Desktop or local MySQL 8+

## Start with Docker MySQL

```bash
cd smart-cafe-ai-pro
docker compose up -d mysql
```

## Install dependencies

```bash
corepack enable
pnpm install
```

## Configure backend

```bash
cp apps/api/.env.example apps/api/.env
```

Default local admin login after seed:

```txt
Email: owner@dkscafe.in
Password: Owner@12345
```

## Create database tables and seed menu/admin

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

## Run all apps

```bash
pnpm dev
```

URLs:

```txt
Customer website: http://localhost:3000
Admin dashboard:  http://localhost:3001
Backend API:       http://localhost:4000
```

## Optional Gemini setup

Add your Gemini API key in `apps/api/.env`:

```env
GEMINI_API_KEY="your-key"
```

The chatbot still works without Gemini using the built-in rule-based menu recommender. With Gemini, it gives more natural bilingual responses.

## Run ML predictor once

```bash
cd apps/ml
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python train_predict.py
```

## Run weekly ML scheduler

```bash
cd apps/ml
python scheduler.py
```

It retrains every Monday at 02:00 and writes fresh predictions into MySQL for the admin dashboard.
