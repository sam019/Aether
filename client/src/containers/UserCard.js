import { connect } from 'react-redux';
import UserCard from '../components/UserCard';
import launchChat from '../actions/launchChat';
import getUserInfo from '../actions/getUserInfo';

function mapStateToProps(state, ownProps) {
  const username = ownProps.username;
  let sign;
  let location;
  if (ownProps.isMine) {
    const user = state.get('user');
    sign = user.get('sign');
    location = user.get('location');
  } else {
    state.get('usersInfo').forEach((item) => {
      if (!sign && item.get('username') === username) {
        sign = item.get('sign');
        location = item.get('location');
      }
    });
  }
  return {
    username,
    avatar: ownProps.avatar,
    sign,
    location,
  };
}

const mapDispatchToProps = {
  launchChat,
  getUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
