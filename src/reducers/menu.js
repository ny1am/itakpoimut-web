import { PRELOAD_LOCATION_CHANGE_END } from 'constants';
import { SHOW_MENU, HIDE_MENU } from 'constants/menu';

const initialState = false;

const menuReducer = (state = initialState, action) => {
  switch(action.type) {

    case SHOW_MENU:
      return true;

    case PRELOAD_LOCATION_CHANGE_END:
    case HIDE_MENU:
      return false;

    default:
      return state;
  }
};

export default menuReducer;