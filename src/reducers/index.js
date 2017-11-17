import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth';
import userReducer from './user';
import landingReducer from './landing';
import companyReducer from './company';
import companiesReducer from './companies';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  landing: landingReducer,
  company: companyReducer,
  companies: companiesReducer,
  router: routerReducer,
});

export default rootReducer;
