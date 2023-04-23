<template>
    <div class="home">
        <ThePollCreater />
        <ThePolls />
        <TheLastPolls />
        <ThePredictionCreater />
    </div>
</template>

<script>
import ThePollCreater from '@/views/Console/ThePollCreater.vue'
import ThePolls from '@/views/Console/ThePolls.vue'
import TheLastPolls from '@/views/Console/TheLastPolls.vue'
import ThePredictionCreater from '@/views/Console/ThePredictionCreater.vue'

export default {
    name: 'Console',
    components: { ThePredictionCreater, TheLastPolls, ThePolls, ThePollCreater }
}
</script>

<style scoped>

</style>
