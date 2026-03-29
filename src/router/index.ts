import { createRouter, createWebHistory } from 'vue-router'
import DayView from '@/views/DayView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'today',
      component: DayView,
    },
    {
      path: '/day/:index',
      name: 'day',
      component: DayView,
      props: true,
    },
    {
      path: '/week/:weekIndex',
      name: 'week',
      component: () => import('@/views/WeekView.vue'),
    },
    {
      path: '/plan',
      name: 'plan',
      component: () => import('@/views/PlanView.vue'),
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('@/views/StatsView.vue'),
    },
  ],
})

export default router
