import { browserHistory } from 'react-router';
import setUserInfo from './setUserInfo';
import setGroupsInfo from './setGroupsInfo';

export default function loginWithToken(nextState, replace = browserHistory.push, cb = () => {}) {
  return (dispatch, getState, socket) => {
    const token = localStorage.getItem('token');
    if (token) {
      socket.emit('loginWithToken', token, (data) => {
        if (data.success) {
          dispatch(setUserInfo(data.user));
          dispatch(setGroupsInfo(data.groups));
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
