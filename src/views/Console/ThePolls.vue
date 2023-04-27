<template>
    <div class="polls">
        <!-- S'affiche uniquement si il y as un sondage en cour     -->
        <h2 class="title" v-if="activePolls.length > 0">Sondage actuel :</h2>
        <ul>
            <li v-for="poll in activePolls" :key="poll.id" class="poll-item">
                <h3 class="poll-title">{{ poll.title }}</h3>
                <div class="poll-details">
                    <li class="poll-choice" v-for="(choice, index) in poll.choices" :key="index">
                        {{ choice.title }} | {{ choice.votes }}
                    </li>
                    <!--  <p>Temps restant : {{ formatTimeRemaining(poll) }}</p>-->
                </div>
                <button class="end-poll-button" @click="endPoll(poll.id)">
                    Terminer le sondage
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'

const clientId = 'ghcpdfskl6dqnkfqijx3vjht02zqgo'
const userId = '144395906'
const access_token = '9jfu059cnliwdj23a1sp6kvjmg1byv'
export default {
    name: 'ThePolls',
    data() {
        return {
            polls: []
        }
    },
    mounted() {
        this.getPolls()
        setInterval(this.getPolls, 1000)
    },
    computed: {
        activePolls() {
            return this.polls.filter((poll) => poll.status === 'ACTIVE')
        }
    },
    methods: {
        // Méthode pour récupérer les sondages en cours
        async getPolls() {
            try {
                const response = await axios.get(
                    `https://api.twitch.tv/helix/polls?broadcaster_id=${userId}`,
                    {
                        headers: {
                            'Client-ID': clientId,
                            Authorization: 'Bearer ' + access_token
                        }
                    }
                )
                this.polls = response.data.data
            } catch (error) {
                console.log(error)
            }
        },
        // Méthode pour stoper le sondage en cours
        async endPoll(pollId) {
            const clientId = 'ghcpdfskl6dqnkfqijx3vjht02zqgo'
            const accessToken = '9jfu059cnliwdj23a1sp6kvjmg1byv'

            try {
                const response = await axios.patch(
                    `https://api.twitch.tv/helix/polls?id=${pollId}&broadcaster_id=${userId}`,
                    {
                        status: 'TERMINATED'
                    },
                    {
                        headers: {
                            'Client-ID': clientId,
                            Authorization: 'Bearer ' + accessToken,
                            'Content-Type': 'application/json'
                        }
                    }
                )

                console.log(response.data)
            } catch (error) {
                console.error(error)
            }
        },
        formatDate(date) {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
            return new Date(date).toLocaleDateString('fr-FR', options)
        }
        // formatTimeRemaining(poll) {
        //     const duration = poll.duration
        //     const startedAt = new Date(poll.started_at)
        //     const now = new Date()
        //     const timeRemainingInSeconds = (duration - (now - startedAt) / 1000).toFixed(0)
        //     // const minutes = Math.floor(timeRemainingInSeconds / 60);
        //     const seconds = timeRemainingInSeconds % 60
        //     return `${seconds}s`
        // }
    }
}
</script>

<style scoped>
h1 {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1.5rem;
}

ul {
    list-style: none;
    padding: 0;
}

.poll-item {
    background-color: #2c2c2c;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 1.5rem;
    padding: 1.5rem;
}

.poll-item h2 {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.poll-item p {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

.poll-item ul {
    list-style: none;
    padding: 0;
    margin-bottom: 1rem;
}

.poll-item ul li {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

.poll-item button {
    background-color: hsla(160, 100%, 37%, 1);
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s ease-in-out;
}

.poll-item button:hover {
    background-color: #8c64d2;
}

@media screen and (max-width: 768px) {
    h1 {
        font-size: 2rem;
    }

    .poll-item h2 {
        font-size: 1.5rem;
    }

    .poll-item p,
    .poll-item ul li {
        font-size: 1rem;
    }

    .poll-item button {
        font-size: 1rem;
        padding: 0.5rem;
    }
}
</style>
