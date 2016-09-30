import {
  FIND_RESTAURANT_REQUEST,
  FIND_RESTAURANT_SUCCESS,
  FIND_RESTAURANT_ERROR,
} from '../constants/restaurant';

const initialState = {
  errorMessage: '',
  isFetching: false,
  item: null,
};

function restaurant(state = initialState, action) {
  switch (action.type) {
    case FIND_RESTAURANT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FIND_RESTAURANT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.restaurant,
      });
    case FIND_RESTAURANT_ERROR:
      return Object.assign({}, state, {
        errorMessage: action.message,
        isFetching: false,
        item: null,
      });
    default:
      return state;
  }
}

export default restaurant;
