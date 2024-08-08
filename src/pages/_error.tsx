// pages/_error.js

import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ statusCode }) => {
  return (
    <div>
      <h1>{statusCode ? `Error ${statusCode}` : 'An error occurred'}</h1>
      <p>Sorry, something went wrong.</p>
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : (err ? err.statusCode : 404);
  return { statusCode };
};

Error.propTypes = {
  statusCode: PropTypes.number
};

export default Error;
