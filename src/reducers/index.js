import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth';
import userReducer from './user';
import landingReducer from './landing';
import companyReducer from './company';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  landing: landingReducer,
  company: companyReducer,
  router: routerReducer,
});

export default rootReducer;
