import addMessage from './addMessage';

export default function sendMessage(message) {
  return (dispatch, getState, socket) => {
    const state = getState();
    message.userName = state.getIn(['user', 'name']);
    message.group = state.get('currentGroup');
    socket.emit('message', message);
    dispatch(addMessage(message));
  };
}
