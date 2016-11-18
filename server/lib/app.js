const Koa = require('koa');
const logger = require('koa-logger');
const gzip = require('koa-gzip');
const serve = require('koa-static');
const convert = require('koa-convert');
const etag = require('koa-etag');
const path = require('path');

const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const controller = require('./controller');
const conf = require('./conf');

mongoose.Promise = Promise;
mongoose.connect(conf.DATABASE);

app.use(logger());
app.use(convert(gzip()));
app.use(etag());
app.use(convert(serve(path.join(__dirname, '../public'))));
app.use((ctx) => {
  if (ctx.path !== '/') {
    ctx.redirect('/');
  }
});

io.on('connect', (socket) => {
  controller(socket);
});

let port;
if (process.env.NODE_ENV === 'production') {
  port = 80;
} else {
  port = conf.PORT;
}
server.listen(port);

console.log(`listening on port: ${port}`);
