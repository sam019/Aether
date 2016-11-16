import setUserInfo from './setUserInfo';
import { uploadToCloud } from '../assets/Utils';

export default function changeUserInfo(data) {
  return (dispatch, getState, socket) => {
    if (data.allowNotification && Notification && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    if (data.avatar) {
      uploadToCloud(`${getState().getIn(['user', 'username'])}-${Date.now()}`, data.avatar)
      .then((url) => {
        data.avatar = url;
        socket.emit('changeUserInfo', data);
        dispatch(setUserInfo(data));
      })
      .catch(console.info);
    } else {
      socket.emit('changeUserInfo', data);
      dispatch(setUserInfo(data));
    }
  };
}
