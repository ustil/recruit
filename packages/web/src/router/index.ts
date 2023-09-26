import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/review',
      component: () => import('../views/ReviewView.vue'),
    },
    {
      path: '/query',
      component: () => import('../views/QueryView.vue'),
    },
  ],
})

export default router
