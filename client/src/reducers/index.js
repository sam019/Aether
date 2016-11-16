import { combineReducers } from 'redux-immutable';
import showSidebar from './showSidebar';
import user from './user';
import currentGroup from './currentGroup';
import groups from './groups';
import usersInfo from './usersInfo';


export default combineReducers({
  user,
  groups,
  currentGroup,
  showSidebar,
  usersInfo,
});
