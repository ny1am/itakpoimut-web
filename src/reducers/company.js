import { FETCH_COMPANY_SUCCESS } from 'consts/company';

const initialState = {};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPANY_SUCCESS: {
      const company = action.payload;
      return Object.assign({}, state, {
        [company._id]: company,
      });
    }

    default:
      return state;
  }
};

export default companyReducer;
