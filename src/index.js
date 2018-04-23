import React from 'react';
import { render } from 'react-dom';
import promiseFinally from 'promise.prototype.finally';
import FontFaceObserver from 'fontfaceobserver';
import 'isomorphic-fetch';
import 'scroll-restoration-polyfill';

import configureStore, { history } from './store/configureStore';
import { loadAuth } from './store/storage';
import Root from './components/Root';

import 'react-select/dist/react-select.css';
import 'react-progress-2/main.css';

promiseFinally.shim();
window.history.scrollRestoration = 'manual';

const fontObserver = new FontFaceObserver('Lato', {});

fontObserver.load().then(
  () => {
    document.body.classList.add('fontLoaded');
  },
  () => {
    document.body.classList.remove('fontLoaded');
  }
);

const auth = loadAuth();
let initState = undefined;
if (auth && auth.user) {
  initState = {
    auth: {
      loggedUser: auth.user,
    },
  };
}

const store = configureStore(initState);

render(
  <Root store={store} history={history} />,
  document.getElementById('app')
);
