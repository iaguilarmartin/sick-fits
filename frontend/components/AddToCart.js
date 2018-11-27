import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

const AddToCart = ({ id }) => (
  <Mutation
    mutation={ADD_TO_CART_MUTATION}
    variables={{ id }}
    refetchQueries={[
      {
        query: CURRENT_USER_QUERY
      }
    ]}
  >
    {(addToCart, { loading }) => (
      <button disabled={loading} type="button" onClick={addToCart}>
        Add{loading && 'ing'} to Cart{' '}
        <span role="img" aria-label="Cart emoji">
          🛒
        </span>
      </button>
    )}
  </Mutation>
);

export default AddToCart;
