<template>
    <div class="follower" :style="{ backgroundColor: bgColor }">
        <img :src="profileImageUrl" :alt="`Avatar de ${displayName}`" />
        <div class="follower-text">
            <h3>{{ displayName }}</h3>
            <p>depuis le {{ formatDate(followedAt) }}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'UserCard',
    props: {
        profileImageUrl: String,
        displayName: String,
        followedAt: String,
        bgColor: {
            type: String,
            default: 'rebeccapurple'
        }
    },
    methods: {
        formatDate(date) {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
            return new Date(date).toLocaleDateString('fr-FR', options)
        }
    }
}
</script>
<style scoped>
.follower {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
    color: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
}

.follower img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 1rem;
}

.follower p {
    font-size: 1.5rem;
    margin-bottom: 0;
}
</style>