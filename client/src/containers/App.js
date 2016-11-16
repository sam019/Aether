import { connect } from 'react-redux';
import App from '../components/App';
import startListening from '../actions/startListening';

const mapDispatchToProps = {
  startListening,
};

export default connect(null, mapDispatchToProps)(App);
