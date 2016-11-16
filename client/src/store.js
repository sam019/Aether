import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/';
import socket from './socket';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument(socket))
  )
);
