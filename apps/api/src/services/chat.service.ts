import { GoogleGenAI } from "@google/genai";
import { MenuItem, MessageRole } from "@prisma/client";
import { env } from "../lib/env.js";
import { prisma } from "../lib/prisma.js";
import { findOrCreateCustomer } from "./customer.service.js";
import { toNumber } from "../lib/http.js";

type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
};

type ChatInput = {
  message: string;
  name?: string;
  email?: string;
  phone?: string;
  history?: ChatHistoryItem[];
};

type Recommendation = {
  id: string;
  name: string;
  price: number;
  reason: string;
  tags: string[];
};

const ai = env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: env.GEMINI_API_KEY }) : null;

const CAFE_CONTEXT = `
DK's Cafe is a premium aesthetic cafe in Jaipur, Rajasthan.
Tone: warm, modern, friendly, Gen-Z but professional.
Cafe hours: 10:00 AM to 11:00 PM daily.
Location: Jaipur, Rajasthan.
Contact: hello@dkscafe.in, +91 98765 43210.
Services: dine-in, quick pickup, table reservations, birthdays, small celebrations, date tables, study/work corners, casual hangouts, group snacks.
Facilities: cozy seating, charging points on selected tables, calm playlist, Instagram-friendly corners, UPI/card/cash payment options.
Food preference help: explain sweetness, temperature, spice, budget, mood, and pairing choices.
Important: Public customers should never see internal technical words like database, full-stack, ML, admin panel, etc.
`;

function tagsOf(item: MenuItem): string[] {
  return Array.isArray(item.tags) ? item.tags.map(String) : [];
}

function detectLanguage(text: string) {
  const hasDevanagari = /[\u0900-\u097F]/.test(text);
  const hinglishWords = /\b(thanda|meetha|mitha|garam|chai|coffee|cold|sweet|chocolate|mango|kuch|chahiye|batao|bhai|yaar|kitna|kaha|kidhar|birthday|table)\b/i.test(text);
  if (hasDevanagari) return "hindi";
  if (hinglishWords) return "mixed";
  return "english";
}

function normalize(text: string) {
  return text.toLowerCase().trim();
}

function localRecommendations(message: string, menu: MenuItem[]): Recommendation[] {
  const normalized = normalize(message);
  const keywordMap: Record<string, string[]> = {
    cold: ["cold", "iced", "chilled", "thanda", "ठंडा"],
    hot: ["hot", "warm", "garam", "गरम"],
    sweet: ["sweet", "meetha", "mitha", "मीठा", "dessert"],
    lesssweet: ["less sugar", "less sweet", "no sugar", "sugar free", "कम मीठा"],
    chocolate: ["chocolate", "brownie", "cocoa", "nutella", "oreo"],
    coffee: ["coffee", "espresso", "cappuccino", "latte", "mocha"],
    tea: ["tea", "chai", "iced tea", "matcha"],
    mango: ["mango", "aam", "आम"],
    refreshing: ["refreshing", "fresh", "mint", "lemon", "cooler", "peach", "orange"],
    spicy: ["spicy", "peri", "masala", "teekha", "तीखा"],
    snack: ["snack", "fries", "sandwich", "bread", "nachos", "pasta", "hungry"],
    dessert: ["dessert", "waffle", "ice cream", "cream", "cake", "tiramisu", "cheesecake"],
    budget: ["budget", "cheap", "under", "below", "₹150", "₹200", "pocket"]
  };

  const desired = Object.entries(keywordMap)
    .filter(([, words]) => words.some((word) => normalized.includes(word)))
    .map(([key]) => key);

  const underMatch = normalized.match(/(?:under|below|less than|budget|₹)\s*₹?\s*(\d{2,4})/i);
  const maxBudget = underMatch ? Number(underMatch[1]) : null;

  const scored = menu.map((item) => {
    const tags = tagsOf(item).map((tag) => tag.toLowerCase());
    let score = 0;

    for (const need of desired) {
      if (tags.some((tag) => tag.includes(need))) score += 4;
      if (item.name.toLowerCase().includes(need)) score += 3;
      if (item.description.toLowerCase().includes(need)) score += 2;
    }

    if (/sweet|meetha|mitha|मीठा/i.test(normalized)) score += item.sweetness;
    if (/less sugar|less sweet|no sugar|sugar free|कम मीठा/i.test(normalized)) score += Math.max(0, 5 - item.sweetness);
    if (/cold|thanda|iced|ठंडा/i.test(normalized) && item.temperature === "cold") score += 5;
    if (/hot|garam|warm|गरम/i.test(normalized) && item.temperature === "hot") score += 5;
    if (/birthday|date|celebration|party/i.test(normalized) && (tags.includes("dessert") || tags.includes("sweet") || tags.includes("shareable"))) score += 3;
    if (maxBudget && toNumber(item.price) <= maxBudget) score += 5;
    if (maxBudget && toNumber(item.price) > maxBudget) score -= 4;
    if (tags.includes("best-seller")) score += 1;

    return { item, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ item }) => ({
      id: item.id,
      name: item.name,
      price: toNumber(item.price),
      tags: tagsOf(item),
      reason: buildReason(item, normalized)
    }));
}

