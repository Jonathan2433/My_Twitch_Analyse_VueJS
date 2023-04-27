<template>
    <h2>Suivi du nombre de followers par mois</h2>
    <canvas ref="chart"></canvas>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
    name: 'TheHistogramChart',
    data() {
        return {
            followersByMonth: {} // Tableau associatif pour stocker le nombre de followers mensuel
        }
    },
    mounted() {
        this.getFollowersList()
    },
    methods: {
        // Méthode pour récupérer le nombre de followers mensuel
        async getFollowersList() {
            const userId = '144395906'
            const clientId = 'ghcpdfskl6dqnkfqijx3vjht02zqgo'
            const access_token = '0wz7r1zmzohfaizos335a2gnb7e83p'
            let followers = []
            let cursor = ''

            // Tant qu'il y a une page suivante, récupération des 100 prochains followers
            do {
                const response = await fetch(
                    `https://api.twitch.tv/helix/users/follows?to_id=${userId}&first=100&after=${cursor}`,
                    {
                        headers: {
                            'Client-ID': clientId,
                            Authorization: `Bearer ${access_token}`
                        }
                    }
                )
                const json = await response.json()
                followers = followers.concat(json.data)
                cursor = json.pagination.cursor
            } while (cursor)

            this.groupFollowersByMonth(followers)
            this.createChart()
        },
        // Méthode pour compter le nombre de followers par mois
        groupFollowersByMonth(followers) {
            followers.forEach((follower) => {
                const date = new Date(follower.followed_at)
                const month = `${date.toLocaleString('default', {
                    month: 'long'
                })} ${date.getFullYear()}`
                if (!this.followersByMonth[month]) {
                    this.followersByMonth[month] = 1
                } else {
                    this.followersByMonth[month]++
                }
            })
        },
        // Initialisation et Création de notre graphique Line
        createChart() {
            const ctx = this.$refs.chart.getContext('2d')
            const months = Object.keys(this.followersByMonth).reverse()
            const followersCount = Object.values(this.followersByMonth).reverse()
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: months,
                    datasets: [
                        {
                            label: 'Nombre de followers',
                            data: followersCount,
                            fill: false,
                            borderColor: 'hsla(160, 100%, 37%, 1)',
                            tension: 0.25
                        }
                    ]
                }
            })
        }
    }
}
</script>
