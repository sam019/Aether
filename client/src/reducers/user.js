import { fromJS } from 'immutable';

export default function(user = fromJS({ err: {} }), action) {
  const payload = action.payload;
  switch (action.type) {
    case 'SET_USER_INFO': {
      if (!payload) {
        return fromJS({ err: {} });
      }
      let newState = user;
      for (const key of Object.keys(payload)) {
        newState = newState.set(key, payload[key]);
      }
      return newState.delete('code');
    }
    case 'SET_ERR': {
      return user.set('err', fromJS(payload));
    }
    default: return user;
  }
}
