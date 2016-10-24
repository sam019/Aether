import io from 'socket.io-client';

let url;
if (location.host === 'localhost:8080') {
  url = 'http://localhost:3000';
} else {
  url = 'http://192.168.1.100:3000';
}
const socket = io(url);
export default socket;
