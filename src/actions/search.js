import qs from 'querystring';
import { get } from '../helpers/service';
import {
  SEARCH_RESTAURANT_REQUEST,
  SEARCH_RESTAURANT_SUCCESS,
  SEARCH_RESTAURANT_ERROR,
} from '../constants/search';

function requestSearchRestaurants() {
  return {
    type: SEARCH_RESTAURANT_REQUEST,
  };
}

function receiveSearchRestaurants(json) {
  return {
    type: SEARCH_RESTAURANT_SUCCESS,
    items: json.restaurants,
    center: {
      lat: json.region.center.lat,
      lng: json.region.center.lng,
    },
    total: json.total,
  };
}

function errorSearchRestaurants(message) {
  return {
    type: SEARCH_RESTAURANT_ERROR,
    message,
  };
}

function fetchSearchRestaurants(term, location, filter) {
  return (dispatch) => {
    dispatch(requestSearchRestaurants());

    const params = {
      coordinate: location.coordinate,
      location: location.name,
      page: filter.page,
      sort: filter.sort,
      term,
    };

    return get('search', qs.stringify(params))
      .then(json => dispatch(receiveSearchRestaurants(json)))
      .catch(message => dispatch(errorSearchRestaurants(message)));
  };
}

function shouldFetchSearchRestaurants(state) {
  return !state.search.isFetching;
}

export function searchRestaurants(term, location, filter = { page: 1, sort: 0 }) {
  return (dispatch, getState) => {
    if (shouldFetchSearchRestaurants(getState())) {
      return dispatch(fetchSearchRestaurants(term, location, filter));
    }

    return Promise.resolve();
  };
}
