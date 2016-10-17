import { connect } from 'react-redux';
import Login from '../components/Login';
import login from '../actions/loginWithoutToken';

const mapDispatchToProps = {
  login,
};
export default connect(null, mapDispatchToProps)(Login);
