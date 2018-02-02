import { APP_READY } from 'consts';

const initialState = {
  appReady: false,
};

const globalReducer = (state = initialState, action) => {
  switch(action.type) {

    case APP_READY: {
      return Object.assign({}, state, {
        appReady: true,
      });
    }

    default:
      return state;
  }
};

export default globalReducer;
