export default function getUserInfo(username) {
  return (dispatch, getState, socket) => {
    socket.emit('getUserInfo', username, (user) => {
      dispatch({
        type: 'ADD_USER_INFO',
        payload: user,
      });
    });
  };
}
