import { defineStore } from "pinia";
import { parseJwt } from "@/utils/jwt";
import type { UserState } from "@/interfaces";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    token: localStorage.getItem("accessToken"),
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    userId: localStorage.getItem("userId"),
    isAdmin: localStorage.getItem("isAdmin") === "true",
  }),

  actions: {
    login(token: string, username: string, email: string, userId: string) {
      try {
        const payload = parseJwt(token);
        const userIdFromToken = payload?.nameid;
        const usernameFromToken = payload?.unique_name;
        const emailFromToken = payload?.email;
        const roleFromToken = payload?.role;

        this.token = token;
        this.username = usernameFromToken || username;
        this.email = emailFromToken || email;
        this.userId = userIdFromToken || userId;
        this.isAdmin = roleFromToken === "Admin";

        localStorage.setItem("accessToken", token);
        localStorage.setItem("username", this.username);
        localStorage.setItem("email", this.email);
        localStorage.setItem("userId", this.userId || "");
        localStorage.setItem("isAdmin", String(this.isAdmin));
        localStorage.setItem("loginTimestamp", Date.now().toString());
      } catch (error) {
        console.error("Error in login action:", error);
        this.logout();
        throw error;
      }
    },

    logout() {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          // TODO:
          // await revokeToken(refreshToken);
        } catch (error) {
          console.error("Error revoking token:", error);
        }
      }

      this.token = null;
      this.username = null;
      this.email = null;
      this.userId = null;
      this.isAdmin = false;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
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
          const userId = payload.nameid;
          const username = payload.unique_name;
          const email = payload.email;
          const role = payload.role;

          if (userId) {
            this.userId = userId;
            localStorage.setItem("userId", userId);
          }

          if (username) {
            this.username = username;
            localStorage.setItem("username", username);
          }

          if (email) {
            this.email = email;
            localStorage.setItem("email", email);
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
