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
            followersByMonth: {}
        }
    },
    mounted() {
        this.getFollowersList()
    },
    methods: {
        async getFollowersList() {
            const clientId = 'zm54nveq50rk5wufd41dzo9hdm7pcr'
            const access_token = 's8baefnst2cg63vj7yfyc2v5ggy7kt'
            let followers = []
            let cursor = ''

            do {
                const response = await fetch(
                    `https://api.twitch.tv/helix/channels/followers?broadcaster_id=144395906&first=100&after=${cursor}`,
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
