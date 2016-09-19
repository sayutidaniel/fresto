import { combineReducers } from 'redux';
import restaurant from './restaurant';
import search from './search';

export default combineReducers({
  restaurant,
  search,
});
