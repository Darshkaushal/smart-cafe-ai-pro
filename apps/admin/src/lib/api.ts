export function getAdminApiUrl() {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;

  if (typeof window !== "undefined") {
    const { protocol, hostname } = window.location;
    if (hostname.includes("-3001.app.github.dev")) return `${protocol}//${hostname.replace("-3001.", "-4000.")}/api`;
    if (hostname.includes("-3000.app.github.dev")) return `${protocol}//${hostname.replace("-3000.", "-4000.")}/api`;
  }

  return "http://localhost:4000/api";
}

export const API_URL = getAdminApiUrl();

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
  const response = await fetch(`${getAdminApiUrl()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      ...(init.headers || {})
    }
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok || !json.success) throw new Error(json.message || "Request failed. Check backend API on port 4000.");
  return json.data as T;
}
