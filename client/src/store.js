import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import reducers from './reducers/';
import socket from './socket';

const initialStore = fromJS({
  currentGroup: 'main',
  showSidebar: window.innerWidth > 1024,
});
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
  reducers,
  initialStore,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument(socket))
  )
);
