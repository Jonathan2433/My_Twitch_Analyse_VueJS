<template>
    <div id="app">
        <header>
            <router-link to="/">
                <img
                    alt="Logo"
                    class="logo"
                    src="https://static-cdn.jtvnw.net/jtv_user_pictures/e2b8cb22-d43f-4de9-add0-12a7d86f021c-profile_image-70x70.png"
                />
            </router-link>
            <nav>
                <router-link to="/">Accueil</router-link>
                <router-link to="/suivi">Suivi</router-link>
                <router-link to="/top-games">Top Games</router-link>
                <router-link to="/console">Console</router-link>
            </nav>
        </header>
        <main>
            <router-view />
        </main>
    </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
    name: 'App',
    components: {
        RouterLink,
        RouterView
    }
}
</script>

<style>
#app {
    text-align: center;
}

nav {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    font-size: 1.5rem;
}

@media screen and (min-width: 870px) {
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
    }

    .logo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-image: url('https://static-cdn.jtvnw.net/jtv_user_pictures/0f6e78c3-39a6-4eb8-9b14-9a9f4a1c4e4d-profile_image-300x300.png');
        background-size: cover;
        background-position: center;
    }

    nav {
        margin: 0;
    }

    nav a {
        margin-left: 2rem;
        font-size: 1.5rem;
    }

    main {
        padding: 4rem;
    }
}
</style>
