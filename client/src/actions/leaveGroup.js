export default function leaveGroup() {
  return (dispatch, getState, socket) => {
    const state = getState();
    const currentGroup = state.get('currentGroup');
    socket.emit('leaveGroup', currentGroup);
    dispatch({
      type: 'LEAVE_GROUP',
      payload: currentGroup,
    });
    dispatch({ type: 'RESET_CURRENT_GROUP' });
  };
}
