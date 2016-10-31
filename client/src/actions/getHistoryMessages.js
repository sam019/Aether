export default function getHistoryMessages() {
  return (dispatch, getState, socket) => {
    const state = getState();
    const groupName = state.get('currentGroup');
    let before;
    state.get('groups').forEach((group) => {
      if (group.get('groupName') === groupName) {
        before = group.get('messages').size;
      }
    });
    dispatch({
      type: 'GETTING_HISTORY_MESSAGES',
      payload: groupName,
    });
    socket.emit('getHistoryMessages', { groupName, before }, (data) => {
      dispatch({
        type: 'RECEIVE_HISTORY_MESSAGES',
        payload: {
          groupName,
          messages: data.success ? data.messages : [],
        },
      });
    });
  };
}
