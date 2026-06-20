# DK's Cafe Upgrade: Chatbot + Menu + New Pages

This upgrade adds:

- A smarter customer-facing cafe companion chatbot.
- Gemini-powered responses when `GEMINI_API_KEY` is added.
- Strong local fallback answers even without Gemini.
- Conversation history sent from the widget for better follow-up replies.
- More menu items across coffee, tea, shakes, mocktails, desserts and snacks.
- Two new realistic website pages: `/gallery` and `/events`.
- Navbar and footer links for Gallery and Events.

## Gemini setup

The chatbot works without a key using local cafe answers. For Gemini-like open conversation:

1. Open `apps/api/.env`
2. Add your key:

```env
GEMINI_API_KEY="your_key_here"
```

3. Restart the project:

```bash
pnpm dev
```

## After applying this upgrade

Run:

```bash
pnpm install
docker compose up -d mysql
pnpm --filter @smart-cafe/api exec prisma db push
pnpm db:seed
pnpm dev
```

Open:

- Customer website: port `3000`
- Private admin panel: port `3001`
- Backend API: port `4000`
