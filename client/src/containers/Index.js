import { connect } from 'react-redux';
import Index from '../components/Index';

function mapStateToProps(state) {
  return {
    showSidebar: state.get('showSidebar'),
  };
}

export default connect(mapStateToProps)(Index);