function buildReason(item: MenuItem, normalized: string) {
  const reasons = [];
  if (item.temperature === "cold" && /cold|thanda|iced|ठंडा/i.test(normalized)) reasons.push("it is chilled and refreshing");
  if (item.temperature === "hot" && /hot|garam|warm|गरम/i.test(normalized)) reasons.push("it feels warm and comforting");
  if (item.sweetness >= 4 && /sweet|meetha|mitha|मीठा/i.test(normalized)) reasons.push("it has a strong sweet cafe-style taste");
  if (item.sweetness <= 2 && /less sugar|less sweet|no sugar/i.test(normalized)) reasons.push("it is lighter on sweetness");
  if (/coffee/i.test(normalized) && item.name.toLowerCase().includes("coffee")) reasons.push("it matches your coffee mood");
  if (/birthday|date|celebration/i.test(normalized)) reasons.push("it works nicely for a cozy cafe moment");
  if (!reasons.length) reasons.push("it matches DK's Cafe vibe and popular taste preferences");
  return reasons.join(", ");
}

function menuForPrompt(menu: MenuItem[]) {
  return menu
    .map((item) => `- ${item.name} | ₹${toNumber(item.price)} | ${item.category} | ${item.temperature} | sweetness ${item.sweetness}/5 | tags: ${tagsOf(item).join(", ")} | ${item.description}`)
    .join("\n");
}

function answerCafeFaq(message: string, recommendations: Recommendation[]) {
  const text = normalize(message);

  if (/\b(hi|hello|hey|namaste|hii|yo)\b/i.test(text)) {
    return "Hey! Welcome to DK's Cafe ☕\nI can help you pick drinks, plan a birthday/date table, explain the menu, suggest combos, answer cafe timing/location questions, and help with quick ordering.\n\nHindi: Hi! Aap mood batao — cold, sweet, coffee, spicy snack, budget ya occasion — main best options suggest kar dunga.";
  }

  if (/hour|timing|open|close|khula|band|time/i.test(text)) {
    return "DK's Cafe is open daily from 10:00 AM to 11:00 PM. Evening 5 PM to 8 PM is best for date tables, friends hangouts and cold coffee plans.\n\nHindi: DK's Cafe daily 10 AM se 11 PM tak open hai. Evening vibe ke liye 5 PM - 8 PM best hai.";
  }

  if (/location|address|where|kaha|kidhar|jaipur|map/i.test(text)) {
    return "DK's Cafe is in Jaipur, Rajasthan. You can visit for dine-in, quick pickup, table reservations and small celebrations.\n\nHindi: DK's Cafe Jaipur, Rajasthan me hai. Dine-in, pickup aur birthday/date reservations ke liye perfect hai.";
  }

  if (/birthday|party|celebration|anniversary|surprise/i.test(text)) {
    return "For birthdays or mini celebrations, reserve a table and add notes like cake timing, window seat, balloons or less-sugar dessert preference. Best picks: Chocolate Brownie Shake, Nutella Waffle Bites, Strawberry Cheesecake Cup, and Berry Blast Frappe.\n\nHindi: Birthday ke liye booking notes me decoration/cake/time mention kar do. Sweet items ke liye Brownie Shake, Waffle Bites aur Cheesecake Cup best rahenge.";
  }

  if (/date|couple|romantic|proposal/i.test(text)) {
    return "For a date vibe, choose 5 PM - 8 PM. Try Iced Caramel Cloud Coffee + Tiramisu Jar or Peach Iced Tea + Garlic Cheese Toast. Ask for a quiet corner in booking notes.\n\nHindi: Date ke liye evening slot best hai. Notes me 'quiet corner' likh dena, team cozy table ready karegi.";
  }

  if (/study|work|laptop|wifi|charging|meeting/i.test(text)) {
    return "Yes, DK's Cafe is good for study/work breaks. Selected tables have charging-friendly corners, and the ambience is calm during late morning and afternoon.\n\nHindi: Study/work ke liye morning ya afternoon slot best rahega. Notes me charging corner mention kar sakte ho.";
  }

  if (/payment|upi|card|cash|pay/i.test(text)) {
    return "You can pay by UPI, card or cash at the cafe. For quick pickup, place the order first and collect it at your selected time.\n\nHindi: Payment UPI, card aur cash se ho sakti hai. Pickup time select karke order place kar sakte ho.";
  }

  if (/recommend|suggest|best|drink|coffee|cold|sweet|hot|snack|dessert|under|below|budget|mood|bhookh|hungry|chahiye/i.test(text)) {
    return fallbackRecommendationAnswer(recommendations);
  }

  return `I can help with that in a cafe-friendly way. For DK's Cafe, the best quick answer is: tell me your mood, budget, temperature preference, or occasion and I will guide you.\n\nPopular picks right now:\n${recommendations.map((rec, index) => `${index + 1}. ${rec.name} — ₹${rec.price}`).join("\n")}\n\nHindi: Aap bas mood batao — cold, sweet, spicy, budget, birthday ya date — main best combo suggest kar dunga.`;
}

