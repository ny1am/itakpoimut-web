import { COMPANY_SUCCESS } from 'constants/company';

const initialState = {};

const companyReducer = (state = initialState, action) => {
  switch(action.type) {

    case COMPANY_SUCCESS: {
      const { cached } = action;
      const { company } = action.payload;
      if (cached) {
        return state;
      }
      return Object.assign({}, state, {
        [company._id]: company,
      });
    }

    default:
      return state;
  }
};

export default companyReducer;
