import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Head from 'next/head';

import ErrorMessage from './ErrorMessage';

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

const SIGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;

const SingleItem = ({ id }) => (
  <Query
    query={SIGLE_ITEM_QUERY}
    variables={{
      id
    }}
  >
    {({ error, loading, data }) => {
      if (error) return <ErrorMessage error={error} />;
      if (loading) return <p>Loading...</p>;

      const { item } = data;
      if (!item) return <p>No item found for {id}</p>;
      return (
        <SingleItemStyles>
          <Head>
            <title>Sick Fits | {item.title}</title>
          </Head>
          <img src={item.largeImage} alt={item.title} />
          <div className="details">
            <h2>Viewing {item.title}</h2>
            <p>{item.description}</p>
          </div>
        </SingleItemStyles>
      );
    }}
  </Query>
);

export default SingleItem;
export { SIGLE_ITEM_QUERY };
