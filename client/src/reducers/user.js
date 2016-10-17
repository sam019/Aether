import { fromJS } from 'immutable';

export default function userReducer(user = fromJS({}), action) {
  switch (action.type) {
    case 'GET_USER_INFO': return fromJS(action);
    default: return user;
  }
}
