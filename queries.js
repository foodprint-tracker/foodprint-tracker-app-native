import gql from 'graphql-tag';

// Query to fetch all the receipts
const FETCH_RECEIPTS = gql`
query fetch_receipts{
  allReceipts(first:20) {
    edges {
      node {
        timestamp
        id
        shop
        currency
        itemSet {
          edges {
            node {
              displayName
              kg
              id
              price
              itemingredientSet {
                edges {
                  node {
                    co2Fp
                    energyFp
                    waterFp
                    concentration
                    displayName
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

// Export all the queries and mutations
export {
  FETCH_RECEIPTS
}
