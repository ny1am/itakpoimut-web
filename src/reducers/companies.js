import {
  LOYALTY_CHANGED, CATEGORY_CHANGED, VIOLATION_CHANGED,
  CLEAR_FILTERS,
} from 'constants/companies';

const initialState = {
  selectedLoyalty: null,
  selectedCategory: null,
  selectedViolations: [],
};

const companiesReducer = (state = initialState, action) => {
  switch(action.type) {

    case CLEAR_FILTERS:
      return initialState;

    case LOYALTY_CHANGED:
      return Object.assign({}, state, {
        selectedLoyalty: action.newValue,
      });

    case CATEGORY_CHANGED:
      return Object.assign({}, state, {
        selectedCategory: action.newValue,
      });

    case VIOLATION_CHANGED:
      return Object.assign({}, state, {
        selectedViolations: action.newValue,
      });

    default:
      return state;
  }
};

export default companiesReducer;
