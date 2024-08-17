<template>
  <div>
    <h1>Participation data</h1>
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Participation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="3">Carregando...</td>
        </tr>
        <tr v-if="error">
          <td colspan="3">Erro ao carregar dados: {{ error.message }}</td>
        </tr>
        <tr v-for="entry in participations" :key="entry.id">
          <td>{{ entry.firstName }}</td>
          <td>{{ entry.lastName }}</td>
          <td>{{ entry.participation }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';
import { ref, watch } from 'vue';

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
  name: 'AppTable',
  setup() {
    const participations = ref([]);
    
    // Usando useQuery com pollInterval para verificar atualizações a cada 5 segundos
    const { result, loading, error, onResult } = useQuery(GET_PARTICIPATIONS, {
      pollInterval: 1000, // Verifica por atualizações a cada 5 segundos
      fetchPolicy: 'no-cache', // Garante que a consulta sempre pega dados do servidor
    });

    onResult(({ data }) => {
  console.log('onResult triggered:', data);
  if (data && data.participations) {
    participations.value = data.participations;
  }
});

    // Atualiza as participações com os dados do banco
    watch(result, (newResult) => {
      console.log('Polling result:', newResult); // Diagnóstico para verificar o polling
      if (newResult && newResult.participations) {
        participations.value = newResult.participations;
      }
    }, { immediate: true });

    return {
      participations,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>
