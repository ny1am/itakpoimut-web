import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const SecureRoute = ({ loggedUser, ...rest }) => (
  <Route {...rest} render={(props) => {
    if (!loggedUser) {
      return <Redirect to="/" />;
    }
    return rest.render(props);
  }} />
);

SecureRoute.propTypes = {
  loggedUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

export default SecureRoute;
