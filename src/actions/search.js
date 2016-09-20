import qs from 'querystring';
import { get } from '../helpers/service';
import {
  REQUEST_SEARCH,
  RECEIVE_SEARCH,
  RESET_SEARCH,
} from '../constants/search';

function requestSearch() {
  return {
    type: REQUEST_SEARCH,
  };
}

function receiveSearch(json) {
  return {
    type: RECEIVE_SEARCH,
    items: json.restaurants,
    center: {
      lat: json.region.center.lat,
      lng: json.region.center.lng,
    },
    total: json.total,
  };
}

function resetSearch() {
  return {
    type: RESET_SEARCH,
  };
}

function fetchSearch(term, location, filter) {
  return (dispatch) => {
    dispatch(requestSearch());

    const params = {
      coordinate: location.coordinate,
      location: location.name,
      page: filter.page,
      sort: filter.sort,
      term,
    };

    return get('search', qs.stringify(params))
      .then(json => dispatch(receiveSearch(json)))
      .catch(() => dispatch(resetSearch()));
  };
}

function shouldFetchSearch(state) {
  return !state.search.isFetching;
}

export function search(term, location, filter = { page: 1, sort: 0 }) {
  return (dispatch, getState) => {
    if (shouldFetchSearch(getState())) {
      return dispatch(fetchSearch(term, location, filter));
    }

    return Promise.resolve();
  };
}
