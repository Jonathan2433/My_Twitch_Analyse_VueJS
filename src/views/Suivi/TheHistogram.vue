<template>
    <div>
        <canvas ref="chart"></canvas>
    </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
    name: "TheHistogramChart",
    mounted() {
        this.createChart();
    },
    methods: {
        createChart() {
            const ctx = this.$refs.chart.getContext("2d");
            const myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"],
                    datasets: [
                        {
                            label: "Nombre de followers",
                            data: [12, 19, 3, 5, 2, 3],
                            fill: false,
                            borderColor: "rgb(75, 192, 192)",
                            tension: 0.1,
                        },
                    ],
                },
            });
        },
    },
};
</script>
