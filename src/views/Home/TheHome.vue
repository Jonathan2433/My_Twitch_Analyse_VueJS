<template>
    <div class="home">
        <TheResume />
        <TheLastStream />
    </div>
</template>

<script>
import TheResume from '@/views/Home/TheResume.vue'
import TheLastStream from '@/views/Home/TheLastStream.vue'

export default {
    name: 'TheHome',
    components: {
        TheResume,
        TheLastStream
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
