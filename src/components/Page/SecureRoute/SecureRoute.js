import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import NotAllowedPage from 'views/NotAllowedPage';

class SecureRoute extends React.Component {
  shouldComponentUpdate(nextProps) {
    const preventUpdate = !this.props.loggedUser && nextProps.loggedUser;
    return !preventUpdate;
  }

  render() {
    const { loggedUser, secure, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(props) => {
          if (secure && !secure(loggedUser)) {
            return <NotAllowedPage />;
          }
          return rest.render(props);
        }}
      />
    );
  }
}

SecureRoute.propTypes = {
  loggedUser: PropTypes.object,
  secure: PropTypes.func,
};

export default SecureRoute;
