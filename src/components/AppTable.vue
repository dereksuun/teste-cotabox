<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Participation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in participations" :key="index">
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
      const { result, loading, error } = useQuery(GET_PARTICIPATIONS);
  
      return {
        participations: result,
        loading,
        error
      };
    }
  }
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
  