import { createRouter, createWebHistory } from 'vue-router'
import { UserStore } from '@/stores/UserStore'

/* ------------------------------------------------------------------
 *  LAZY-LOADED PAGE COMPONENTS
 * ------------------------------------------------------------------ */
import { defineAsyncComponent } from 'vue'

const HomePage        = defineAsyncComponent(() => import('@/pages/HomePage.vue'))
const AuthPage        = defineAsyncComponent(() => import('@/pages/AuthPage.vue'))
const NotFoundPage    = defineAsyncComponent(() => import('@/pages/NotFoundPage.vue'))
const SettingsPage    = defineAsyncComponent(() => import('@/pages/SettingsPage.vue'))
const AboutPage       = defineAsyncComponent(() => import('@/pages/AboutPage.vue'))
const LessonsPage     = defineAsyncComponent(() => import('@/pages/LessonsPage.vue'))
const LeaderboardPage = defineAsyncComponent(() => import('@/pages/LeaderboardPage.vue'))

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /* ----------------------------------------------------------
     *  ROOT REDIRECT
     * ---------------------------------------------------------- */
    {
      path: '/',
      redirect: () => {
        const userStore = UserStore()
        return userStore.isAuthenticated ? '/home' : '/auth'
      },
    },

    /* ----------------------------------------------------------
     *  AUTH ROUTE (guest only)
     * ---------------------------------------------------------- */
    {
      path: '/auth',
      name: 'auth',
      component: AuthPage,
      meta: { requiresGuest: true },
    },

    /* ----------------------------------------------------------
     *  AUTH-ONLY ROUTES
     * ---------------------------------------------------------- */
    {
      path: '/home',
      name: 'home',
      component: HomePage,
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/lessons',
      name: 'lessons',
      component: LessonsPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: LeaderboardPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsPage,
      meta: { requiresAuth: true },
    },

    /* ----------------------------------------------------------
     *  404 CATCH-ALL
     * ---------------------------------------------------------- */
   {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
  },
  ],
})

/* ------------------------------------------------------------------
 *  GLOBAL GUARDS
 * ------------------------------------------------------------------ */
router.beforeEach((to, _from, next) => {
  const userStore = UserStore()

  // 1. Authenticated users cannot visit /auth
  if (to.name === 'auth' && userStore.isAuthenticated) {
    return next('/home')
  }

  // 2. Anonymous users are bounced to /auth
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return next('/auth')
  }

  // 3. Authenticated users trying to reach a guest-only route
  if (to.meta.requiresGuest && userStore.isAuthenticated) {
    return next('/home')
  }

  next()
})

export default router
