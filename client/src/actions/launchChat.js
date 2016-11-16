import switchCurrentGroup from './switchCurrentGroup';
import addGroupInfo from './addGroupInfo';

export default function launchChat(username, avatar) {
  return (dispatch, getState, socket) => {
    const state = getState();
    const myUsername = state.getIn('user', 'username');
    const groups = state.get('groups');
    let hasLaunched;
    groups.forEach((group) => {
      const groupName = group.get('groupName');
      const match = groupName.match(/(.*)&&(.*)/);
      if (
        !hasLaunched &&
        match &&
        ((match[1] === myUsername && match[2] === username) ||
        (match[2] === myUsername && match[1] === username))
      ) {
        hasLaunched = groupName;
      }
    });
    if (hasLaunched) {
      dispatch(switchCurrentGroup(hasLaunched));
      return;
    }
    const groupName = `${getState().getIn(['user', 'username'])}&&${username}`;
    socket.emit('launchChat', groupName);
    dispatch(addGroupInfo({
      groupName,
      avatar,
    }));
    dispatch(switchCurrentGroup(groupName));
  };
}
