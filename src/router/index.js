import { createRouter, createWebHistory } from 'vue-router'
import TheHome from '@/views/Home/TheHome.vue'
import TheSuivi from '@/views/Suivi/TheSuivi.vue'
import TopGames from '@/views/Top_Games/TopGames.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: TheHome
        },
        {
            path: '/suivi',
            name: 'suivi',
            component: TheSuivi
        },
        {
            path: '/top-games',
            name: 'top-games',
            component: TopGames
        }
    ]
})

export default router
