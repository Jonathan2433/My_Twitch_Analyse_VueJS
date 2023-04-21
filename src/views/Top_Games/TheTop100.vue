<template>
    <div>
        <h2>Top 100 Twitch Streams</h2>
        <div class="top-games-container">
            <div class="game" v-for="(game, index) in topGames" :key="index">
                <div class="rank">{{ index + 1 }}</div>
                <div class="game-info">
                    <img
                        :src="game.box_art_url.replace('{width}x{height}', '300x400')"
                        :alt="game.name"
                        class="game-image"
                    />
                    <div class="game-name">{{ game.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

const clientId = 'ghcpdfskl6dqnkfqijx3vjht02zqgo'
const access_token = '0wz7r1zmzohfaizos335a2gnb7e83p'

export default {
    name: 'TheTop100',
    data() {
        return {
            topGames: []
        }
    },
    mounted() {
        this.getTopGames()
    },
    methods: {
        async getTopGames() {
            const response = await axios.get('https://api.twitch.tv/helix/games/top?first=100', {
                headers: {
                    'Client-ID': clientId,
                    Authorization: 'Bearer ' + access_token
                }
            })

            this.topGames = response.data.data
        }
    }
}
</script>

<style scoped>
.top-games-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.game {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    overflow: hidden;
    width: calc(33.33% - 20px);
}

.game .rank {
    align-items: center;
    background-color: hsla(160, 100%, 37%, 1);
    color: #fff;
    display: flex;
    flex-direction: column;
    font-size: 2rem;
    font-weight: bold;
    height: 100%;
    justify-content: center;
    padding: 20px;
    width: 60px;
}

.game .game-info {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.game .game-image {
    display: block;
    margin: 0 auto;
    max-height: 200px;
    height: 200px;
    width: 150px;
}

.game .game-name {
    color: hsla(160, 100%, 37%, 1);
    font-size: 1.5rem;
    font-weight: bold;
    margin: 10px 0;
}

.game .game-viewers {
    color: #000;
    font-size: 1rem;
    font-weight: bold;
}
</style>
