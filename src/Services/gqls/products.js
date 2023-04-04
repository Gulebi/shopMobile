import { gql } from '@apollo/client';
const productFragment = `
  fragment ProductFragment on Product {
    _id
    title
    title_url
    price
    picture
    date
    user_id
    price_one
    company{
      _id
    }
    wholesale_count
    status_retail
    status_wholesale
    category{
      title
      title_url
      _id
    }
  }
`

const getProducts = gql`
  ${productFragment}

  query($query: QueryProdustInput) {
    getProducts(query: $query) {
      ...ProductFragment
    }
  }
`;
const productsGQL = {
    getProducts
}
export default productsGQL