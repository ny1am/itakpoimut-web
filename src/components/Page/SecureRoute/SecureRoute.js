import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import NotAllowedPage from 'views/NotAllowedPage';
import PageLayout from '../PageLayout';

const SecureRoute = ({ loggedUser, ...rest }) => (
  <Route {...rest} render={(props) => {
    if (!loggedUser) {
      return (
        <PageLayout>
          <NotAllowedPage />
        </PageLayout>
      );
    }
    return rest.render(props);
  }} />
);

SecureRoute.propTypes = {
  loggedUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

export default SecureRoute;
