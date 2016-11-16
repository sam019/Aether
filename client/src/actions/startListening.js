import addMessage from './addMessage';
import loginWithToken from './loginWithToken';
import addGroupInfo from './addGroupInfo';

export default function startListening() {
  return (dispatch, getState, socket) => {
    socket.on('message', (message) => {
      dispatch(addMessage(message));
    });
    socket.on('reconnect', () => {
      dispatch(loginWithToken());
    });
    socket.on('launchChat', (group) => {
      dispatch(addGroupInfo(group));
    });
  };
}
