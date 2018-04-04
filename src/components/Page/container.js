import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { locationChanged } from 'actions/preload';
import { appReady } from 'actions/global';
import PreloadSwitch from 'components/PreloadSwitch';
import NotFoundPage from 'views/NotFoundPage';

import PageLayout from './PageLayout';
import SecureRoute from './SecureRoute';
import pagesRouteConfig from './routeConfig';
import { pageLocationSelector } from './selectors';

const routeConfig = [...pagesRouteConfig, {
  path: '*',
  component: NotFoundPage,
}];

class PageContainer extends React.PureComponent {

  onFetchSuccess = ({ nextLocation, location }) => {
    const { store: { dispatch } } = this.context;
    dispatch(locationChanged({
      location: nextLocation,
      prevLocation: location
    }));
    dispatch(appReady());
  }

  render() {
    const { location } = this.props;
    return (
      <PageLayout>
        <PreloadSwitch
          location={location}
          routeConfig={routeConfig}
          onFetchSuccess={this.onFetchSuccess}
        >
          {routeConfig.map(cfg => {
            const RouteComponent = cfg.secure ? SecureRoute : Route;
            const PageComponent = cfg.component;
            return (
              <RouteComponent
                key={cfg.path}
                {...cfg}
                component={PageComponent}
              />
            );
          })}
        </PreloadSwitch>
      </PageLayout>
    );
  }
}

PageContainer.propTypes = {
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  location: pageLocationSelector(state)
});

PageContainer.contextTypes = {
  store: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(PageContainer);
