<template>
    <div class="home">
        <ThePollCreater />
        <ThePolls />
        <TheLastPolls />
    </div>
</template>

<script>
import ThePollCreater from '@/views/Console/ThePollCreater.vue'
import ThePolls from '@/views/Console/ThePolls.vue'
import TheLastPolls from '@/views/Console/TheLastPolls.vue'

export default {
    name: 'Console',
    components: { TheLastPolls, ThePolls, ThePollCreater }
}
</script>

<style scoped>

</style>
