import { connect } from 'react-redux';
import MessagesList from '../components/MessagesList';
import getHistoryMessages from '../actions/getHistoryMessages';

function mapStateToProps(state) {
  const currentGroup = state.get('currentGroup');
  let theGroup;
  state.get('groups').forEach((group) => {
    if (group.get('groupName') === currentGroup) {
      theGroup = group;
    }
  });
  const user = state.get('user');
  return {
    groupName: currentGroup,
    messages: theGroup && theGroup.get('messages'),
    username: user.get('username'),
    avatar: user.get('avatar'),
    getting: theGroup && theGroup.get('getting'),
    allowNotification: user.get('allowNotification'),
    allowSound: user.get('allowSound'),
  };
}

const mapDispatchToProps = {
  getHistoryMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);
