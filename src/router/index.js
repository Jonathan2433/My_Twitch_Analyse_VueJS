import { createRouter, createWebHistory } from 'vue-router'
import TheHome from '@/views/Home/TheHome.vue'
import TheSuivi from '@/views/Suivi/TheSuivi.vue'
import TopGames from '@/views/Top_Games/TopGames.vue'
import Console from '@/views/Console/Console.vue'

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
            path: '/top-categorie',
            name: 'top-categorie',
            component: TopGames
        },
        {
            path: '/sondage',
            name: 'sondage',
            component: Console
        }
    ]
})

export default router
