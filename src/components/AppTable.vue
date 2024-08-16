<template>
  <div>
    <h1>Dados da Tabela</h1>
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
        <tr v-for="entry in participationsState.participations" :key="entry.id">
          <td>{{ entry.firstName }}</td>
          <td>{{ entry.lastName }}</td>
          <td>{{ entry.participation }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useQuery, useSubscription } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';
import { participationsState } from '../store/share';
import { watch } from 'vue';
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
  name: 'AppTable',
  setup() {
    const { result, loading, error } = useQuery(GET_PARTICIPATIONS);
    const { result: newParticipation } = useSubscription(PARTICIPATION_ADDED);

    // Atualiza as participações no estado compartilhado quando novos dados são recebidos
    watch(result, (newResult) => {
      if (newResult && newResult.participations) {
        participationsState.participations = newResult.participations;
      }
    }, { immediate: true });

    watch(newParticipation, (newData) => {
      if (newData && newData.participationAdded) {
        participationsState.participations.push(newData.participationAdded);
      }
    });

    return {
      participationsState,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
table {
  width: 50%;
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
