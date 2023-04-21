<template>
    <div>
        <h1>Suivi</h1>
        <TheHistogramChart />
    </div>
</template>

<script>
import TheHistogramChart from "@/components/TheHistogramChart.vue";

export default {
    name: "Suivi",
    components: {
        TheHistogramChart,
    },
};
</script>
