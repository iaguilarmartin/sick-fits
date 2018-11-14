import React from 'react';

import Items from '../components/Items';

const Home = ({ query }) => (
  <div>
    <Items page={parseFloat(query.page || 1)} />
  </div>
);

export default Home;
