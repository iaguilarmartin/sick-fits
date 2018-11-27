import React from 'react';
import { Query } from 'react-apollo';
import { format } from 'date-fns';
import Head from 'next/head';
import gql from 'graphql-tag';

import formatMoney from '../lib/formatMoney';

import ErrorMessage from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';

const SINGLE_ORDER_QUERY = gql`
  query($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`;

const Order = ({ id }) => (
  <Query query={SINGLE_ORDER_QUERY} variables={{ id }}>
    {({ data, error, loading }) => {
      if (error) return <ErrorMessage error={error} />;
      if (loading) return <p>Loading...</p>;
      const { order } = data;
      return (
        <OrderStyles>
          <Head>
            <title>Sick Fits - Order {order.id}</title>
          </Head>
          <p>
            <span>Order Id</span>
            <span>{id}</span>
          </p>
          <p>
            <span>Chrage</span>
            <span>{order.charge}</span>
          </p>
          <p>
            <span>Date</span>
            <span>{format(order.createdAt, 'dd/MM/yyyy')}</span>
          </p>
          <p>
            <span>Order Total</span>
            <span>{formatMoney(order.total)}</span>
          </p>
          <p>
            <span>Item Count:</span>
            <span>{order.items.length}</span>
          </p>
          <div className="items">
            {order.items.map(item => (
              <div className="order-item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                  <h2>{item.title}</h2>
                  <p>Qty: {item.quantity}</p>
                  <p>Each: {formatMoney(item.price)}</p>
                  <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </OrderStyles>
      );
    }}
  </Query>
);

export default Order;
