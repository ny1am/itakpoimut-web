import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth';
import globalReducer from './global';
import menuReducer from './menu';
import companyReducer from './company';
import companiesReducer from './companies';
import userProfileReducer from './userProfile';

const rootReducer = combineReducers({
  global: globalReducer,
  menu: menuReducer,
  auth: authReducer,
  company: companyReducer,
  companies: companiesReducer,
  userProfile: userProfileReducer,
  router: routerReducer,
});

export default rootReducer;
