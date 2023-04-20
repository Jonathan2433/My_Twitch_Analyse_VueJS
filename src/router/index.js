import { createRouter, createWebHistory } from 'vue-router'
import TheResume from '@/components/TheResume.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'resume',
      component: TheResume
    }
  ]
})

export default router
