import { FETCH_VIOLATIONS_SUCCESS } from 'consts/violation';

const initialState = null;

const violationReducer = (state = initialState, action) => {
  switch(action.type) {

    case FETCH_VIOLATIONS_SUCCESS: {
      return action.payload;
    }

    default:
      return state;
  }
};

export default violationReducer;
