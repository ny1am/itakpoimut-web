import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth';
import companyReducer from './company';
import companiesReducer from './companies';
import userProfileReducer from './userProfile';

const rootReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
  companies: companiesReducer,
  userProfile: userProfileReducer,
  router: routerReducer,
});

export default rootReducer;
