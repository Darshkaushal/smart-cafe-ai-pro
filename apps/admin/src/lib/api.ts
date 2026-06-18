export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("smart_cafe_admin_token") || "";
}

export function saveToken(token: string) {
  localStorage.setItem("smart_cafe_admin_token", token);
}

export function clearToken() {
  localStorage.removeItem("smart_cafe_admin_token");
}

export async function apiFetch<T>(path: string, init: RequestInit = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      ...(init.headers || {})
    }
  });
  const json = await response.json();
  if (!response.ok || !json.success) throw new Error(json.message || "Request failed");
  return json.data as T;
}
