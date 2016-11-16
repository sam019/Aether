const Koa = require('koa');
const serve = require('koa-static');
const convert = require('koa-convert');

const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const controller = require('./controller');
const conf = require('./conf');

mongoose.Promise = Promise;
mongoose.connect(conf.DATABASE);

app.use(convert(serve(__dirname + '/public')));
app.use((ctx) => {
  ctx.redirect('/');
});

io.on('connect', (socket) => {
  console.log('connected');
  controller(socket);
});

server.listen(3000, () => console.log('listening on port: 3000'));
