import {
  COMPANIES_SUCCESS,
} from 'constants/companies';

const initialState = {};

const companiesReducer = (state = initialState, action) => {
  switch(action.type) {

    case COMPANIES_SUCCESS: {
      return action.payload;
    }

    default:
      return state;
  }
};

export default companiesReducer;
