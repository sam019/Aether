import { connect } from 'react-redux';
import Options from '../components/Options';
import logout from '../actions/logout';

/* function mapStateToProps() {
  // todo
  return { a: 1 };
} */

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(Options);
