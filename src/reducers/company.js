import {
  COMPANY_SUCCESS,
  ADD_COMMENT_SUCCESS,
} from 'constants/company';

const initialState = {};

const companyReducer = (state = initialState, action) => {
  switch(action.type) {

    case ADD_COMMENT_SUCCESS:
    case COMPANY_SUCCESS: {
      return action.payload;
    }

    default:
      return state;
  }
};

export default companyReducer;
