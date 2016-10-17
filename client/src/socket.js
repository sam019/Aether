import io from 'socket.io-client';
import addMessage from './actions/addMessage';

const socket = io('http://localhost:3000');
export default socket;
/* socket.on('message', message => {
}); */
