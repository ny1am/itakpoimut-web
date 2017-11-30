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

    //todo: revise server response
    case SAVE_USER_PROFILE_SUCCESS: {
      const update = {
        errors: action.payload.errors,
        successSave: action.payload.successSave,
      };
      if (action.payload.successSave) {
        update.user = action.payload.user;
      }
      return Object.assign({}, state, update);
    }

    default:
      return state;
  }
};

export default userProfileReducer;
