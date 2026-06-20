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

## Enterprise Upgrade Notes for Manager Presentation

This version positions **DK's Cafe** as a realistic startup-style cafe platform, not just a static website.

### New customer-facing modules

- **Offers page** for cafe combos and seasonal deals.
- **Franchise page** for future partner enquiries.
- **Careers page** for barista, host, kitchen and content intern roles.
- **Reviews page** with realistic customer feedback.
- **Table Availability page** to check date/time/guest capacity before booking.
- **Track Order page** to check recent order status using phone or email.
- **Premium 3D-style cafe animation** built with CSS transforms, no heavy 3D dependency.
- **Payment preference UI** for UPI, card or cash at counter.
- **Expanded menu seed** with realistic beverages, desserts and snacks.

### Backend workflow summary

The backend is an Express + Prisma API. The customer website sends requests to the backend, the backend validates them with Zod, stores data through Prisma, and the owner dashboard reads the saved operational data.

Main APIs:

- `GET /api/menu` returns available menu items.
- `POST /api/orders` creates a customer order.
- `GET /api/orders/track` returns recent orders by phone/email.
- `POST /api/bookings` creates table reservations.
- `GET /api/availability` checks slot availability by date/time/guest count.
- `POST /api/contact` stores customer enquiries.
- `POST /api/chat` powers the cafe assistant.
- `POST /api/admin/login` authenticates the private owner dashboard.
- `GET /api/admin/overview` returns stats, prediction cards and latest operational data.

### AI / LLM / RAG / ML explanation

The project uses a hybrid intelligence approach:

1. **LLM-ready chatbot**: If `GEMINI_API_KEY` is available, the chatbot calls Gemini for natural responses.
2. **Local fallback assistant**: If Gemini is missing or fails, the chatbot still works with rule-based FAQ handling and menu recommendations.
3. **RAG-style retrieval**: The backend contains a small cafe knowledge base for offers, events, careers, franchise, table availability and order tracking. It retrieves the most relevant knowledge and injects it into the chatbot prompt.
4. **Recommendation scoring**: Menu items are ranked using keywords, tags, sweetness, temperature, budget and occasion matching.
5. **Demand prediction model**: The ML service uses booking history, date features and rolling averages to predict future cafe occupancy.

### Admin dashboard upgrades

The private admin dashboard includes:

- Booking count
- Order count
- Customer count
- Revenue
- Conversation count
- Occupancy forecast bars
- Order status distribution
- Assistant intelligence notes
- Prediction model notes
- Manager action signals

### Manager demo script

> This project is DK's Cafe, a real startup-style cafe platform. Customers can explore the menu, check offers, reserve tables, place orders, track order status, view gallery/events, check table availability and talk to a smart cafe assistant. Behind the scenes, the backend validates requests, stores bookings/orders/customers/messages in the database and shows everything in a private owner dashboard. The chatbot supports Gemini when an API key is available, and also includes a local fallback plus retrieval-based cafe knowledge. The admin dashboard provides analytics, order status flow and demand prediction insights for business preparation.

### Future production improvements

- Online payment gateway integration.
- SMS/WhatsApp order notifications.
- Owner-controlled menu editor.
- Real customer review submission and moderation.
- Calendar-based table capacity management.
- Production-grade migrations with `prisma migrate deploy`.
