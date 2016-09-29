import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers';
import App from './containers/App';
import './base.css';
let it = {
  name: 'llll',
  sdfsf: '123sssss'
}
const store = createStore(reducer, it);
console.log(store.getState());
render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById('root')
);
