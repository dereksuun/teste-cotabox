import { gql } from '@apollo/client/core';

export const GET_DATA = gql`
  query GetData {
    data {
      label
      value
    }
  }
`;
