import React from 'react';

import PleaseSignin from '../components/PleaseSignin';
import OrderList from '../components/OrderList';

const Orders = () => (
  <div>
    <PleaseSignin>
      <OrderList />
    </PleaseSignin>
  </div>
);

export default Orders;