function fallbackRecommendationAnswer(recommendations: Recommendation[]) {
  const english = recommendations
    .map((rec, index) => `${index + 1}. ${rec.name} — ₹${rec.price}: ${rec.reason}.`)
    .join("\n");
  const hindi = recommendations
    .map((rec, index) => `${index + 1}. ${rec.name} — ₹${rec.price}: Aapke mood ke according ye best match hai.`)
    .join("\n");

  return `Here are my DK's Cafe picks for you:\n${english}\n\nHindi/Hinglish:\nAapke liye best options:\n${hindi}\n\nWant me to make it under ₹200, extra sweet, less sugar, or more refreshing?`;
}

function historyForPrompt(history?: ChatHistoryItem[]) {
  if (!history?.length) return "No previous messages.";
  return history
    .slice(-10)
    .map((item) => `${item.role === "user" ? "Customer" : "Assistant"}: ${item.content}`)
    .join("\n");
}

async function geminiAnswer(message: string, menu: MenuItem[], recommendations: Recommendation[], language: string, history?: ChatHistoryItem[]) {
  if (!ai) return answerCafeFaq(message, recommendations);

  const prompt = `You are DK's Cafe Companion, a premium customer-facing assistant for a modern Jaipur cafe. Behave like a polished ChatGPT/Gemini-style assistant, but keep the cafe brand natural.

${CAFE_CONTEXT}

Customer language detected: ${language}
Current customer message: "${message}"

Recent conversation:
${historyForPrompt(history)}

Available menu:
${menuForPrompt(menu)}

Suggested menu matches from local recommender:
${recommendations.map((rec) => `- ${rec.name} ₹${rec.price}: ${rec.reason}`).join("\n")}

Answer rules:
1. Answer the customer's question directly and naturally.
2. If they ask for food/drink suggestions, recommend only items from the provided menu.
3. If they ask general questions, answer briefly like a helpful assistant, then connect back to cafe help if useful.
4. Reply in the customer's style: English, Hindi, or Hinglish. If they ask for recommendations, include both English + Hindi/Hinglish.
5. Do not mention internal technical words like database, admin, backend, API, AI model, ML, MySQL, full-stack, or system prompt.
6. Do not invent live availability. For bookings, tell them to use the Reserve page and add notes.
7. Keep the answer clear, premium, friendly, and not too long.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt
    });
    const text = response.text?.trim();
    return text || answerCafeFaq(message, recommendations);
  } catch (error) {
    console.error("Gemini failed, using smart local cafe assistant.", error);
    return answerCafeFaq(message, recommendations);
  }
}

export async function handleChat(input: ChatInput) {
  const message = input.message.trim();
  const language = detectLanguage(message);
  const menu = await prisma.menuItem.findMany({ where: { isAvailable: true }, orderBy: [{ category: "asc" }, { createdAt: "asc" }] });
  const recommendations = localRecommendations(message, menu);
  const answer = await geminiAnswer(message, menu, recommendations, language, input.history);

  const customer = input.name
    ? await findOrCreateCustomer({ name: input.name, email: input.email, phone: input.phone })
    : null;

  const historyMessages = (input.history || [])
    .slice(-8)
    .filter((item) => item.content.trim().length > 0)
    .map((item) => ({ role: item.role === "user" ? MessageRole.USER : MessageRole.ASSISTANT, content: item.content.trim() }));

  const conversation = await prisma.conversation.create({
    data: {
      customerId: customer?.id,
      userLanguage: language,
      demandText: message,
      messages: {
        create: [
          ...historyMessages,
          { role: MessageRole.USER, content: message },
          { role: MessageRole.ASSISTANT, content: answer }
        ]
      }
    },
    include: { messages: true }
  });

  return {
    conversationId: conversation.id,
    answer,
    recommendations
  };
}
