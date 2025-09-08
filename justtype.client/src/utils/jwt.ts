import type { JwtPayload } from "@/interfaces";

export function parseJwt<T extends Record<string, unknown> = JwtPayload>(token: string): T | null {
  try {
    const payloadBase64Url = token.split(".")[1];
    if (!payloadBase64Url) return null;

    const base64 = payloadBase64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload) as T;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = parseJwt(token);
  if (!payload?.exp) return true;

  const expirationTime = payload.exp * 1000;
  return Date.now() >= expirationTime;
}
