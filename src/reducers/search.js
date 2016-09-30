import {
  SEARCH_RESTAURANT_REQUEST,
  SEARCH_RESTAURANT_SUCCESS,
  SEARCH_RESTAURANT_ERROR,
} from '../constants/search';

const initialState = {
  errorMessage: '',
  isFetching: false,
  items: [],
  center: null,
  total: 0,
};

function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH_RESTAURANT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case SEARCH_RESTAURANT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        center: action.center,
        total: action.total,
      });
    case SEARCH_RESTAURANT_ERROR:
      return Object.assign({}, state, {
        errorMessage: action.message,
        isFetching: false,
        items: [],
      });
    default:
      return state;
  }
}

export default search;
