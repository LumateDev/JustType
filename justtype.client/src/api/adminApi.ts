import { apiClient } from "./axios";
//import type { UserPausesDto, UserWorkStatsDto } from "@/interfaces";

// export async function fetchUserWorkStats(date: string): Promise<UserWorkStatsDto[]> {
//   const res = await apiClient.get<UserWorkStatsDto[]>("/admin/work-stats", { params: { date } });
//   return res.data;
// }

// export async function fetchUserPauses(
//   date: string,
//   minIntervalSeconds = 300
// ): Promise<UserPausesDto[]> {
//   const res = await apiClient.get<UserPausesDto[]>("/admin/pauses", {
//     params: { date, minIntervalSeconds },
//   });
//   return res.data;
// }

import type { AdminUserResponse } from "@/interfaces";

export async function fetchUsers(): Promise<AdminUserResponse[]> {
  const res = await apiClient.get<AdminUserResponse[]>("/admin/users");
  return res.data;
}

// Регистрация пользователя админом (если снимешь LocalhostOnly на бэке и повесишь [Authorize(Roles="Admin")])
export async function registerUserByAdmin(login: string, password: string): Promise<void> {
  const res = await apiClient.post("/admin/register", { login, password });
  return res.data;
}
