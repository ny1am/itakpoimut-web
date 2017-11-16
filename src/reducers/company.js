import {
  COMPANY_SUCCESS,
} from 'constants/company';

const initialState = {};

const landingReducer = (state = initialState, action) => {
  switch(action.type) {

    case COMPANY_SUCCESS: {
      return action.payload;
    }

    default:
      return state;
  }
};

export default landingReducer;
