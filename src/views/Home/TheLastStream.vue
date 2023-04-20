<template>
    <div class="last-stream">
        <h2>Dernier live</h2>
        <div class="stream-info">
            <img :src="thumbnailUrl" alt="Thumbnail de mon dernier live" />
            <div class="stream-details">
                <h3>{{ title }}</h3>
                <p>{{ gameName }}</p>
                <p>{{ formatDate(startedAt) }}</p>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'

export default {
    name: 'TheLastStream',
    data() {
        return {
            streamData: {}
        }
    },
    mounted() {
        this.getLastStream()
    },
    methods: {
        async getLastStream() {
            const clientId = 'ghcpdfskl6dqnkfqijx3vjht02zqgo'
            const userId = '144395906'

            try {
                const response = await axios.get(
                    `https://api.twitch.tv/helix/streams?user_id=${userId}`,
                    {
                        headers: {
                            'Client-ID': clientId
                        }
                    }
                )

                if (response.data.data.length > 0) {
                    this.streamData = response.data.data[0]
                }
            } catch (error) {
                console.log(error)
            }
        },
        formatDate(date) {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }
            return new Date(date).toLocaleDateString('fr-FR', options)
        }
    }
}
</script>

<style scoped>
.last-stream {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #1d1d1d;
    color: #fff;
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.stream-title {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.stream-description {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
}

.stream-thumbnail {
    width: 100%;
    max-width: 800px;
    border-radius: 10px;
    margin-bottom: 1rem;
}

.stream-link {
    font-size: 1.5rem;
    color: #fff;
    text-decoration: underline;
    margin-top: 1rem;
}
</style>
