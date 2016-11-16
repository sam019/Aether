import { browserHistory } from 'react-router';
import setUserInfo from './setUserInfo';
import setGroupsInfo from './setGroupsInfo';

export default function logout() {
  return (dispatch, getState, socket) => {
    socket.emit('logout');
    localStorage.removeItem('token');
    browserHistory.push('/login');
    dispatch(setUserInfo());
    dispatch(setGroupsInfo());
    dispatch({ type: 'RESET_CURRENT_GROUP' });
    dispatch({ type: 'RESET_SIDEBAR' });
  };
}
