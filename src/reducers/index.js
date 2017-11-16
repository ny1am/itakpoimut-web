import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth';
import landingReducer from './landing';

const rootReducer = combineReducers({
  auth: authReducer,
  landing: landingReducer,
  router: routerReducer,
});

export default rootReducer;
