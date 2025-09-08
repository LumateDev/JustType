import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Корневое перенаправление
    {
      path: "/",
      redirect: () => {
        const userStore = useUserStore();
        return userStore.isAuthenticated ? "/home" : "/auth";
      },
    },

    // Guest-only маршруты
    {
      path: "/auth",
      name: "auth",
      component: () => import("@/views/Auth/AuthView.vue"),
      meta: {
        requiresGuest: true,
        hideHeader: true,
        hideFooter: true,
      },
    },

    // Auth-only маршруты
    {
      path: "/home",
      name: "home",
      component: () => import("@/pages/HomePage.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/pages/AboutPage.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/lessons",
      name: "lessons",
      component: () => import("@/pages/LessonsPage.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      component: () => import("@/pages/LeaderboardPage.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("@/pages/SettingsPage.vue"),
      meta: { requiresAuth: true },
    },

    // WIP страницы
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/pages/WipPage.vue"),
      meta: { requiresAuth: true, requiresAdmin: true },
    },

    // 404
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/pages/NotFoundPage.vue"),
      meta: { hideHeader: false, hideFooter: false },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresGuest && userStore.isAuthenticated) {
    return next("/home");
  }

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return next("/auth");
  }

  if (to.meta.requiresAdmin && !userStore.isAdmin) {
    return next("/home");
  }

  next();
});

export default router;
