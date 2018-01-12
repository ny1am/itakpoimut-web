import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './store/configureStore';
import { loadAuth } from './store/storage';
import Root from './components/Root';
import 'isomorphic-fetch';
import 'scroll-restoration-polyfill';

import 'react-select/dist/react-select.css';
import 'react-progress-2/main.css';
import './styles/main.scss';

window.history.scrollRestoration = 'manual';

require('./favicon.ico');

const auth = loadAuth();
let initState = undefined;
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
