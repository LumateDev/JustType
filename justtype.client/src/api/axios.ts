import axios from "axios";
import { useUserStore } from "@/stores/userStore";
import router from "@/router";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: false,
  timeout: 15000,
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Проверяем, что это не запрос на логин/регистрацию
    const isAuthEndpoint =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register");

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        const response = await apiClient.post("/auth/refresh", {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        const userStore = useUserStore();
        userStore.updateToken(accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        const userStore = useUserStore();
        userStore.logout();

        // Используем Vue Router вместо window.location
        await router.push("/auth");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
