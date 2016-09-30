import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

function createMockStore(initialState) {
  let actions = [];
  let state = initialState;

  function dispatch(action) {
    actions.push(action);
    return action;
  }

  function getActions() {
    return actions;
  }

  function getState() {
    return state;
  }

  function mockState(newState) {
    state = newState;
  }

  return {
    dispatch,
    getActions,
    getState,
    mockState,
  };
}

function configureStore(...middlewares) {
  return (initialState) =>
    applyMiddleware(...middlewares)(createMockStore)(initialState);
}

export default configureStore(thunk);
