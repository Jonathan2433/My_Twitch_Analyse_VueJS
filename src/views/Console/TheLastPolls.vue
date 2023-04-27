<template>
    <h2>Les 6 derniers sondages :</h2>
    <div class="last-polls-container">
        <div v-for="(poll, index) in lastPolls" :key="poll.id" class="poll-card">
            <div class="poll-info">
                <h3>{{ poll.title }}</h3>
                <p class="poll-date">{{ formatDate(poll.started_at) }}</p>
            </div>
            <div class="poll-choices">
                <ul>
                    <li v-for="(choice, index) in poll.choices" :key="index">
                        {{ choice.title }} | {{ choice.votes }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

const clientId = 'ghcpdfskl6dqnkfqijx3vjht02zqgo';
const userId = '144395906';
const access_token = '9jfu059cnliwdj23a1sp6kvjmg1byv';

export default {
    name: 'TheLastPolls',
    data() {
        return {
            lastPolls: [],
        };
    },
    mounted() {
        this.getLastPolls();
        setInterval(() => {
            this.getLastPolls();
        }, 30000);
    },
    methods: {
        async getLastPolls() {
            try {
                const response = await axios.get(
                    `https://api.twitch.tv/helix/polls?broadcaster_id=${userId}&first=6`,
                    {
                        headers: {
                            'Client-ID': clientId,
                            Authorization: 'Bearer ' + access_token,
                        },
                    }
                );
                this.lastPolls = response.data.data;
                console.log(this.lastPolls)
            } catch (error) {
                console.log(error);
            }
        },
        formatDate(date) {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            return new Date(date).toLocaleDateString('fr-FR', options);
        },
    },
};
</script>
<style scoped>
.last-polls-container {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 20px;
}

.poll-card {
    grid-column: span 4;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    background-color: #6441a5;
    color: #fff;
}

@media only screen and (max-width: 768px) {
    .poll-card {
        grid-column: span 12;
    }
}

.poll-info {
    flex: 1;
}

.poll-info h3 {
    margin: 0;
    font-size: 1.5rem;
}

.poll-info .poll-date {
    margin: 0;
    font-size: 1rem;
}

.poll-choices {
    flex: 1;
}

.poll-choices ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.poll-choices li {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}
</style>