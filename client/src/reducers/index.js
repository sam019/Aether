import { combineReducers } from 'redux-immutable';
import messages from './messages';

export default combineReducers({
  user: user => user,
  messages,
  currentGroup: currentGroup => currentGroup,
});
