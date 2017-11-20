import { PREFETCH_LOCATION_CHANGE } from 'constants';
import {
  SHOW_DIALOG,
  HIDE_DIALOG,
} from 'constants/dialog';

const initialState = {
  dialogType: false,
  dialogProps: {},
};

const dialogReducer = (state = initialState, action) => {
  switch(action.type) {

    case SHOW_DIALOG:
      return Object.assign({}, state, {
        dialogType: action.dialogType,
        dialogProps: action.dialogProps,
      });

    case HIDE_DIALOG:
    case PREFETCH_LOCATION_CHANGE:
      return initialState;

    default:
      return state;
  }
};

export default dialogReducer;
