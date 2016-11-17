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

app.use(convert(serve(__dirname + '/../public')));
app.use((ctx) => {
  if (ctx.path !== '/') {
    ctx.redirect('/');
  }
});

io.on('connect', (socket) => {
  controller(socket);
});

server.listen(conf.PORT, () => { console.log(`listening on port: ${conf.PORT}`); });
