import { connect } from 'react-redux';
import MyCard from '../components/MyCard';
import changeUserInfo from '../actions/changeUserInfo';

function mapStateToProps(state) {
  const user = state.get('user');
  return {
    username: user.get('username'),
    avatar: user.get('avatar'),
    male: user.get('sex') === 'male',
    sign: user.get('sign'),
    location: user.get('location'),
  };
}

const mapDispatchToProps = {
  changeUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCard);
