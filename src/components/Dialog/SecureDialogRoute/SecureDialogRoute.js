import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { showDialog } from 'actions/dialog';

const SecureDialogRoute = ({ loggedUser, dispatch, ...rest }) => (
  <Route {...rest} render={(props) => {
    if (!loggedUser) {
      dispatch(showDialog('/dialog/please-signup'));
    }
    return rest.render(props);
  }} />
);

SecureDialogRoute.propTypes = {
  loggedUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

export default SecureDialogRoute;
