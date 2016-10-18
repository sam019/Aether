import { connect } from 'react-redux';
import Signup from '../components/Signup';
import signup from '../actions/signup';

const mapDispatchToProps = {
  signup,
};
export default connect(null, mapDispatchToProps)(Signup);
