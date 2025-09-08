import { defineStore } from "pinia";
import { parseJwt } from "@/utils/jwt";
import type { UserState } from "@/interfaces";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    token: localStorage.getItem("accessToken"),
    username: localStorage.getItem("username"),
    userId: localStorage.getItem("userId"),
    isAdmin: localStorage.getItem("isAdmin") === "true",
  }),

  actions: {
    login(token: string, username: string, userId: string) {
      try {
        const payload = parseJwt(token);
        const role = payload?.role;
        const userIdFromToken = payload?.nameid || payload?.sub;

        this.token = token;
        this.username = username;
        this.userId = userIdFromToken || userId;
        this.isAdmin = role === "Admin";

        localStorage.setItem("accessToken", token);
        localStorage.setItem("username", username);
        localStorage.setItem("userId", this.userId || "");
        localStorage.setItem("isAdmin", String(this.isAdmin));
        localStorage.setItem("loginTimestamp", Date.now().toString());

        // Проверяем, есть ли refreshToken (должен быть сохранен в компоненте)
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          console.warn("Refresh token not found during login");
        }
      } catch (error) {
        console.error("Error in login action:", error);
        this.logout();
        throw error;
      }
    },

    logout() {
      // Перед выходом пытаемся отозвать refreshToken
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        // Можно вызвать API для отзыва токена, но не блокируем выход
        try {
          // await revokeToken(refreshToken); // Раскомментировать, когда будет готово
        } catch (error) {
          console.error("Error revoking token:", error);
        }
      }

      this.token = null;
      this.username = null;
      this.userId = null;
      this.isAdmin = false;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("loginTimestamp");
      localStorage.removeItem("refreshToken");
    },

    updateToken(newToken: string) {
      try {
        this.token = newToken;
        localStorage.setItem("accessToken", newToken);

        const payload = parseJwt(newToken);
        if (payload) {
          const role = payload.role;
          const userId = payload.nameid || payload.sub;

          if (userId) {
            this.userId = userId;
            localStorage.setItem("userId", userId);
          }

          if (role) {
            this.isAdmin = role === "Admin";
            localStorage.setItem("isAdmin", String(this.isAdmin));
          }
        }
      } catch (error) {
        console.error("Error updating token:", error);
        this.logout();
      }
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    hasRefreshToken: () => !!localStorage.getItem("refreshToken"),
  },
});
