import { browserHistory } from 'react-router';
import getUserInfo from '../actions/getUserInfo';

export default function longinWithoutToken({ userName, password }) {
  return (dispatch, getState, socket) => {
    socket.emit('loginWithoutToken', { userName, password }, (data) => {
      if (data.success) {
        localStorage.setItem('token', data.token);
        dispatch(getUserInfo(data.user));
        browserHistory.push('/');
      } else {
        // todo
      }
    });
  };
}
