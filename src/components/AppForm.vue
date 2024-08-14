<template>
    <div>
      <canvas ref="pieChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart } from 'chart.js';
  import { useQuery } from '@vue/apollo-composable';
  import { GET_DATA } from '../queries';
  import { ref, watch } from 'vue';
  
  export default {
    setup() {
      const chartRef = ref(null);
      const chart = ref(null);
      const { result, loading, error } = useQuery(GET_DATA);
      const chartData = {
        labels: [],
        datasets: [
          {
            label: 'My Dataset',
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
        console.log(chartRef.value);
        chart.value = new Chart(chartRef.value, {
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
                text: 'Custom Chart Title',
              },
            },
          },
        });
      };
  
      watch(result, (newData) => {
        if (newData) {
          console.log(newData);
          chartData.labels = newData.data.map(item => item.label);
          chartData.datasets[0].data = newData.data.map(item => item.value);
          renderChart(chartData);
        }
      });
  
      return {
        chartRef,
        chart,
        loading,
        error,
      };
    },
  };
  </script>
  
  <style scoped>
canvas {
  width: 100%;
  height: 400px;
}
</style>