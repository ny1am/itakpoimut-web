import React from 'react';
import PropTypes from 'prop-types';

import PreloadSwitch from 'components/PreloadSwitch';
import { Route } from 'react-router-dom';

import DialogLayout from './DialogLayout';
import SecureDialogRoute from './SecureDialogRoute';
import routeConfig from './routeConfig';

const createLocation = (dialogType) => ({
  pathname: dialogType
});

/**
 * Wrapper for dialogs
 */
class Dialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: createLocation(props.dialogType),
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.dialogType !== newProps.dialogType) {
      this.setState({
        location: createLocation(newProps.dialogType),
      });
    }
  }

  render() {
    const { location } = this.state;
    const { loggedUser } = this.props;
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
  dialogType: PropTypes.string,
  loggedUser: PropTypes.object
};

export default Dialog;
