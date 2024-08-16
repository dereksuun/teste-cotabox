<template>
  <div>
    <canvas ref="pieChart" width="300" height="300"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { participationsState } from '../store/share';

export default {
  name: 'AppChart',
  setup() {
    const chartRef = ref(null);
    const chart = ref(null);

    const chartData = ref({
      labels: [],
      datasets: [{
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
      }],
    });

    const loadChartJs = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => {
          console.log('Chart.js loaded');
          resolve();
        };
        script.onerror = (error) => {
          console.error('Failed to load Chart.js', error);
          reject(error);
        };
        document.head.appendChild(script);
      });
    };

    const renderChart = () => {
      const ctx = chartRef.value?.getContext('2d');
      if (!ctx) {
        console.error('Canvas element not found or context not available');
        return;
      }
      if (chart.value) {
        chart.value.destroy();
      }
      chart.value = new window.Chart(ctx, {
        type: 'pie',
        data: chartData.value,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Participations Chart',
            }
          }
        }
      });
    };

    watch(() => participationsState.participations, (newParticipations) => {
      console.log('Data updated', newParticipations);
      if (newParticipations) {
        chartData.value.labels = newParticipations.map(item => `${item.firstName} ${item.lastName}`);
        chartData.value.datasets[0].data = newParticipations.map(item => item.participation);
        console.log('Rendering chart with data', chartData.value);
        renderChart();
      }
    }, { immediate: true });

    onMounted(async () => {
      try {
        console.log('Starting to load Chart.js');
        await loadChartJs();
        console.log('Chart.js loaded, now rendering chart');
        renderChart();
      } catch (error) {
        console.error('Failed to load Chart.js', error);
      }
    });

    return {
      chartRef,
    };
  },
};
</script>

<style scoped>
canvas {
  width: 100%;
  height: 300px;
}
</style>
