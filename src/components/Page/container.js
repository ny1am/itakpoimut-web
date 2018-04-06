import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { locationChanged } from 'actions/preload';
import { appReady } from 'actions/global';
import PreloadSwitch from 'components/PreloadSwitch';
import NotFoundPage from 'views/NotFoundPage';
import {
  PageViewLayout, routeConfig as dialogRouteConfig
} from 'components/Dialog';
import { ViewModeContext } from 'components/View';
import { ConditionalWrap } from 'utils/enhancers';

import PageLayout from './PageLayout';
import SecureRoute from './SecureRoute';
import pagesRouteConfig from './routeConfig';
import { pageLocationSelector } from './selectors';

const routeConfig = [
  ...pagesRouteConfig,
  ...dialogRouteConfig.map(
    cfg => Object.assign({}, cfg, { wrapper:  PageViewLayout})
  ),
  {
    path: '*',
    component: NotFoundPage,
  }
];

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
      <ViewModeContext.Provider value="page">
        <PreloadSwitch
          location={location}
          routeConfig={routeConfig}
          onFetchSuccess={this.onFetchSuccess}
        >
          {routeConfig.map(cfg => {
            const RouteComponent = cfg.secure ? SecureRoute : Route;
            const Component = cfg.component;
            const Wrapper = cfg.wrapper;
            return (
              <RouteComponent
                key={cfg.path}
                {...cfg}
                component={null}
                render={(props) => (
                  <PageLayout>
                    <ConditionalWrap
                      condition={Boolean(Wrapper)}
                      wrap={(children => (<Wrapper children={children} />))}
                    >
                      <Component {...props} />
                    </ConditionalWrap>
                  </PageLayout>
                )}
              />
            );
          })}
        </PreloadSwitch>
      </ViewModeContext.Provider>
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
