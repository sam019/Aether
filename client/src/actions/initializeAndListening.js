import addMessage from './addMessage';
import loginWithToken from './loginWithToken';

export default function initializeAndListening() {
  return (dispatch, getState, socket) => {
    const groupsName = getState().getIn(['user', 'groups']).toJS();
    socket.emit('getGroupsInfo', { groupsName }, (groups) => {
      dispatch({
        type: 'INITIALIZE_GROUP_INFO',
        payload: groups,
      });
      socket.on('message', (message) => {
        dispatch(addMessage(message));
      });
      socket.on('reconnect', () => {
        dispatch(loginWithToken());
      });
    });
  };
}
