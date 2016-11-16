import { connect } from 'react-redux';
import Login from '../components/Login';
import login from '../actions/login';

function mapStateToProps(state) {
  return { err: state.getIn(['user', 'err']) };
}

const mapDispatchToProps = {
  login,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
