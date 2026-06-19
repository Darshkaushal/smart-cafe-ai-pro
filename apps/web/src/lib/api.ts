export function getApiUrl() {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;

  if (typeof window !== "undefined") {
    const { protocol, hostname } = window.location;
    if (hostname.includes("-3000.app.github.dev")) return `${protocol}//${hostname.replace("-3000.", "-4000.")}/api`;
    if (hostname.includes("-3001.app.github.dev")) return `${protocol}//${hostname.replace("-3001.", "-4000.")}/api`;
  }

  return "http://localhost:4000/api";
}

export const API_URL = getApiUrl();

export type MenuItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  tags: string[];
  imageUrl?: string;
  sweetness: number;
  temperature: string;
};

async function parseResponse<T>(response: Response): Promise<T> {
  const json = await response.json().catch(() => ({}));
  if (!response.ok || !json.success) {
    throw new Error(json.message || "Request failed. Please check if backend API is running on port 4000.");
  }
  return json.data as T;
}

export async function getMenu() {
  const response = await fetch(`${getApiUrl()}/menu`, { next: { revalidate: 60 } });
  return parseResponse<MenuItem[]>(response);
}

export async function postJson<T>(path: string, body: unknown) {
  const response = await fetch(`${getApiUrl()}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return parseResponse<T>(response);
}
