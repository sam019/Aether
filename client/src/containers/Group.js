import { connect } from 'react-redux';
import Group from '../components/Group';
import switchCurrentGroup from '../actions/switchCurrentGroup';

const mapDispatchToProps = {
  switchCurrentGroup,
};
export default connect(null, mapDispatchToProps)(Group);
