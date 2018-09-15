import gql from 'graphql-tag';

// Query to fetch all the receipts
const FETCH_RECEIPTS = gql`
  {
    allReceipts {
      edges {
        node {
          timestamp
          id
        }
      }
    }
  }
`;

// Export all the queries and mutations
export {
  FETCH_RECEIPTS
}
