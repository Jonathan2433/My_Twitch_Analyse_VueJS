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

const clientId = 'ghcpdfskl6dqnkfqijx3vjht02zqgo'
const userId = '144395906'
const access_token = '0wz7r1zmzohfaizos335a2gnb7e83p'

export default {
    name: 'TheLastStream',
    data() {
        return {
            thumbnailUrl: '', // URL de la miniature du dernier flux
            title: '', // Titre du dernier flux
            gameName: '', // Nom du jeu du dernier flux
            language: '', // Langue du dernier flux
            startedAt: '', // Date et heure de début du dernier flux
            userName: '' // Nom d'utilisateur du diffuseur du dernier flux
        }
    },
    mounted() {
        this.getLastStreamInfo()
    },
    methods: {
        // Méthode pour récupérer les informations du dernier flux
        async getLastStreamInfo() {
            const response = await axios.get(
                // Appel d'API
                `https://api.twitch.tv/helix/channels?broadcaster_id=${userId}`,
                {
                    headers: {
                        'Client-ID': clientId,
                        Authorization: 'Bearer ' + access_token
                    }
                }
            )
            const streamInfo = response.data.data[0] // Récupération des informations de la chaîne
            this.title = streamInfo.title // Stockage du titre du dernier flux
            this.gameName = streamInfo.game_name // Stockage du nom du jeu du dernier flux
            this.language = streamInfo.language // Stockage de la langue du dernier flux
            this.userName = streamInfo.broadcaster_name // Stockage du nom d'utilisateur du diffuseur du dernier flux
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
            return new Date(date).toLocaleDateString('fr-FR', options) // Formatage de la date en utilisant les options spécifiées
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
