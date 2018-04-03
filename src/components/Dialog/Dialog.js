import React from 'react';
import PropTypes from 'prop-types';

import PreloadSwitch from 'components/PreloadSwitch';
import { Route } from 'react-router-dom';

import DialogLayout from './DialogLayout';
import SecureDialogRoute from './SecureDialogRoute';
import routeConfig from './routeConfig';

/**
 * Wrapper for dialogs
 */
class Dialog extends React.Component {
  render() {
    const { loggedUser, location } = this.props;
    return (
      <PreloadSwitch
        location={location}
        routeConfig={routeConfig}
        loggedUser={loggedUser}
        Wrapper={DialogLayout}
      >
        {routeConfig.map(cfg => {
          const RouteComponent = cfg.secure ? SecureDialogRoute : Route;
          return <RouteComponent key={cfg.path} {...cfg} />;
        })}
      </PreloadSwitch>
    );
  }
}

Dialog.propTypes = {
  location: PropTypes.object.isRequired,
  loggedUser: PropTypes.object
};

export default Dialog;
