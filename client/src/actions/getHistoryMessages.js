import receiveHistoryMessages from './receiveHistoryMessages';
import gettingHistoryMessages from './gettingHistoryMessages';

export default function getHistoryMessages() {
  return (dispatch, getState, socket) => {
    const state = getState();
    const groupName = state.get('currentGroup');
    const before = state.getIn(['groups', groupName, 'messages']).size;
    dispatch(gettingHistoryMessages(groupName));
    socket.emit('getHistoryMessages', { groupName, before }, (data) => {
      if (data.success) {
        dispatch(receiveHistoryMessages({ groupName, messages: data.messages }));
      } else {
        dispatch(receiveHistoryMessages({ groupName, messages: [] }));
      }
    });
  };
}
