# Smart Cafe AI Pro — Advanced UI/UX Upgrade

This version improves the customer website and owner dashboard with:

- Premium Gen-Z glassmorphism UI
- Smooth hover states, animated glow backgrounds, and better page spacing
- Mobile responsive navbar with hamburger menu
- Codespaces-safe API URL auto-detection for browser requests
- Owner Login button auto-opens the correct admin URL in Codespaces
- Advanced menu page with search, category filters, better cart, plus/minus quantity controls, and better success/error states
- Smoother slot booking form with time cards, guest controls, and vibe tags
- Improved AI chatbot with quick prompts, better scroll behavior, and polished chat bubbles
- More professional about/contact pages
- More premium admin login, sidebar, dashboard cards, ML prediction cards, and owner action plan

## Run after replacing files

```bash
pnpm install
pnpm --filter @smart-cafe/api exec prisma db push
pnpm db:seed
pnpm dev
```

In GitHub Codespaces, open the Ports tab and make these public:

- 3000 = Customer website
- 3001 = Admin panel
- 4000 = Backend API

Admin login:

```txt
Email: owner@smartcafe.ai
Password: Owner@12345
```
