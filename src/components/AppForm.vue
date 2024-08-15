<template>
  <div v-if="dataLoaded">
    <canvas ref="pieChart" width="400" height="400"></canvas>
  </div>
</template>

<script>
import { Chart } from 'chart.js';
import { useQuery } from '@vue/apollo-composable';
import { GET_PARTICIPATIONS } from '../queries';
import { ref, watch, onMounted } from 'vue';

export default {
  setup() {
    const chartRef = ref(null);
    const chart = ref(null);
    const { result, loading, error } = useQuery(GET_PARTICIPATIONS);
    const dataLoaded = ref(false);

    const chartData = {
      labels: [],
      datasets: [
        {
          label: 'Participations',
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const renderChart = (data) => {
      if (chart.value) {
        chart.value.destroy();
      }
      const ctx = chartRef.value?.getContext('2d');
      if (!ctx) {
        console.error('Não foi possível obter o contexto 2D do canvas.');
        return;
      }
      chart.value = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Participations Chart',
            },
          },
        },
      });
    };

    watch(result, (newData) => {
      if (newData) {
        console.log(newData); // Verifique os dados recebidos
        chartData.labels = newData.participations.map(item => `${item.firstName} ${item.lastName}`);
        chartData.datasets[0].data = newData.participations.map(item => item.participation);
        dataLoaded.value = true;
        renderChart(chartData);
      }
    });

    onMounted(() => {
      if (dataLoaded.value) {
        renderChart(chartData);
      }
    });

    return {
      chartRef,
      chart,
      loading,
      error,
      dataLoaded,
    };
  },
};
</script>

<style scoped>
canvas {
  width: 100%;
  height: 200px;
}
</style>
