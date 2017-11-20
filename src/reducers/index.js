import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import dialogReducer from './dialog';
import authReducer from './auth';
import landingReducer from './landing';
import companyReducer from './company';
import companiesReducer from './companies';
import userProfileReducer from './userProfile';

const rootReducer = combineReducers({
  dialog: dialogReducer,
  auth: authReducer,
  landing: landingReducer,
  company: companyReducer,
  companies: companiesReducer,
  userProfile: userProfileReducer,
  router: routerReducer,
});

export default rootReducer;
