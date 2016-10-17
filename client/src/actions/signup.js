import { browserHistory } from 'react-router';
import getUserInfo from '../actions/getUserInfo';

export default function signup({ userName, password }) {
  return (dispatch, getState, socket) => {
    socket.emit('signup', { userName, password }, (data) => {
      if (data.success) {
        localStorage.setItem('token', data.token);
        dispatch(getUserInfo(data.user));
        browserHistory.push('/');
      }
    });
  };
}
