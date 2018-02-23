import React from 'react';
import PropTypes from 'prop-types';

import PreloadSwitch from 'components/PreloadSwitch';
import { Route } from 'react-router-dom';

import DialogWrapper from './DialogWrapper';
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
    this.onDialogReady = this.onDialogReady.bind(this);
    this.state = {
      location: createLocation(props.dialogType),
      //not to show shade when data hasn't been fetched yet
      //todo: don't like this approach
      ready: false
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.dialogType !== newProps.dialogType) {
      this.setState({
        location: createLocation(newProps.dialogType),
        ready: false
      });
    }
  }

  onDialogReady() {
    this.setState({
      ready: true,
    });
    //todo
    document.getElementById('dialog').scrollTop = 0;
  }

  render() {
    const { location, ready } = this.state;
    const { loading, loggedUser } = this.props;
    return (
      <DialogWrapper loading={loading} visible={ready}>
        <PreloadSwitch
          location={location}
          routeConfig={routeConfig}
          loggedUser={loggedUser}
          onDataFetched={this.onDialogReady}
          passThroughProps={{...this.props}}
        >
          {routeConfig.map(cfg => {
            const RouteComponent = cfg.secure ? SecureDialogRoute : Route;
            return <RouteComponent key={cfg.path} {...cfg} />;
          })}
        </PreloadSwitch>
      </DialogWrapper>
    );
  }
}

Dialog.propTypes = {
  dialogType: PropTypes.string,
  loading: PropTypes.bool,
  loggedUser: PropTypes.object
};

export default Dialog;
