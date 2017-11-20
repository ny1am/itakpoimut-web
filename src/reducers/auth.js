import {
  AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE,
  LOGOUT
} from 'constants/auth';


const initialState = {
  loggedUser: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {

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
