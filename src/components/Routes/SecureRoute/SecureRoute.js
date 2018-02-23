import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import NotAllowedPage from 'views/NotAllowedPage';

const SecureRoute = ({ loggedUser, ...rest }) => (
  <Route {...rest} render={(props) => {
    if (!loggedUser) {
      return <NotAllowedPage />;
    }
    return rest.render(props);
  }} />
);

SecureRoute.propTypes = {
  loggedUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

export default SecureRoute;
