const Koa = require('koa');
const logger = require('koa-logger');
const gzip = require('koa-gzip');
const serve = require('koa-static');
const convert = require('koa-convert');
const path = require('path');

const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const controller = require('./controller');
const conf = require('./conf');

mongoose.Promise = Promise;
mongoose.connect(conf.DATABASE);

process.env.NODE_ENV !== 'production' && app.use(logger());
app.use(async (ctx, next) => {
  await next();
  if (ctx.fresh) {
    ctx.status = 304;
  }
});
app.use(convert(gzip()));
app.use(convert(serve(path.join(__dirname, '/../public'), { maxAge: 1000 * 60 * 60 * 24 })));
app.use((ctx) => {
  if (ctx.path !== '/') {
    ctx.redirect('/');
  }
});

io.on('connect', (socket) => {
  controller(socket);
});

server.listen(conf.port);

console.log(`listening on port: ${conf.port}`);
