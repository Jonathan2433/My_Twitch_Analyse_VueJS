<template>
    <div class="home">
        <TheResume />
        <TheOlderFollowers />
        <TheLastStream />
    </div>
</template>

<script>
import TheResume from '@/views/Home/TheResume.vue'
import TheOlderFollowers from '@/views/Home/TheOlderFollowers.vue'
import TheLastStream from '@/views/Home/TheLastStream.vue'

export default {
    name: 'TheHome',
    components: {
        TheLastStream,
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
    gap: 20px;
}
</style>
