import { fromJS } from 'immutable';

export default function(user = fromJS({ username: undefined }), action) {
  switch (action.type) {
    case 'INIT_USER_INFO': {
      const userInfo = action.payload;
      if (userInfo) {
        return fromJS(userInfo);
      }
      /* 不带参数则初始化 */
      return fromJS({ username: undefined });
    }
    default: return user;
  }
}
