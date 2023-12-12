<template>
    <div class="last-stream">
        <h2>Dernier stream :</h2>
        <div class="stream-info">
            <div class="stream-details">
                <h3>{{ title }}</h3>
                <p>{{ gameName }} - {{ language }}</p>
                <a :href="`https://twitch.tv/${userName}`">{{ userName }}</a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

const clientId = 'zm54nveq50rk5wufd41dzo9hdm7pcr'
const userId = '144395906'
const access_token = '2sx6igh710ezldz41l24x8kw6eosna'

export default {
    name: 'TheLastStream',
    data() {
        return {
            thumbnailUrl: '',
            title: '',
            gameName: '',
            language: '',
            startedAt: '',
            userName: ''
        }
    },
    mounted() {
        this.getLastStreamInfo()
    },
    methods: {
        async getLastStreamInfo() {
            const response = await axios.get(
                `https://api.twitch.tv/helix/channels?broadcaster_id=${userId}`,
                {
                    headers: {
                        'Client-ID': clientId,
                        Authorization: 'Bearer ' + access_token
                    }
                }
            )
            const streamInfo = response.data.data[0]
            this.title = streamInfo.title
            this.gameName = streamInfo.game_name
            this.language = streamInfo.language
            this.userName = streamInfo.broadcaster_name
        },
        formatDate(date) {
            const options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            }
            return new Date(date).toLocaleDateString('fr-FR', options)
        }
    }
}
</script>

<style scoped>
.last-stream {
    background-color: #1d1d1d;
    color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stream-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
}

.stream-details {
    display: flex;
    flex-direction: column;
}

.stream-details h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.stream-details p {
    margin-bottom: 0.5rem;
}

.stream-details a {
    color: #fff;
}
</style>
