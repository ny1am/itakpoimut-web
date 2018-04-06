import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import PreloadSwitch from 'components/PreloadSwitch';
import { ViewModeContext } from 'components/View';

import DialogLayout from './DialogLayout';
import SecureDialogRoute from './SecureDialogRoute';
import routeConfig from './routeConfig';

/**
 * Wrapper for dialogs
 */
class Dialog extends React.PureComponent {
  render() {
    const { location } = this.props;
    return (
      <ViewModeContext.Provider value="dialog">
        <PreloadSwitch
          location={location}
          routeConfig={routeConfig}
        >
          {routeConfig.map(cfg => {
            const RouteComponent = cfg.secure ? SecureDialogRoute : Route;
            const Component = cfg.component;
            return (
              <RouteComponent
                key={cfg.path}
                {...cfg}
                component={null}
                render={(props) => (
                  <DialogLayout>
                    <Component {...props} />
                  </DialogLayout>
                )}
              />
            );
          })}
        </PreloadSwitch>
      </ViewModeContext.Provider>
    );
  }
}

Dialog.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Dialog;
