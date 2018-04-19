import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import PleaseSignupDialog from 'views/PleaseSignupDialog';
import DialogLayout from '../DialogLayout';

class SecureDialogRoute extends React.Component {
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
            return (
              <DialogLayout>
                <PleaseSignupDialog />
              </DialogLayout>
            );
          }
          return rest.render(props);
        }}
      />
    );
  }
}

SecureDialogRoute.propTypes = {
  loggedUser: PropTypes.object,
  secure: PropTypes.func,
};

export default SecureDialogRoute;
