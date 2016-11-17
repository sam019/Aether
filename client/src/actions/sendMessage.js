import addMessage from './addMessage';
import { uploadToCloud } from '../assets/Utils';

export default function sendMessage(message) {
  return (dispatch, getState, socket) => {
    const state = getState();
    message.groupName = state.get('currentGroup');
    const user = state.get('user');
    const username = user.get('username');
    const avatar = user.get('avatar');
    if (message.type === 'text') {
      socket.emit('message', message);
      dispatch(addMessage(Object.assign(message, {
        user: {
          username,
          avatar,
        },
      })));
    } else {
      // 存储到七牛云
      uploadToCloud(`${username}-${message.timestamp}`, message.content)
      .then((url) => {
        socket.emit('message', Object.assign(message, { content: url }));
        dispatch(addMessage(Object.assign(message, {
          user: {
            username,
            avatar,
          },
        })));
      })
      .catch(console.warn);
    }
  };
}
