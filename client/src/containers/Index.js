import { connect } from 'react-redux';
import Index from '../components/Index';
import initializeAndListening from '../actions/initializeAndListening';

function mapStateToProps(state) {
  return {
    showSidebar: state.get('showSidebar'),
  };
}

const mapDispatchToProps = {
  initializeAndListening,
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
