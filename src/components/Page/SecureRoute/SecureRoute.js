import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import NotAllowedPage from 'views/NotAllowedPage';

const SecureRoute = ({ loggedUser, secure, ...rest }) => (
  <Route {...rest} render={(props) => {
    if (secure && !secure(loggedUser)) {
      return (
        <NotAllowedPage />
      );
    }
    return rest.render(props);
  }} />
);

SecureRoute.propTypes = {
  loggedUser: PropTypes.object,
  secure: PropTypes.func,
};

export default SecureRoute;
