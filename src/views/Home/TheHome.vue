<template>
    <div class="home">
        <TheResume />
        <TheOlderFollowers />
    </div>
</template>

<script>
import TheResume from '@/views/Home/TheResume.vue'
import TheOlderFollowers from '@/views/Home/TheOlderFollowers.vue'

export default {
    name: 'TheHome',
    components: {
        TheResume,
        TheOlderFollowers
    }
}
</script>

<style>
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
