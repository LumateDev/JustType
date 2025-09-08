import { apiClient } from "./axios";
import type { LoginResponse, RegisterResponse } from "@/interfaces";

export async function login(login: string, password: string): Promise<LoginResponse> {
  const res = await apiClient.post<LoginResponse>("/auth/login", { login, password });
  return res.data;
}

export async function register(login: string, password: string): Promise<RegisterResponse> {
  const res = await apiClient.post<RegisterResponse>("/auth/register", { login, password });
  return res.data;
}

export async function refreshToken(refreshToken: string): Promise<LoginResponse> {
  const res = await apiClient.post<LoginResponse>("/auth/refresh", { refreshToken });
  return res.data;
}

export async function revokeToken(refreshToken: string): Promise<void> {
  await apiClient.post("/auth/revoke", { refreshToken });
}

export async function getProfile(): Promise<any> {
  const res = await apiClient.get("/auth/profile");
  return res.data;
}
