import { COMMENTS_SUCCESS } from 'consts/comments';

const initialState = {};

const commentsReducer = (state = initialState, action) => {
  switch(action.type) {

    case COMMENTS_SUCCESS: {
      return Object.assign({}, state, action.payload);
    }

    default:
      return state;
  }
};

export default commentsReducer;
