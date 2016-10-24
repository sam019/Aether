import { connect } from 'react-redux';
import MessagesList from '../components/MessagesList';
import getHistoryMessages from '../actions/getHistoryMessages';

function mapStateToProps(state) {
  const currentGroup = state.get('currentGroup');
  return {
    messages: state.getIn(['groups', currentGroup, 'messages']),
    username: state.getIn(['user', 'username']),
    getting: state.getIn(['groups', currentGroup, 'getting']) || false,
  };
}

const mapDispatchToProps = {
  getHistoryMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);
