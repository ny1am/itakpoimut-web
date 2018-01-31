import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';

import { hideDialog } from 'actions/dialog';

import AppComponent from './App';

/**
 * Main component. Used as a router entry point. Contains ubiquitous components.
 */
class App extends React.Component {

  componentDidCatch(error, info) {
    //todo: persist error
    console.log('did catch', error, info); // eslint-disable-line
    this.context.store.dispatch(hideDialog());
    this.context.store.dispatch(push({
      pathname: '/oops',
    }));
  }

  render() {
    return <AppComponent {...this.props} />;
  }
}

App.contextTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
