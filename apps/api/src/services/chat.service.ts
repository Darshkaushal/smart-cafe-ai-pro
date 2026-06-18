import { GoogleGenAI } from "@google/genai";
import { MenuItem, MessageRole } from "@prisma/client";
import { env } from "../lib/env.js";
import { prisma } from "../lib/prisma.js";
import { findOrCreateCustomer } from "./customer.service.js";
import { toNumber } from "../lib/http.js";

type ChatInput = {
  message: string;
  name?: string;
  email?: string;
  phone?: string;
};

type Recommendation = {
  id: string;
  name: string;
  price: number;
  reason: string;
  tags: string[];
};

const ai = env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: env.GEMINI_API_KEY }) : null;

function tagsOf(item: MenuItem): string[] {
  return Array.isArray(item.tags) ? item.tags.map(String) : [];
}

function detectLanguage(text: string) {
  const hasDevanagari = /[\u0900-\u097F]/.test(text);
  const hinglishWords = /\b(thanda|meetha|mitha|garam|chai|coffee|cold|sweet|chocolate|mango|kuch|chahiye|batao)\b/i.test(text);
  if (hasDevanagari) return "hindi";
  if (hinglishWords) return "mixed";
  return "english";
}

function localRecommendations(message: string, menu: MenuItem[]): Recommendation[] {
  const normalized = message.toLowerCase();
  const keywordMap: Record<string, string[]> = {
    cold: ["cold", "iced", "chilled", "thanda", "ठंडा"],
    hot: ["hot", "warm", "garam", "गरम"],
    sweet: ["sweet", "meetha", "mitha", "मीठा"],
    chocolate: ["chocolate", "brownie", "cocoa"],
    coffee: ["coffee", "espresso", "cappuccino"],
    mango: ["mango", "aam", "आम"],
    refreshing: ["refreshing", "fresh", "mint", "lemon", "cooler"],
    spicy: ["spicy", "peri", "masala", "teekha", "तीखा"],
    dessert: ["dessert", "waffle", "ice cream", "cream"]
  };

  const desired = Object.entries(keywordMap)
    .filter(([, words]) => words.some((word) => normalized.includes(word)))
    .map(([key]) => key);

  const scored = menu.map((item) => {
    const tags = tagsOf(item).map((tag) => tag.toLowerCase());
    let score = 0;
    for (const need of desired) {
      if (tags.some((tag) => tag.includes(need))) score += 4;
      if (item.name.toLowerCase().includes(need)) score += 3;
      if (item.description.toLowerCase().includes(need)) score += 2;
    }
    if (normalized.includes("sweet") || normalized.includes("meetha") || normalized.includes("mitha")) score += item.sweetness;
    if ((normalized.includes("cold") || normalized.includes("thanda")) && item.temperature === "cold") score += 5;
    if ((normalized.includes("hot") || normalized.includes("garam")) && item.temperature === "hot") score += 5;
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
  if (item.temperature === "cold" && /cold|thanda|ठंडा/i.test(normalized)) reasons.push("it is chilled and refreshing");
  if (item.sweetness >= 4 && /sweet|meetha|mitha|मीठा/i.test(normalized)) reasons.push("it has a strong sweet taste");
  if (/coffee/i.test(normalized) && item.name.toLowerCase().includes("coffee")) reasons.push("it matches your coffee mood");
  if (!reasons.length) reasons.push("it matches your cafe vibe and popular taste preferences");
  return reasons.join(", ");
}

function menuForPrompt(menu: MenuItem[]) {
  return menu
    .map((item) => `- ${item.name} | ₹${toNumber(item.price)} | ${item.temperature} | sweetness ${item.sweetness}/5 | tags: ${tagsOf(item).join(", ")}`)
    .join("\n");
}

function fallbackAnswer(recommendations: Recommendation[]) {
  const english = recommendations
    .map((rec, index) => `${index + 1}. ${rec.name} — ₹${rec.price}: ${rec.reason}.`)
    .join("\n");
  const hindi = recommendations
    .map((rec, index) => `${index + 1}. ${rec.name} — ₹${rec.price}: Ye aapki demand ke according best match hai, taste balanced aur cafe favorite option hai.`)
    .join("\n");

  return `Here are the best drinks for you:\n${english}\n\nHindi:\nAapke liye best options:\n${hindi}\n\nTip: Agar aap aur zyada sweet ya less sweet chahte ho, order notes me mention kar sakte ho.`;
}

async function geminiAnswer(message: string, menu: MenuItem[], recommendations: Recommendation[], language: string) {
  if (!ai) return fallbackAnswer(recommendations);

  const prompt = `You are Smart Cafe AI, a friendly drink recommender for a modern Gen-Z cafe.
Customer language detected: ${language}.
Customer demand: "${message}"

Available menu:
${menuForPrompt(menu)}

Recommended items already selected from the database:
${recommendations.map((rec) => `- ${rec.name} ₹${rec.price}: ${rec.reason}`).join("\n")}

Rules:
1. Recommend only 2 to 3 drinks/items from the provided menu.
2. Do not invent menu items.
3. Reply in English and Hindi/Hinglish both.
4. Keep it short, friendly, and useful.
5. Explain why each item matches the demand.
6. Ask one simple follow-up question at the end about sweetness, ice, or budget.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt
    });
    const text = response.text?.trim();
    return text || fallbackAnswer(recommendations);
  } catch (error) {
    console.error("Gemini failed, using local recommender.", error);
    return fallbackAnswer(recommendations);
  }
}

export async function handleChat(input: ChatInput) {
  const message = input.message.trim();
  const language = detectLanguage(message);
  const menu = await prisma.menuItem.findMany({ where: { isAvailable: true }, orderBy: { createdAt: "asc" } });
  const recommendations = localRecommendations(message, menu);
  const answer = await geminiAnswer(message, menu, recommendations, language);

  const customer = input.name
    ? await findOrCreateCustomer({ name: input.name, email: input.email, phone: input.phone })
    : null;

  const conversation = await prisma.conversation.create({
    data: {
      customerId: customer?.id,
      userLanguage: language,
      demandText: message,
      messages: {
        create: [
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
