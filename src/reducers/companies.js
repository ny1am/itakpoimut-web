import {
  LOYALTY_CHANGED, CATEGORY_CHANGED,
  ADD_VIOLATION_FILTER, REMOVE_VIOLATION_FILTER,
  CLEAR_FILTERS,
} from 'consts/companies';

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

    case ADD_VIOLATION_FILTER: {
      const selectedViolations = [...state.selectedViolations, action.value];
      return Object.assign({}, state, {
        selectedViolations,
      });
    }

    case REMOVE_VIOLATION_FILTER: {
      const selectedViolations = state.selectedViolations.filter(
        violation => violation !== action.value
      );
      return Object.assign({}, state, {
        selectedViolations,
      });
    }

    default:
      return state;
  }
};

export default companiesReducer;
