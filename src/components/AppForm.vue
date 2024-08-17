<template>
  <div v-if="!loading && !error">
    <div v-if="dataLoaded">
      <div ref="pieChart" style="width: 400px; height: 400px;"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { useQuery, useSubscription } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';
import { ref, watch, onMounted } from 'vue';

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

const PARTICIPATION_ADDED = gql`
  subscription {
    participationAdded {
      id
      firstName
      lastName
      participation
    }
  }
`;

export default {
  name: 'AppForm',
  setup() {
    const pieChartRef = ref(null);
    const chart = ref(null);
    const { result, loading, error } = useQuery(GET_PARTICIPATIONS);
    const { result: newParticipation } = useSubscription(PARTICIPATION_ADDED);
    const dataLoaded = ref(false);
    const chartData = ref({
      labels: [],
      values: [],
    });

    const updateChartData = (data) => {
      chartData.value.labels = data.map((item) => `${item.firstName} ${item.lastName}`);
      chartData.value.values = data.map((item) => item.participation);
    };

    watch(result, (newResult) => {
      if (newResult && newResult.participations) {
        updateChartData(newResult.participations);
        dataLoaded.value = true;
        renderChart();
      }
    });

    watch(newParticipation, (newData) => {
      if (newData && newData.participationAdded) {
        chartData.value.labels.push(`${newData.participationAdded.firstName} ${newData.participationAdded.lastName}`);
        chartData.value.values.push(newData.participationAdded.participation);
        renderChart();
      }
    });

    const renderChart = () => {
      if (!pieChartRef.value) {
        console.error('pieChartRef is not defined');
        return;
      }

      if (!chart.value) {
        console.log('Initializing ECharts');
        chart.value = echarts.init(pieChartRef.value);
      }

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
            data: chartData.value.labels.map((label, index) => ({
              name: label,
              value: chartData.value.values[index],
            })),
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

      console.log('Setting chart options');
      chart.value.setOption(options);
    };

    onMounted(() => {
      if (pieChartRef.value) {
        console.log('Component mounted, rendering chart');
        renderChart();
      } else {
        console.error('pieChartRef is not defined on mount');
      }
    });

    return {
      pieChartRef,
      loading,
      error,
      dataLoaded,
    };
  },
};
</script>

<style scoped>
#pieChart {
  width: 100%;
  height: 400px;
}
</style>
