import { connect } from 'react-redux';
import InputArea from '../components/InputArea';
import sendMessage from '../actions/sendMessage';

/* function mapStateToProps(state) {
  // todo
  return {
    isMobile: state.get('isMobile'),
  };
} */

const mapDispatchToProps = {
  sendMessage,
};

export default connect(null, mapDispatchToProps)(InputArea);
