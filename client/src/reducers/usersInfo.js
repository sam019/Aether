import { fromJS } from 'immutable';

export default function(usersInfo = fromJS([]), action) {
  const payload = action.payload;
  switch (action.type) {
    case 'ADD_USER_INFO': {
      return usersInfo.push(fromJS(payload));
    }
    default: return usersInfo;
  }
}
