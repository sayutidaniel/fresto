import restaurant from '../../src/reducers/restaurant';
import {
  FIND_RESTAURANT_REQUEST,
  FIND_RESTAURANT_SUCCESS,
  FIND_RESTAURANT_ERROR,
} from '../../src/constants/restaurant';

describe('restaurant reducers', () => {
  it('should return the initial state', () => {
    expect(
      restaurant(undefined, {})
    )
      .toEqual({
        errorMessage: '',
        isFetching: false,
        item: null,
      });
  });

  it(`should change state to fetching on ${ FIND_RESTAURANT_REQUEST }`, () => {
    expect(
      restaurant({
        errorMessage: '',
        isFetching: false,
        item: null,
      }, {
        type: FIND_RESTAURANT_REQUEST,
      })
    )
      .toEqual({
        errorMessage: '',
        isFetching: true,
        item: null,
      });
  });

  it(`should store found restaurant on ${ FIND_RESTAURANT_SUCCESS }`, () => {
    expect(
      restaurant({
        errorMessage: '',
        isFetching: true,
        item: null,
      }, {
        type: FIND_RESTAURANT_SUCCESS,
        restaurant: {
          id: 1,
          name: 'Starbucks',
        },
      })
    )
      .toEqual({
        errorMessage: '',
        isFetching: false,
        item: {
          id: 1,
          name: 'Starbucks',
        },
      });
  });

  it(`should store error message on ${ FIND_RESTAURANT_ERROR }`, () => {
    expect(
      restaurant({
        errorMessage: '',
        isFetching: true,
        item: {
          id: 1,
          name: 'Starbucks',
        },
      }, {
        type: FIND_RESTAURANT_ERROR,
        message: 'An error occurred.',
      })
    )
      .toEqual({
        errorMessage: 'An error occurred.',
        isFetching: false,
        item: null,
      });
  });
});
