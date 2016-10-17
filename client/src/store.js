import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import reducers from './reducers/';
import socket from './socket';

const initialStore = fromJS({
  isMobile: window.innerWidth < 1000,
  user: {
    name: `me${Math.round(Math.random() * 100)}`,
  },
  messages: {
    main: [
      {
        timestamp: 123123,
        userName: 'system',
        content: 'hello world',
      },
    ],
  },
  currentGroup: 'main',
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
