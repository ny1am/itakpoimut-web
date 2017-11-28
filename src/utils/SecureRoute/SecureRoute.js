import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const SecureRoute = ({ loggedUser, ...rest }) => {
  if (loggedUser) {
    return <Route {...rest} />;
  } else {
    return <Route {...rest} render={() => (<Redirect to="/"/>)} />;
  }
};

SecureRoute.propTypes = {
  loggedUser: PropTypes.object,
};

export default SecureRoute;
