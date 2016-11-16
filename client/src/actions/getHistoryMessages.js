export default function getHistoryMessages() {
  return (dispatch, getState, socket) => {
    const state = getState();
    const groupName = state.get('currentGroup');
    if (groupName.match(/&&/)) {
      return;
    }
    let skip;
    state.get('groups').forEach((group) => {
      if (!skip && group.get('groupName') === groupName) {
        skip = group.get('messages').size;
      }
    });
    dispatch({
      type: 'GETTING_HISTORY_MESSAGES',
      payload: groupName,
    });
    socket.emit('getHistoryMessages', { groupName, skip }, (data) => {
      dispatch({
        type: 'RECEIVE_HISTORY_MESSAGES',
        payload: {
          groupName,
          messages: data.success ? data.messages.reverse() : [],
        },
      });
    });
  };
}
