import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  PRELOAD_INITIAL_DATA_REQUEST,
  PRELOAD_INITIAL_DATA_SUCCESS,
  PRELOAD_LOCATION_CHANGED,
} from 'consts/preload';

export const getFetchResult = ({ routeConfig, location, fetchOptions }) => ({
  type: PRELOAD_INITIAL_DATA_REQUEST,
  routeConfig,
  location,
  fetchOptions,
  [WAIT_FOR_ACTION]: PRELOAD_INITIAL_DATA_SUCCESS,
});

export const locationChanged = ({ location, prevLocation }) => ({
  type: PRELOAD_LOCATION_CHANGED,
  location,
  prevLocation,
});
