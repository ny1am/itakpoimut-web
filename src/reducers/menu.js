import { PRELOAD_LOCATION_CHANGED } from 'consts/preload';
import { SHOW_MENU, HIDE_MENU } from 'consts/menu';

const initialState = false;

const menuReducer = (state = initialState, action) => {
  switch(action.type) {

    case SHOW_MENU:
      return true;

    case PRELOAD_LOCATION_CHANGED:
    case HIDE_MENU:
      return false;

    default:
      return state;
  }
};

export default menuReducer;
