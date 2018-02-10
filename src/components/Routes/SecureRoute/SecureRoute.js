import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { push } from 'react-router-redux';

const SecureRoute = ({ loggedUser, dispatch, ...rest }) => (
  <Route {...rest} render={(props) => {
    if (!loggedUser) {
      //can't use Redirect here, because Switch would render an empty page
      //todo: revise PreloadSwitch to cache previous component
      dispatch(push('/'));
    }
    return rest.render(props);
  }} />
);

SecureRoute.propTypes = {
  loggedUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

export default SecureRoute;
