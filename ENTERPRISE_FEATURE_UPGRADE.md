# DK's Cafe Enterprise Feature Upgrade

This update adds production-style features for a stronger manager/internship presentation.

## Added customer pages

- `/offers` - combo offers and redemption steps.
- `/franchise` - partner/franchise information page.
- `/careers` - cafe hiring and internship roles.
- `/reviews` - realistic customer reviews and feedback CTA.
- `/track-order` - customer order status tracking by phone/email.
- `/availability` - table availability check by date/time/guest count.

## Added customer experience features

- CSS 3D cafe animation component used on customer-facing pages.
- Payment preference UI in checkout: UPI, card, cash at counter.
- Track code shown after order creation.
- Homepage cafe story and customer reviews section.
- Footer and navbar updated with realistic customer navigation.
- More realistic menu items added to seed data.

## Backend/API upgrades

- `GET /api/availability` checks current reservation load for a selected slot.
- `GET /api/orders/track` returns recent orders by phone/email.
- Chatbot uses a RAG-style cafe knowledge base for offers, events, careers, franchise, tracking and availability.
- Chatbot still supports Gemini through `GEMINI_API_KEY` and falls back to local answers when Gemini is not available.

## Admin upgrades

- Dashboard now includes visual occupancy forecast bars.
- Recent order status distribution bars.
- Private technical cards explaining assistant intelligence, prediction model and manager view.

## AI/ML explanation

- LLM: Gemini-ready chatbot responses through API key.
- RAG: small knowledge retrieval layer in backend for cafe-specific facts.
- Recommendation algorithm: menu scoring by tags, budget, sweetness, temperature and occasion.
- ML: existing demand predictor uses booking history and rolling-average features to forecast occupancy.
