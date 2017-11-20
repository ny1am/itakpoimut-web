/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './store/configureStore';
import { loadAuth } from './store/storage';
import Root from './components/Root';

require('./favicon.ico');

const auth = loadAuth();
let initState = null;
if (auth && auth.user) {
  initState = {
    auth: {
      loggedUser: auth.user,
    }
  };
}

const store = configureStore(initState);

const init = (store) => {
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('app')
  );
};

init(store);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
