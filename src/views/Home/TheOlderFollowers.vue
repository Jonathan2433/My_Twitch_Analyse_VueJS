<template>
    <div>
        <h2>Mes 5 plus anciens followers :</h2>
        <div class="oldest">
            <div class="followers-container">
                <UserCard v-for="(follower, index) in followerData" :key="index"
                          :profile-image-url="follower.profile_image_url"
                          :display-name="follower.display_name"
                          :followed-at="oldestFollowers[index].followed_at"
                          bgColor="rebeccapurple"
                />
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import UserCard from "@/components/UserCard.vue";

export default {
    name: 'TheOlderFollowers',
    components: {UserCard},
    data() {
        return {
            followerData: [],
            oldestFollowers : []
        }
    },
    mounted() {
        this.getFollowers()
    },
    methods: {
        async getFollowers() {
            const clientId = 'ghcpdfskl6dqnkfqijx3vjht02zqgo'
            const userId = '144395906'
            const access_token = '0wz7r1zmzohfaizos335a2gnb7e83p'

            try {
                let oldestFollowers = []

                let response = await axios.get(`https://api.twitch.tv/helix/users/follows?to_id=${userId}&first=100`, {
                    headers: {
                        'Client-ID': clientId,
                        Authorization: 'Bearer ' + access_token
                    }
                })

                oldestFollowers.push(...response.data.data)

                while (response.data.pagination.cursor) {
                    response = await axios.get(`https://api.twitch.tv/helix/users/follows?to_id=${userId}&first=100&after=${response.data.pagination.cursor}`, {
                        headers: {
                            'Client-ID': clientId,
                            Authorization: 'Bearer ' + access_token
                        }
                    })

                    oldestFollowers.push(...response.data.data)
                }

                oldestFollowers = oldestFollowers.sort((a, b) => a.followed_at.localeCompare(b.followed_at)).slice(0, 5)
                this.oldestFollowers = oldestFollowers
                for (let i = 0; i < oldestFollowers.length; i++) {
                    const follower = oldestFollowers[i].from_id
                    const followerResponse = await axios.get(`https://api.twitch.tv/helix/users?id=${follower}`, {
                        headers: {
                            'Client-ID': clientId,
                            Authorization: 'Bearer ' + access_token
                        }
                    })

                    this.followerData.push(followerResponse.data.data[0])
                }
            } catch (error) {
                console.log(error)
            }
        },
        formatDate(date) {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
            return new Date(date).toLocaleDateString('fr-FR', options)
        }
    }
}
</script>

<style scoped>
h2 {
    padding: 20px;
    color: white;
}

.oldest {
    background-color: #1d1d1d;
    color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.followers-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.follower {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
    color: #fff;
    background-color: rebeccapurple;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
}

.follower img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 0;
    margin-bottom: 1rem;
}

.follower p {
    margin-bottom: 0;
}

@media only screen and (min-width: 768px) {
    .follower {
        flex-direction: row;
        justify-content: center;
    }

    .follower img {
        margin-right: 1rem;
        margin-bottom: 0;
    }
}

@media only screen and (min-width: 1280px) {
    .followers-container {
        flex-direction: row;
        gap: 20px;
        justify-content: center;
    }

    .follower {
        flex-direction: row;
        justify-content: center;
        width: auto;
    }

    .follower img {
        margin-right: 1rem;
        margin-bottom: 0;
    }
}
</style>
