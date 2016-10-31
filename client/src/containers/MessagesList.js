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
  return {
    messages: theGroup ? theGroup.get('messages') : undefined,
    username: state.getIn(['user', 'username']),
    getting: theGroup ? theGroup.get('getting') : false,
  };
}

const mapDispatchToProps = {
  getHistoryMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);
