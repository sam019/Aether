const Koa = require('koa');

const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

app.use((ctx) => {
  // todo: return index page
  ctx.body = 'hello world';
});

// 在线人数
let onlineCount = 0;

io.on('connection', (socket) => {
  console.log('connected');
  onlineCount += 1;
  console.log('onlineCount: ' +　onlineCount);
  socket.on('message', (message) => {
    console.log('receive message');
    socket.broadcast.emit('message', message);
  });
  socket.on('disconnect', () => {
    console.log('disconnected');
    onlineCount -= 1;
    console.log('onlineCount: ' +　onlineCount);
  });
});

server.listen(3000, () => console.log('listening on port: 3000'));
