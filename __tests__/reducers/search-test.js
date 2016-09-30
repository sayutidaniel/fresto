import search from '../../src/reducers/search';
import {
  SEARCH_RESTAURANT_REQUEST,
  SEARCH_RESTAURANT_SUCCESS,
  SEARCH_RESTAURANT_ERROR,
} from '../../src/constants/search';

describe('search reducers', () => {
  it('should return the initial state', () => {
    expect(search(undefined, {}))
      .toEqual({
        errorMessage: '',
        isFetching: false,
        items: [],
        center: null,
        total: 0,
      });
  });

  it(`should change state to fetching on ${ SEARCH_RESTAURANT_REQUEST }`, () => {
    expect(
      search({
        errorMessage: '',
        isFetching: false,
        items: [],
        center: null,
        total: 0,
      }, {
        type: SEARCH_RESTAURANT_REQUEST,
      })
    )
      .toEqual({
        errorMessage: '',
        isFetching: true,
        items: [],
        center: null,
        total: 0,
      });
  });

  it(`should store search results, centroid, and total on ${ SEARCH_RESTAURANT_SUCCESS }`, () => {
    expect(
      search({
        errorMessage: '',
        isFetching: true,
        items: [],
        center: null,
        total: 0,
      }, {
        type: SEARCH_RESTAURANT_SUCCESS,
        items: [{
          id: 1,
          name: 'Starbucks',
        }, {
          id: 2,
          name: 'Ichiran Shibuya',
        }],
        center: {
          lat: 35,
          lng: 139,
        },
        total: 40,
      })
    )
      .toEqual({
        errorMessage: '',
        isFetching: false,
        items: [{
          id: 1,
          name: 'Starbucks',
        }, {
          id: 2,
          name: 'Ichiran Shibuya',
        }],
        center: {
          lat: 35,
          lng: 139,
        },
        total: 40,
      });
  });

  it(`should store error message on ${ SEARCH_RESTAURANT_ERROR }`, () => {
    expect(
      search({
        errorMessage: '',
        isFetching: true,
        items: [{
          id: 1,
          name: 'Starbucks',
        }],
      }, {
        type: SEARCH_RESTAURANT_ERROR,
        message: 'An error occurred.',
      })
    )
      .toEqual({
        errorMessage: 'An error occurred.',
        isFetching: false,
        items: [],
      });
  });
});
