import { connect } from 'react-redux';
import GroupInfo from '../components/GroupInfo';

function mapStateToProps(state) {
  return {
    name: state.get('currentGroup'),
    count: '1',
  };
}

/* function mapDispatchToActions() {
  // todo
  return { a: 1 };
} */

export default connect(mapStateToProps)(GroupInfo);
