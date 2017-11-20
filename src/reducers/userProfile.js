import {
  USER_PROFILE_SUCCESS,
  SAVE_USER_PROFILE_SUCCESS,
} from 'constants/userProfile';

const initialState = {};

const userProfileReducer = (state = initialState, action) => {
  switch(action.type) {

    case USER_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        user: action.payload,
      });
    }

    case SAVE_USER_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        errors: action.payload.errors,
        successSave: action.payload.successSave,
      });
    }

    default:
      return state;
  }
};

export default userProfileReducer;
