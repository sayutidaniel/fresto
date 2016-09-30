import { get } from '../helpers/service';
import {
  FIND_RESTAURANT_REQUEST,
  FIND_RESTAURANT_SUCCESS,
  FIND_RESTAURANT_ERROR,
} from '../constants/restaurant';

function requestFindRestaurant() {
  return {
    type: FIND_RESTAURANT_REQUEST,
  };
}

function successFindRestaurant(restaurant) {
  return {
    type: FIND_RESTAURANT_SUCCESS,
    restaurant,
  };
}

function errorFindRestaurant(message) {
  return {
    type: FIND_RESTAURANT_ERROR,
    message,
  };
}

function fetchRestaurant(id) {
  return (dispatch) => {
    dispatch(requestFindRestaurant());

    return get(`restaurant/${id}`)
      .then(restaurant => dispatch(successFindRestaurant(restaurant)))
      .catch(message => dispatch(errorFindRestaurant(message)));
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
