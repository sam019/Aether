import { connect } from 'react-redux';
import Profile from '../components/Profile';

function mapStateToProps(state) {
  return {
    username: state.getIn(['user', 'username']),
  };
}

/* function mapDispatchToActions() {
  // todo
  return { a: 1 };
} */

export default connect(mapStateToProps)(Profile);
