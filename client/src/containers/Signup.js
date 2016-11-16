import { connect } from 'react-redux';
import Signup from '../components/Signup';
import signup from '../actions/signup';

function mapStateToProps(state) {
  return { err: state.getIn(['user', 'err']) };
}

const mapDispatchToProps = {
  signup,
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
