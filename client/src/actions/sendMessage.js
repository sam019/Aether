import addMessage from './addMessage';

export default function sendMessage(message) {
  return (dispatch, getState, socket) => {
    const state = getState();
    message.groupName = state.get('currentGroup');
    socket.emit('message', message);
    message.username = state.getIn(['user', 'username']);
    dispatch(addMessage(message));
  };
}
