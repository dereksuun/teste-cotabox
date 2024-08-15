import { gql } from '@apollo/client/core';

export const GET_PARTICIPATIONS = gql`
  query GetParticipations {
    participations {
      id
      firstName
      lastName
      participation
    }
  }
`;
