import { apiClient } from "./axios";
import type { LoginResponse, RegisterResponse, ProfileResponse } from "@/interfaces";

export async function loginByUsername(username: string, password: string): Promise<LoginResponse> {
  const res = await apiClient.post<LoginResponse>("/auth/login/username", {
    username,
    password,
  });
  return res.data;
}

export async function loginByEmail(email: string, password: string): Promise<LoginResponse> {
  const res = await apiClient.post<LoginResponse>("/auth/login/email", {
    email,
    password,
  });
  return res.data;
}

export async function register(
  username: string,
  email: string,
  password: string
): Promise<RegisterResponse> {
  const res = await apiClient.post<RegisterResponse>("/auth/register", {
    username,
    email,
    password,
  });
  return res.data;
}

export async function refreshToken(refreshToken: string): Promise<LoginResponse> {
  const res = await apiClient.post<LoginResponse>("/auth/refresh", { refreshToken });
  return res.data;
}

export async function revokeToken(refreshToken: string): Promise<void> {
  await apiClient.post("/auth/revoke", { refreshToken });
}

export async function getProfile(): Promise<ProfileResponse> {
  const res = await apiClient.get<ProfileResponse>("/auth/profile");
  return res.data;
}
