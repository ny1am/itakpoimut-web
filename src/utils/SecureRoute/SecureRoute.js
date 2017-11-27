import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const SecureRoute = ({ component: Component, loggedUser, ...rest }) => (
  <Route {...rest} render={props => (
    loggedUser ? (
      <Component {...props}/>
    ) : (
      <Redirect to="/"/>
    )
  )}/>
);

SecureRoute.propTypes = {
  component: PropTypes.func,
  loggedUser: PropTypes.object,
};

export default SecureRoute;
