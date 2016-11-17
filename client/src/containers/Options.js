import { connect } from 'react-redux';
import Options from '../components/Options';
import joinGroup from '../actions/joinGroup';
import changeUserInfo from '../actions/changeUserInfo';
import logout from '../actions/logout';

function mapStateToProps(state) {
  const user = state.get('user');
  return {
    allowNotification: user.get('allowNotification'),
    allowSound: user.get('allowSound'),
  };
}

const mapDispatchToProps = {
  joinGroup,
  changeUserInfo,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Options);
