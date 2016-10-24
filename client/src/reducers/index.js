import { combineReducers } from 'redux-immutable';
import groups from './groups';
import user from './user';
import showSidebar from './showSidebar';

export default combineReducers({
  user,
  groups,
  currentGroup: currentGroup => currentGroup,
  showSidebar,
});
