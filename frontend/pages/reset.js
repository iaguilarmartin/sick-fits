import React from 'react';
import Reset from '../components/Reset';

const ResetPage = ({ query }) => (
  <div>
    <p>Reset your password</p>
    <Reset resetToken={query.resetToken} />
  </div>
);

export default ResetPage;
