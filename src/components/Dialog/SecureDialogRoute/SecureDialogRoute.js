import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import PleaseSignupDialog from 'views/PleaseSignupDialog';

const SecureDialogRoute = ({ loggedUser, ...rest }) => (
  <Route {...rest} render={(props) => {
    if (!loggedUser) {
      return <PleaseSignupDialog />;
    }
    return rest.render(props);
  }} />
);

SecureDialogRoute.propTypes = {
  loggedUser: PropTypes.object,
};

export default SecureDialogRoute;
