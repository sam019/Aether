import { connect } from 'react-redux';
import GroupInfo from '../components/GroupInfo';
import switchSidebar from '../actions/switchSidebar';

function mapStateToProps(state) {
  return {
    showSidebar: state.get('showSidebar'),
    name: state.get('currentGroup'),
    count: '1',
  };
}

const mapDispatchToProps = {
  switchSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupInfo);
