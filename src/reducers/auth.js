import {
  AUTH_REQUEST, FB_AUTH_REQUEST, GOOGLE_AUTH_REQUEST,
  AUTH_SUCCESS, AUTH_FAILURE,
  LOGOUT
} from 'consts/auth';
import { SAVE_USER_PROFILE_SUCCESS } from 'consts/userProfile';

const initialState = {
  loggedUser: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {

    case FB_AUTH_REQUEST:
    case GOOGLE_AUTH_REQUEST:
    case AUTH_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        error: null,
      });
    }

    case AUTH_SUCCESS: {
      return Object.assign({}, state, {
        loggedUser: action.payload.user,
        loading: false,
        error: null,
      });
    }

    case SAVE_USER_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        loggedUser: action.payload.user,
      });
    }

    case AUTH_FAILURE: {
      return Object.assign({}, state, {
        loggedUser: null,
        loading: false,
        error: 'The username or password is incorrect.',
      });
    }

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
