import { browserHistory } from 'react-router';
import initUserInfo from './initUserInfo';

export default function logout() {
  return (dispatch, getState, socket) => {
    socket.emit('logout', localStorage.getItem('token'));
    localStorage.removeItem('token');
    dispatch(initUserInfo());
    browserHistory.push('/login');
  };
}
