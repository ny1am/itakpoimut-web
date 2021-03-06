import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth';
import globalReducer from './global';
import menuReducer from './menu';
import companyReducer from './company';
import categoryReducer from './category';
import violationReducer from './violation';
import commentsReducer from './comments';
import companiesReducer from './companies';

const rootReducer = combineReducers({
  global: globalReducer,
  menu: menuReducer,
  auth: authReducer,
  company: companyReducer,
  category: categoryReducer,
  violation: violationReducer,
  comments: commentsReducer,
  companies: companiesReducer,
  router: routerReducer,
});

export default rootReducer;
