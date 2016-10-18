import { connect } from 'react-redux';
import Index from '../components/Index';
import addMessage from '../actions/addMessage';

const mapDispatchToProps = {
  addMessage,
};
export default connect(null, mapDispatchToProps)(Index);
