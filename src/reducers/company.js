import {
  COMPANY_SUCCESS,
  COMMENTS_SUCCESS,
  ADD_COMMENT_SUCCESS,
} from 'constants/company';

const initialState = {};

const companyReducer = (state = initialState, action) => {
  switch(action.type) {

    case COMMENTS_SUCCESS:
    case COMPANY_SUCCESS:
    case ADD_COMMENT_SUCCESS: {
      return Object.assign({}, state, action.payload);
    }

    default:
      return state;
  }
};

export default companyReducer;
