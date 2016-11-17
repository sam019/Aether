import { connect } from 'react-redux';
import GroupInfo from '../components/GroupInfo';
import switchSidebar from '../actions/switchSidebar';
import leaveGroup from '../actions/leaveGroup';

function mapStateToProps(state) {
  let groupName = state.get('currentGroup');
  const match = groupName.match(/(.*)&&(.*)/);
  if (match) {
    groupName = state.getIn(['user', 'username']) === match[1] ? match[2] : match[1];
  }
  return {
    showSidebar: state.get('showSidebar'),
    groupName,
    // count: '1',
  };
}

const mapDispatchToProps = {
  switchSidebar,
  leaveGroup,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupInfo);
