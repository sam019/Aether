import { connect } from 'react-redux';
import MessagesList from '../components/MessagesList';

function mapStateToProps(state) {
  const group = state.get('currentGroup');
  return {
    messages: state.getIn(['messages', group]),
    userName: state.getIn(['user', 'name']),
  };
}

/* function mapDispatchToActions() {
  // todo
  return { a: 1 };
} */

export default connect(mapStateToProps)(MessagesList);
