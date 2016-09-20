import { get } from '../helpers/service';
import {
  REQUEST_RESTAURANT,
  RECEIVE_RESTAURANT,
} from '../constants/restaurant';

function requestRestaurant() {
  return {
    type: REQUEST_RESTAURANT,
  };
}

function receiveRestaurant(restaurant) {
  return {
    type: RECEIVE_RESTAURANT,
    restaurant,
  };
}

function fetchRestaurant(id) {
  return (dispatch) => {
    dispatch(requestRestaurant());

    return get(`restaurant/${id}`).then(json => dispatch(receiveRestaurant(json)));
  };
}

function shouldFetchRestaurant(state) {
  return !state.restaurant.isFetching;
}

export function findRestaurant(id) {
  return (dispatch, getState) => {
    if (shouldFetchRestaurant(getState())) {
      return dispatch(fetchRestaurant(id));
    }

    return Promise.resolve();
  };
}
