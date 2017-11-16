import {
  LANDING_SUCCESS,
} from 'constants/landing';

const initialState = {};

const landingReducer = (state = initialState, action) => {
  switch(action.type) {

    case LANDING_SUCCESS: {
      return action.payload;
    }

    default:
      return state;
  }
};

export default landingReducer;
