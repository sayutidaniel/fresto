import qs from 'qs';
import configureStore from '../../src/configureStore';
import {
  SEARCH_RESTAURANT_REQUEST,
  SEARCH_RESTAURANT_SUCCESS,
  SEARCH_RESTAURANT_ERROR,
} from '../../src/constants/search';
import {
  searchRestaurants,
} from '../../src/actions/search';

jest.mock('isomorphic-fetch');
jest.mock('../../src/configureStore');

let fetch, mockStore;

describe('search async actions', () => {
  beforeEach(() => {
    const params = {
      coordinate: null,
      location: 'Tokyo',
      page: 1,
      sort: 0,
      term: 'Starbucks',
    };

    fetch = require('isomorphic-fetch');
    fetch
      .mockResponseSuccess(`search?${ qs.stringify(params) }`, {
        restaurants: [{
          id: 1,
          name: 'Starbucks',
        }, {
          id: 2,
          name: 'Ichiran Shibuya',
        }],
        region: {
          center: {
            lat: 35,
            lng: 139,
          },
        },
        total: 40,
      })
      .mockResponseError('search?term=Starbucks&location=Jakarta', 'An error occurred.');

    mockStore = configureStore({
      search: {
        isFetching: false,
      },
    });
  });

  afterEach(() => {
    fetch.mockClear();
  });

  it(`should dispatch ${ SEARCH_RESTAURANT_REQUEST } and ${ SEARCH_RESTAURANT_SUCCESS } on successfully searching restaurants`, () =>
    mockStore.dispatch(searchRestaurants('Starbucks', { name: 'Tokyo' }))
      .then(() => {
        expect(mockStore.getActions())
          .toEqual([
            {
              type: SEARCH_RESTAURANT_REQUEST,
            },
            {
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
            },
          ]);
      })
  );

  it(`should dispatch ${ SEARCH_RESTAURANT_REQUEST } AND ${ SEARCH_RESTAURANT_ERROR } on error searching restaurants`, () =>
    mockStore.dispatch(searchRestaurants('Starbucks', { name: 'Jakarta' }))
      .catch(() =>
        expect(mockStore.getActions())
          .toEqual([
            {
              type: SEARCH_RESTAURANT_REQUEST,
            },
            {
              type: SEARCH_RESTAURANT_ERROR,
              message: 'An error occurred.',
            },
          ])
      )
  );

  it('should not dispatch anything while searching restaurants', () => {
    mockStore.mockState({
      search: {
        isFetching: true
      },
    });
    return mockStore.dispatch(searchRestaurants('Starbucks', { name: 'Singapore' }))
      .then(() => {
        expect(fetch).not.toBeCalled();
      });
  });
});
