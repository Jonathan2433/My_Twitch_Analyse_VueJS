<template>
    <div>
        <h1>Suivi</h1>
        <TheHistogramChart />
    </div>
</template>

<script>
import TheHistogramChart from './TheHistogram.vue'

export default {
    name: 'Suivi',
    components: {
        TheHistogramChart
    }
}
</script>
