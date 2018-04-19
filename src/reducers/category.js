import { FETCH_CATEGORIES_SUCCESS } from 'consts/category';

const initialState = null;

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS: {
      return action.payload;
    }

    default:
      return state;
  }
};

export default categoryReducer;
