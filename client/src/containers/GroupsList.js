import { connect } from 'react-redux';
import GroupsList from '../components/GroupsList';

function mapStateToProps(state) {
  return {
    groups: state.get('groups') || [],
    currentGroup: state.get('currentGroup'),
  };
}

/* function mapDispatchToProps() {
  // todo
  return { a: 1 };
} */

export default connect(mapStateToProps)(GroupsList);
