import React from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { locationChanged } from 'actions/preload';
import { appReady } from 'actions/global';
import PreloadSwitch from 'components/PreloadSwitch';
import { LoadingProvider } from 'components/Form';

import PageLayout from './PageLayout';
import SecureRoute from './SecureRoute';
import routeConfig from './routeConfig';

const statelessLocation = (location) => (
  Object.assign({}, location, { state: null })
);

class PageContainer extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onDataFetched = this.onDataFetched.bind(this);
    this.state = {
      //don't account for state for page routes
      location: statelessLocation(props.location)
    };
  }

  componentWillReceiveProps(newProps) {
    const location = this.props.location;
    const newLocation = newProps.location;
    const currentDialog = (location.state || {}).dialogType || null;
    const nextDialog = (newLocation.state || {}).dialogType || null;
    if(location !== newLocation && currentDialog === nextDialog) {
      this.setState({
        //don't account for state for page routes
        location: statelessLocation(newLocation),
      });
    }
  }

  onDataFetched({ nextLocation, location }) {
    const { store: { dispatch } } = this.context;
    dispatch(locationChanged({
      location: nextLocation,
      prevLocation: location
    }));
    dispatch(appReady());
  }

  render() {
    const { location } = this.state;
    const { loggedUser } = this.props;
    return (
      <LoadingProvider>
        <PreloadSwitch
          location={location}
          routeConfig={routeConfig}
          loggedUser={loggedUser}
          onDataFetched={this.onDataFetched}
          Wrapper={PageLayout}
        >
          {routeConfig.map(cfg => {
            const RouteComponent = cfg.secure ? SecureRoute : Route;
            return <RouteComponent key={cfg.path} {...cfg} />;
          })}
        </PreloadSwitch>
      </LoadingProvider>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  loggedUser: auth.loggedUser
});

PageContainer.contextTypes = {
  store: PropTypes.object.isRequired,
};

PageContainer.propTypes = {
  location: PropTypes.object.isRequired,
  loggedUser: PropTypes.object
};

export default withRouter(connect(mapStateToProps)(PageContainer));
