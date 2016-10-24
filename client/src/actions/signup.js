import { browserHistory } from 'react-router';
import initUserInfo from './initUserInfo';

export default function signup({ username, password }) {
  return (dispatch, getState, socket) => {
    socket.emit('signup', { username, password }, (data) => {
      if (data.success) {
        localStorage.setItem('token', data.token);
        dispatch(initUserInfo(data.user));
        browserHistory.push('/');
      } else {
        // todo
      }
    });
  };
}
