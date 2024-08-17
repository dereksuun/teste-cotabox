<template>
  <!-- Simplesmente um div com id "pieChart" -->
  <div id="pieChart" style="width: 1000px; height: 1000px;"></div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

// Query GraphQL para buscar os dados
const GET_PARTICIPATIONS = gql`
  query GetParticipations {
    participations {
      id
      firstName
      lastName
      participation
    }
  }
`;

export default {
  name: 'PieChart',
  setup() {
    // Fazendo a consulta ao banco de dados usando Apollo Client
    const { result } = useQuery(GET_PARTICIPATIONS);

    // Garantindo que o gráfico seja renderizado após o componente ser montado
    onMounted(() => {
      console.log('onMounted called');
      
      // Executando a renderização do gráfico assim que os dados forem carregados
      watch(
        () => result.value,
        (newResult) => {
          if (newResult && newResult.participations) {
            renderChart(newResult.participations);
          }
        },
        { immediate: true }
      );
    });

    // Função para renderizar o gráfico com os dados
    const renderChart = (data) => {
      const chartElement = document.getElementById('pieChart');
      if (chartElement) {
        const chart = echarts.init(chartElement);

        // Mapeando os dados para o formato que o ECharts espera
        const chartData = data.map((item) => ({
          name: `${item.firstName} ${item.lastName}`,
          value: item.participation,
        }));

        const options = {
          title: {
            text: 'Participations Chart',
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
              name: 'Participation',
              type: 'pie',
              radius: '50%',
              center: ['50%', '40%'],
              data: chartData,
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
    };

    return {};
  },
};
</script>

<style scoped>
#pieChart {
  width: 400px;
  height: 400px;
}
</style>
