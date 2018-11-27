import React from 'react';
import { Mutation } from 'react-apollo';
import Link from 'next/link';

import NavStyles from './styles/NavStyles';
import User from './User';
import Signout from './Signout';
import { TOOGLE_CART_MUTATION } from './Cart';
import CartCount from './CartCount';

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href="/items">
          <a>Shop</a>
        </Link>
        {me && (
          <>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
            <Link href="/me">
              <a>Account</a>
            </Link>
            <Signout />
            <Mutation mutation={TOOGLE_CART_MUTATION}>
              {toogleCart => (
                <button type="button" onClick={toogleCart}>
                  My cart
                  <CartCount
                    count={me.cart.reduce(
                      (tally, cartItem) => tally + cartItem.quantity,
                      0
                    )}
                  />
                </button>
              )}
            </Mutation>
          </>
        )}
        {!me && (
          <Link href="/signup">
            <a>Sign In</a>
          </Link>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;
