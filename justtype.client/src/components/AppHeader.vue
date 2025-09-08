<template>
  <header class="app-header">
    <div class="header-content">
      <div class="header-left">
        <router-link to="/home" class="logo-link">
          <h1 class="logo">AppName</h1>
        </router-link>
      </div>

      <nav class="header-nav" v-if="isAuthenticated">
        <router-link to="/home" class="nav-link">Home</router-link>
        <router-link to="/lessons" class="nav-link">Lessons</router-link>
        <router-link to="/leaderboard" class="nav-link">Leaderboard</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/settings" class="nav-link">Settings</router-link>
        <router-link v-if="isAdmin" to="/admin" class="nav-link">Admin</router-link>
      </nav>

      <div class="header-right">
        <ThemeToggle class="theme-toggle-header" />
        <UserDropdown
          v-if="isAuthenticated"
          :user-name="userName"
          :user-email="userEmail"
          @logout="handleLogout"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import ThemeToggle from "@/components/ThemeToggle.vue";
import UserDropdown from "@/components/UserDropdown.vue";

const router = useRouter();
const userStore = useUserStore();

const isAuthenticated = computed(() => userStore.isAuthenticated);
const isAdmin = computed(() => userStore.isAdmin);
const userName = computed(() => userStore.username || "User");
const userEmail = computed(() => `${userStore.username}@example.com`); // Обновить на релаьный емейл

const handleLogout = () => {
  userStore.logout();
  router.push("/auth");
};
</script>

<style scoped lang="scss">
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(10px);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo-link {
  text-decoration: none;
  color: inherit;
}

.logo {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0;
}

.header-nav {
  display: flex;
  gap: 32px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
}

.nav-link {
  text-decoration: none;
  color: var(--color-textMuted);
  font-weight: 500;
  font-size: 16px;
  padding: 8px 0;
  position: relative;
  transition: var(--transition-fast);

  &:hover {
    color: var(--color-text);
  }

  &.router-link-active {
    color: var(--color-primary);

    &::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--color-primary);
      border-radius: 2px;
    }
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.theme-toggle-header {
  @media (max-width: 480px) {
    display: none;
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 16px;
  }

  .logo {
    font-size: 20px;
  }
}
</style>
