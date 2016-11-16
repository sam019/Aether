export default function switchCurrentGroup(groupName) {
  return (dispatch) => {
    dispatch({ type: 'RESET_SIDEBAR' });
    dispatch({
      type: 'SWITCH_CURRENT_GROUP',
      payload: groupName,
    });
  };
}
