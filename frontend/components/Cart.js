import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';

import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';

import User from './User';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';
import TakeMyMoney from './TakeMyMoney';
import CartItem from './CartItem';

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOOGLE_CART_MUTATION = gql`
  mutation {
    toogleCart @client
  }
`;

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toogleCart: ({ render }) => (
    <Mutation mutation={TOOGLE_CART_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
});

const Cart = () => (
  <Composed>
    {({ user, toogleCart, localState }) => {
      const { me } = user.data;
      if (!me) return null;
      return (
        <CartStyles open={localState.data.cartOpen}>
          <header>
            <CloseButton title="close" onClick={toogleCart}>
              &times;
            </CloseButton>
            <Supreme>
              {me.name}
              {"'"}s Cart
            </Supreme>
            <p>
              You Have {me.cart.length} item
              {me.cart.length === 1 ? '' : 's'} in your cart.
            </p>
          </header>
          <ul>
            {me.cart.map(cartItem => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </ul>
          <footer>
            <p>{formatMoney(calcTotalPrice(me.cart))}</p>
            {me.cart.length && (
              <TakeMyMoney>
                <SickButton>Checkout</SickButton>
              </TakeMyMoney>
            )}
          </footer>
        </CartStyles>
      );
    }}
  </Composed>
);

export { LOCAL_STATE_QUERY, TOOGLE_CART_MUTATION };
export default Cart;
