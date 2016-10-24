import { browserHistory } from 'react-router';
import initUserInfo from './initUserInfo';

export default function loginWithToken(nextState, replace = browserHistory.push, cb = () => {}) {
  return (dispatch, getState, socket) => {
    const token = localStorage.getItem('token');
    if (token) {
      socket.emit('loginWithToken', token, (data) => {
        if (data.success) {
          dispatch(initUserInfo(data.user));
          cb();
        } else {
          localStorage.removeItem('token');
          replace('/login');
          cb();
        }
      });
    } else {
      replace('/login');
      cb();
    }
  };
}
