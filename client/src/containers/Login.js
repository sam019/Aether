import { connect } from 'react-redux';
import Login from '../components/Login';
import login from '../actions/login';

const mapDispatchToProps = {
  login,
};
export default connect(null, mapDispatchToProps)(Login);
