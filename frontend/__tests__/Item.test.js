import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import ItemComponent from '../components/Item';

const fakeItem = {
  id: 'ABC123',
  title: 'A Cool Item',
  price: 4000,
  description: 'This item is really cool!',
  image: 'dog.jpg',
  largeImage: 'largedog.jpg'
};

describe('<Item/>', () => {
  it('renders the price tag and title', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const PriceTag = wrapper.find('PriceTag');

    expect(PriceTag.children().text()).toBe('$40');
    expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
  });

  it('render the image properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const img = wrapper.find('img');

    expect(img.props().src).toBe(fakeItem.image);
    expect(img.props().alt).toBe(fakeItem.title);
  });

  it('renders out the buttons properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const ButtonList = wrapper.find('.buttonList');

    expect(ButtonList.children()).toHaveLength(3);
    expect(ButtonList.find('Link').exists()).toBe(true);
    expect(ButtonList.find('AddToCart').exists()).toBe(true);
    expect(ButtonList.find('DeleteItem').exists()).toBe(true);
  });

  it('renders and matches the snapshot', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
