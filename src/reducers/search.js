import {
  REQUEST_SEARCH,
  RECEIVE_SEARCH,
  RESET_SEARCH,
} from '../constants/search';

const initialState = {
  isFetching: false,
  items: [],
  center: null,
  total: 0,
};

function search(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SEARCH:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_SEARCH:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        center: action.center,
        total: action.total,
      });
    case RESET_SEARCH:
      return initialState;
    default:
      return state;
  }
}

export default search;
