import {
  AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE,
  LOGOUT
} from 'constants/auth';


const initialState = {
  loggedIn: false,
  role: null,
  loading: false,
  success: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {

    case AUTH_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        success: false,
        error: null,
      });
    }

    case AUTH_SUCCESS: {
      return Object.assign({}, state, {
        loggedIn: true,
        success: true,
        loading: false,
        error: null,
      });
    }

    case AUTH_FAILURE: {
      return Object.assign({}, state, {
        loggedIn: false,
        role: null,
        loading: false,
        success: false,
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