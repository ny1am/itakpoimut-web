import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { locationChanged } from 'actions/preload';
import { appReady } from 'actions/global';
import PreloadSwitch from 'components/PreloadSwitch';
import { LoadingProvider } from 'components/Form';

import PageLayout from './PageLayout';
import SecureRoute from './SecureRoute';
import routeConfig from './routeConfig';
import { pageLocationSelector } from './selectors';

class PageContainer extends React.PureComponent {

  onDataFetched = ({ nextLocation, location }) => {
    const { store: { dispatch } } = this.context;
    dispatch(locationChanged({
      location: nextLocation,
      prevLocation: location
    }));
    dispatch(appReady());
  }

  render() {
    const { loggedUser, location } = this.props;
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

PageContainer.propTypes = {
  loggedUser: PropTypes.object,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  loggedUser: state.auth.loggedUser,
  location: pageLocationSelector(state)
});

PageContainer.contextTypes = {
  store: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(PageContainer);
