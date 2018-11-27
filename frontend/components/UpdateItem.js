import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';

import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

class UpdateItem extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  updateItem = async (e, updateItemMutation) => {
    const { id } = this.props;

    e.preventDefault();
    // const res = await updateItemMutation({
    await updateItemMutation({
      variables: {
        id,
        ...this.state
      }
    });
    // Router.push({
    //   pathname: '/item',
    //   query: { id: res.data.createItem.id }
    // })
  };

  render() {
    const { id } = this.props;

    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading....</p>;
          if (!data.item) return <p>No item found for ID {id}</p>;
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { updating, error }) => (
                <Form onSubmit={e => this.updateItem(e, updateItem)}>
                  <ErrorMessage error={error} />
                  <fieldset disabled={updating} aria-busy={updating}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        defaultValue={data.item.title}
                        required
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="price">
                      Price
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Price"
                        defaultValue={data.item.price}
                        required
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="description">
                      Description
                      <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Enter a description"
                        defaultValue={data.item.description}
                        required
                        onChange={this.handleChange}
                      />
                    </label>
                  </fieldset>
                  <button type="submit">
                    Sav{updating ? 'ing' : 'e'} changes
                  </button>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
