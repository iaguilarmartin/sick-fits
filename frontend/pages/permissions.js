import React from 'react';

import PleaseSignin from '../components/PleaseSignin';
import Permissions from '../components/Permissions';

const PermissionsPage = () => (
  <div>
    <PleaseSignin>
      <Permissions />
    </PleaseSignin>
  </div>
);

export default PermissionsPage;
