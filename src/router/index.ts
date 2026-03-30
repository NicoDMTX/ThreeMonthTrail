import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { guest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { guest: true },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/DayView.vue'),
    },
    {
      path: '/plan',
      name: 'plan',
      component: () => import('../views/PlanView.vue'),
    },
    {
      path: '/week/:weekIndex',
      name: 'week',
      component: () => import('../views/WeekView.vue'),
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../views/StatsView.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  // Attendre que le token soit vérifié côté backend
  if (auth.isInitializing) {
    await auth.init()
  }

  if (!to.meta.guest && !auth.isAuthenticated) {
    return { name: 'login' }
  }

  if (to.meta.guest && auth.isAuthenticated) {
    return { name: 'home' }
  }
})

export default router
