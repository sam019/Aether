import { connect } from 'react-redux';
import Profile from '../components/Profile';

function mapStateToProps(state) {
  const user = state.get('user');
  return {
    username: user.get('username'),
    avatar: user.get('avatar'),
  };
}

export default connect(mapStateToProps)(Profile);
