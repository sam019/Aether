import { browserHistory } from 'react-router';
import setUserInfo from './setUserInfo';
import setGroupsInfo from './setGroupsInfo';
import setErr from './setErr';

export default function login({ username, password }) {
  return (dispatch, getState, socket) => {
    if (!username || !password) {
      dispatch(setErr(4));
      return;
    }
    socket.emit('login', { username, password }, (data) => {
      if (data.success) {
        localStorage.setItem('token', data.token);
        dispatch(setUserInfo(data.user));
        dispatch(setGroupsInfo(data.groups));
        // 此处跳转到主界面，会在进入时再次验证
        browserHistory.push('/');
      } else {
        dispatch(setErr(data.code));
      }
    });
  };
}
