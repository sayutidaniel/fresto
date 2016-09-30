import configureStore from '../../src/configureStore';
import {
  FIND_RESTAURANT_REQUEST,
  FIND_RESTAURANT_SUCCESS,
  FIND_RESTAURANT_ERROR,
} from '../../src/constants/restaurant';
import {
  findRestaurant,
} from '../../src/actions/restaurant';

jest.mock('isomorphic-fetch');
jest.mock('../../src/configureStore');

let fetch, mockStore;

describe('restaurant async actions', () => {
  beforeEach(() => {
    fetch = require('isomorphic-fetch');
    fetch
      .mockResponseSuccess('restaurant/1', {
        id: 1,
        name: 'Starbucks',
      })
      .mockResponseError('restaurant/2', 'An error occurred.');

    mockStore = configureStore({
      restaurant: {
        isFetching: false,
      },
    });
  });

  afterEach(() => {
    fetch.mockClear();
  });

  it(`should dispatch ${ FIND_RESTAURANT_REQUEST } and ${ FIND_RESTAURANT_SUCCESS } on successfully finding a restaurant`, () =>
    mockStore.dispatch(findRestaurant(1))
      .then(() => {
        expect(mockStore.getActions())
          .toEqual([
            {
              type: FIND_RESTAURANT_REQUEST,
            },
            {
              type: FIND_RESTAURANT_SUCCESS,
              restaurant: {
                id: 1,
                name: 'Starbucks',
              },
            },
          ]);
      })
  );

  it(`should dispatch ${ FIND_RESTAURANT_REQUEST } AND ${ FIND_RESTAURANT_ERROR } on error finding a restaurant`, () =>
    mockStore.dispatch(findRestaurant(2))
      .catch(() =>
        expect(mockStore.getActions())
          .toEqual([
            {
              type: FIND_RESTAURANT_REQUEST,
            },
            {
              type: FIND_RESTAURANT_ERROR,
              message: 'An error occurred.',
            },
          ])
      )
  );

  it('should not dispatch anything while finding a restaurant', () => {
    mockStore.mockState({
      restaurant: {
        isFetching: true
      },
    });
    return mockStore.dispatch(findRestaurant(1))
      .then(() => {
        expect(fetch).not.toBeCalled();
      });
  });
});
