import {
  REQUEST_RESTAURANT,
  RECEIVE_RESTAURANT,
} from '../constants/restaurant';

const initialState = {
  isFetching: false,
  item: null,
};

function restaurant(state = initialState, action) {
  switch (action.type) {
    case REQUEST_RESTAURANT:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_RESTAURANT:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.restaurant,
      });
    default:
      return state;
  }
}

export default restaurant;
