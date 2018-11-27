import React from 'react';

import PleaseSignin from '../components/PleaseSignin';
import Order from '../components/Order';

const OrderPage = ({ query }) => (
  <div>
    <PleaseSignin>
      <Order id={query.id} />
    </PleaseSignin>
  </div>
);

export default OrderPage;
