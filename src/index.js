import React from 'react';
import { render } from 'react-dom';
import configureStore, { history } from './store/configureStore';
import { loadAuth } from './store/storage';
import Root from 'components/Root';
import promiseFinally from 'promise.prototype.finally';
import 'isomorphic-fetch';
import 'scroll-restoration-polyfill';

import 'react-select/dist/react-select.css';
import 'react-progress-2/main.css';
import './styles/main.scss';

promiseFinally.shim();
window.history.scrollRestoration = 'manual';

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

render(
  <Root store={store} history={history} />,
  document.getElementById('app')
);
