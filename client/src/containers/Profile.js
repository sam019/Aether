import { connect } from 'react-redux';
import Profile from '../components/Profile';

function mapStateToProps(state) {
  return {
    userName: state.getIn(['user', 'name']),
  };
}

/* function mapDispatchToActions() {
  // todo
  return { a: 1 };
} */

export default connect(mapStateToProps)(Profile);
