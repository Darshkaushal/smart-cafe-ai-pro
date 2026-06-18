export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

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
  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.message || "Request failed");
  }
  return json.data as T;
}

export async function getMenu() {
  const response = await fetch(`${API_URL}/menu`, { next: { revalidate: 60 } });
  return parseResponse<MenuItem[]>(response);
}

export async function postJson<T>(path: string, body: unknown) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return parseResponse<T>(response);
}
