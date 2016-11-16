import addGroupInfo from './addGroupInfo';
import switchCurrentGroup from './switchCurrentGroup';

export default function joinGroup(groupName) {
  return (dispatch, getState, socket) => {
    let hasJoined = false;
    getState().get('groups').forEach((group) => {
      if (!hasJoined && group.get('groupName') === groupName) {
        hasJoined = true;
      }
    });
    if (hasJoined) {
      return;
    }
    socket.emit('joinGroup', groupName, (group) => {
      group.messages.reverse();
      dispatch(addGroupInfo(group));
      dispatch(switchCurrentGroup(groupName));
    });
  };
}
