<template>
    <!-- Simplesmente um div com id "pieChart" -->
    <div id="pieChart" style="width: 400px; height: 400px;"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  import { onMounted } from 'vue';
  
  export default {
    name: 'PieChart',
    setup() {
      onMounted(() => {
        console.log('onMounted called');
        
        // Acessando diretamente o elemento DOM pelo ID
        const chartElement = document.getElementById('pieChart');
        if (chartElement) {
          console.log('Chart element found via getElementById');
          
          // Inicializando o ECharts
          const chart = echarts.init(chartElement);
          const options = {
            title: {
              text: 'Simple Pie Chart',
              left: 'center',
            },
            tooltip: {
              trigger: 'item',
            },
            legend: {
              orient: 'vertical',
              left: 'left',
            },
            series: [
              {
                name: 'Access Source',
                type: 'pie',
                radius: '50%',
                data: [
                  { value: 1048, name: 'Search Engine' },
                  { value: 735, name: 'Direct' },
                  { value: 580, name: 'Email' },
                  { value: 484, name: 'Union Ads' },
                  { value: 300, name: 'Video Ads' }
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                  },
                },
              },
            ],
          };
          chart.setOption(options);
        } else {
          console.error('Chart element not found via getElementById');
        }
      });
    },
  };
  </script>
  
  <style scoped>
  #pieChart {
    width: 400px;
    height: 400px;
  }
  </style>
  