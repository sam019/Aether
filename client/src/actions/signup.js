import { browserHistory } from 'react-router';
import setUserInfo from './setUserInfo';
import setGroupsInfo from './setGroupsInfo';
import setErr from './setErr';

export default function signup({ username, password }) {
  return (dispatch, getState, socket) => {
    if (!username || !password) {
      dispatch(setErr(4));
      return;
    }
    socket.emit('signup', { username, password }, (data) => {
      if (data.success) {
        localStorage.setItem('token', data.token);
        dispatch(setUserInfo(data.user));
        dispatch(setGroupsInfo(data.groups));
        browserHistory.push('/');
      } else {
        dispatch(setErr(data.code));
      }
    });
  };
}
