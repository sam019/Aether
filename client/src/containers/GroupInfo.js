import { connect } from 'react-redux';
import GroupInfo from '../components/GroupInfo';
import switchSidebar from '../actions/switchSidebar';

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
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupInfo);
