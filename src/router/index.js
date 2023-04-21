import { createRouter, createWebHistory } from 'vue-router'
import TheHome from "@/views/Home/TheHome.vue";
import TheSuivi from "@/views/Suivi/TheSuivi.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TheHome
    },
    {
      path: '/Suivi',
      name: 'suivi',
      component: TheSuivi
    }
  ]
})

export default router
