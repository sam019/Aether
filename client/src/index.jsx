import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import store from './store';
import App from './components/App';
import Index from './containers/Index';
import Login from './containers/Login';
import Signup from './containers/Signup';
import './assets/base.css';
import loginWithToken from './actions/loginWithToken';

/* 登录验证 */
function authenticate(nextState, replace, cb) {
  if (!store.getState().getIn(['user', 'username'])) {
    store.dispatch(loginWithToken(nextState, replace, cb));
  } else {
    cb();
  }
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Index} onEnter={authenticate} />
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
/* 重要！！！ 启用热替换 */
if (module.hot) {
  module.hot.accept();
}
